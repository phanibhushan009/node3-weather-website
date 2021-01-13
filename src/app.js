const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000
console.log('The value of PORT is:', process.env.PORT);


//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index1', {
        title: 'Weather App',
        name:'Andrew Mead'
    })
})

app.get('/about1', (req, res) => {
    res.render('about1', {
        title: 'About me',
        name: 'Phani bhushan'
    })
})
app.get('/help', (req, res) => {
    res.render('help1', {
        helpText: 'This is some helpful text',
        title: 'Help',
        name:'Phani bhushan'

    })
})

/*app.get('', (req, res) => {
    res.send('<h1> Weather</h1>')

})*/


/*app.get('/help', (req,res) => {
    res.send([{
        name: 'phani'
    }, {
        name:'Bhushan'
        }])

})*/
app.get('/about', (req, res) => {
    res.send('About')
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error:'You must provide an address!'
        })

    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address:req.query.address
            })
        })

    })
    /*res.send({
        forecast: "It is snowing",
        location: "Philadelphia",
        address: req.query.address
    })*/
})
app.get('/products', (req, res) => {
    if (!req.query.search) {
        res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Phani Bhushan',
        errorMessage:'Help article not found'

    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Phani Bhushan',
        errorMessage:'Page not found'
    })

})
app.listen(port, () => {
    console.log('server is up on port ' + port)

})