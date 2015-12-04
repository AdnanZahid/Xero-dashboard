module.exports = {
  get: function(xero, socket, fromDate, toDate) {
	xero.call('GET', '/Accounts', null, function(err, json) {

	    if (err) {
		    console.log('Error in accounts');

	    } else {
		    var account = json.Response.Accounts.Account;
		    var accountsInfoArray = new Array();

		    for (var i in account) {

		    	var accountStatus = account[i].Status;
		    	
		    	if (accountStatus == 'ACTIVE') {

		    		var bankAccountID = account[i].AccountID;

			    	var name 		  = account[i].Name;
			    	var type 		  = account[i].Type;
			    	var currencyCode  = account[i].CurrencyCode;

					if (currencyCode === undefined) {
						currencyCode = 'Does not exist';
						console.log('Name: ' + name + '  ---  Type: ' + type + '  ---  Currency Code: ' + currencyCode + '  ---  Closing Balance: ' + '0');
						accountsInfoArray.push({name: name, type: type, currencyCode: currencyCode, closingBalance: '0.00'});

					} else if (currencyCode === 'PKR') {

						(function (name, type, currencyCode, completionHandler) {

							xero.call('GET', '/Reports/BankStatement?bankAccountID=' + bankAccountID + '&fromDate=' + fromDate + '&toDate=' + toDate, null, function(err, json) {

							    if (err) {
								    console.log('Error in bank statement');

							    } else {
							    	var closingBalance = json.Response.Reports.Report.Rows.Row[1].Rows.Row[0].Cells.Cell[6].Value;

								    console.log('Name: ' + name + '  ---  Type: ' + type + '  ---  Currency Code: ' + currencyCode + '  ---  Closing Balance: ' + closingBalance);
								    accountsInfoArray.push({name: name, type: type, currencyCode: currencyCode, closingBalance: closingBalance});

								    completionHandler();
							    }
							});

						}) (name, type, currencyCode, function() {
						    socket.emit('returnAccounts', accountsInfoArray);
						});
					}
				}
		    }
		}
	});
  }
};