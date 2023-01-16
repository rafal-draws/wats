import json
from datetime import datetime
from time import sleep

from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager

from selenium.webdriver.common.by import By

from models import *




class Test:
    def __init__(self, Execution):
        self.Execution = Execution
        self.steps = Execution.steps
        self.flag = False
        self.driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()))
    
    def kill_driver(self):
        self.driver.quit()

    def interpret_steps(self):
        self.steps = self.steps.replace('\'', '"')

        steps = json.loads((self.steps.replace('\'', '\"')))
        
        self.Execution.status = "In progress"

        for step in steps:
            
            function = steps[step]['function']
            values = steps[step]['values']

            log_to_execution(self.Execution, f'action for {function} being interpreted - {values}')
            
            print(function)
            run_action(self, function, values)
        
        if self.flag == True:
            print('steps have been interpreted, the test has been successfull')

            log_to_execution(self.Execution, 'steps have been interpreted, the test has been successfull')
            self.Execution.status = "Finished Successfully"
        else:
            print('steps have been interpreted, the test has been unsuccessfull')
            
            log_to_execution(self.Execution, 'steps have been interpreted, the test has been unsuccessfull')
            self.Execution.status = "Finished Unsuccessfully"

        # sleep(5)


def run_action(test, function, values):
    match function:

        case "go_to_url":
            url = values['url']
            
            test.driver.get(url)

        case "click_element":
            xpath = values['xpath']
            try:
                test.driver.find_element(By.XPATH, xpath).click()
            except Exception as e:
                log_to_execution(test.Execution, 'steps have been interpreted, the test has been unsuccessfull')
                

        case "send_keys_to_element":
            xpath = values['xpath']
            send_value = values['keysToSend']
            try:
                test.driver.find_element(By.XPATH, xpath).send_keys(send_value)
            except Exception as e:
                print(e)

        case "wait":
            try:
                time_amount = int(values['amount'])
                sleep(time_amount)
            except:
                print("time is not int type, skipping waiting")

        case "refresh":
            try:
                test.driver.refresh()
            except Exception as e:
                print(e)

        case "assert_element_contains_string":
            xpath = values['xpath']
            string = values['string']

            try:
                elem = test.driver.find_elements(By.XPATH, xpath)

                if string in elem.value:
                    print(f"Element located at {xpath} contains string {string}")


                            #TODO
                    print(test.flag)
                    test.flag = True
                    print(test.flag)
                else:
                    test.flag = False

            except Exception as e:
                print(e)

        case "assert_title_is":
            string = values['string']

            try:
                title = test.driver.title

                if title == string:
                    print(f"title is {string}")
                    test.flag = True
                else:
                    test.flag = False
            except Exception as e:
                print(e)

        
        case "assert_title_has":
            string = values['string']

            try:
                title = test.driver.title

                if string in title:
                    print(f"title has {string}")
                    test.flag = True
                else:
                    test.flag = False

            except Exception as e:
                print(e)

        case "assert_string_exists":
            source = test.driver.page_source

            string = values['string']
            try:
                if string in source:
                    print(f"source contains string {string}")
                    test.flag = True
                else:
                    test.flag = False
            
            except Exception as e:
                print(e)


        case _:
            print("there has been an error in step function parsing!")



def start_execution(Execution):
    print("====================\nExecution started\nInitiating Test Class")

    flag = False
    
    current = Test(Execution)
    log_to_execution(Execution, "Execution started!")

    log_to_execution(Execution, f"Steps to interpretation {current.steps}")
    current.interpret_steps()


    current.kill_driver()
