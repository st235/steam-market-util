'use strict';

const GetPricesUtil = require('./utils/getPriceUtil');

const SteamConfig = require('./config/steam');
const AppIds = SteamConfig.appid;

class SteamMarket {
	getCSGOItemPrice(marketHash, isMedian, currency) {
		return new Promise((resolve, reject) => {
			GetPricesUtil.getPrice(AppIds.csgo, marketHash, currency, isMedian, (err, result) => {
				if (err || !result || isNaN(result)) reject(err || 'Item has not price');
				resolve(result);
			});
		});
	}

	getDota2ItemPrice(marketHash, isMedian, currency) {
		return new Promise((resolve, reject) => {
			GetPricesUtil.getPrice(AppIds.dota2, marketHash, currency, isMedian, (err, result) => {
				if (err || !result || isNaN(result)) reject(err || 'Item has not price');
				resolve(result);
			});
		});
	}

	getCustomItemPrice(appId, marketHash, isMedian, currency) {
		return new Promise((resolve, reject) => {
			GetPricesUtil.getPrice(appId, marketHash, currency, isMedian, (err, result) => {
				if (err || !result || isNaN(result)) reject(err || 'Item has not price');
				resolve(result);
			});
		});
	}

	getCustomItemsPrices(appId, marketHashes, isMedian, currency) {
		const pricesPromises = [];
		marketHashes.forEach(marketHash => {
			pricesPromises.push(this.getCustomItemPrice(appId, marketHash, isMedian, currency));
		});

		return Promise.all(pricesPromises);
	}
}

module.exports = new SteamMarket();
