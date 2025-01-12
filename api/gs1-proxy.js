export default async function handler(req, res) {
    if (req.method === 'POST') {
        const productCode = req.body.productCode;
        const url = 'https://productsearch.gs1.se/foodservice/tradeItem/search';
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: productCode
                }),
            });

            if (!response.ok) {
                return res.status(response.status).json({ error: `GS1 API Error: ${response.status}` });
            }

            const data = await response.json();
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end('Method Not Allowed');
    }
}