'use strict';

const steamMarket = require('../index'); //		use require('steam-market-util') in production

steamMarket.getCSGOItemPrice('Tec-9 | Army Mesh (Well-Worn)') //	the market hash was taken from https://steamcommunity.com/market/
.then(result => {
	//	Handle result
})
.catch(error => {
	//	Handle error
});
