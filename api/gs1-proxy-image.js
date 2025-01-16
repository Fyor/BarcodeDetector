export default async function handler(req, res) {
    if (req.method === 'GET') {
      const { imageCode } = req.query; // Extract the imageCode from the query string
  
      if (!imageCode) {
        return res.status(400).json({ error: 'Missing imageCode parameter' });
      }
  
      const imageUrl = `https://productsearch.gs1.se/foodservice/asset/${imageCode}`;
  
      try {
        const imageResponse = await fetch(imageUrl);
  
        if (!imageResponse.ok) {
          return res.status(imageResponse.status).json({ error: `Failed to fetch image: ${imageResponse.status}` });
        }
  
        const imageBuffer = await imageResponse.arrayBuffer();
  
        res.setHeader('Content-Type', 'image/png');
        res.status(200).send(Buffer.from(imageBuffer));
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end('Method Not Allowed');
    }
  }
  