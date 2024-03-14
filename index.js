import express from 'express';
import { create } from 'ipfs-http-client';


const app = express();
const port = 3000;
// const ipfs = create({ host: '127.0.0.1', port: 5001, protocol: 'http' }); // Connect to an IPFS node. Change accordingly if you host your own.
const ipfs = create(); // Connect to an IPFS node. Change accordingly if you host your own.


app.get('/', async (req, res) => {
  try {
    const cid = 'QmUouqnVePgbCqpuzjYYHUbPnMVL4gwr5LK34zrzddQSGF'; // Replace YOUR_CID_HERE with your actual CID
    const decoder = new TextDecoder()
    let text = ''
  
    for await (const chunk of ipfs.cat(cid)) {
      text += decoder.decode(chunk, {
        stream: true
      })
    }

    res.send(text);
  } catch (error) {
    res.status(500).send('Error fetching content from IPFS: ' + error.message);
  }
});

app.get("/teste", (req, res) => {
  res.send("this is a new test");
})

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});