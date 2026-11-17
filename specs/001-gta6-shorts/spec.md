	# Feature Specification: GGClips — clips gaming autorisés

**Feature Branch**: `001-gta6-shorts`

**Created**: 2026-11-17

**Status**: Draft — à examiner avant planification

**Input**: Cadrage utilisateur GGClips, plateforme de clips courts issus des streams GTA 6 de streamers partenaires.

## User Scenarios & Testing

### User Story 1 — Découvrir et regarder des clips (Priority: P1)

Un visiteur adulte ouvre GGClips sur téléphone, comprend le thème du site, parcourt un flux de clips autorisés et en lit un avec des sous-titres lisibles. Il peut ouvrir la page du streamer et partager un lien.

**Why this priority**: La découverte et la lecture sont la proposition de valeur centrale et doivent être testées avant les fonctions communautaires ou la monétisation.

**Independent Test**: Avec un catalogue pilote de clips approuvés, un testeur adulte peut ouvrir le site, franchir l’avertissement d’âge, trouver un clip et le regarder sur téléphone sans aide.

**Acceptance Scenarios**:

1. **Given** un visiteur qui n’a pas encore vu l’avertissement, **When** il ouvre la page d’un clip, **Then** l’avertissement est présenté avant l’accès au contenu.
2. **Given** un clip publié avec sous-titres, **When** le visiteur lance la lecture, **Then** il peut lire, mettre en pause, régler le son et afficher les sous-titres.
3. **Given** le profil d’un streamer partenaire, **When** le visiteur l’ouvre, **Then** il voit sa présentation approuvée et les clips publics associés.

---

### User Story 2 — Trouver un clip par sujet ou streamer (Priority: P2)

Un visiteur recherche un streamer, un titre ou un sujet et filtre le catalogue pour retrouver plus vite un moment qui l’intéresse.

**Why this priority**: La recherche rend le catalogue utile au-delà de la sélection mise en avant sur l’accueil.

**Independent Test**: Avec plusieurs clips répartis entre streamers et sujets, un testeur peut retrouver le clip attendu par nom de streamer ou sujet.

**Acceptance Scenarios**:

1. **Given** des clips indexés par streamer et sujet, **When** le visiteur saisit une recherche, **Then** seuls les résultats correspondants sont affichés.
2. **Given** une catégorie de sujets, **When** le visiteur la sélectionne, **Then** le catalogue est filtré sur cette catégorie.
3. **Given** aucun résultat, **When** la recherche se termine, **Then** le site explique qu’aucun résultat n’a été trouvé et permet de modifier la recherche.

---

### User Story 3 — Faire examiner un clip et le retirer si nécessaire (Priority: P1)

Un spectateur, un streamer ou un titulaire de droits signale un clip. L’opérateur peut suspendre sa diffusion, examiner la demande, enregistrer sa décision et informer le demandeur.

**Why this priority**: Le contenu est dérivé de streams et peut inclure des droits, des personnes, de la violence ou du langage adulte ; le retrait doit exister dès le lancement.

**Independent Test**: Un testeur peut signaler un clip ; un administrateur peut ensuite le masquer, enregistrer un motif et vérifier qu’il n’apparaît plus dans les pages publiques.

**Acceptance Scenarios**:

1. **Given** un clip public, **When** un visiteur soumet un signalement avec motif, **Then** le système confirme sa réception et le rend visible dans la file d’examen.
2. **Given** un signalement crédible concernant les droits ou la vie privée, **When** l’administrateur suspend le clip, **Then** il n’est plus accessible publiquement, y compris depuis les résultats et les liens de lecture.
3. **Given** une décision prise, **When** l’administrateur clôt le signalement, **Then** le motif, la date et l’action sont consignés et le demandeur peut recevoir une réponse.

---

### User Story 4 — Soumettre, vérifier et publier un clip partenaire (Priority: P1)

L’opérateur reçoit une source d’un partenaire, vérifie les autorisations, prépare un extrait avec l’aide de l’IA et le fait valider par une personne avant publication.

