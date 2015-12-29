'use strict';

const request = require('request');
const Promise = require('es6-promise').Promise;

const SteamConfig = require('./config/steam');
const AppIds = SteamConfig.appid;

class SteamMarket {
	getCSGOItemPrice(marketHash, currency) {
		const curr = currency ? currency : SteamConfig.currencies.USD;

		return new Promise((resolve, reject) => {
			this.getPrice(AppIds.csgo, marketHash, curr, (err, result) => {
				if (err || !result || isNaN(result)) reject(err || 'Item has not price');
				resolve(result);
			});
		});
	}

	getDota2ItemPrice(marketHash, currency) {
		const curr = currency ? currency : SteamConfig.currencies.USD;

		return new Promise((resolve, reject) => {
			this.getPrice(AppIds.dota2, marketHash, curr, (err, result) => {
				if (err || !result || isNaN(result)) reject(err || 'Item has not price');
				resolve(result);
			});
		});
	}

	getCustomItemPrice(appID, marketHash, currency) {
		const curr = currency ? currency : SteamConfig.currencies.USD;

		return new Promise((resolve, reject) => {
			this.getPrice(appID, marketHash, curr, (err, result) => {
				if (err || !result || isNaN(result)) reject(err || 'Item has not price');
				resolve(result);
			});
		});
	}

	getPrice(appID, marketHash, currency, callback) {
		request({
			uri: '/market/priceoverview/',
			baseUrl: SteamConfig.baseUrl,
			json: true,
			qs: {
				currency: currency,
				appid: appID,
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
	}

	makeValid(price) {
		return price ? price.replace('p\u0443\u0431.', '').replace(',', '.').replace(/[^0-9\.]+/g, '').trim() : '';
	}
}

module.exports = SteamMarket;
