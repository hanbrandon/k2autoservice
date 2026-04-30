const fs = require('fs');
const path = require('path');

const dir = 'public/instagram';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.png'));

files.forEach((file, index) => {
    const oldPath = path.join(dir, file);
    const newPath = path.join(dir, `insta-${index + 1}.png`);
    fs.renameSync(oldPath, newPath);
    console.log(`Renamed ${file} to insta-${index + 1}.png`);
});
