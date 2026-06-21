const fs = require('fs');
const file = 'src/app/modules/institute-website/components/edit-page-dialog/edit-page-dialog.html';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/class=\"w-100 mb-3\"/g, 'class=\"full-width\" style=\"margin-bottom: 1rem;\"');
fs.writeFileSync(file, content, 'utf8');
console.log('Replaced all w-100 mb-3 instances.');
