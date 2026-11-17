const fs = require('fs');
const path = require('path');

const dir = 'D:/SG MASTER/backend/src/main/resources/data/mongodb_export';
const collections = ['companies', 'users', 'products', 'design_projects', 'orders', 'sample_requests'];

for (const col of collections) {
    const file = path.join(dir, col + '.json');
    if (fs.existsSync(file)) {
        const raw = fs.readFileSync(file, 'utf8');
        const docs = EJSON.parse(raw);
        if (Array.isArray(docs) && docs.length > 0) {
            db.getCollection(col).deleteMany({});
            db.getCollection(col).insertMany(docs);
            print('Successfully loaded ' + docs.length + ' documents into ' + col);
        }
    }
}
