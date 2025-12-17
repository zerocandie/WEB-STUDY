// API/internal/people/PeopleRepository.js
const fs = require('fs');
const path = require('path');

// Путь к people.json в КОРНЕ проекта
const DB_PATH = path.join(__dirname, '..', '..', '..', 'people.json');

function ensureFileExists() {
    if (!fs.existsSync(DB_PATH)) {
        fs.writeFileSync(DB_PATH, '[]', 'utf8');
    }
}

function read() {
    try {
        ensureFileExists();
        const data = fs.readFileSync(DB_PATH, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('❌ Ошибка чтения people.json:', err.message);
        return [];
    }
}

function write(data) {
    try {
        fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
    } catch (err) {
        console.error('❌ Ошибка записи people.json:', err.message);
        throw err;
    }
}

module.exports = { read, write };
