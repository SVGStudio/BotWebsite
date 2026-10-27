const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

function normalizeMessage(input) {
  return String(input || '').trim().toLowerCase();
}

function getCurrentDateText() {
  return new Date().toLocaleString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function buildLocalReply(message) {
  const text = normalizeMessage(message);

  if (!text) {
    return 'Je peux vous aider. Posez-moi une question !';
  }

  if (/bonjour|salut|hello|bonsoir/.test(text)) {
    return 'Bonjour ! Je suis votre assistant. Comment puis-je vous aider aujourd\'hui ?';
  }

  if (/merci|thanks|thank you/.test(text)) {
    return 'Avec plaisir ! N\'hésitez pas à me poser d\'autres questions.';
  }

  if (/prix|tarif|coût|cout|combien/.test(text)) {
    return 'Le prix dépend du service demandé. Si vous souhaitez une offre personnalisée, dites-moi le type de projet ou le besoin exact.';
  }

  if (/contact|email|telephone|téléphone|numéro|support/.test(text)) {
    return 'Vous pouvez me contacter par e-mail ou via le formulaire de contact du site. Je vous répondrai rapidement.';
  }

  if (/heure|date|aujourd|maintenant/.test(text)) {
    return `Nous sommes le ${getCurrentDateText()}.`;
  }

  if (/site|website|page|design|ui|ux/.test(text)) {
    return 'Je peux vous aider à concevoir une landing page, une interface moderne, ou un site de discussion plus complet avec des fonctionnalités avancées.';
  }

  if (/problème|bug|erreur|incident/.test(text)) {
    return 'D\'accord, décrivez précisément le problème, ce que vous avez cliqué, et quel comportement vous attendiez. Je vais vous guider vers la cause la plus probable.';
  }

  if (/partenaire|collaboration|business|vente/.test(text)) {
    return 'Très bonne idée. Pour une collaboration, précisez la nature du projet, le délai, le budget et le type de résultat attendu.';
  }

  if (/aide|besoin|help/.test(text)) {
    return 'Je peux vous accompagner pour la création de contenu, la conception de pages, la stratégie de communication et la mise en place d\'un site de discussion.';
  }

  if (/qui|what are you|tu es/.test(text)) {
    return 'Je suis un assistant conversationnel conçu pour aider, répondre, expliquer et guider les utilisateurs dans le cadre d\'un site web.';
  }

  return 'Je comprends votre demande. Pour vous répondre de manière plus pertinente, donnez-moi un peu plus de contexte : le sujet, votre objectif et le type de réponse attendue.';
}

async function getAiReply(message) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return buildLocalReply(message);
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'Tu es un assistant utile et professionnel. Réponds en français, de manière claire, précise et naturelle.'
          },
          {
            role: 'user',
            content: message
          }
        ],
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || buildLocalReply(message);
  } catch (error) {
    console.error('Erreur OpenAI:', error.message);
    return buildLocalReply(message);
  }
}

app.post('/api/chat', async (req, res) => {
  const { message } = req.body || {};

  if (!message || !String(message).trim()) {
    return res.status(400).json({ error: 'Le message est vide.' });
  }

  const reply = await getAiReply(message);
  res.json({ reply });
});

app.get('/api/health', (req, res) => {
  res.json({ ok: true, message: 'Le serveur fonctionne correctement.' });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
