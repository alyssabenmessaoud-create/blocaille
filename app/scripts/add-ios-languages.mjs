// Déclare les langues du jeu dans le projet iOS généré par Capacitor.
// - crée ios/App/App/<langue>.lproj/InfoPlist.strings (message de la demande de suivi publicitaire traduit)
// - ajoute ces fichiers au projet Xcode (sinon ils ne sont pas copiés dans l'app)
// Effets : l'App Store affiche « Langues : français, anglais… » et iOS montre la fenêtre de suivi dans la langue du joueur.
// À lancer depuis le dossier "app", après "npx cap add ios" (le script ne fait rien s'il est déjà passé).
// Usage : node scripts/add-ios-languages.mjs [chemin/vers/project.pbxproj]
import fs from 'node:fs';
import path from 'node:path';

const TRACKING = {
  fr: "Cette autorisation permet d'afficher des publicités plus adaptées à vos intérêts.",
  en: 'This permission lets us show ads that better match your interests.',
  es: 'Este permiso nos permite mostrarte anuncios más adaptados a tus intereses.',
  pt: 'Esta permissão permite mostrar anúncios mais adequados aos seus interesses.',
  de: 'Mit dieser Erlaubnis können wir dir Werbung zeigen, die besser zu deinen Interessen passt.',
  it: 'Questa autorizzazione ci permette di mostrarti pubblicità più adatte ai tuoi interessi.',
};
const LANGS = Object.keys(TRACKING);

const pbxPath = process.argv[2] || 'ios/App/App.xcodeproj/project.pbxproj';
if (!fs.existsSync(pbxPath)) { console.log('ℹ︎ Projet iOS absent, langues iOS non ajoutées (' + pbxPath + ')'); process.exit(0); }
const appDir = path.join(path.dirname(path.dirname(pbxPath)), 'App');

// 1) fichiers InfoPlist.strings
for (const l of LANGS) {
  const dir = path.join(appDir, l + '.lproj');
  fs.mkdirSync(dir, { recursive: true });
  const v = TRACKING[l].replace(/\\/g, '\\\\').replace(/"/g, '\\"');
  fs.writeFileSync(path.join(dir, 'InfoPlist.strings'), `/* Message de la demande de suivi publicitaire (App Tracking Transparency) */\n"NSUserTrackingUsageDescription" = "${v}";\n`);
}

// 2) projet Xcode
let p = fs.readFileSync(pbxPath, 'utf8');
if (p.includes('/* InfoPlist.strings */')) { console.log('✔ Langues iOS déjà déclarées'); process.exit(0); }

const used = new Set(p.match(/\b[0-9A-F]{24}\b/g) || []);
let n = 0;
const newId = () => { let id; do { id = ('B10CA111' + (n++).toString(16).toUpperCase().padStart(16, '0')).slice(0, 24); } while (used.has(id)); used.add(id); return id; };
const fail = what => { console.error('✘ Impossible de déclarer les langues iOS : ' + what + ' introuvable dans project.pbxproj'); process.exit(1); };
const insertBefore = (marker, text) => { const i = p.indexOf(marker); if (i < 0) fail(marker); p = p.slice(0, i) + text + p.slice(i); };

const variantId = newId(), buildFileId = newId();
const refIds = Object.fromEntries(LANGS.map(l => [l, newId()]));

insertBefore('/* End PBXBuildFile section */',
  `\t\t${buildFileId} /* InfoPlist.strings in Resources */ = {isa = PBXBuildFile; fileRef = ${variantId} /* InfoPlist.strings */; };\n`);
insertBefore('/* End PBXFileReference section */',
  LANGS.map(l => `\t\t${refIds[l]} /* ${l} */ = {isa = PBXFileReference; lastKnownFileType = text.plist.strings; name = ${l}; path = ${l}.lproj/InfoPlist.strings; sourceTree = "<group>"; };\n`).join(''));

// groupe "App" (celui qui a path = App) : on ajoute le groupe de variantes à ses enfants
const groupRe = /(\t\t[0-9A-F]{24} \/\* App \*\/ = \{\n\t\t\tisa = PBXGroup;\n\t\t\tchildren = \(\n)([\s\S]*?)(\t\t\t\);\n\t\t\tpath = App;)/;
if (!groupRe.test(p)) fail('groupe App');
p = p.replace(groupRe, (m, a, kids, b) => a + kids + `\t\t\t\t${variantId} /* InfoPlist.strings */,\n` + b);

// phase « Resources » de la cible
const resRe = /(isa = PBXResourcesBuildPhase;\n\t\t\tbuildActionMask = \d+;\n\t\t\tfiles = \(\n)/;
if (!resRe.test(p)) fail('phase Resources');
p = p.replace(resRe, m => m + `\t\t\t\t${buildFileId} /* InfoPlist.strings in Resources */,\n`);

// groupe de variantes (une variante par langue)
const variant = `\t\t${variantId} /* InfoPlist.strings */ = {\n\t\t\tisa = PBXVariantGroup;\n\t\t\tchildren = (\n` +
  LANGS.map(l => `\t\t\t\t${refIds[l]} /* ${l} */,\n`).join('') +
  `\t\t\t);\n\t\t\tname = InfoPlist.strings;\n\t\t\tsourceTree = "<group>";\n\t\t};\n`;
if (p.includes('/* End PBXVariantGroup section */')) insertBefore('/* End PBXVariantGroup section */', variant);
else insertBefore('/* Begin XCBuildConfiguration section */', `/* Begin PBXVariantGroup section */\n${variant}/* End PBXVariantGroup section */\n\n`);

// régions connues du projet
const krRe = /knownRegions = \(\n([\s\S]*?)\t\t\t\);/;
if (!krRe.test(p)) fail('knownRegions');
p = p.replace(krRe, (m, list) => {
  const have = list.split('\n').map(s => s.trim().replace(/,$/, '')).filter(Boolean);
  const all = [...new Set([...have, ...LANGS])];
  return 'knownRegions = (\n' + all.map(r => `\t\t\t\t${r},\n`).join('') + '\t\t\t);';
});

fs.writeFileSync(pbxPath, p);
console.log('✔ Langues iOS déclarées : ' + LANGS.join(', '));
