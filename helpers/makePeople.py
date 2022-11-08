import json
from random import randint, random
from numpy import random as npRand

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
        Confidence = .42
        Delegator = .50
        Determination = .56
        Disruptor = .49
        Independence = .50
        Knowledge = .53
        Profitability = .36
        Relationship = .44
        Risk = .48
        Selling = .40
        bpt_confidence = round(npRand.normal(Confidence, 1-Confidence),2)
        bpt_delegator = round(npRand.normal(Delegator, 1-Delegator),2)
        bpt_determination = round(npRand.normal(Determination, 1-Determination),2)
        bpt_disruptor = round(npRand.normal(Disruptor, 1-Disruptor),2)
        bpt_independence = round(npRand.normal(Independence, 1-Independence),2)
        bpt_knowledge = round(npRand.normal(Knowledge, 1-Knowledge),2)
        bpt_profitability = round(npRand.normal(Profitability, 1-Profitability),2)
        bpt_relationship = round(npRand.normal(Relationship, 1-Relationship),2)
        bpt_risk = round(npRand.normal(Risk, 1-Risk),2)
        bpt_selling = round(npRand.normal(Selling, 1-Selling),2)
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

print(getNames(1))
# data = getNames(250)

# import requests

# for person in data:
#     response = requests.post('http://127.0.0.1:8000/employees/', json=person)
#     if response.status_code != 200:
#         print("Status code: ", response.status_code)
#         print("Printing Entire Post Request")
#         print(response.json())
