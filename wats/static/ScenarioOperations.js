function executeScenarios() {

    var elements = Array.from(document.getElementsByClassName('scenario-table')[0].getElementsByClassName("select"))
    elements = elements.filter(it => !!it.checked);
    elements = elements.map(it => it.parentNode.parentNode.getElementsByClassName('scenario-table-name')[0].innerText);
    elements.forEach(it => sendForExecution({'name': it}));
    window.location.href = window.location.href;

}

function removeScenarios() {

    var elements = Array.from(document.getElementsByClassName('scenario-table')[0].getElementsByClassName("select"))
    elements = elements.filter(it => !!it.checked);
    elements = elements.map(it => it.parentNode.parentNode.getElementsByClassName('scenario-table-name')[0].innerText);
    elements.forEach(it => sendForRemoval({'name': it}));
    window.location.href = window.location.href;

}


function sendForExecution(body){
    fetch('/execute',
        {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }
    );
}

function sendForRemoval(body){
    fetch('/remove',
        {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }
    );
}

function viewNewScenario() {
    window.location.href = '/scenario_add';
}