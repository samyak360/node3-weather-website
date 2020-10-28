const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Samyak Jain'
    })
})

app.get('/about', (req, res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Samyak Jain'
    })
})

app.get('/help', (req, res)=>{
    res.render('help',{
        helpText: 'This is some helpful text',
        title: 'Help',
        name: 'Samyak Jain'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    else{
        let fore;
        let loca;
        geocode(req.query.address, (error , {latitude, longitude, location} = {}) => {
            if(error){
                return res.send({
                    error
                })
            }
            
            forecast(latitude, longitude, (error, forecastData) => {
                if(error){
                    return res.send({
                        error
                    })
                }
                loca = location;
                fore = forecastData;

                res.send({
                    forecast: fore,
                    location: loca,
                    address: req.query.address
                })
            })
        })

    }

    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Samyak Jain',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Samyak Jain',
        errorMessage: 'Page not found.'
    })
})
app.listen(3000,()=>{
    console.log('server started at 3000')
})