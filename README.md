## steam-market-util
[![npm version](https://img.shields.io/npm/v/steam-market-util.svg)](https://npmjs.com/package/steam-market-util)
[![npm downloads](https://img.shields.io/npm/dm/steam-market-util.svg)](https://npmjs.com/package/steam-market-util)
[![dependencies](https://david-dm.org/sasd97/steam-market-util.svg)](https://david-dm.org/sasd97/steam-market-util)
[![license](https://img.shields.io/npm/l/steam-market-util.svg)](https://github.com/sasd97/steam-market-util/blob/master/LICENSE)
[![paypal](https://img.shields.io/badge/paypal-donate-yellow.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=SMPD3698AZUZC)

Utility designed to take the prices from the trading platform Steam.

Install it from [npm](https://www.npmjs.com/package/steam-market-util) or check out the [wiki](https://github.com/sasd97/steam-market-util/wiki) for documentation.

### Example
```javascript
'use strict';
const steamMarket = require('steam-market-util');
steamMarket.getCSGOItemPrice('Tec-9 | Army Mesh (Well-Worn)')
.then(result => {
//	Handle result
})
.catch(error => {
//	Handle error
});
```


# Support

Please, report bugs on the [issue tracker](https://github.com/sasd97/steam-market-util/issue)
