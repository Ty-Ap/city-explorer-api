'use strict';




const express = require('express');
require('dotenv').config();
const cors = require('cors');
const getMovie = require('./modules/movies');
const getWeather = require('./modules/weather');

const app = express();

app.use(cors());



const PORT=process.env.SERVER_PORT||3002||3003


app.get('/movies', getMovie);
app.get('/weather', getWeather);

app.get('*',(request,response)=>{
  response.status(404).send('this page does not exist. stop trying to break stuff');
});

app.use((error,request,response,next)=>{
  response.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`WE ARE RUNNING ON ${PORT}`));