socket.on('returnAccounts', function(accountsInfoArray) {

	var accountsTableBody = document.getElementById('accountsTableBody');
	accountsTableBody.innerHTML = '';

	for (var i in accountsInfoArray) {

		var account = accountsInfoArray[i];

		var tr = document.createElement('tr');
		appendTableElement(parseInt(i) + 1, tr);
		appendTableElement(account['name'], tr);
		appendTableElement(account['type'], tr);
		appendTableElement(account['currencyCode'], tr);
		appendTableElement(account['closingBalance'], tr);
	    accountsTableBody.appendChild(tr);
	}
});