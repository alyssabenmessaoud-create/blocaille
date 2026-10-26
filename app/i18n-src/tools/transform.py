# Migration unique (version 1.1) : a transformé le index.html français de la version 1.0.1 en version multilingue.
# Depuis, www/index.html est directement la source à modifier ; ce script et les règles rules*.py restent comme trace.
# Pour le rejouer : git show cad4133:app/www/index.html > /tmp/base.html
#                   python3 i18n-src/tools/transform.py /tmp/base.html www/index.html
import sys,os
here=os.path.dirname(os.path.abspath(__file__))
src_path,out_path=sys.argv[1],sys.argv[2]
src=open(src_path,encoding='utf-8').read()
i=src.find('<script>');j=src.rfind('</script>')
html_head,js,html_tail=src[:i],src[i+8:j],src[j:]
fails=[]
def R(old,new,n=1):
    global js
    c=js.count(old)
    if c!=n: fails.append((c,n,old[:90])); return
    js=js.replace(old,new)
ncount=js.count(".toLocaleString('fr-FR')");js=js.replace(".toLocaleString('fr-FR')",".toLocaleString(LOC)")
for f in ['rules6.py','rules1.py','rules2.py','rules5.py','rules4.py','rules3.py','rules_html.py']:
    exec(open(os.path.join(here,f),encoding='utf-8').read())
if fails:
    for f in fails: print('ECHEC',f)
    sys.exit(1)
# les traductions sont dans www/i18n/<langue>.js, chargées avant le jeu
langs=''.join('<script src="i18n/%s.js"></script>\n'%l for l in ['en','es','pt','de','it'])
header=open(os.path.join(here,'header.js'),encoding='utf-8').read()
out=html_head+langs+'<script>\n'+header+js+html_tail
open(out_path,'w',encoding='utf-8').write(out)
print('OK',len(out),'octets ; nombres formatés :',ncount)
