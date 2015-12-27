'use strict';

const request = require('request');
const Promise = require('es6-promise').Promise;

const SteamConfig = require('./config/steam');
const AppIds = SteamConfig.appid;

class SteamMarket {
	getCSGOItemPrice(marketHash, currency) {
		return new Promise((resolve, reject) => {
			this.getPrice(AppIds.csgo, marketHash, currency, (err, result) => {
				if (err || !result) reject(err || 'Item has not price');
				resolve(result);
			});
		});
	}

	getDota2ItemPrice(marketHash, currency) {
		return new Promise((resolve, reject) => {
			this.getPrice(AppIds.dota2, marketHash, currency, (err, result) => {
				if (err || !result) reject(err || 'Item has not price');
				resolve(result);
			});
		});
	}

	getCustomItemPrice(appID, marketHash, currency) {
		return new Promise((resolve, reject) => {
			this.getPrice(appID, marketHash, currency, (err, result) => {
				if (err || !result) reject(err || 'Item has not price');
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
				callback(null, Math.floor(parseFloat(body.lowest_price)));
			} else if (!err && response.statusCode !== 200) {
				callback(new Error('Unsuccessful response'));
			} else {
				callback(err);
			}
		});
	}
}

module.exports = SteamMarket;
