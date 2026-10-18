// Ajoute les réglages AdMob obligatoires dans les projets iOS et Android
// générés par Capacitor. À lancer après "npx cap add ios" / "npx cap add android".
// Remplacez les identifiants d'application de TEST par les vôtres (console AdMob).
import fs from 'node:fs';

const ADMOB_APP_ID_IOS = 'ca-app-pub-3940256099942544~1458002511';     // TEST
const ADMOB_APP_ID_ANDROID = 'ca-app-pub-3940256099942544~3347511713'; // TEST

// --- iOS : Info.plist ---
const plist = 'ios/App/App/Info.plist';
if (fs.existsSync(plist)) {
  let p = fs.readFileSync(plist, 'utf8');
  const add = (key, xml) => { if (!p.includes(`<key>${key}</key>`)) p = p.replace(/<\/dict>\s*<\/plist>\s*$/, `\t<key>${key}</key>\n\t${xml}\n</dict>\n</plist>\n`); };
  add('GADApplicationIdentifier', `<string>${ADMOB_APP_ID_IOS}</string>`);
  add('NSUserTrackingUsageDescription', '<string>Cette autorisation permet d\'afficher des publicités plus adaptées à vos intérêts.</string>');
  add('SKAdNetworkItems', '<array>\n\t\t<dict>\n\t\t\t<key>SKAdNetworkIdentifier</key>\n\t\t\t<string>cstr6suwn9.skadnetwork</string>\n\t\t</dict>\n\t</array>');
  add('ITSAppUsesNonExemptEncryption', '<false/>');
  add('UIRequiresFullScreen', '<true/>');
  fs.writeFileSync(plist, p);
  console.log('✔ Info.plist configuré');
}

// --- Android : AndroidManifest.xml ---
const manifest = 'android/app/src/main/AndroidManifest.xml';
if (fs.existsSync(manifest)) {
  let m = fs.readFileSync(manifest, 'utf8');
  if (!m.includes('com.google.android.gms.ads.APPLICATION_ID')) {
    m = m.replace(/<application([^>]*)>/, `<application$1>\n        <meta-data android:name="com.google.android.gms.ads.APPLICATION_ID" android:value="${ADMOB_APP_ID_ANDROID}"/>`);
  }
  if (!m.includes('com.google.android.gms.permission.AD_ID')) {
    m = m.replace('</manifest>', '    <uses-permission android:name="com.google.android.gms.permission.AD_ID"/>\n</manifest>');
  }
  m = m.replace(/android:screenOrientation="[^"]*"/g, '');
  m = m.replace(/<activity(\s)/, '<activity android:screenOrientation="portrait"$1');
  fs.writeFileSync(manifest, m);
  console.log('✔ AndroidManifest.xml configuré');
}
