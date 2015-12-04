var http    = require('http');
var express = require('express');
var app     = express();
var port    = process.env.PORT || 80;
var io      = require('socket.io');
var path    = require('path');
var Xero    = require('xero');

var accounts    = require('./accounts.js');
var payments    = require('./payments.js');

var CONSUMER_KEY 	= 'JLMDKEEMX03XZM9BKLOLNBQTODEZRR';
var CONSUMER_SECRET = 'GGGE4WV2EMMOVCW21QQ6XRJN1IZ0LL';
var RSA_PRIVATE_KEY = '-----BEGIN RSA PRIVATE KEY-----\nMIICXQIBAAKBgQC19Ui9wzGxSEZqLTNyLwug8OckmyvZgW5466crk4Im7PMXfZlg\nSr425iquP/aM+CrmorL4ArKUnTKd778FT1TAly/2QntMqx91ioVAbGacUj2RKXn2\n540iwls60l73aQ7B9Guv0DYA37aynNyPUHVMaNZiI54mZH60iqYLEFnQEQIDAQAB\nAoGARpq07R1OrPHUkOKVMdtbccnIhwXHEBEPItCd/2Svfhc3hIfx+dFG2dqZ+R9M\ntgqd6vx64Y16afxNZcdfodnUkncEQVWBbuiOeDPeTYuifwR/xiY/Hy1VAcPlZy6N\nF57AKWDZEv2lURer3YXzuS4Uamj2BMG+QJUmaYthzXXPbpkCQQDeqogf4kt9vwO1\nORYRaEfzDGzuR0zBFCDKrA2dMWzqXfYjV7lvisSM07pkK9nRY2Gs2jLViis5xmrr\nyJMx/It3AkEA0TKoNAFvFlR1HJDTx/oN/ppF71JCnkQvmf2L1ioJN81TBkRDyNFC\nwbFeR/BmjdoparN29pZDVQLBUUbCTopStwJBAJF+bpoe3OMamEqnNZNER5c57Ee6\nUR3skAy+Zdrr+9YcdYPcg2+uBgZbJvTjbl2SibVPkl3T/bCvxReyJPRJp7sCQEmS\n4FdR/cjDsWB3ixQ03IEjrt7pdmaFIpys8GZE6HMIsl9s2M4i0rCeecMhSGAxTwmo\nznkRBeM7EdRM53+J5GcCQQCVQSn8y9194hFr6RXgVDMNaItcQ6ESX7+SdCPDdpDc\nK0e5ztdsQEpTlrlPLCYPPjN6aIAyH4N3gGbLk0IRTKLs\n-----END RSA PRIVATE KEY-----\n';

var xero    = new Xero(CONSUMER_KEY, CONSUMER_SECRET, RSA_PRIVATE_KEY);

app.use(express.static(path.join(__dirname, 'views')));

var server = http.createServer(app).listen(port);
io         = io.listen(server);

function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

io.sockets.on('connection', function(socket) {

	socket.on('setDate', function(date) {

		var fromDate = replaceAll(date['fromDate'], '/', '-');
		var toDate 	 = replaceAll(date['toDate'], '/', '-');

		accounts.get(xero, socket, fromDate, toDate);
		payments.get(xero, socket, fromDate, toDate);
	});
});