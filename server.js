import express from 'express';

const app = express();
const PORT = 2000;


app.use(express.json())
app.use(logger)
app.use(router)
app.use(fallback)
app.use(errorhandler)

const startServer = async () => { app.listen(PORT, () => {
  console.log(`server is working on ${PORT}`);  
});    
}
startServer();
 