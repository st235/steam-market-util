'use strict';

const SteamMarket = require('../index'); //		use require('steam-market-util') in production
const steamMarket = new SteamMarket();

steamMarket.getCustomItemsPrices(730, ['Tec-9 | Army Mesh (Well-Worn)', 'AK-47 | Redline (Field-Tested)']) //	the market hash was taken from https://steamcommunity.com/market/
.then(result => {
	//	Handle result
})
.catch(error => {
	//	Handle error
});
