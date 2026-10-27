export async function onRequestPost(context) {
  const { request, env } = context;

  let payload = {};
  try {
    payload = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Le message est invalide.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const message = typeof payload.message === 'string' ? payload.message.trim() : '';

  if (!message) {
    return new Response(JSON.stringify({ error: 'Le message est vide.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const reply = await getReply(message, env);

  return new Response(JSON.stringify({ reply }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

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

  if (!text) return 'Je peux vous aider. Posez-moi une question.';

  if (/bonjour|salut|hello|bonsoir/.test(text)) {
    return 'Bonjour ! Je suis votre assistant. Comment puis-je vous aider aujourd\'hui ?';
  }

  if (/merci|thanks|thank you/.test(text)) {
    return 'Avec plaisir ! N\'hésitez pas à me poser d\'autres questions.';
  }

  if (/prix|tarif|coût|cout|combien/.test(text)) {
    return 'Le prix dépend du service demandé. Dites-moi votre besoin exact pour vous proposer une solution adaptée.';
  }

  if (/contact|email|telephone|téléphone|numéro|support/.test(text)) {
    return 'Vous pouvez nous contacter par e-mail ou via le formulaire de contact du site. Nous répondons rapidement.';
  }

  if (/heure|date|aujourd|maintenant/.test(text)) {
    return `Nous sommes le ${getCurrentDateText()}.`;
  }

  if (/site|website|page|design|ui|ux/.test(text)) {
    return 'Je peux vous aider à concevoir une landing page, un site web moderne ou un outil de discussion plus avancé.';
  }

  if (/problème|bug|erreur|incident/.test(text)) {
    return 'Décrivez précisément le bug, ce que vous avez cliqué et le comportement attendu. Je vous aiderai à diagnostiquer la cause.';
  }

  if (/partenaire|collaboration|business|vente/.test(text)) {
    return 'Très bonne idée. Donnez-moi le type de projet, le délai, le budget et le résultat attendu pour que je puisse vous orienter.';
  }

  if (/aide|besoin|help/.test(text)) {
    return 'Je peux vous guider pour la création de contenu, la conception de pages, la stratégie communicationnelle et la mise en place d\'un site de discussion.';
  }

  if (/qui|what are you|tu es/.test(text)) {
    return 'Je suis un assistant conversationnel conçu pour répondre, aider et orienter les utilisateurs sur un site web.';
  }

  return 'Je comprends votre demande. Pour vous répondre de façon plus pertinente, donnez-moi un peu plus de contexte sur votre besoin.';
}

async function getReply(message, env) {
  const apiKey = env.OPENAI_API_KEY;

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
