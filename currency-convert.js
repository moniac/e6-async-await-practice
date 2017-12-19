const axios = require('axios')

const getExchangeRate = async (from, to) => {
	try {
		const response = await axios.get(`http://api.fixer.io/latest?base=${from}`)
		const rate = response.data.rates[to]

		if (rate) {
			return rate
		}
		throw new Error()
	} catch (e) {
		throw new Error(`Unable to get exchange rate from ${from} & ${to}`)
	}


	// return axios.get(`http://api.fixer.io/latest?base=${from}`)
	// 	.then((response) => {
	// 		return response.data.rates[to]
	// 	})
}

const getCountries = async (currency) => {
	try {
		const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currency}`)
		return response.data.map(country => country.name)
	}	catch (e) {
		throw new Error(`Unable to get countries that use ${currency}.`)
	}

	// return axios.get(`https://restcountries.eu/rest/v2/currency/${currency}`).then((response) => {
	// 	return response.data.map((country) => {
	// 		return country.name
	// 	})
	// })
}

const convertCurrency = async (from, to, amount) => {
	const countries = await getCountries(to)
	const rate = await getExchangeRate(from, to)
	const exchangedAmount = amount * rate

	return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in the following countries ${countries.join(', ')}`
}

convertCurrency('EUR', 'USD', 100).then((status) => {
	console.log(status)
}).catch((e) => {
	console.log(e.message)
})

// const convertCurreny = (from, to, amount) => {
// 	// get countries list back
// 	let countries
// 	return getCountries(to).then((tempCountries) => {
// 		// get conversation rate
// 		countries = tempCountries
// 		return getExchangeRate(from, to)
// 	}).then((rate) => {
// 		const exchangedAmount = amount * rate

// 		return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in the following countries ${countries.join(', ')}`

// 	})
// }

// convertCurreny('EUR', 'USD', 100).then((countries) => {
// 	console.log(countries)
// })

// getExchangeRate('EUR', 'GBP').then((rate) => {
// 	console.log(rate)
// })

// getCountries('USD').then((countries) => {
// 	console.log(countries)
// })