const request = require('request')
const forecast = (latitude,longitude,callback)=>{
 const url =  'https://api.darksky.net/forecast/381f76049c307c1a105d235c2542f49c/'+latitude+','+longitude;
 request({url,json:true},(error,{body})=>{
     if(error)
      {
          callback('Unable to fetch data',undefined)
      }
      else if(body.error)
      {
          callback('Invalid data requested',undefined)
      }
      else
      {
        console.log(body.daily.data[0])  
        callback(undefined,body.daily.data[0].summary+'It is currently '+body.currently.temperature+' degrees out.The maximum temperature today is '+body.daily.data[0].temperatureMax+' with the minimum being '+body.daily.data[0].temperatureMin+'. There is a '+body.currently.precipProbability+'% chance of rain')
      }
 })
 
}
module.exports = forecast