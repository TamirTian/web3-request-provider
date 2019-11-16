const axios = require('axios')
const http = require('http')
const https = require('https')
const httpAgent = new http.Agent({ keepAlive: true })
const httpsAgent = new https.Agent({ keepAlive: true })

var HttpProvider = function HttpProvider (host, options) {
	options = options || {}

	this.host = host || 'http://localhost:8545'
	this.axios = axios.create({
		httpAgent,
		httpsAgent,
		baseURL: this.host,
		headers: { 'content-type': 'application/json', ...options.headers },
		timeout: options.timeout || 120 * 1000
	})
}

HttpProvider.prototype.send = function (payload, callback) {
	this.axios.post('/', payload)
		.then(res => callback(null, res.data))
		.catch(callback)
}

HttpProvider.prototype.disconnect = function () {
	// NO OP
}

HttpProvider.prototype.supportsSubscriptions = function () {
	return false
}

module.exports = HttpProvider
