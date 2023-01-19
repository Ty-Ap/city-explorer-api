'use strict';




const express = require('express');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');


const app = express();

app.use(cors());



const PORT=process.env.SERVER_PORT || 3002;






//ENDPOINTS AND PROOF OF LIFE
//FIRST ARG= ENDPOINT IN '' SECOND IS CALLBACK
//CALLBACK TAKES IN REQUEST AND RESPONSE


app.get('/movies', async (request, response, next)=>{
  try {
    let cityName = request.query.searchQuery;

    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${cityName}&page=1&include_adult=false`;

    let movieDataFromWeatherbit = await axios.get(url);
    let parsedMovieData = movieDataFromWeatherbit.data;
    let resultsArr= parsedMovieData.results.map(movieObj=> new Movies(movieObj));
    
    response.status(200).send(resultsArr);
    
  } catch (error) {
    next(error);
    
  }

});

app.get('/weather', async (request,response,next)=>{

  try {
    let lat=request.query.lat;
    let lon= request.query.lon;

    let url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}`;
    let WeatherDataFromWeatherbit = await axios.get(url);

    let parsedWeatherData=WeatherDataFromWeatherbit.data.data;

    let weatherData= parsedWeatherData.map(dayObj=>new Forecast(dayObj));

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




//ERRORHANDLING  COMES FROM EXPRESS DOCS

app.get('*', (request,response)=>{
  response.status(404).send(error.message);
});

app.use((error, request, response, next)=>{
  response.status(500).send(error.message);
});


//SERVER STARTS

app.listen(PORT, () => console.log(`WE ARE RUNNING ON ${PORT}`));