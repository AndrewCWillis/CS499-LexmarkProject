import json
from random import randint, random

def getNames(howMany:int) -> list[dict]:
    boyNames = []
    girlNames = []
    lastNames = []
    skillsList = []
    returnNames = []
    with open("boyNames.txt") as inFile:
        for line in inFile:
            boyNames.append(line.strip())
    with open("girlNames.txt") as inFile:
        for line in inFile:
            girlNames.append(line.strip())
    with open("lastNames.txt") as inFile:
        for line in inFile:
            lastNames.append(line.strip())
    with open("skills.txt") as inFile:
        for line in inFile:
            skillsList.append(line.strip())
    
    for _ in range(howMany):
        # ----------- Name Stuff -----------
        bORg = randint(0,1)
        if bORg == 0:
            endIndex = len(girlNames)-1
            firstName = girlNames[randint(0,endIndex)]
        else:
            endIndex = len(boyNames)-1
            firstName = boyNames[randint(0,endIndex)]
        endIndex = len(lastNames)-1
        lastName = lastNames[randint(0, endIndex)]
        # ----------------------------------

        # ------------- Skills -------------
        skills = []
        numSkils = randint(1,15)
        endIndex = len(skillsList)-1
        for _ in range(numSkils):
            skills.append(skillsList[randint(0,endIndex)])
        # ----------------------------------

        # ------------- Traits -------------
        bpt_confidence = round(random(),2)
        bpt_delegator = round(random(),2)
        bpt_determination = round(random(),2)
        bpt_disruptor = round(random(),2)
        bpt_independence = round(random(),2)
        bpt_knowledge = round(random(),2)
        bpt_profitability = round(random(),2)
        bpt_relationship = round(random(),2)
        bpt_risk = round(random(),2)
        bpt_selling = round(random(),2)
        # ----------------------------------

        returnNames.append({
            "name_first":firstName, 
            "name_last":lastName, 
            "skills": ",".join(skills),
            "bpt_confidence": bpt_confidence,
            "bpt_delegator": bpt_delegator,
            "bpt_determination": bpt_determination,
            "bpt_disruptor": bpt_disruptor,
            "bpt_independence": bpt_independence,
            "bpt_knowledge": bpt_knowledge,
            "bpt_profitability": bpt_profitability,
            "bpt_relationship": bpt_relationship,
            "bpt_risk": bpt_risk,
            "bpt_selling": bpt_selling
            })
    
    return returnNames

data = getNames(250)

import requests

for person in data:
    response = requests.post('http://127.0.0.1:8000/employees/', json=person)
    if response.status_code != 200:
        print("Status code: ", response.status_code)
        print("Printing Entire Post Request")
        print(response.json())
