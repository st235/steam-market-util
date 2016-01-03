'use strict';

const Promise = require('es6-promise').Promise;
const GetPricesUtil = require('./utils/getPriceUtil');

const SteamConfig = require('./config/steam');
const AppIds = SteamConfig.appid;

class SteamMarket {
	getCSGOItemPrice(marketHash, currency) {
		const curr = currency ? currency : SteamConfig.currencies.USD;

		return new Promise((resolve, reject) => {
			GetPricesUtil.getPrice(AppIds.csgo, marketHash, curr, (err, result) => {
				if (err || !result || isNaN(result)) reject(err || 'Item has not price');
				resolve(result);
			});
		});
	}

	getDota2ItemPrice(marketHash, currency) {
		const curr = currency ? currency : SteamConfig.currencies.USD;

		return new Promise((resolve, reject) => {
			GetPricesUtil.getPrice(AppIds.dota2, marketHash, curr, (err, result) => {
				if (err || !result || isNaN(result)) reject(err || 'Item has not price');
				resolve(result);
			});
		});
	}

	getCustomItemPrice(appId, marketHash, currency) {
		const curr = currency ? currency : SteamConfig.currencies.USD;

		return new Promise((resolve, reject) => {
			GetPricesUtil.getPrice(appId, marketHash, curr, (err, result) => {
				if (err || !result || isNaN(result)) reject(err || 'Item has not price');
				resolve(result);
			});
		});
	}

	getCustomItemsPrices(appId, marketHashes, currency) {
		const curr = currency ? currency : SteamConfig.currencies.USD;

		const pricesPromises = [];
		marketHashes.forEach(marketHash => {
			pricesPromises.push(this.getCustomItemPrice(appId, marketHash, curr));
		});

		return Promise.all(pricesPromises);
	}
}

module.exports = SteamMarket;
