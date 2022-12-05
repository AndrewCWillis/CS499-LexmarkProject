# =================================================================================================
# Author:   Alexander Barrera
# File:     createValidTeams_test.py
# Purpose:  This file tests the site's algorithm functionality
# How-to:   To use this file, start up the backend (see instructions here: 
#           https://github.com/AndrewCWillis/CS499-LexmarkProject).  Once the backend is up, run
#           pytest createValidTeams_test.py in this directory.
# =================================================================================================
import requests
import unittest

employee_URL = 'http://127.0.0.1:8000/employees/'
requested_teams_URL = 'http://127.0.0.1:8000/requested_teams/'
sent_teams_URL = 'http://127.0.0.1:8000/sent_teams/'

class TestAlgorithm(unittest.TestCase):
    testEmployeeIds = []
    testSkills = []

    def setUp(self):
        # Default setup method.  Inserts the "testSkill" skill into the desired employee's skills list.
        self.testSkills.append("testSkill")
    
    def test_RequestTwoReturnOne(self):
        # This should return only the one member with the "testSkill" skill
        pID = self._makePerson("test", "tester", self.testSkills)               # Making one person with the "testSkill" skill and dding them to the database

        team = self._getTeam(2, self.testSkills)                                # Requesting a team size of 2 with the "testSkill" skill
        self.assertEqual(len(team), 1)                                          # Ensuring that the team returns only 1 team member
        self.assertEqual(team[0], pID)                                          # Ensuring that the one person on the team is the one we generated

    def test_ReturnTheBestTwo(self):
        # After generating three otherwise identical people, and requesting two, it should return the two with the highest traits
        p1 = self._makePerson("p1", "p1", self.testSkills) # Defaults to .5 across
        p2 = self._makePerson("p2", "p2", self.testSkills, .6,.6,.6,.6,.6,.6,.6,.6,.6,.6)
        p3 = self._makePerson("p3", "p3", self.testSkills, .7,.7,.7,.7,.7,.7,.7,.7,.7,.7)

        team = self._getTeam(2, self.testSkills)
        self.assertNotIn(p1, team)
        self.assertIn(p2, team)
        self.assertIn(p3, team)
    
    def test_GetNextBest(self):
        # If you have three people and they don't cover down on all categories, take the next best person
        p1 = self._makePerson("p1", "p1", self.testSkills, .6,.6,.6,.6,.6,.6,.6,.6,.6,.7)
        p2 = self._makePerson("p2", "p2", self.testSkills, .7,.7,.7,.7,.7,.7,.7,.7,.7,.2)
        p3 = self._makePerson("p3", "p3", self.testSkills, .8,.8,.8,.8,.8,.8,.8,.8,.8,.1)
        p4 = self._makePerson("p4", "p4", self.testSkills, .9,.9,.9,.9,.9,.9,.9,.9,.9,.1)

        team = self._getTeam(2, self.testSkills)
        self.assertNotIn(p2, team)
        self.assertNotIn(p3, team)
        self.assertIn(p1, team)
        self.assertIn(p4, team)

    def tearDown(self):
        """ Default teardown function to clean up the database once we're done testing """
        for empID in self.testEmployeeIds:
            data = {"id": empID}
            self._send(employee_URL, data, type="delete")
        self.testEmployeeIds.clear()
    
    def _getTeam(self, teamSize:int, skills:list) -> list:
        """ Mimics the frontend's team request: given a size and a list of skills, returns a list of employee id's"""
        data = {"teamSize": teamSize, "skills": ",".join(skills).rstrip(",")}
        resp = self._send(requested_teams_URL, data, type="post")
        if resp is None or "id" not in resp.keys():
            return []
        resp = self._send(sent_teams_URL, {"id": resp["id"]}, type="get")
        if resp is None or "team" not in resp.keys():
            return []
        return resp['team']

    def _send(self, url:str, data:dict, type:str = "post"):
        """ Sends the get, post and delete requests (defaults to post).  When successful, returns the json response """
        if type == "post":
            response = requests.post(url, json=data)
        elif type == "get":
            response = requests.get(url, params=data)
        elif type == "delete":
            response = requests.delete(url, json=data)
        
        if response.status_code != 200:
            print("Status code: ", response.status_code)
            print("Printing Entire Post Request")
            try:
                print(response.json())
            except:
                print(response)
        else:
            try:
                return response.json()
            except:
                return response

    def _makePerson(self, first:str, last:str, skills:list, conf:float = 0.5, dele:float = 0.5, dete:float = 0.5, disr:float = 0.5, inde:float = 0.5, know:float = 0.5, prof:float = 0.5, rela:float = 0.5, risk:float = 0.5, sell:float = 0.5) -> int:
        """ Creates a person with the given traits and inserts them into the database.  Returns the database id (int), or -1 on failure."""
        data = {
                "name_first":first[0].upper() + first[1:].lower(), 
                "name_last":last[0].upper() + last[1:].lower(), 
                "skills": ",".join(skills),
                "bpt_confidence": conf,
                "bpt_delegator": dele,
                "bpt_determination": dete,
                "bpt_disruptor": disr,
                "bpt_independence": inde,
                "bpt_knowledge": know,
                "bpt_profitability": prof,
                "bpt_relationship": rela,
                "bpt_risk": risk,
                "bpt_selling": sell
        }
        resp = self._send(employee_URL, data)
        if resp is None or "id" not in resp.keys():
           return -1 
        pID = resp["id"]
        self.testEmployeeIds.append(pID)
        return pID

if __name__ == '__main__':
    unittest.main()