**Why this priority**: Sans un flux de production qui relie chaque clip à une autorisation et à une revue humaine, le catalogue ne peut pas être exploité de manière contrôlée.

**Independent Test**: Une source autorisée peut être transformée en brouillon, contrôlée, approuvée puis publiée ; une source sans preuve suffisante reste bloquée.

**Acceptance Scenarios**:

1. **Given** une source sans autorisation documentée, **When** elle est soumise à traitement, **Then** elle ne peut pas atteindre l’état publié.
2. **Given** une source dont l’usage est autorisé, **When** l’IA propose un passage et un sous-titrage, **Then** ces éléments restent un brouillon en attente de contrôle humain.
3. **Given** un brouillon dont les droits, le contexte, le cadrage et les sous-titres ont été vérifiés, **When** l’administrateur l’approuve, **Then** le clip peut être publié avec son streamer, son sujet, sa langue et les avertissements nécessaires.

---

### User Story 5 — Créer un compte et accéder aux fonctions réservées (Priority: P2)

Un utilisateur adulte crée un compte si certaines fonctions ou certains clips le requièrent. Il sait quelles données sont collectées et peut demander la fermeture du compte et l’exercice de ses droits.

**Why this priority**: Les comptes et contenus réservés sont une possibilité demandée, mais le mode d’accès et le modèle économique restent à décider.

**Independent Test**: Le parcours d’inscription explique les données demandées ; un utilisateur peut s’authentifier, accéder à la fonction retenue et trouver un moyen de demander la suppression de son compte.

**Acceptance Scenarios**:

1. **Given** une fonction réservée, **When** un visiteur non connecté la sélectionne, **Then** le site explique la restriction et l’action permettant d’y accéder.
2. **Given** un utilisateur inscrit, **When** il demande la fermeture du compte, **Then** sa demande est enregistrée et les données sont traitées selon la politique publiée et les obligations applicables.
3. **Given** un utilisateur qui refuse les traceurs non essentiels, **When** il poursuit sa navigation, **Then** les traceurs nécessitant un consentement ne sont pas déposés ou lus avant consentement.

### Edge Cases

- Une source ou une autorisation devient indisponible, est révoquée ou ne couvre pas la transformation, la promotion ou l’usage commercial.
- Une vidéo contient une musique tierce, une personne identifiable, un contenu de jeu sensible, un spoiler majeur ou des informations personnelles visibles.
- La VOD Twitch expire ou le créateur supprime sa vidéo avant la fin du traitement.
- La plateforme refuse un accès API, une intégration ou une publication automatisée.
- Le traitement échoue, produit un fichier corrompu, de mauvais sous-titres, un mauvais cadrage ou un passage hors contexte.
- Deux clips se recouvrent ou sont identiques ; le pipeline doit empêcher leur publication comme deux moments distincts sans décision éditoriale.
- Une demande de retrait arrive après qu’un clip a été partagé sur un réseau tiers ; GGClips doit retirer ses propres copies et documenter les demandes externes nécessaires.
- Une personne mineure tente d’accéder au site ; l’avertissement d’âge et les règles de modération sont visibles, sans prétendre qu’un simple clic constitue une vérification d’identité fiable.
- Le lecteur tiers demande des cookies ou échoue ; l’utilisateur doit pouvoir continuer à naviguer sans déclencher le lecteur.
- Un pic de fréquentation ralentit la lecture ou le catalogue ; les pages restent consultables et une affiche de remplacement est proposée si la vidéo ne démarre pas.

## Requirements

### Functional Requirements

