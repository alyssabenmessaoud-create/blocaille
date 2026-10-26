// ================= LANGUES (i18n) =================
// Langue : choix enregistré du joueur, sinon langue du téléphone, sinon anglais.
const LANGS={fr:'Français',en:'English',es:'Español',pt:'Português',de:'Deutsch',it:'Italiano'};
const LANG=(()=>{try{const s=JSON.parse(localStorage.getItem('blocaille_lang'));if(s&&LANGS[s])return s}catch(e){}
  const list=(navigator.languages&&navigator.languages.length)?navigator.languages:[navigator.language||'en'];
  for(const l of list){const c=String(l).slice(0,2).toLowerCase();if(LANGS[c])return c}return 'en'})();
const LOC={fr:'fr-FR',en:'en-US',es:'es-ES',pt:'pt-BR',de:'de-DE',it:'it-IT'}[LANG];
const I18N=window.BLOCAILLE_I18N||{};
const UI=(I18N[LANG]&&I18N[LANG].ui)||{};
const i18nNorm=s=>String(s).replace(/\s+/g,' ').trim();
// L('texte français {0}', valeur) -> texte dans la langue du joueur
function L(s,...a){let t=LANG==='fr'?s:(UI[i18nNorm(s)]!=null?UI[i18nNorm(s)]:s);return a.length?t.replace(/\{(\d)\}/g,(_,i)=>a[i]):t}
const F=n=>Number(n).toLocaleString(LOC);
const KB_ROWS=LANG==='fr'?['AZERTYUIOP','QSDFGHJKLM','WXCVBN']:LANG==='de'?['QWERTZUIOP','ASDFGHJKL','YXCVBNM']:['QWERTYUIOP','ASDFGHJKL','ZXCVBNM'];
document.documentElement.lang=LANG;
function i18nStatic(){
  document.querySelectorAll('[data-l]').forEach(el=>{el.innerHTML=L(el.innerHTML)});
  document.querySelectorAll('[aria-label]').forEach(el=>{el.setAttribute('aria-label',L(el.getAttribute('aria-label')))});
}
function setLang(c){try{localStorage.setItem('blocaille_lang',JSON.stringify(c))}catch(e){}location.reload()}
