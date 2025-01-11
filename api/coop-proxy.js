export default async function handler(req, res) {
    if (req.method === 'POST') {
      const productCode = req.body.productCode;
      const url = 'https://external.api.coop.se/personalization/search/entities/by-id';
      const params = {
        'api-version': 'v1',
        'store': '251300',
      };
  
      const queryString = new URLSearchParams(params).toString();
      const fullUrl = `${url}?${queryString}`;
  
      try {
        const response = await fetch(fullUrl, {
          method: 'POST',
          headers: {
            'Ocp-Apim-Subscription-Key': '3becf0ce306f41a1ae94077c16798187',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify([productCode]),
        });
  
        if (!response.ok) {
          return res.status(response.status).json({ error: `COOP API Error: ${response.status}` });
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
  