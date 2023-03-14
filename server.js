import express from 'express';

const app = express();
const PORT = 2000;

app.listen(PORT, () => {
  console.log(`server is working on ${PORT}`);  
});    
 