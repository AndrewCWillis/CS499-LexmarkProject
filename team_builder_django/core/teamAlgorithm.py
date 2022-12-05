# =================================================================================================
# Author:   Alexander Barrera
# File:     teamAlgorithm.py
# Purpose:  This file implements the algorithm to choose the best team
# How-to:   The createValidTeams function in this file is called when the user sends a POST request
#           to the /requested_teams page.
# =================================================================================================

from core.views import Employee

def createValidTeams(teamSize: int, skills: str) -> list:
    """ Expects a positive integer greater than 0 for teamsize, and a comma separated list of skills.
        Returns a list of integers (employee id's).
    """
    members = []
    skillList = skills.split(",")

    # Getting all of the employees with the first skill in the list (filters the entire employee database on first skill)
    masterEmployeeList = list(Employee.objects.filter(skills__contains=skillList[0].strip()))
    for skill in skillList[1:]:
        # Getting all of the employees with the next skill in the list
        employeeList = list(Employee.objects.filter(skills__contains=skill.strip()))
        # Looping through the list of employees with the first skill and removing them if they don't have the next skil
        for employee in masterEmployeeList:
            if employee not in employeeList:
                masterEmployeeList.remove(employee)
    
    # Turning employees into Member objects and adding them to the list
    for e in masterEmployeeList:
        members.append(Member(
            e.id,
            e.name_first, 
            e.name_last, 
            e.skills.split(','),
            e.bpt_confidence,
            e.bpt_delegator,
            e.bpt_determination,
            e.bpt_disruptor,
            e.bpt_independence,
            e.bpt_knowledge,
            e.bpt_profitability,
            e.bpt_relationship,
            e.bpt_risk,
            e.bpt_selling
            )
        )

    # Sorting the team members from greatest (average BP10 scores) to least
    members.sort(reverse=True)
    
    # Building a possible team
    possible = Team()
    # If you have more members that meet the skills requirement than requested team size
    if len(members) > teamSize:
        for i in range(teamSize):
            possible.add(members[i])
        
        # Checking to make sure the team is above thresholds
        for i in range(teamSize-1, len(members)):
            if not possible.isValid():
                possible.remove(members[i])
                if i+1 < len(members):
                    possible.add(members[i+1])
            else:
                break
        return possible.getIds()
    # Otherwise just return all that meet the requirement
    else:
        for i in members:
            possible.add(i)
        return possible.getIds()

class Member:
    """ This object holds an employee's bp10 traits, their skills, their id and their total BP10 score.  This allows me to sort based on total score."""
    def __init__(
        self,
        id, 
        first, 
        last, 
        skills, 
        confidence,
        delegator,
        determination,
        disruptor,
        independence,
        knowledge,
        profitability,
        relationship,
        risk,
        selling
    ) -> None:
        self.id = id
        self.first = first 
        self.last = last 
        self.skills = skills 
        self.confidence = confidence
        self.delegator = delegator
        self.determination = determination
        self.disruptor = disruptor
        self.independence = independence
        self.knowledge = knowledge
        self.profitability = profitability
        self.relationship = relationship
        self.risk = risk
        self.selling = selling
        self.total = confidence + delegator + determination + disruptor + independence + knowledge + profitability + relationship + risk + selling
    
    def __lt__(self, other):
        return self.total < other.total
    
    def __str__(self) -> str:
        return str(self.id)

class Team:
    """ This object holds the possible team members and checks to see if the team is valid.  The team will be valid if the average of the
        BP10 traits for the team is above the national average.
    """ 
    def __init__(self) -> None:
        self.members = []
    
    def add(self, member: Member) -> None:
        self.members.append(member)
    
    def remove(self, member: Member) -> None:
        self.members.remove(member)
    
    def getSize(self) -> int:
        return len(self.members)
    
    def getIds(self) -> list:
        return [x.id for x in self.members]
    
    def getConfidence(self):
        val = 0
        for member in self.members:
            val += member.confidence
        return (int(val*100)/self.getSize())/100

    def getDelegator(self):
        val = 0
        for member in self.members:
            val += member.delegator
        return (int(val*100)/self.getSize())/100

    def getDetermination(self):
        val = 0
        for member in self.members:
            val += member.determination
        return (int(val*100)/self.getSize())/100

    def getDisruptor(self):
        val = 0
        for member in self.members:
            val += member.disruptor
        return (int(val*100)/self.getSize())/100

    def getIndependence(self):
        val = 0
        for member in self.members:
            val += member.independence
        return (int(val*100)/self.getSize())/100

    def getKnowledge(self):
        val = 0
        for member in self.members:
            val += member.knowledge
        return (int(val*100)/self.getSize())/100

    def getProfitability(self):
        val = 0
        for member in self.members:
            val += member.profitability
        return (int(val*100)/self.getSize())/100

    def getRelationship(self):
        val = 0
        for member in self.members:
            val += member.relationship
        return (int(val*100)/self.getSize())/100

    def getRisk(self):
        val = 0
        for member in self.members:
            val += member.risk
        return (int(val*100)/self.getSize())/100

    def getSelling(self):
        val = 0
        for member in self.members:
            val += member.selling
        return (int(val*100)/self.getSize())/100
   
    def isValid(self) -> bool:
        # This methods checks to see if the team's average BP10 score is above the thresholds below.  These are national averages.
        ConfidenceThreshold = .42
        DelegatorThreshold = .50
        DeterminationThreshold = .56
        DisruptorThreshold = .49
        IndependenceThreshold = .50
        KnowledgeThreshold = .53
        ProfitabilityThreshold = .36
        RelationshipThreshold = .44
        RiskThreshold = .48
        SellingThreshold = .40
        if self.getConfidence() < ConfidenceThreshold:
            return False
        elif self.getDelegator() < DelegatorThreshold:
            return False
        elif self.getDetermination() < DeterminationThreshold:
            return False
        elif self.getDisruptor() < DisruptorThreshold:
            return False
        elif self.getIndependence() < IndependenceThreshold:
            return False
        elif self.getKnowledge() < KnowledgeThreshold:
            return False
        elif self.getProfitability() < ProfitabilityThreshold:
            return False
        elif self.getRelationship() < RelationshipThreshold:
            return False
        elif self.getRisk() < RiskThreshold:
            return False
        elif self.getSelling() < SellingThreshold:
            return False
        return True

    def __str__(self):
        rStr = str(self.ids)+"\n"
        rStr += f"confidence:    {self.getConfidence()}\n"
        rStr += f"delegator:     {self.getDelegator()}\n"
        rStr += f"determination: {self.getDetermination()}\n"
        rStr += f"disruptor:     {self.getDisruptor()}\n"
        rStr += f"independence:  {self.getIndependence()}\n"
        rStr += f"knowledge:     {self.getKnowledge()}\n"
        rStr += f"profitability: {self.getProfitability()}\n"
        rStr += f"relationship:  {self.getRelationship()}\n"
        rStr += f"risk:          {self.getRisk()}\n"
        rStr += f"selling:       {self.getSelling()}\n"
        return rStr
    
    def __len__(self):
        return len(self.members)