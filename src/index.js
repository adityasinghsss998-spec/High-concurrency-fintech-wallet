
import express from 'express';
import dotenv from 'dotenv';
import { connect } from './config/database.js'
dotenv.config();
import bodyParser from 'body-parser'
const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));
import Apiroutes from './routes/index.js'

app.use('/api',Apiroutes);
const PORT = process.env.PORT || 3000;


app.listen(PORT,async ()=>{
  console.log('server started');
  await connect();
  console.log("mongodb server connected");

})

