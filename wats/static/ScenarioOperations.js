function gatherScenariosToExecution() {

    var elements = Array.from(document.getElementsByClassName('scenario-list-item'));


    for (const c in elements) {


        let selectedScenario = elements[c].childNodes[1].childNodes[1].children['selected'].checked; // select is turned on

        if (selectedScenario == true) {
            console.log("iteration : ", c)

            let dataDict = {};

            dataDict['steps'] = elements[c].childNodes[3].getAttribute('data');
            dataDict['name'] = elements[c].childNodes[1].childNodes[3].children[0].getAttribute('value');
            dataDict['expected'] = elements[c].childNodes[1].childNodes[3].children[1].getAttribute('value');
            dataDict['author'] = elements[c].childNodes[1].childNodes[3].children[2].getAttribute('value');
        
            console.log(dataDict)

            sendForExecution(dataDict)
        }
    }

}

function gatherScenariosToRemoval() {

    var elements = Array.from(document.getElementsByClassName('scenario-list-item'));

        //TODO

    for (const c in elements) {


        let selectedScenario = elements[c].childNodes[1].childNodes[1].children['selected'].checked; // select is turned on

        if (selectedScenario == true) {
            console.log("iteration : ", c)

            let dataDict = {};

            dataDict['steps'] = elements[c].childNodes[3].getAttribute('data');
            dataDict['name'] = elements[c].childNodes[1].childNodes[3].children[0].getAttribute('value');
            dataDict['expected'] = elements[c].childNodes[1].childNodes[3].children[1].getAttribute('value');
            dataDict['author'] = elements[c].childNodes[1].childNodes[3].children[2].getAttribute('value');
        
            console.log(dataDict)

            sendForRemoval(dataDict)
        }
    }

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