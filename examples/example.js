'use strict';

const SteamMarket = require('../index'); //		use require('steam-market-util') in production
const steamMarket = new SteamMarket();

steamMarket.getCSGOItemPrice('Tec-9 | Army Mesh (Well-Worn)') //	the market hash was taken from https://steamcommunity.com/market/
.then(result => {
	//	Handle result
})
.catch(error => {
	//	Handle error
});
