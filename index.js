'use strict';

const Promise = require('es6-promise').Promise;
const GetPricesUtil = require('./utils/getPriceUtil');

const SteamConfig = require('./config/steam');
const AppIds = SteamConfig.appid;

class SteamMarket {
	getCSGOItemPrice(marketHash, isMedian, currency) {
		const curr = currency ? currency : SteamConfig.currencies.USD;

		return new Promise((resolve, reject) => {
			GetPricesUtil.getPrice(AppIds.csgo, marketHash, curr, isMedian, (err, result) => {
				if (err || !result || isNaN(result)) reject(err || 'Item has not price');
				resolve(result);
			});
		});
	}

	getDota2ItemPrice(marketHash, isMedian, currency) {
		const curr = currency ? currency : SteamConfig.currencies.USD;

		return new Promise((resolve, reject) => {
			GetPricesUtil.getPrice(AppIds.dota2, marketHash, curr, isMedian, (err, result) => {
				if (err || !result || isNaN(result)) reject(err || 'Item has not price');
				resolve(result);
			});
		});
	}

	getCustomItemPrice(appId, marketHash, isMedian, currency) {
		const curr = currency ? currency : SteamConfig.currencies.USD;

		return new Promise((resolve, reject) => {
			GetPricesUtil.getPrice(appId, marketHash, curr, isMedian, (err, result) => {
				if (err || !result || isNaN(result)) reject(err || 'Item has not price');
				resolve(result);
			});
		});
	}

	getCustomItemsPrices(appId, marketHashes, isMedian, currency) {
		const curr = currency ? currency : SteamConfig.currencies.USD;

		const pricesPromises = [];
		marketHashes.forEach(marketHash => {
			pricesPromises.push(this.getCustomItemPrice(appId, marketHash, isMedian, curr));
		});

		return Promise.all(pricesPromises);
	}
}

module.exports = SteamMarket;
