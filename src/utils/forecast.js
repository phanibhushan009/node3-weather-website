const request = require('request')
const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=c1070b2c5fae24a8615eaa2564379f2f&query=' + latitude + ',' + longitude + '&units=f'
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)

        } else if (response.body.error) {
            callback('Unable to find location', undefined)

        } else {
            console.log(response.body.current.observation_time)
            /*callback(undefined, 'It is currently ' + response.body.current.temperature + ' degrees out. There is a ' + response.body.current.precip + ' % chance of rain. ')*/
            callback(undefined, response.body.current.weather_descriptions[0] + 'It is currently ' + response.body.current.temperature + ' degrees out. It feels like ' + response.body.current.feelslike + '. The Humidity is a ' + response.body.current.humidity + ' % . ')

        }
    })
}
module.exports = forecast