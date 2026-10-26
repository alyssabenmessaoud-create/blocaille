// Génère www/i18n/<langue>.js à partir de i18n-src/ui/<langue>.json et i18n-src/content/<langue>_words.json / _quiz.json
// Usage (depuis app/) : node i18n-src/tools/build_i18n.js
// Vérifie au passage : textes manquants, variables {0}, mots valides (A-Z, 3 à 14 lettres), 4 réponses distinctes par question.
const fs=require('fs'),path=require('path');
const SRC=path.join(__dirname,'..'),WWW=path.join(__dirname,'..','..','www');
const html=fs.readFileSync(path.join(WWW,'index.html'),'utf8');
const norm=x=>x.replace(/\s+/g,' ').trim();
// toutes les phrases françaises passées à L(...) dans le jeu + textes fixes du HTML
const keys=new Set();
for(const m of html.matchAll(/\bL\((["'])((?:\\.|(?!\1).)*)\1/g))keys.add(norm(m[2].replace(/\\'/g,"'")));
for(const m of html.matchAll(/\bL\([a-zA-Z.>0-9]+\?(["'])((?:(?!\1).)*)\1:(["'])((?:(?!\3).)*)\3/g)){keys.add(norm(m[2]));keys.add(norm(m[4]))}
const body=html.slice(html.indexOf('<body'),html.indexOf('<script'));
for(const m of body.matchAll(/<(\w+)[^>]*\sdata-l[^>]*>([\s\S]*?)<\/\1>/g))keys.add(norm(m[2]));
for(const m of body.matchAll(/aria-label="([^"]*)"/g))keys.add(norm(m[1]));
keys.delete('texte français {0}');keys.delete('Blocaille');
const langs=fs.readdirSync(path.join(SRC,'ui')).filter(f=>f.endsWith('.json')).map(f=>f.slice(0,-5)).sort();
let ok=true;
fs.mkdirSync(path.join(WWW,'i18n'),{recursive:true});
for(const l of langs){
  const ui=JSON.parse(fs.readFileSync(path.join(SRC,'ui',l+'.json'),'utf8'));
  const miss=[...keys].filter(k=>!(k in ui));if(miss.length){ok=false;console.log(l,'textes manquants :',miss)}
  for(const [a,b] of Object.entries(ui)){const pa=(a.match(/\{\d\}/g)||[]).sort().join(),pb=(String(b).match(/\{\d\}/g)||[]).sort().join();if(pa!==pb){ok=false;console.log(l,'variables différentes :',a)}}
  const W=JSON.parse(fs.readFileSync(path.join(SRC,'content',l+'_words.json'),'utf8'));
  const Q=JSON.parse(fs.readFileSync(path.join(SRC,'content',l+'_quiz.json'),'utf8'));
  for(const t of ['1','2','3','4','5']){
    if(!W[t]||W[t].length<15){ok=false;console.log(l,'mots niveau',t,': trop peu')}
    const bw=W[t].filter(x=>/[^A-Z]/.test(x[0])||x[0].length<3||x[0].length>14);if(bw.length){ok=false;console.log(l,'mots invalides :',bw.map(x=>x[0]))}
    if(!Q[t]||Q[t].length<12){ok=false;console.log(l,'quiz niveau',t,': trop peu')}
    const bq=Q[t].filter(x=>x[1].length!==4||new Set(x[1]).size!==4);if(bq.length){ok=false;console.log(l,'questions invalides :',bq.map(x=>x[0]))}
  }
  const all=[].concat(...Object.values(W)).map(x=>x[0]);
  const lens={};all.forEach(w=>lens[w.length]=(lens[w.length]||0)+1);
  for(const n of [5,6,7,8,9,10])if(!lens[n]||lens[n]<4){ok=false;console.log(l,'mot mystère : pas assez de mots de',n,'lettres')}
  fs.writeFileSync(path.join(WWW,'i18n',l+'.js'),`// Généré par i18n-src/tools/build_i18n.js : ne pas modifier à la main.\n(window.BLOCAILLE_I18N=window.BLOCAILLE_I18N||{})[${JSON.stringify(l)}]=${JSON.stringify({ui,WORDS:W,QUIZ:Q})};\n`);
  console.log(l,':',all.length,'mots,',[].concat(...Object.values(Q)).length,'questions');
}
console.log(keys.size,'textes d\'interface par langue');
process.exit(ok?0:1);
