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
    username: "The Dog Bot",
    avatar_url: "https://w0.peakpx.com/wallpaper/128/836/HD-wallpaper-meliodas-da-dragao-ira-nanatsu-no-pecado-taizai.jpg",
    embeds: [{
      title: "📩 Nova Mensagem do Site!",
      color: 9109547,
      fields: [
        { name: "De:", value: email || "Anônimo", inline: true },
        { name: "Mensagem:", value: message }
      ],
      footer: { text: "Via Samu Studio Website" },
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