const fs = require('fs');
const filePath = 'src/components/cibilScore/CreditReportPDF.jsx';
let content = fs.readFileSync(filePath, 'utf8');

// Fix garbled lightbulb emoji
content = content.replace(/ðŸ'¡/g, 'i');

// Also check for â€™ (smart quote) and replace with regular apostrophe
content = content.replace(/â€™/g, "'");
content = content.replace(/â€˜/g, "'");
content = content.replace(/â€œ/g, '"');
content = content.replace(/â€/g, '"');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed all garbled characters!');