- **FR-001**: Le site MUST présenter un avertissement d’âge avant les contenus liés au jeu et indiquer que le projet vise une audience adulte.
- **FR-002**: Le site MUST afficher un flux mobile de clips publiés, avec lecteur vertical, contrôle du son, pause et sous-titres.
- **FR-003**: Le site MUST permettre de rechercher les clips par streamer, titre et sujet et de parcourir des catégories.
- **FR-004**: Le site MUST fournir une page publique par streamer partenaire, avec texte validé et clips associés.
- **FR-005**: Le site MUST relier chaque clip publié à son créateur/source, à une preuve d’autorisation consultable par l’administration et à un statut de revue.
- **FR-006**: Le site MUST empêcher toute publication d’une source non autorisée ou d’un brouillon non approuvé par une personne.
- **FR-007**: Les propositions de sélection, découpage, sous-titrage ou habillage générées par l’IA MUST rester soumises à contrôle humain avant diffusion.
- **FR-008**: Le processus de revue MUST permettre de vérifier la pertinence, le contexte, l’exactitude des sous-titres, le cadrage, la violence, le langage, les musiques et les droits associés.
- **FR-009**: Le site MUST proposer un moyen visible de signaler un clip et une interface permettant à l’administrateur de suspendre, examiner et retirer un contenu.
- **FR-010**: La suspension d’un clip MUST le retirer des flux, de la recherche et de la lecture publique contrôlés par GGClips.
- **FR-011**: Le site MUST présenter les avertissements éditoriaux nécessaires pour la violence, le langage adulte, les spoilers et autres catégories sensibles définies par la modération.
- **FR-012**: Le produit MUST prévoir une option d’inscription et de fonctions réservées, mais le contenu et les règles d’accès correspondants restent à valider avant le périmètre final du lancement.
- **FR-013**: Le site MUST expliquer les données personnelles collectées, leurs finalités, la durée de conservation prévue, les destinataires et les moyens d’exercer les droits applicables.
- **FR-014**: Le produit MUST permettre de demander la fermeture d’un compte et le traitement des données associées, en tenant compte des obligations légales de conservation.
- **FR-015**: Les traceurs soumis au consentement MUST rester inactifs avant le choix de l’utilisateur ; le refus ne doit pas empêcher la navigation générale sur le site.
- **FR-016**: Le produit MUST permettre de préparer des brouillons de promotion pour les réseaux sociaux ; l’envoi automatisé reste hors MVP tant que l’éligibilité, les permissions et les droits n’ont pas été confirmés pour chaque plateforme.
- **FR-017**: Le site MUST afficher GGClips comme nom du projet ; GTA 6 est un thème/catégorie et ne doit pas être intégré au nom du dépôt ou du domaine.
- **FR-018**: Le projet MUST prévoir une expérience française initiale et une décision explicite sur l’ajout de l’anglais, ses sous-titres, son référencement et sa modération.
- **FR-019**: Le projet MUST conserver une procédure pour traiter les demandes d’autorisation, de participation et de retrait des streamers.
- **FR-020**: Le projet MUST éviter les logos, images et éléments de marque Rockstar/GTA tant que leur usage prévu n’a pas été vérifié et autorisé.

### Key Entities

- **Streamer partenaire**: créateur associé au site, identité publique, liens, présentation approuvée, statut de partenariat et coordonnées de contact nécessaires.
- **Autorisation**: preuve documentée des usages accordés, source concernée, territoires/durée, transformations, canaux, restrictions et date d’expiration ou de révocation.
- **Source vidéo**: fichier ou référence fournie par un partenaire ou accessible selon un accès approuvé, origine, période de conservation et droits établis.
- **Clip**: extrait vidéo, titre, description, source, horodatages, streamer, sujets, langue, sous-titres, avertissements, état éditorial et références des fichiers diffusés.
- **Brouillon de clip**: proposition issue du repérage et du montage, score/raison du choix, segments proposés et état de contrôle.
- **Signalement**: clip concerné, motif, date, coordonnées facultatives, décision, action effectuée et réponse.
- **Utilisateur**: compte facultatif, préférences, permissions d’accès et demandes relatives aux données.
- **Publication sociale**: brouillon, réseau visé, statut de vérification des règles, approbation humaine et résultat de publication, si une intégration est ajoutée ultérieurement.

## Success Criteria

### Measurable Outcomes

Les valeurs suivantes sont des seuils de test à valider, pas des faits acquis.

