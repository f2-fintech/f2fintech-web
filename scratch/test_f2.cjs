const PayU = require('d:/projects/f2fintech-server/node_modules/payu-websdk');

const client = new PayU({
  key: 'xl21jd',
  salt: 'BCo90vcr0O2mgQMJFPwBiz8j6mBAGw4D',
}, 'PROD');

const txnid = 'TXN_' + Date.now();
const html = client.paymentInitiate({
  txnid,
  amount: '50.00',
  productinfo: 'CIBIL Report',
  firstname: 'Mohammad',
  email: 'support@f2fintech.com',
  phone: '9876543210',
  surl: 'https://f2fintech.com/download-cibil',
  furl: 'https://f2fintech.com/download-cibil',
});

const inputRegex = /name="([^"]+)"\s+value="([^"]*)"/g;
const params = new URLSearchParams();
let m;
while ((m = inputRegex.exec(html)) !== null) {
  params.append(m[1], m[2]);
}

console.log('Testing with matching website URL: https://f2fintech.com/download-cibil');
fetch('https://secure.payu.in/_payment', {
  method: 'POST',
  body: params,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Origin': 'https://f2fintech.com',
    'Referer': 'https://f2fintech.com/',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
  }
}).then(async r => {
  console.log('Status:', r.status);
  const t = await r.text();
  console.log('Body length:', t.length);
  console.log('Body snippet:', t.slice(0, 300));
}).catch(console.error);
