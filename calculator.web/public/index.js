// seed operations
var operations = [
    { title: 'Multiply', port: 4000, symbol: '*', batch: true },
    { title: 'Division', port: 4025, symbol: '/', batch: true },
    { title: 'Addition', port: 4050, symbol: '+', batch: false },
    { title: 'Subtract', port: 4075, symbol: '-', batch: false }
];

var calculatorHolder = document.getElementById('calculatorHolder');
var calculatorButton = document.getElementById('calculatorButton');

function buildOperationsTable() {
    var calculatorContentHtml = '';
    for (var i = 0; i < operations.length; i++) {
        var operation = operations[i];
        calculatorContentHtml += '<tr id="calculatorRow' + i +'"><td>' +
            operation.title + '</td><td><input type="text" id="calculatorValueA' + i +'" /> <span style="font-family: monospace;">' +
            operation.symbol + '</span> <input type="text" id="calculatorValueB' + i +'" /> <span style="font-family: monospace;">=</span> </td>' +
            '<td id="calculatorResult' + i +'"></td></tr>'
    }

    calculatorHolder.innerHTML = calculatorContentHtml;
}

function setupCalculateHandler() {
    calculatorButton.addEventListener('click', function(text, copyNode) {
        console.log('Calculator button clicked.');

        var requests = getDataFromForm();

        console.log('Requests that are going to be made:', requests);

        executeRequest(requests);
    });
}

function getDataFromForm() {
    var requests = [];
    for (var i = 0; i < operations.length; i++) {
        var operation = operations[i];
        var a = parseInt(document.getElementById('calculatorValueA' + i).value);
        var b = parseInt(document.getElementById('calculatorValueB' + i).value);
        if (a && b) {
            requests.push({ a: a, b: b, title: operation.title, port: operation.port, batch: operation.batch, i: i })
        }
    }

    return requests;
}

function executeRequest(requests) {
    var batchRequests = [];

    // execute non batch requests directly
    for (var i = 0; i < requests.length; i++) {
        var request = requests[i];
        // call the service batch
        if (request.batch === false) {
            (function(request) {
                var args = { method: 'GET', mode: 'cors', cache: 'default' };
                fetch('http://localhost:' + request.port + '/?t=' + request.title + '&a=' + request.a + '&b=' + request.b, args)
                    .then(function(response) {
                        return response.json().then(function(data) {
                            document.getElementById('calculatorResult' + request.i).innerText = data.result;
                        });
                    });
            })(request);
        }
        else {
            batchRequests.push(request);
        }
    }

    // execute batch requests via the operations.batch
    if (batchRequests.length > 0) {
        var payload = [];
        for (var i = 0; i < batchRequests.length; i++) {
            var request = batchRequests[i];
            payload.push({ a: request.a, b: request.b, port: request.port, title: request.title });
        }

        var args = { method: 'POST', mode: 'cors', cache: 'default' };
        fetch('http://localhost:5050/?requests=' + JSON.stringify(payload), args)
            .then(function(response) {
                return response.json().then(function(data) {
                    for (var i = 0; i < data.length; i++) {
                        var item = data[i];
                        document.getElementById('calculatorResult' + findOperationIndex(item.operation)).innerText = item.result;
                    }
                });
            });
    }
}

function findOperationIndex(targetSymbol) {
    for (var i = 0; i < operations.length; i++) {
        var operation = operations[i];
        if (operation.symbol === targetSymbol) {
            return i;
        }
    }
}

buildOperationsTable();
setupCalculateHandler();