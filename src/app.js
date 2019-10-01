const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
//Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
//set handlebars engine and vies location
app.set('views',viewsPath)
app.set('view engine','hbs')
hbs.registerPartials(partialsPath )
//setup static directory to serve up
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Tarun Rahuja'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Page',
        name:'Tarun Rahuja'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'This text is meant to help you',
        title:'Help',
        name:'Tarun Rahuja'
    })
})

app.get('',(req,res)=>{
    res.send('Hello express!')
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
           return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })
        //  res.send({
        //    forecast:'It is clear',
        //    location:'New Delhi',
        //    address:req.query.address
        // })         
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        Text:'help article not found',
        title:'Error',
        name:'Tarun Rahuja'
    })
})
app.get('*',(req,res)=>{
    res.render('error',{
        Text:'page not found',
        title:'Error',
        name:'Tarun Rahuja'
    })
})

app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})