- **SC-001**: Le catalogue pilote atteint 30 à 50 clips approuvés avant l’ouverture publique élargie.
- **SC-002**: Le test du premier mois réunit 200 à 500 visiteurs uniques ; le seuil définitif est validé selon les canaux de lancement disponibles.
- **SC-003**: Au moins 25 % des visiteurs reviennent dans les 7 jours pendant le pilote.
- **SC-004**: Au moins 70 % des testeurs adultes réussissent à trouver et lire un clip sans aide.
- **SC-005**: Sur un appareil mobile et un réseau représentatifs définis pour le test, 90 % des lectures commencent en moins de 2,5 secondes.
- **SC-006**: 100 % des clips publiés ont une autorisation enregistrée et une approbation humaine traçable.
- **SC-007**: Toute suspension administrative rend le clip inaccessible dans les surfaces publiques contrôlées par GGClips et peut être vérifiée par un test fonctionnel.
- **SC-008**: Les sous-titres de chaque clip publié sont contrôlés par une personne ; les défauts bloquants de transcription, de langue ou de synchronisation sont corrigés avant publication.

## Assumptions

- Le lancement démarre avec 3 à 5 streamers partenaires ayant donné un accord écrit couvrant explicitement les usages réalisés.
- Aucun contenu n’est collecté sur l’ensemble de Twitch ou Kick ; la source est fournie par le partenaire ou accessible par un moyen explicitement autorisé.
- L’accord du streamer ne vaut pas automatiquement autorisation pour la musique, le jeu, les images, les personnes ou autres droits de tiers.
- GTA 6 sort le 19 novembre 2026 sur PS5 et Xbox Series X|S selon l’information officielle consultée le 17 novembre 2026 ; aucune date PC officielle n’a été annoncée dans la source citée.
- Le MVP ne sera pas supposé prêt pour la sortie du jeu. Une estimation indicative est de 8 à 12 semaines de travail soutenu, potentiellement plusieurs mois à temps partiel, après validation du périmètre et des droits.
- La recommandation de langue est le français d’abord ; le choix final reste à valider. Une version bilingue exige des sous-titres, pages SEO et capacités de modération dans les deux langues.
- Le mode des contenus réservés et le modèle économique restent à décider. Aucune offre payante n’est supposée.
- Les contenus sont destinés aux adultes : avertissement d’âge, langage/violence modérés, aucune cible mineurs. Un simple avertissement n’est pas une vérification robuste d’âge.
- Le site commence sans publication automatique sur les réseaux. Des brouillons peuvent être préparés pour validation et publication manuelle.
- Les objectifs quantitatifs sont des seuils initiaux à confirmer avant le pilote.
- Les sources de documentation et politiques de plateformes évoluent ; les conditions et accès devront être revérifiés juste avant toute mise en production ou intégration.

## Droits et plateformes — état de la recherche au 17 novembre 2026

Cette section résume la documentation officielle consultée pour orienter le cadrage. Elle ne constitue pas une autorisation de réutilisation ni une analyse juridique. « Confirmé » signifie que la documentation consultée décrit la fonction ou la règle citée ; cela ne confirme pas l’éligibilité de GGClips ni les droits sur un clip donné.

