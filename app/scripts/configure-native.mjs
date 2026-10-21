// Ajoute les réglages AdMob obligatoires dans les projets iOS et Android
// générés par Capacitor. À lancer après "npx cap add ios" / "npx cap add android".
// Remplacez les identifiants d'application de TEST par les vôtres (console AdMob).
import fs from 'node:fs';

const ADMOB_APP_ID_IOS = 'ca-app-pub-5323738460279716~9326598703';     // réel
const ADMOB_APP_ID_ANDROID = 'ca-app-pub-5323738460279716~8876006710'; // réel

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

// --- iOS : version minimale iOS 15 (exigée par Apple à partir d'avril 2027) ---
for (const f of ['ios/App/Podfile', 'ios/App/App.xcodeproj/project.pbxproj']) {
  if (fs.existsSync(f)) {
    let t = fs.readFileSync(f, 'utf8');
    t = t.replace(/platform :ios, '1[0-4]\.\d+'/g, "platform :ios, '15.0'")
         .replace(/IPHONEOS_DEPLOYMENT_TARGET = 1[0-4]\.\d+;/g, 'IPHONEOS_DEPLOYMENT_TARGET = 15.0;');
    fs.writeFileSync(f, t);
  }
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

// --- Android : version minimale Android 7 (SDK 24, exigée par la protection automatique Play) ---
const variables = 'android/variables.gradle';
if (fs.existsSync(variables)) {
  let v = fs.readFileSync(variables, 'utf8');
  v = v.replace(/minSdkVersion = 2[0-3]\b/, 'minSdkVersion = 24')
       .replace(/compileSdkVersion = 3[0-5]\b/, 'compileSdkVersion = 36')
       .replace(/targetSdkVersion = 3[0-5]\b/, 'targetSdkVersion = 36');
  fs.writeFileSync(variables, v);
  console.log('✔ variables.gradle : minSdkVersion 24, compile/targetSdkVersion 36');
}

// --- Android : plugin Gradle compatible avec le SDK 36 (exigé par Google Play) ---
const rootGradle = 'android/build.gradle';
if (fs.existsSync(rootGradle)) {
  let g = fs.readFileSync(rootGradle, 'utf8');
  g = g.replace(/com\.android\.tools\.build:gradle:8\.[0-9]\.\d+/, 'com.android.tools.build:gradle:8.10.1');
  fs.writeFileSync(rootGradle, g);
  console.log('✔ build.gradle : Android Gradle Plugin 8.10.1');
}
const gradleProps = 'android/gradle.properties';
if (fs.existsSync(gradleProps)) {
  let gp = fs.readFileSync(gradleProps, 'utf8');
  if (!gp.includes('android.suppressUnsupportedCompileSdk')) gp += '\nandroid.suppressUnsupportedCompileSdk=36\n';
  fs.writeFileSync(gradleProps, gp);
}
