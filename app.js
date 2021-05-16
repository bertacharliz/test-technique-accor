const userService = require('./services/user-service');
const hotelService = require('./services/hotel-service');
const priceService = require('./services/price-service');
const helper = require('./services/helper');

function findHotelsNearby(lat, lng, radius) {
    // TODO implement me
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
    // TODO implement me
    return null;
}

module.exports = {
	findHotelsNearby: findHotelsNearby,
	findHotelNearbyWithBestOffer: findHotelNearbyWithBestOffer
}
