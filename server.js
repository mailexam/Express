require('dotenv').config();

const express = require('express');
const { sendTest } = require('./mail');

const app = express();
app.use(express.json());

app.post('/mail/test', async (req, res, next) => {
  try {
    const { to, subject, text } = req.body ?? {};

    await sendTest({ to, subject, text });

    res.json({ status: 'ok' });
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

const host = process.env.HTTP_HOST || '127.0.0.1';
const port = Number(process.env.HTTP_PORT || 3000);

app.listen(port, host, () => {
  console.log(`Server running on http://${host}:${port}`);
});
