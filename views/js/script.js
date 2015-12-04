var socket = io.connect('/');

$(function() {
    $('#tabs').tabs();
});

function appendTableElement(element, tr) {

    var td = document.createElement('td');
    td.appendChild(document.createTextNode(element));
    tr.appendChild(td);
}