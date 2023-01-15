'use strict';

const axios = require('axios');

console.log('i eat children');

require('dotenv').config();
//REQUIRES//

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { request } = require('express');
// let data = require('./data/weather.json');

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

app.get('/movies', async (request, response, next)=>{
  try {
    let cityName = request.query.searchQuery;

    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE}&language=en-US&query=${cityName}&page=1&include_adult=false`;

    let movieDataWeatherbit = await axios.get(url);
    let parsedMovieData = movieDataWeatherbit.data;
    let resultsArr= parsedMovieData.results.map(movieObj=> new Movies(movieObj))
    
    response.status(200).send(resultsArr);
    
  } catch (error) {
    
  }

});

app.get('/weather', async (request,response,next)=>{

  try {
    let lat=request.query.lat;
    let lon= request.query.lon;

    let city=request.query.city_name;

    let url=`https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.REACT_APP_WEATHER}&lat=${lat}&lon=${lon}`;


    letWeatherDataWeatherbit = await axios.get(url);

    let parsedWeatherData=letWeatherDataWeatherbit.data;

    let groomedData= parsedWeatherData.data.map(dayObj=>new Forecast(dayObj));

    response.status(200).send(weatherData);

  }  catch(error) {
    next(error);
    
  }

});






//class to groom the new data from  new api



//FORECAST CLASS TO GROOM DOWN DATA
class Forecast {
  constructor(dayObj){
    this.date= dayObj.valid_date;
    this.description=dayObj.weather.description;
  }
}


class Movies{
  constructor(movieObj){
    this.title =movieObj.title;
    this.release =movieObj.release_date;
  }
}
//CATCH ALL ENDPOINT, MUST BE LAST

app.get('*', (request,response)=>{
  response.status(404).send('why are you here? this page does not exist. stop trying to break things');
});



//ERRORHANDLING  COMES FROM EXPRESS DOCS
app.use((error, request,response,next)=>{
  response.status('500').send(error.message);
});

//SERVER STARTS

app.listen(PORT, () => console.log(`WE ARE RUNNING ON ${PORT}`));