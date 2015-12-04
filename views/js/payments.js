socket.on('returnPayments', function(paymentsInfoArray) {
	
	var paymentsTableBody = document.getElementById('paymentsTableBody');
	paymentsTableBody.innerHTML = '';

	for (var i in paymentsInfoArray) {

		var payment = paymentsInfoArray[i];
	
		var tr = document.createElement('tr');
		appendTableElement(i, tr);
		appendTableElement(payment['name'], tr);
		appendTableElement(payment['bankAmount'], tr);
		appendTableElement(payment['date'], tr);
		appendTableElement(payment['status'], tr);
		appendTableElement(payment['currencyCode'], tr);
	    paymentsTableBody.appendChild(tr);
	}
});