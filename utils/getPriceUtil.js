const request = require('request');

const SteamConfig = require('../config/steam');

module.exports = {

	getPrice(appId, marketHash, currency, callback) {
		request({
			uri: '/market/priceoverview/',
			baseUrl: SteamConfig.baseUrl,
			json: true,
			qs: {
				currency,
				appid: appId,
				market_hash_name: marketHash
			}
		}, (err, response, body) => {
			if (!err && response.statusCode === 200) {
				body.marketHash = marketHash;
				body.median_price = this.makeValid(body.median_price);
				callback(null, parseFloat(body.median_price).toFixed(2));
			} else if (!err && response.statusCode !== 200) {
				callback(new Error('Unsuccessful response'));
			} else {
				callback(err);
			}
		});
	},

	makeValid(price) {
		return price ? price.replace('p\u0443\u0431.', '').replace(',', '.').replace(/[^0-9\.]+/g, '').trim() : '';
	}
};
