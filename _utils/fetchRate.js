  // Block to load the Binance api
  async function fetchRate() {
      //process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0 // disable HTTPS the certificate
      const fetch = require("node-fetch"); // needed for node.js console only   
      const apiUrl = "https://api.binance.com/api/v3/avgPrice?symbol=ETHUSDT"
      const response = await fetch(apiUrl)
      const api = await response.json()
      const rateDisplay = Number(api.price).toFixed(3)
      const exchangeRate = parseInt(Number(api.price).toFixed(8)*1e8)
          console.log(api.price, rateDisplay, exchangeRate)      
  }
  fetchRate();