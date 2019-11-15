const request = require('request')

var HttpProvider = function HttpProvider (host, options) {
	options = options || {}

	this.host = host || 'http://localhost:8545'
	this.request = request.defaults({
		headers: { 'content-type': 'application/json', ...options.headers },
		timeout: options.timeout || 120 * 1000
	})
}

HttpProvider.prototype.send = function (payload, callback) {
	this.request.post({ url: this.host, json: payload }, function (err, httpResponse, body) {
		callback(err, body)
	})
}

HttpProvider.prototype.disconnect = function () {
	// NO OP
}

HttpProvider.prototype.supportsSubscriptions = function () {
	return false
}

module.exports = HttpProvider
