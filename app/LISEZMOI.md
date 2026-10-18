# Blocaille – du prototype à l'App Store

Ce dossier contient tout le projet de l'application :

| Élément | Rôle |
|---|---|
| `www/index.html` | Le jeu complet, avec les vraies pubs AdMob branchées |
| `capacitor.config.json` | Nom et identifiant de l'app |
| `scripts/configure-native.mjs` | Ajoute les réglages AdMob dans les projets iPhone et Android |
| `resources/` | Icône et écran de démarrage (générés automatiquement en toutes tailles) |
| `codemagic.yaml` | Compilation iPhone dans le cloud, si vous n'avez pas de Mac |
| `store/` | Fiche du store et politique de confidentialité |

Les pubs sont réglées en **mode test** : vous verrez des pubs Google marquées « Test ». C'est normal, et c'est obligatoire pendant le développement (cliquer sur vos propres vraies pubs peut faire bloquer votre compte AdMob).

---

## Étape 1 – Créer les comptes (une seule fois)

1. **Apple Developer Program** : https://developer.apple.com/programs/ (environ 99 € par an, validation en 1 à 2 jours).
2. **AdMob** : https://admob.google.com. Créez deux applications (iOS et Android) et, pour chacune, deux blocs d'annonces : une **bannière** et une **annonce avec récompense**. Notez les identifiants.
3. **Google Play Console** (facultatif, pour Android) : https://play.google.com/console (25 $ une fois).
4. **Statut** : pour encaisser l'argent des pubs en France, créez une micro-entreprise (gratuit sur le guichet unique de l'INPI).

## Étape 2 – Personnaliser

1. Dans `capacitor.config.json`, remplacez `com.votrenom.blocaille` par un identifiant à vous, par exemple `com.prenom.blocaille`. Il ne pourra plus changer après publication.
2. Dans `store/politique-confidentialite.html`, remplacez tout ce qui est surligné en jaune, puis publiez la page en ligne (GitHub Pages, Google Sites ou votre site). Apple exige son adresse.

Ne remplacez pas encore les identifiants de pub : gardez le mode test jusqu'à l'étape 5.

## Étape 3 – Fabriquer l'appli

Il faut installer **Node.js** (https://nodejs.org) sur votre ordinateur, puis ouvrir un terminal dans ce dossier.

### Option A : vous avez un Mac
Installez **Xcode** depuis le Mac App Store, puis :

```bash
npm install
npm run assets
npm run add:ios
npx cap sync
npm run ios
```

Xcode s'ouvre. Dans **Signing & Capabilities**, choisissez votre équipe Apple. Branchez votre iPhone et cliquez sur ▶ pour tester le jeu directement sur le téléphone.

### Option B : pas de Mac
1. Mettez ce dossier sur GitHub (un dépôt privé suffit).
2. Créez un compte gratuit sur https://codemagic.io et connectez le dépôt.
3. Dans App Store Connect, créez une **clé API** (Utilisateurs et accès › Intégrations) et ajoutez-la dans Codemagic sous le nom `app_store_connect`.
4. Remplacez `com.votrenom.blocaille` dans `codemagic.yaml`, puis lancez le workflow « Blocaille iOS ». L'appli arrive dans **TestFlight**, que vous installez sur votre iPhone pour tester.

### Android (avec n'importe quel ordinateur)
Installez **Android Studio**, puis :

```bash
npm install
npm run assets
npm run add:android
npx cap sync
npm run android
```

## Étape 4 – Créer la fiche sur App Store Connect

Sur https://appstoreconnect.apple.com › Apps › « + » : utilisez le même identifiant que dans `capacitor.config.json`, puis remplissez la fiche avec le contenu de `store/fiche-app-store.md` (nom, description, mots-clés, confidentialité, classification d'âge, captures d'écran).

Ajoutez aussi le fichier **app-ads.txt** que fournit AdMob sur votre site : sans lui, vos revenus publicitaires peuvent être réduits.

## Étape 5 – Passer en mode réel, puis publier

Quand tout fonctionne en test :

1. Dans `www/index.html`, cherchez `ADS_CONFIG` : remplacez les 4 identifiants de blocs d'annonces par les vôtres et mettez `testing:false`.
2. Dans `scripts/configure-native.mjs`, remplacez les 2 identifiants d'application AdMob par les vôtres.
3. Relancez `node scripts/configure-native.mjs` puis `npx cap sync` (ou relancez le workflow Codemagic).
4. Dans App Store Connect, choisissez le build et cliquez sur **Soumettre pour vérification**. Apple répond en général en 1 à 3 jours.

## Points d'attention

- **Le nom** : vérifiez que « Blocaille » n'est pas déjà pris sur l'App Store avant de créer la fiche, sinon prenez une variante.
- **Ne jamais** citer « Tetris » dans la fiche, même dans les mots-clés.
- **Les polices** du jeu se chargent depuis Internet : sans réseau, le jeu marche mais avec une police plus simple.
- **Avant de publier**, faites tester le jeu par quelques personnes : Apple refuse les applis qui plantent ou dont un bouton ne fonctionne pas.

## Achats intégrés (pièces, pack de départ, sans pub)

Le jeu contient une boutique avec des pièces 🪙. Dans ce projet, les achats sont **simulés** : rien n'est débité. Pour les rendre réels :

1. Dans App Store Connect › votre app › **Achats intégrés**, créez ces produits avec exactement ces identifiants :

| Identifiant | Type | Prix |
|---|---|---|
| `coins_200` | Consommable | 0,99 € |
| `coins_600` | Consommable | 2,49 € |
| `coins_1500` | Consommable | 4,99 € |
| `coins_4000` | Consommable | 9,99 € |
| `starter_pack` | Non consommable | 1,99 € |
| `no_ads` | Non consommable | 3,99 € |

2. Ajoutez un module d'achat à Capacitor, par exemple RevenueCat (`@revenuecat/purchases-capacitor`, gratuit jusqu'à un certain chiffre d'affaires) ou `cordova-plugin-purchase`.
3. Le jeu appelle deux fonctions si elles existent : `window.buyProduct(id)` (doit renvoyer une promesse `true` si l'achat est validé) et `window.restorePurchases()`. Il suffit de les définir avec le module choisi ; je peux écrire ce branchement quand vous aurez choisi.
4. Le bouton « Restaurer mes achats » est obligatoire chez Apple pour les achats non consommables : il est déjà dans la boutique.

Apple prélève 15 % (programme pour les petits développeurs, sous 1 million de dollars par an) ou 30 % sur chaque achat.
