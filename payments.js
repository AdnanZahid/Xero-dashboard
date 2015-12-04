module.exports = {
  get: function(xero, socket, fromDate, toDate) {
	xero.call('GET', '/Payments', null, function(err, json) {
	    if (err) {
	        console.log('Error in payments');

	    } else {
		    var payment         = json.Response.Payments.Payment;
		    var totalBankAmount = 0;

		    var paymentAssociativeArray = {};
		    var pieChartInfoArray = new Array();

	    	var fromDateObject = new Date(fromDate);
	    	var toDateObject   = new Date(toDate);

		    var paymentsInfoArray = new Array();

		    for (var i in payment) {

		    	var date           = new Date(payment[i].Date);

		    	if (date >= fromDateObject && date <= toDateObject) {
					paymentAssociativeArray[payment[i].PaymentType] = 0;

			    	var name 	   	 = payment[i].Invoice.Contact.Name;
			    	var bankAmount 	 = payment[i].BankAmount;
			    	var status 	   	 = payment[i].Status;
			    	var currencyCode = payment[i].Invoice.CurrencyCode;

					console.log('Name: ' + name + '  ---  Bank Amount: ' + bankAmount + '  ---  Date: ' + date + '  ---  Status: ' + status + '  ---  Currency Code: ' + currencyCode);
					paymentsInfoArray.push({name: name, bankAmount: bankAmount, date: date, status: status, currencyCode: currencyCode});
				}
			}

		    socket.emit('returnPayments', paymentsInfoArray);

		    for (var i in payment) {

		    	var date = new Date(payment[i].Date);
		    	if (date >= fromDateObject && date <= toDateObject) {
			    	totalBankAmount += parseInt(payment[i].BankAmount);
					paymentAssociativeArray[payment[i].PaymentType] += parseInt(payment[i].BankAmount);
				}
			}

		    for (var type in paymentAssociativeArray) {

		    	var percentBankAmount = paymentAssociativeArray[type]/totalBankAmount;

			    pieChartInfoArray.push({y: percentBankAmount, name: type});
			    console.log('Percent: ' + percentBankAmount + ' --- Type: ' + type);
			}

			if (paymentsInfoArray.length === 0) {

			    pieChartInfoArray.push({y: 1, name: 'None'});
			}

	        socket.emit('returnPieChart', pieChartInfoArray);
		}
	});
	}
};