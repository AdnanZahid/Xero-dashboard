var accounts = require('./accounts.js');
var payments = require('./payments.js');

function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

module.exports = {
  connect: function(io, xero) {
	io.sockets.on('connection', function(socket) {
		socket.on('setDate', function(date) {

			var fromDate = replaceAll(date['fromDate'], '/', '-');
			var toDate 	 = replaceAll(date['toDate'], '/', '-');

			accounts.get(xero, socket, fromDate, toDate);
			payments.get(xero, socket, fromDate, toDate);
		});
	});
  }
};