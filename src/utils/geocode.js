const request = require('request')
const geocode = (address,callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoidGFydW5yYWh1amEiLCJhIjoiY2swNDF2OGc3MmpxbTNkcGtiNm1hbXVndSJ9.xPqcjHt3SpGuQedziI3kQQ';
    request({url,json:true},(error,{body})=>{
     if(error)
     {
        callback('Unable to connect to location services',undefined)
     }
     else if(body.features.length===0)
     {
        callback('Unable to find the desired location',undefined)
     }
     else
     {
        callback(undefined,{
          latitude:body.features[0].center[1],
          longitude : body.features[0].center[0],
          location : body.features[0].place_name
        })
     }
 
    })
 }
 module.exports=geocode