export default async function handler(req, res) {
    if (req.method === 'GET') {
      const { productCode } = req.query; // Extract the productCode from the query string
  
      if (!productCode) {
        return res.status(400).json({ error: 'Missing productCode parameter' });
      }
  
      const url = `https://productsearch.gs1.se/foodservice/tradeItem/${productCode}`;
  
      try {
        const response = await fetch(url);
  
        if (!response.ok) {
          return res.status(response.status).json({ error: `GS1 API Error: ${response.status}` });
        }
  
        const data = await response.json();
        return res.status(200).json(data);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end('Method Not Allowed');
    }
  }
  