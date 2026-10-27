# BotWebsite

Ce dépôt contient un site de discussion avec un bot. Il est prêt à être déployé sur Cloudflare Pages.

## Fonctionnement

- Le frontend est statique dans `public/`
- L’API de chat est dans `functions/api/chat.js`
- Le site fonctionne avec une réponse locale par défaut
- Si une clé `OPENAI_API_KEY` est ajoutée dans Cloudflare, le bot utilise OpenAI pour des réponses plus avancées

## Déploiement sur Cloudflare Pages

1. Créez un compte Cloudflare
2. Allez dans `Workers & Pages > Create application > Pages`
3. Sélectionnez votre dépôt GitHub `SVGStudio/BotWebsite`
4. Choisissez le framework preset : `None`
5. Réglage du build :
   - Build command : `npm install`
   - Output directory : `public`
6. Déployez
7. Si vous souhaitez utiliser OpenAI, ajoutez la variable d’environnement :
   - `OPENAI_API_KEY`

## Développement local

```bash
npm install
npm run dev
```

Puis ouvrez le site localement fourni par Wrangler.

## Variables d’environnement

Si vous voulez une réponse plus intelligente :

```bash
export OPENAI_API_KEY="votre_cle"
```

Puis redéployez le projet sur Cloudflare.

## URL de production

La page finale sera générée par Cloudflare Pages avec une URL publique du type :

```text
https://<nom-du-projet>.pages.dev
```
