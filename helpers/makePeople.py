# =================================================================================================
# Author:   Alexander Barrera
# File:     makePeople.py
# Purpose:  This file populates the database with dummy data.  The values follow a normal distribution
#           given national averages.
# How-to:   To use this file, start up the backend (see instructions here: 
#           https://github.com/AndrewCWillis/CS499-LexmarkProject).  Once the backend is up, run
#           python3 makePeople.py
#           From the directory that holds this file.  If you want to add a different number of people 
#           to the database, change the line that says: data = getNames(250) to a number other than 250.
# =================================================================================================
from random import randint, random
from scipy.stats import truncnorm

def computeTrait(traitAverage:float) -> float:
    # This function creates a randomly generated trait value given the trait's national average, using a
    #   normal distribution to give reasonable values
    lower = 0
    upper = 1

    return round(truncnorm.rvs((lower-traitAverage),(upper-traitAverage),loc=traitAverage,scale=1,size=1)[0],2)

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
        # Current national averages are below.  They're taken from the traitAverages.txt file in this directory.
        # Confidence = .42
        # Delegator = .50
        # Determination = .56
        # Disruptor = .49
        # Independence = .50
        # Knowledge = .53
        # Profitability = .36
        # Relationship = .44
        # Risk = .48
        # Selling = .40
        traitAverages = {}
        with open("traitAverages.txt", "r") as inFile:
            for line in inFile:
                splitLine = line.split(",")
                traitAverages[splitLine[0].strip()] = float(splitLine[1].strip())
        bpt_confidence = computeTrait(traitAverages["Confidence"])
        bpt_delegator = computeTrait(traitAverages["Delegator"])
        bpt_determination = computeTrait(traitAverages["Determination"])
        bpt_disruptor = computeTrait(traitAverages["Disruptor"])
        bpt_independence = computeTrait(traitAverages["Independence"])
        bpt_knowledge = computeTrait(traitAverages["Knowledge"])
        bpt_profitability = computeTrait(traitAverages["Profitability"])
        bpt_relationship = computeTrait(traitAverages["Relationship"])
        bpt_risk = computeTrait(traitAverages["Risk"])
        bpt_selling = computeTrait(traitAverages["Selling"])
        # ----------------------------------

        returnNames.append({
            "name_first":firstName[0].upper() + firstName[1:].lower(), 
            "name_last":lastName[0].upper() + lastName[1:].lower(), 
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
