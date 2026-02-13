export default async function handler(req, res) {

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { email, message } = req.body;

  const webhookURL = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookURL) {
    return res.status(500).json({ error: 'Configuração de servidor ausente.' });
  }

  const payload = {
    username: "DoBig Bot",
    avatar_url: "https://i.imgur.com/AfFp7pu.png",
    embeds: [{
      title: "📩 Nova Mensagem do Site!",
      color: 9109547,
      fields: [
        { name: "De:", value: email || "Anônimo", inline: true },
        { name: "Mensagem:", value: message }
      ],
      footer: { text: "Via DoBig Vercel Website" },
      timestamp: new Date().toISOString()
    }]
  };

  try {
    const discordRes = await fetch(webhookURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (discordRes.ok) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(500).json({ error: 'Erro ao conectar com Discord' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno' });
  }
}