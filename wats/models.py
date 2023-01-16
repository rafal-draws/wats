import os
import json
from datetime import datetime

from app import *


class Scenario(db.Model):
    __tablename__ = 'scenarios'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), unique=True)
    expected = db.Column(db.String(50))
    steps = db.Column(db.Text)
    author = db.Column(db.String(255))

    def __init__(self, name, expected, steps, author):
        self.name = name
        self.expected = expected
        self.steps = steps
        self.author = author


def create_scenario(name, expected, steps, author):

    scenario = Scenario(name, expected, steps, author)
    db.session.add(scenario)
    db.session.commit()

    return scenario

def remove_scenario(name):

    scenario = db.session.query(Scenario).filter(Scenario.name == name)
    
    scenario.delete(synchronize_session = 'evaluate')
    db.session.commit()

    return f'{scenario} removed successfully'



class PossibleStep(db.Model):
    __tablename__ = 'possiblesteps'

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(50))
    name = db.Column(db.String(255))
    description = db.Column(db.Text)
    example_values = db.Column(db.Text)

    def __init__(self, type, name, description, example_values):
        self.name = name
        self.type = type
        self.description = description
        self.example_values = example_values

    def __repr__(self):
        return str([self.id, self.type, self.name, self.description, self.example_values])

class Execution(db.Model):
    __tablename__ = 'execution'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    expected = db.Column(db.String(50))
    steps = db.Column(db.Text)
    author = db.Column(db.String(255))
    status = db.Column(db.String(64), default = "Started")
    logs = db.Column(db.Text)

    def __init__(self, name, expected, steps, author):
        self.name = name
        self.expected = expected
        self.author = author
        self.steps = steps


def create_execution(name, expected, author, steps):
    execution = Execution(name, expected, steps, author)
    db.session.add(execution)
    db.session.commit()

    return execution

def log_to_execution(execution, log):
    execution.logs = str(execution.logs) + f"\n|| {datetime.now()} - {log}"
    db.session.commit()

def create_possible_step(type, name, description, example_values):
    possible_step = PossibleStep(type, name, description, example_values)
    db.session.add(possible_step)
    db.session.commit()

    return possible_step


def initiate_steps(data_path):

    with open(data_path) as json_file:
        data = json.load(json_file)

        for category in data.keys():
            print("|__________________________________")
            print("|\n|\n|\n|TYPE:", category)
            print("|\n|\n|example_values:")
            for step in data[category]:
                print("|name: ", step)
                print("|example_values:", data[category][step]['values'])
                print("|description: %s \n|" % data[category][step]['description'])
            print("|\n|")


        for i in data['navigation']:
            type = 'navigation'
            name = i
            description = data['navigation'][i]['description']
            example_values = data['navigation'][i]['values']
            new_possible_step = create_possible_step(type, name, description, example_values)
            print(new_possible_step)

        for i in data['element_interactions']:
            type = 'element_interactions'
            name = i
            description = data['element_interactions'][i]['description']
            example_values = str(data['element_interactions'][i]['values'])
            new_possible_step = create_possible_step(type, name, description, example_values)
            print(new_possible_step)
        
        for i in data['asserts']:
            type = 'asserts'
            name = i
            description = data['asserts'][i]['description']
            example_values = str(data['asserts'][i]['values'])
            new_possible_step = create_possible_step(type, name, description, example_values)
            print(new_possible_step)
        


if __name__ == "__main__":
    with app.app_context():
        print("Creating database tables..")
        db.create_all()
        print("Done!")
        print("Loading initial data")
        initiate_steps(os.getcwd() + "/data/possiblesteps.json")
        print("Data initiation process finished, all possible steps loaded!")
