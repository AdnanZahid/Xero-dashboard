function isSelectedDateValid() {
	
	var fromDate = new Date($('#fromDatePicker').val());
	var toDate = new Date($('#toDatePicker').val());

    if (fromDate <= toDate) {
    	return true;
    } else {
    	return false;
    }
}

$(function() {

	$('#fromDatePicker').datepicker({
	    onSelect: function(dateText, inst) {

		    if (isSelectedDateValid(dateText, inst)) {

		    	if ($('#toDatePicker').val()) {

		    		socket.emit('setDate', {fromDate: $('#fromDatePicker').val(), toDate: $('#toDatePicker').val()});
		    	}

		    } else {
		        $(this).val(inst.lastVal);
		        alert('The selected date is invalid: ' + dateText);
		    }
	    }
	});
	$('#toDatePicker').datepicker({
	    onSelect: function(dateText, inst) {

		    if (isSelectedDateValid(dateText, inst)) {

		    	if ($('#fromDatePicker').val()) {

		    		socket.emit('setDate', {fromDate: $('#fromDatePicker').val(), toDate: $('#toDatePicker').val()});
		    	}

		    } else {
		        $(this).val(inst.lastVal);
		        alert('The selected date is invalid: ' + dateText);
		    }
	    }
	});
	
	var date = new Date(), y = date.getFullYear(), m = date.getMonth();
	var firstDay = new Date(y, m, 1);
	var lastDay = new Date(y, m + 1, 0);

	$('#fromDatePicker').datepicker('setDate', firstDay);
	$('#toDatePicker'  ).datepicker('setDate', lastDay );
	
	socket.emit('setDate', {fromDate: $('#fromDatePicker').val(), toDate: $('#toDatePicker').val()});
	socket.emit('setDate', {fromDate: $('#fromDatePicker').val(), toDate: $('#toDatePicker').val()});
});