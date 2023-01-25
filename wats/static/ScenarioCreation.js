function removeStep(e) {
    e.parentNode.parentNode.parentNode.remove();
}

function setPossibleSteps(e) {

    var select = document.getElementById(e.target.id);
    var step_container = select.parentElement;
    var current_chosen_option = document.getElementById(e.target.id).value;

    switch (current_chosen_option) {
        case 'go_to_url':

            removeSettings(step_container);
            
            var settings = document.createElement('div');
            settings.id = 'settings';
            settings.className = 'scenario-creation-step-settings'

            var val_input = document.createElement('input');
            val_input.setAttribute('data', 'url');
            val_input.placeholder = 'https://poprawnyadres.com/';

            var tooltip = document.createElement('div');
            tooltip.id = e.target.id + '-tooltip';
            tooltip.className = 'tooltip';
            tooltip.innerHTML = '? <div class="tooltiptext"> Pozwala na przedostanie się na zdefiniowany URL. </div>';

            var removeButton = document.createElement('div');
            removeButton.id = e.target.id + '-remove';
            removeButton.className = 'scenario-creation-step-remove';
            removeButton.innerHTML = '<button type="button" id="add_step" class="cbutton" onclick="removeStep(this)">- Usuń krok</button>';

            step_container.append(settings);
            settings.append(val_input);
            settings.append(tooltip);
            settings.append(removeButton);
            break;

        case 'refresh':
            removeSettings(step_container);

            var settings = document.createElement('div');
            settings.id = 'settings';
            settings.className = 'scenario-creation-step-settings';

            var val_input = document.createElement('input');
            val_input.setAttribute('data', 'amount');
            val_input.placeholder = '1';
            val_input.setAttribute('hidden', 'true');

            var tooltip = document.createElement('div');
            tooltip.id = e.target.id + '-tooltip';
            tooltip.className = 'tooltip'
            tooltip.innerHTML = '? <div class="tooltiptext"> Pozwala na odświeżenie strony. </div>';

            step_container.append(settings);
            settings.append(val_input);
            settings.append(tooltip);
            break;

        case 'back':
            removeSettings(step_container);

            var settings = document.createElement('div');
            settings.id = 'settings';
            settings.className = 'scenario-creation-step-settings';

            var val_input = document.createElement('input');
            val_input.placeholder = 'ilość (np. 5)';
            val_input.setAttribute('data', 'amount');

            var tooltip = document.createElement('div');
            tooltip.id = e.target.id + '-tooltip';
            tooltip.className = 'tooltip'
            tooltip.innerHTML = '? <div class="tooltiptext"> Pozwala na cofnięcie do poprzedniej strony zdefiniowaną ilość razy </div>';

            step_container.append(settings);
            settings.append(val_input);
            settings.append(tooltip);
            break;

        case 'forward':
            removeSettings(step_container);

            var settings = document.createElement('div');
            settings.id = 'settings';
            settings.className = 'scenario-creation-step-settings';

            var val_input = document.createElement('input');
            val_input.placeholder = 'ilość (np. 5)';
            val_input.setAttribute('data', 'amount');

            var tooltip = document.createElement('div');
            tooltip.id = e.target.id + '-tooltip';
            tooltip.className = 'tooltip'
            tooltip.innerHTML = '? <div class="tooltiptext"> Pozwala na przejście do następnej strony zdefiniowaną ilość razy </div>';

            step_container.append(settings);
            settings.append(val_input);
            settings.append(tooltip);
            break;    

        case 'wait':
            removeSettings(step_container);

            var settings = document.createElement('div');
            settings.id = 'settings';
            settings.className = 'scenario-creation-step-settings';

            var val_input = document.createElement('input');
            val_input.placeholder = 'Ilość w sekundach (np. 60 - minuta czekania)';
            val_input.setAttribute('data', 'amount');

            var tooltip = document.createElement('div');
            tooltip.id = e.target.id + '-tooltip';
            tooltip.className = 'tooltip'
            tooltip.innerHTML = '? <div class="tooltiptext"> Pozwala na oczekiwanie danej ilości sekund. </div>';

            step_container.append(settings);
            settings.append(val_input);
            settings.append(tooltip);
            break;

        case 'take_screenshot':
            removeSettings(step_container);

            var settings = document.createElement('div');
            settings.id = 'settings';
            settings.className = 'scenario-creation-step-settings';

            var val_input = document.createElement('input');
            val_input.placeholder = 'nazwa-zrzutu-ekranu';
            val_input.setAttribute('data', 'name');


            var tooltip = document.createElement('div');
            tooltip.id = e.target.id + '-tooltip';
            tooltip.className = 'tooltip'
            tooltip.innerHTML = '? <div class="tooltiptext"> Pozwala na zrobienie zrzutu ekranu okna przeglądarki </div>';

            step_container.append(settings);
            settings.append(val_input);
            settings.append(tooltip);
            break;

        // element interactions

        case 'click_element':
            removeSettings(step_container);

            var settings = document.createElement('div');
            settings.id = 'settings';
            settings.className = 'scenario-creation-step-settings';

            var val_input = document.createElement('input');
            val_input.placeholder = "XPATH, np. '//*[@value='login']'";
            val_input.setAttribute('data', 'xpath');

            var tooltip = document.createElement('div');
            tooltip.id = e.target.id + '-tooltip';
            tooltip.className = 'tooltip'
            tooltip.innerHTML = '? <div class="tooltiptext"> Pozwala klinięcie elementu (zlokalizowanego za pomocą wartości XPATH) </div>';

            step_container.append(settings);
            settings.append(val_input);
            settings.append(tooltip);
            break;
        
        case 'send_keys_to_element':
            removeSettings(step_container);

            var settings = document.createElement('div');
            settings.id = 'settings';
            settings.className = 'scenario-creation-step-settings';

            var val_input = document.createElement('input');
            val_input.placeholder = "XPATH, np. '//*[@value='login']'";
            val_input.setAttribute('data', 'xpath');

            var keys_to_send = document.createElement('input');
            keys_to_send.placeholder = 'wartość tekstowa do wyslania';
            keys_to_send.setAttribute('data', 'keysToSend');

            var tooltip = document.createElement('div');
            tooltip.id = e.target.id + '-tooltip';
            tooltip.className = 'tooltip'
            tooltip.innerHTML = '? <div class="tooltiptext"> Pozwala na wysłanie tekstu do elementu (zlokalizowanego za pomocą wartości XPATH) </div>';

            step_container.append(settings);
            settings.append(val_input);
            settings.append(keys_to_send);
            settings.append(tooltip);
            break;

        case 'clear_element':
            removeSettings(step_container);

            var settings = document.createElement('div');
            settings.id = 'settings';
            settings.className = 'scenario-creation-step-settings';

            var val_input = document.createElement('input');
            val_input.placeholder = "XPATH, np. '//*[@value='login']'";
            val_input.setAttribute('data', 'xpath');
            
            var tooltip = document.createElement('div');
            tooltip.id = e.target.id + '-tooltip';
            tooltip.className = 'tooltip'
            tooltip.innerHTML = '? <div class="tooltiptext"> Czyści element (np. input) z tekstu. </div>';

            step_container.append(settings);
            settings.append(val_input);
            settings.append(tooltip);
            break;

        case 'choose_from_list':
            removeSettings(step_container);

            var settings = document.createElement('div');
            settings.id = 'settings';
            settings.className = 'scenario-creation-step-settings';

            var locator = document.createElement('input');
            locator.placeholder = "XPATH, np. '//*[@value='login']'";
            locator.setAttribute('data', 'xpath');
            
            var type = document.createElement('input');
            type.placeholder = "index/value/text";
            type.setAttribute('data', 'type');

            var values = document.createElement('input');
            values.placeholder = "wartosci,dzielone,przecinkiem";
            values.setAttribute('data', 'values');


            var tooltip = document.createElement('div');
            tooltip.id = e.target.id + '-tooltip';
            tooltip.className = 'tooltip'
            tooltip.innerHTML = '? <div class="tooltiptext"> Pozwala na wybór jednego lub więcej elementów z listy. </div>';

            step_container.append(settings);
            settings.append(locator);
            settings.append(type);
            settings.append(values);
            settings.append(tooltip);
            break;

        case 'click_enter':
            removeSettings(step_container)
            
            var settings = document.createElement('div');
            settings.id = 'settings';
            settings.className = 'scenario-creation-step-settings_clickenter';

            
            var tooltip = document.createElement('div');
            tooltip.id = e.target.id + '-tooltip';
            tooltip.className = 'tooltip'
            tooltip.innerHTML = '? <div class="tooltiptext"> naciska przycisk enter (przydatne przy submitach) </div>';
            step_container.append(settings);
            settings.append(tooltip);
            break;

        case 'assert_title_has':
            removeSettings(step_container)
            
            var settings = document.createElement('div');
            settings.id = 'settings';
            settings.className = 'scenario-creation-step-settings';

            var val_input = document.createElement('input');
            val_input.placeholder = "np. WATS | Scenario Creator";
            val_input.setAttribute('data', 'string');
            
            var tooltip = document.createElement('div');
            tooltip.id = e.target.id + '-tooltip';
            tooltip.className = 'tooltip'
            tooltip.innerHTML = '? <div class="tooltiptext"> Potwierdza, czy tytuł strony zawiera podany ciąg znaków. </div>';

            step_container.append(settings);
            settings.append(val_input);
            settings.append(tooltip);
            break;

        case 'assert_title_is':
            removeSettings(step_container)
            
            var settings = document.createElement('div');
            settings.id = 'settings';
            settings.className = 'scenario-creation-step-settings';

            var val_input = document.createElement('input');
            val_input.placeholder = "np. WATS | Scenario Creator";
            val_input.setAttribute('data', 'string');
            
            var tooltip = document.createElement('div');
            tooltip.id = e.target.id + '-tooltip';
            tooltip.className = 'tooltip'
            tooltip.innerHTML = '? <div class="tooltiptext"> Potwierdza, czy tytuł strony to podany ciąg znaków. </div>';

            step_container.append(settings);
            settings.append(val_input);
            settings.append(tooltip);
            break;
        case 'assert_element_exist':
            removeSettings(step_container)
            
            var settings = document.createElement('div');
            settings.id = 'settings';
            settings.className = 'scenario-creation-step-settings';

            var val_input = document.createElement('input');
            val_input.placeholder = "XPATH";
            val_input.setAttribute('data', 'xpath');
            
            var tooltip = document.createElement('div');
            tooltip.id = e.target.id + '-tooltip';
            tooltip.className = 'tooltip'
            tooltip.innerHTML = '? <div class="tooltiptext"> Potwierdza, czy na stronie znajduje się element którego XPATH zdefiniowaliśmy. </div>';

            step_container.append(settings);
            settings.append(val_input);
            settings.append(tooltip);
            break;

        case 'assert_element_contains_string':
            removeSettings(step_container)
            
            var settings = document.createElement('div');
            settings.id = 'settings';
            settings.className = 'scenario-creation-step-settings';

            var locator = document.createElement('input');
            locator.placeholder = "XPATH";
            locator.setAttribute('data', 'xpath');

            var val_input = document.createElement('input');
            val_input.placeholder = "jakas wartosc";
            val_input.setAttribute('data', 'string');
            
            var tooltip = document.createElement('div');
            tooltip.id = e.target.id + '-tooltip';
            tooltip.className = 'tooltip'
            tooltip.innerHTML = '? <div class="tooltiptext"> Potwierdza czy element którego XPATH zdefiniowaliśmy istnieje, a następnie czy zawiera podaną wartość tekstową. </div>';

            step_container.append(settings);
            settings.append(locator);
            settings.append(val_input);
            settings.append(tooltip);
            break;

        case 'assert_string_exists':
            removeSettings(step_container)
            
            var settings = document.createElement('div');
            settings.id = 'settings';
            settings.className = 'scenario-creation-step-settings';

            var val_input = document.createElement('input');
            val_input.placeholder = "string";
            val_input.setAttribute('data', 'string');
            
            var tooltip = document.createElement('div');
            tooltip.id = e.target.id + '-tooltip';
            tooltip.className = 'tooltip'
            tooltip.innerHTML = '? <div class="tooltiptext"> Potwierdza, czy na stronie znajduje się element którego XPATH zdefiniowaliśmy </div>';

            step_container.append(settings);
            settings.append(val_input);
            settings.append(tooltip);
            break;

        case ' --- ':
            removeSettings(step_container);
            break;

        }
}

function removeSettings(parent) {
    var child_elems = parent.children;

    if (child_elems.length > 1){
        if (child_elems[1].id == 'settings'){
        parent.removeChild(child_elems[1])}
        }
     else {
        console.log('no tag with id settings')
    }

}

function downloadJson(e){

    const steps = Array.from(document.getElementsByClassName('scenario-creation-step'));
    const data = {};


    for (const c in steps){

        
        var currentStep_dict = {};
        currentStep_dict['function'] = steps[c].childNodes[0].value;
        
        let inputs = Array.from(steps[c].childNodes[1].getElementsByTagName('input'));
        
        var values = {};
        for (const i in inputs){

            console.log('input data ' + inputs[i].getAttribute('data'));
            console.log('input value ' + inputs[i].value);
            
            values[inputs[i].getAttribute('data')] = inputs[i].getAttribute('value');
        }
        currentStep_dict['values'] = values;

    
        data[c] = currentStep_dict;
    } 

    console.log(data.type)
}