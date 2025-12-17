// API/server.js
const express = require('express');
const path = require('path');

// Импорты
const peopleRouter = require('./internal/people/router');

const app = express();

app.use(express.json({ limit: '5mb' })); 
app.use(express.static(path.join(__dirname, '..', 'front'))); // ← отдаёт CSS, JS, assets


// POST /api/people — с base64
app.post('/api/people', (req, res) => {
  try {
    const { name, role, description, photoBase64 } = req.body;

    if (!name || !role || !photoBase64) {
      return res.status(400).json({ error: 'Все поля обязательны' });
    }

    if (!photoBase64.startsWith('data:image/')) {
      return res.status(400).json({ error: 'Фото должно быть в формате base64' });
    }

    const { PeopleService } = require('./internal/people/PeopleService');

    const person = {
      id: Date.now().toString(),
      name,
      role,
      description,
      photo: photoBase64 
    };

    const created = PeopleService.create(person);
    res.status(201).json(created);
  } catch (err) {
    console.error('Ошибка:', err);
    res.status(400).json({ error: err.message });
  }
});

app.use('/api/people', peopleRouter);

app.use((req, res, next) => {
    if (req.path.startsWith('/api')) {
   
        return res.status(404).json({ error: 'API endpoint not found' });
    }
    res.sendFile(path.join(__dirname, '..', 'front', 'index.html'));
});
module.exports = app;
