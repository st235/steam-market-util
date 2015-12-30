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

	getCustomItemPrice(appID, marketHash, currency) {
		const curr = currency ? currency : SteamConfig.currencies.USD;

		return new Promise((resolve, reject) => {
			GetPricesUtil.getPrice(appID, marketHash, curr, (err, result) => {
				if (err || !result || isNaN(result)) reject(err || 'Item has not price');
				resolve(result);
			});
		});
	}
}

module.exports = SteamMarket;
