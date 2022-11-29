import requests
import unittest

employee_URL = 'http://127.0.0.1:8000/employees/'
requested_teams_URL = 'http://127.0.0.1:8000/requested_teams/'
sent_teams_URL = 'http://127.0.0.1:8000/sent_teams/'

class TestAlgorithm(unittest.TestCase):
    testEmployeeIds = []
    testSkills = []

    def setUp(self):
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
        for empID in self.testEmployeeIds:
            data = {"id": empID}
            self._send(employee_URL, data, type="delete")
        self.testEmployeeIds.clear()
    
    def _getTeam(self, teamSize:int, skills:list) -> list:
        """ Mimics the frontend's team request: given a size and a list of skills, returns a list of employee id's"""
        data = {"teamSize": teamSize, "skills": self._collapseTestSkills(skills)}
        resp = self._send(requested_teams_URL, data, type="post")
        resp = self._send(sent_teams_URL, {"id": resp["id"]}, type="get")
        return resp['team']

    def _send(self, url:str, data:dict, type="post"):
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
        """ Creates a person with the given traits and inserts them into the database.  Returns the database id (int)."""
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
        pID = resp["id"]
        self.testEmployeeIds.append(pID)
        return pID
    
    def _collapseTestSkills(self, skills:list[str]) -> str:
        retStr = ""
        for skill in skills:
            retStr += skill + ","
        return retStr.rstrip(",")

if __name__ == '__main__':
    unittest.main()