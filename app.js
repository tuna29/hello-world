const axios = require('axios');

amount = 10
baseCurrency = 'USD'
newCurrency = 'CAD'

var getRate = (amount, baseCurrency, newCurrency) => {
    return new Promise((resolve, reject) => {
        if (typeof amount !== 'number') {
            reject('Amount must be an integer.')
        }
        axios.get("https://api.exchangeratesapi.io/latest?base=" + baseCurrency).then(function (response) {
            newRate = response.data.rates[newCurrency]
            newAmount = amount * newRate
            newAmount = Math.round(newAmount * 100) / 100
            resolve(newAmount)
        })
        
    });
};

var getCountries = (newCurrency) => {
    return new Promise((resolve, reject) => {
        axios.get('https://restcountries.eu/rest/v2/currency/' + newCurrency).then(function (response) {
            countries = []
            for (num in response.data) {
                countries.push(' ' + response.data[num].name)
            }
            resolve(countries)
        })
    })
}


var getResults = async (amount, baseCurrency, newCurrency) => {
    const rates = await getRate(amount, baseCurrency, newCurrency);
    const countries = await getCountries(newCurrency);
    var final = `${amount} ${baseCurrency} is worth ${rates} ${newCurrency}. You can spend it in the following countries:${countries}`
    return `${amount} ${baseCurrency} is worth ${rates} ${newCurrency}. You can spend it in the following countries:${countries}`;
}


// getResults(amount, baseCurrency, newCurrency).then((result) => {
//     console.log(result);
// }).catch((e) => {
//     console.log(e);
// })

module.exports = {
    getRate,
    getCountries,
    getResults
}