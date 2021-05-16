const userService = require('./services/user-service');
const hotelService = require('./services/hotel-service');
const priceService = require('./services/price-service');
const helper = require('./services/helper');

function findHotelsNearby(lat, lng, radius) {
    const nearbyHotels = []
    const allHotels = hotelService.getHotels()

    // Otherwise use filter method in array
    for ( hotel of allHotels) {
        if (helper.distance(lat, lng, hotel.latitude, hotel.longitude) < radius) {
            nearbyHotels.push(hotel)
            //console.log(hotel)
        }
    }
    //console.log('nb hotel', nearbyHotels.length)
	return nearbyHotels;
}

function findHotelNearbyWithBestOffer(lat, lng, radius, date) {
    const nearbyHotels = findHotelsNearby(lat, lng, radius)
    let bestOffer = null
    
    for (hotel of nearbyHotels) {
        // Créer une fonction qui pour un hôtel (ridCode) à une date donnée trouve le prix d'une chambre standard
        const standardOffer = priceService.getStandardPriceForDate(hotel.ridCode, date)
        if (bestOffer === null) {
            bestOffer = hotel
            bestOffer.offer = standardOffer
        }

        // console.log(bestOffer)
        if (standardOffer.price < bestOffer.offer.price) {
            bestOffer = hotel
            bestOffer.offer = standardOffer
        } 
        
        else if (standardOffer.price === bestOffer.offer.price) {
            if (helper.distance(lat, lng, hotel.latitude, hotel.longitude) < helper.distance(lat, lng, bestOffer.latitude, bestOffer.longitude)) {
                bestOffer = hotel
                bestOffer.offer = standardOffer
            }
        }
    }
    
    //console.log(bestOffer)
    return bestOffer ? {
        ridCode: bestOffer.ridCode,
        countryCode: bestOffer.countryCode,
        localRating: bestOffer.localRating,
        address:  bestOffer.address,
        commercialName: bestOffer.commercialName,
        distance: helper.distance(lat, lng, bestOffer.latitude, bestOffer.longitude),
        offer: bestOffer.offer
    } : null
}

module.exports = {
	findHotelsNearby: findHotelsNearby,
	findHotelNearbyWithBestOffer: findHotelNearbyWithBestOffer
}
