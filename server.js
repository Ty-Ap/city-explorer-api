'use strict';

console.log('i eat children');

const { config } = require('dotenv');
//REQUIRES//

const express = require('express');
require('dotenv').config();
const cors = require('cors');

//ONCE EXPRESS IS IN; USE IT. 
// app =server

const app = express();


// MIDDLEWARE GOES HERE, AFTER APP

app.use(cors());



// DEFINE PORT FOR SERVER

const PORT=process.env.PORT || 3002;



//ENDPOINTS AND PROOF OF LIFE
//FIRST ARG= ENDPOINT IN '' SECOND IS CALLBACK
//CALLBACK TAKES IN REQUEST AND RESPONSE
app.get('/', (request, response)=> {
  response.status(200).send('kronk is god');

});

//CATCH ALL ENDPOINT, MUST BE LAST

app.get('*', (request,response)=>{
  response.status('404').send('this page does not exist');
})

//SERVER STARTS

app.listen(PORT, () => console.log(`WE ARE RUNNING ON ${PORT}`));