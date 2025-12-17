// API/modules/DBConnector.js
const fs = require('fs');
const path = require('path');

class DBConnector {
    constructor(filename) {
        // Путь из корня проекта
        this.filePath = path.join(__dirname, '..', '..', filename);
        console.log('🗄️  DBConnector путь:', this.filePath); // ← для логов
    }

    readFile() {
        try {
            if (!fs.existsSync(this.filePath)) {
                console.log('⚠️  Файл не найден, создаём пустой');
                fs.writeFileSync(this.filePath, '[]', 'utf8');
            }
            return fs.readFileSync(this.filePath, 'utf8');
        } catch (err) {
            console.error('❌ Ошибка чтения файла:', err);
            throw err;
        }
    }

    writeFile(data) {
        try {
            fs.writeFileSync(this.filePath, data, 'utf8');
            console.log('✅ Файл успешно сохранён');
        } catch (err) {
            console.error('❌ Ошибка записи файла:', err);
            throw err;
        }
    }
}

module.exports = { DBConnector };
