const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = `http://api.weatherstack.com/current?access_key=281745ad8b0142d66038b64a9570b7e7&query=${latitude},${longitude}`

    request({ url, json: true }, (error, {body}) => {
        if(error){
            callback('Unable to connect to location services!', undefined)
        }
        else if(body.error){
            callback('Unable to find location', undefined)
        }
        else{
            callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degress out. There is a ${body.current.precip}% chances of rain.`)
        }
    })
}

module.exports = forecast