// pages/api/create-checkout-session.js
export default async function handler(req, res) {
    const { priceId } = req.body;

const response = await fetch('http://localhost:4848/create-checkout-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ priceId }),
});

const data = await response.json();
res.status(response.status).json(data);
}
