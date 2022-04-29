const countries = require('../database')

const countryFinder = code => {
    if(!code) return null;
    const countryCode = code.toUpperCase();
    return countries.find(country => country.alpha2Code === countryCode || country.alpha3Code === countryCode);
}

module.exports.getAllCountries = (req, res) => {
    try{
        if(req.query.sort === "true") {
            const compare = (a, b) => {
                if(a.name < b.name)
                    return -1;
                if(a.name > b.name)
                    return 1;
                return 0;

            }

            const countriesSorted = [...countries].sort(compare)
            res.status(200).json(countriesSorted)
        } else {
            res.status(200).json(countries)
        }

    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

module.exports.createCountry = (req, res) => {
    try{

        const { code } = req.params
        const { name, alpha2Code, alpha3Code } = req.body
        
        const country = countryFinder(code)
        if(country) {
            res.json({
                message: 'Country already exists'
            })
        } else {
            const countryCreated = {
                id: countries.length + 1,
                name: name,
                alpha2Code: alpha2Code,
                alpha3Code: alpha3Code
            }
            countries.push(countryCreated)
            res.status(201).json(countryCreated)
        }
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

module.exports.getOneCountry = (req, res) => {
    try{
        const country = countryFinder(req.params.code)
        if(country) {
            res.status(200).json(country)
        } else {
            res.status(404).json({
                message: "Country not found"
            })
        }
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

module.exports.updateCountry = (req, res) => {
    try{
        const country = countryFinder(req.params.code);
        if (country) {
        const countryUpdated = {
            name: req.body.name,
            alpha2Code: req.body.alpha2Code,
            alpha3Code: req.body.alpha3Code
        }
        const index = countries.findIndex(country => country.alpha2Code === countryUpdated.alpha2Code)
        countries[index] = countryUpdated;
        res.status(200).json(countryUpdated)
    }
    } catch (err) {
        res.status(404).json({
            message: "country not found"
        })
    }
    
}

module.exports.deleteCountry = (req, res) => {
    try{
        const country = countryFinder(req.params.code);
        if(country) {
            const index = countries.indexOf(country)
            countries.splice(index, 1)
            res.status(200).json({
                message: "country deleted"
            })
        } else {
            res.status(404).json({
                message: "country not found"
            })
        }
    } catch(err) {
        res.status(404).json({
            message: "country not found"
        })
    }
}