const PRICES = require('./data/prices.json').prices;

const getPrices = () => {
	return PRICES;
}

const getStandardPriceForDate = (ridCode, date) => {
	const prices = getPrices()

	for (price of prices) {
		if (price.ridCode === ridCode) {
			for (offer of price.offers) {
				if ( offer.date === date && offer.fare === 'STANDARD')  {
					return offer
				}
			}
		}
	}
	return {}
}
 
module.exports = {
	getPrices: getPrices,
	getStandardPriceForDate: getStandardPriceForDate
}