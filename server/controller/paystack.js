const https = require('https');
require("dotenv").config();

class payStack {
  verifyPayment(req, res) {
    const { reference } = req.body;
    const options = {
      hostname: 'api.paystack.co',
      port: 443,
      path: '/transaction/verify/' + encodeURIComponent(reference),
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
      }
    };

    const request = https.request(options, response => {
      let data = '';
      response.on('data', (chunk) => { data += chunk; });
      response.on('end', () => {
        const parsed = JSON.parse(data);
        if (parsed.status && parsed.data.status === 'success') {
          return res.json({ success: true, transaction: { id: parsed.data.reference, amount: parsed.data.amount / 100 } });
        } else {
          return res.json({ error: "Payment verification failed" });
        }
      });
    }).on('error', error => {
      console.error(error);
      return res.json({ error: error.message });
    });
    request.end();
  }
}

const payStackController = new payStack();
module.exports = payStackController;