| Source | Confirmé dans la documentation consultée | À obtenir ou à vérifier pour GGClips |
|---|---|---|
| Rockstar / Take-Two | La politique publiée décrit des usages occasionnels et non commerciaux par des fans, réserve le droit de retrait et indique que la politique ne couvre pas l’exploitation commerciale ou promotionnelle de l’IP. | Demander une clarification/licence adaptée à un site dédié et à toute promotion. L’autorisation du streamer ne couvre pas automatiquement les droits du jeu, de la musique ou d’autres tiers. [Politique Rockstar](https://support.rockstargames.com/articles/7bNaeoMFTV0iUDGhStTXvz/policy-on-posting-copyrighted-rockstar-games-material) |
| Twitch | L’API permet de créer des clips avec le scope utilisateur `clips:edit`, de lire des métadonnées et de les intégrer. Les VOD expirent et leur disponibilité dépend des règles de conservation et de l’action du diffuseur. [API Clips](https://dev.twitch.tv/docs/api/clips/), [API Videos](https://dev.twitch.tv/docs/api/videos), [VOD](https://help.twitch.tv/s/article/video-on-demand?ios-app-redirect=true&language=en_US) | API et téléchargement individuel ne donnent pas en eux-mêmes de licence pour transformer et republier une VOD ailleurs. Obtenir l’autorisation de réutilisation, la méthode d’accès appropriée et les droits associés. |
| Kick | L’aide décrit le téléchargement de VOD par l’utilisateur. Les conditions interdisent notamment scraping et accès par des moyens non autorisés ; les conditions développeur encadrent le stockage/la copie de contenu Kick. [Aide VOD](https://help.kick.com/en/articles/7832538-how-to-download-your-kick-vod), [Conditions](https://kick.com/terms-of-service), [Conditions développeur](https://dev.kick.com/terms-of-service) | Ne pas automatiser la récupération. Vérifier l’accès approuvé et obtenir les autorisations écrites de Kick et du créateur selon le cas. |
| Reddit | Conditions d’utilisation et politiques de développeur s’appliquent aux accès, usages automatisés et publications. [User Agreement](https://redditinc.com/policies/user-agreement) | Brouillon et publication manuelle au MVP ; vérifier API, règles communautaires et autorisations avant automatisation. |
| X | La plateforme de développeurs documente la création de posts et affiche une tarification à l’usage. [Developer Platform](https://developer.x.com/) | Vérifier l’accès, les coûts, les règles d’automatisation/anti-spam et le consentement du compte avant intégration. |
| Instagram | Meta documente l’API Instagram et les permissions de publication associées aux comptes professionnels. [Instagram Platform](https://developers.facebook.com/docs/instagram-platform/) | Confirmer le type de compte, permissions, revue d’application et admissibilité du flux pour GGClips. Publication manuelle au départ. |
| TikTok | L’API de publication propose un envoi direct et un envoi en brouillon ; les clients non audités sont limités au privé. Les directives indiquent qu’un outil de copie arbitraire de contenu d’autres plateformes n’est pas un usage acceptable. [Direct Post](https://developers.tiktok.com/docs/en/content-posting-api-reference-direct-post), [Content Sharing Guidelines](https://developers.tiktok.com/docs/en/content-sharing-guidelines) | Utiliser d’abord un export/brouillon pour le partenaire. Vérifier l’éligibilité de l’usage, les permissions, l’audit et les droits avant intégration. |

**État des décisions** : le droit de consulter ou créer un clip sur une plateforme, une permission OAuth et une autorisation du streamer sont des éléments distincts. Ils ne démontrent pas seuls le droit de télécharger, modifier, héberger ou republier les contenus. En cas d’incertitude, le contenu reste non traité et non publié jusqu’à clarification. Toute promotion sociale reste un brouillon humainement validé dans le MVP.

## Recommandations produit et exploitation pour la phase de planification

Ces recommandations sont des options d’architecture à évaluer lors de `$speckit-plan`, pas des exigences techniques figées.

### Expérience et design

- Créer une identité gaming originale, sombre et lisible avec accents néon modérés, sans supposer que logos, images, musique, personnages ou éléments Rockstar sont utilisables.
- Prioriser le lecteur vertical, les sous-titres lisibles, les commandes tactiles, le chargement progressif et la navigation sur petit écran.
- N’activer aucun lecteur tiers susceptible de déposer des traceurs avant le consentement requis ; laisser la navigation générale accessible si la vidéo externe est refusée.
- Prévoir l’affiche de remplacement si le flux échoue, une lecture sans son automatique et le chargement différé des clips hors écran.
- Pour les pics, privilégier CDN vidéo, mise en cache des pages et métadonnées, limitation des tâches lourdes et dégradation contrôlée.

### Pipeline de clips

```text
Partenaire et autorisations vérifiés
  → Source fournie / accès explicitement autorisé
  → Transcription et détection IA assistées
  → Segment suggéré avec raisons et horodatages
  → Découpage, recadrage vertical, sous-titres, habillage
  → Contrôle qualité, contexte et droits
  → Validation humaine (et streamer si convenu)
  → Publication sur GGClips
  → Suivi, signalement, retrait et demandes de droits
```

Les erreurs doivent pouvoir être reprises sans double publication. Les propositions de faible qualité restent en revue ; les doublons sont détectés par contenu et métadonnées ; une demande de retrait suspend rapidement la diffusion le temps d’examen.

### Comparaison des modèles IA à valider par un petit pilote

| Famille | Capacités documentées pertinentes | Limite et recommandation |
|---|---|---|
| Gemini API | Analyse vidéo/audio, références temporelles et modes de traitement vidéo sont documentés. [Video understanding](https://ai.google.dev/gemini-api/docs/video-understanding) | Candidat prioritaire pour un essai de repérage. Les offres gratuites et tarifs varient selon le modèle ; Google indique que les données du niveau gratuit peuvent être utilisées pour améliorer ses produits. Ne pas y envoyer de VOD partenaires sans accord et examen contractuel. [Tarification](https://ai.google.dev/gemini-api/docs/pricing) |
| GPT / API OpenAI | Entrées images et audio documentées ; les séquences vidéo peuvent être préparées en images et combinées à une transcription. [API Realtime](https://developers.openai.com/api/reference/realtime-beta/overview) | Pipeline de préparation plus manuel pour la vidéo longue. Vérifier disponibilité, prix et conditions du modèle choisi ; ne pas présumer de quota API gratuit. [Tarifs API](https://platform.openai.com/pricing/) |
| Claude API | Les docs Anthropic décrivent l’analyse vidéo par extraction d’images ; texte/transcription peut être fourni séparément. [Guide vision](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/prompt-templates-and-variables) | Intéressant pour évaluer des images et résumés présélectionnés, moins intégré pour audio/vidéo long. Vérifier accès et coût au moment du pilote. |

Comparer la précision des moments proposés, faux positifs, qualité française, exactitude des horodatages, erreurs de contexte et coût par heure autorisée. Les modèles ne vérifient pas les droits et leurs horodatages doivent être vérifiés sur la timeline.

### Architecture indicative

- Application web unique avec un frontend et backend gérés pour limiter l’exploitation en solo.
- Authentification gérée uniquement pour les fonctions de compte retenues ; rôles visiteur, membre et administrateur.
- Base relationnelle gérée pour clips, streamers, sujets, langues, droits, statuts, comptes et signalements.
- Fournisseur vidéo managé pour stockage, transcodage multi-résolution et diffusion CDN, après estimation du coût selon la durée source, les rendus, vues et rétention.
- Traitement asynchrone limité aux tâches de transcription, proposition IA et rendu ; petit écran d’administration pour approbation humaine.
- Ne pas ajouter microservices ou orchestration complexe avant qu’un trafic démontré ne le justifie.

Les postes à estimer sont stockage des sources et rendus, bande passante et lecture, transcodage, minutes envoyées aux modèles, modération, comptes/e-mails, base de données et accès API sociaux. Aucun montant ne peut être fiable sans hypothèses de volumes, durée de conservation, taux de lecture et résolutions. En cas de croissance, faire évoluer d’abord CDN/cache, puis isoler les tâches vidéo des requêtes du site et augmenter la capacité de données.

### Langue et référencement

Recommandation de travail : français en premier, puis anglais après validation de l’audience et capacité de modération. Chaque clip doit indiquer la langue parlée et celle de ses sous-titres. Les pages SEO ne doivent être créées que dans une langue réellement éditée ; les sous-titres automatiques doivent être révisés avant indexation ou présentation comme exacts.

### Options d’accès et modèle économique

- **Catalogue public après avertissement** : parcours et référencement simples ; recommandé pour tester l’intérêt initial.
- **Fonctions/quelques clips derrière compte gratuit** : utile si la valeur du compte est démontrée, au prix de collecte de données et de gestion des droits utilisateurs.
- **Accès payant** : décision ultérieure seulement après validation des droits commerciaux, coûts de diffusion, attentes partenaires et obligations de vente.
- **Monétisation par publicité/sponsor** : ne pas supposer qu’elle est compatible avec les droits de jeu et de musique ; examen préalable requis.

## RGPD, cookies et modération adulte

- Collecter le minimum de données ; documenter finalités, base légale, destinataires, durée, transferts et droits des utilisateurs.
- Prévoir accès, rectification, opposition, limitation et demande d’effacement, ainsi que fermeture de compte ; certaines données peuvent devoir être conservées selon une obligation ou exception applicable. [CNIL — droit à l’effacement](https://www.cnil.fr/fr/comprendre-mes-droits/le-droit-leffacement-supprimer-vos-donnees-en-ligne), [RGPD — article 17](https://www.cnil.fr/fr/reglement-europeen-protection-donnees/chapitre3)
- Obtenir le consentement préalable pour les traceurs qui le requièrent, conserver le choix de refus, permettre le retrait et distinguer traceurs nécessaires et non nécessaires. Les intégrations vidéo/sociales peuvent déposer des traceurs. [CNIL — règles cookies](https://www.cnil.fr/fr/cookies-et-autres-traceurs/que-dit-la-loi), [FAQ CNIL](https://www.cnil.fr/fr/cookies-et-autres-traceurs/regles/cookies/FAQ)
- Afficher les avertissements d’âge et de contenu avant lecture, appliquer des règles d’édition adaptées à la violence et au langage, et ne pas cibler les mineurs. Un écran d’âge seul ne prouve pas l’âge réel.
- Prévoir catégories d’avertissement, revue humaine, signalements, retrait rapide, demande de réexamen et historique minimum des décisions.

## Feuille de route proposée

1. **Cadrage et décisions** : valider langue, accès, volume pilote, critères de succès, source des vidéos, droits et traitement des demandes.
2. **Dossier partenaires et droits** : obtenir les accords écrits précisant transformations, site, durée, territoires, attribution, promotions et retraits ; vérifier séparément musique, jeu et droits tiers.
3. **Prototype d’expérience** : tester accueil, lecteur, profil, recherche, signalement et avertissements sur téléphone.
4. **Architecture et estimation** : choisir hébergement vidéo et services à partir d’un scénario d’usage ; mesurer coût et charge opérationnelle.
5. **Pilote de pipeline** : travailler sur quelques vidéos autorisées, comparer modèles, mesurer qualité/coût, fixer le contrôle humain.
6. **Bêta fermée** : publier un petit catalogue à un groupe d’adultes/testeurs, traiter retours et signalements.
7. **Lancement limité** : ouvrir plus largement seulement après validation des droits, performance mobile, modération et critères de succès.
8. **Évolutions** : anglais, fonctionnalités sociales, intégrations de publication et monétisation dans des spécifications séparées.

L’estimation indicative est de 8 à 12 semaines de travail soutenu pour un MVP limité, et plusieurs mois à temps partiel pour un étudiant seul. Ce n’est pas une promesse de date ; l’attente d’autorisations, la disponibilité des partenaires et la complexité des vidéos peuvent prolonger le calendrier. Le jeu sort le 19 novembre 2026, soit deux jours après la date de cette spécification ; GGClips ne doit pas être présenté comme prêt pour cette sortie.

## Décisions à valider avant le plan détaillé

1. **Langue de lancement** : recommandation français d’abord ; confirmer ou choisir bilingue.
2. **Accès** : recommander un catalogue public après avertissement pour le pilote ; confirmer les clips ou fonctions nécessitant un compte.
3. **Source et méthode** : confirmer si chaque streamer transmet ses fichiers, si un accès API officiellement autorisé est disponible ou si le clip est préparé par le streamer.
4. **Droits commerciaux** : confirmer la voie de clarification/licence Rockstar/Take-Two et les droits distincts de musique et autres éléments tiers.
5. **Seuils du pilote** : confirmer les objectifs d’audience, de rétention, de catalogue et de fluidité à mesurer.
6. **Modèle économique** : laisser hors MVP jusqu’à validation des droits et de l’intérêt utilisateur.

**Prochaine étape recommandée** : relire et valider ces décisions, puis passer à `$speckit-plan`. Les intégrations et coûts techniques seront spécifiés dans le plan après ce choix.
