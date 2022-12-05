from django.shortcuts import render 
from django.http import request as request
from django.http import JsonResponse
from rest_framework.views import APIView
from . models import *
from rest_framework.response import *
from rest_framework import status as httpStatus
from . serializer import *

from . teamAlgorithm import createValidTeams

# Begin API specifications
# Employees API 
class Employees(APIView):

    serializerClass = EmployeeSerializer

    # Employees/GET accepts any requests, but returns a signle Emplyee detail if an Id is provided
    def get(self, request):
        # Retrieve requested Employee ID to GET from the URI Parameters
        getId = self.request.GET.get('id', None)
        
        # This control flow allows use of the in-browser REST Framework view (permits a GET with no Id URI parameter)
        if(getId != None):
            # Find an Employee object with matching id
            detail = Employee.objects.get(id=getId)

            # Access all the Employee's data, and package it in JSON format for return
            detail = {
                    "id": detail.id,
                    "name_first": detail.name_first,
                    "name_last": detail.name_last,
                    "skills": detail.skills,
                    "bpt_confidence": detail.bpt_confidence,
                    "bpt_delegator": detail.bpt_delegator,
                    "bpt_determination": detail.bpt_determination,
                    "bpt_disruptor": detail.bpt_disruptor,
                    "bpt_independence": detail.bpt_independence,
                    "bpt_knowledge": detail.bpt_knowledge,
                    "bpt_profitability": detail.bpt_profitability,
                    "bpt_relationship": detail.bpt_relationship,
                    "bpt_risk": detail.bpt_risk,
                    "bpt_selling": detail.bpt_selling
                }
            return Response(detail, status = httpStatus.HTTP_200_OK)
        else:
            return Response(status = httpStatus.HTTP_200_OK) # API accepts all GET requests, only returns data on valid requests

    # Employees/POST will create an Employee record if the requests' data is of the correct format
    def post(self, request):
        # Attempt to serialize requests' data to db format
        serializer = EmployeeSerializer(data=request.data) 

         # If serialization is successful, save request data as a new Employee
        if serializer.is_valid(raise_exception=True):     
            serializer.save()
            # Return the Id value of the newly created Employee 
            data = serializer.data
            data["id"] = Employee.objects.latest("id").id      
            return Response(
                data = data,
                status = httpStatus.HTTP_200_OK
            )
        else:
            return Response(httpStatus.HTTP_400_BAD_REQUEST)
    
    # Employees/DELETE will delete an Employee record if the Id is present 
    def delete(self, request):
        getId = self.request.GET.get('id', None)
        if(getId != None):
            employee = Employee.objects.get(id=getId)
            employee.delete()
            return Response(data={}, status= httpStatus.HTTP_200_OK)
        else:
            return Response(data={}, status=httpStatus.HTTP_404_NOT_FOUND)

# RequestedTeams API
class RequestedTeams(APIView):

    serializerClass = RequestedTeamSerializer
    
    # RequestedTeams/GET is not actively called by the application
    # This is defined so that the API can be viewed in a web browser
    # This will display all of the RequestedTeam combinations currently in the database 
    def get(self, request):
        detail = [
            {
                "id":detail.id,
                "teamSize":detail.teamSize,
                "skills": detail.skills
            }
        for detail in RequestedTeam.objects.all()]

        return Response(detail)
    
    # RequestedTeams/POST 
    # Successful RequestedTeam POST results in CREATE of SentTeam & Response of created SentTeam's ID
    def post(self, request):
        serializer = RequestedTeamSerializer(data=request.data)

        # Determine if the requests data is a valid RequestedTeam 
        if serializer.is_valid(raise_exception=True):
            serializer.save()

            # Using the RequestedTeams' parameters, get a list of EmployeeIds that make a valid team
            validTeam = createValidTeams(RequestedTeam.objects.latest("id").teamSize, RequestedTeam.objects.latest("id").skills)

            # Determine the success of the algorithm for Front End display logic
            returnBool = RequestedTeam.objects.latest("id").teamSize == len(validTeam)

            # Create a SentTeam object
            SentTeam.objects.create(
                reqID = RequestedTeam.objects.latest("id").id,
                team = repr(validTeam)
            )

            # Respond to POST with 200_OK and the Id of the created team
            return Response(
                data = {"id": SentTeam.objects.latest("id").id,
                        "completeTeam": returnBool},     
                status = httpStatus.HTTP_200_OK
                )
        else: # The RequestedTeam was not valid, reject with 400
            return Response(
                status = httpStatus.HTTP_400_BAD_REQUEST
            )

# SentTeams API
class SentTeams(APIView):
    
    serializerClass = SentTeamSerializer

    # SentTeams/GET expects an Id, and returns the corresponding data object at that index of the SentTeams table
    def get(self, request):
        # Retrieve requested SentTeam ID to GET from the URI Parameters
        getId = self.request.GET.get('id', None)
        
        # This control flow allows use of the in-browser REST Framework view (permits a GET with no id URI parameter)
        if(getId != None):
            # Find (or attempt to) an Employee object with matching id
            detail = SentTeam.objects.get(id=getId)

            # Access all the Employee's data, and package it in JSON format for return
            detail = {
                "team": eval(detail.team)
            }
            return Response(detail, status = httpStatus.HTTP_200_OK)
        else:
            return Response(status = httpStatus.HTTP_404_NOT_FOUND)

    # SentTeams/POST is not actively called by the application
    # SentTeams are created during a valid RequestedTeams POST request
    # This is include for reference, testing, and future feature implementation
    def post(self, request):
            serializer = SentTeamSerializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
            return Response(serializer.data)
<<<<<<< HEAD
# End API specifications

def createValidTeams(teamSize: int, skills: str) -> list:
    members = []

    skillList = skills.split(",")
    masterEmployeeList = list(Employee.objects.filter(skills__contains=skillList[0].strip()))
    for skill in skillList[1:]:
        employeeList = list(Employee.objects.filter(skills__contains=skill.strip()))
        for employee in masterEmployeeList:
            if employee not in employeeList:
                masterEmployeeList.remove(employee)
    
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


    members.sort(reverse=True)
    
    # Building a possible team
    possible = Team()
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
                return possible.ids
    else:
        for i in members:
            possible.add(i)
        return possible.ids

class Member:
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
    def __init__(self) -> None:
        self.ids = []
        self.confidence = 0
        self.delegator = 0
        self.determination = 0
        self.disruptor = 0
        self.independence = 0
        self.knowledge = 0
        self.profitability = 0
        self.relationship = 0
        self.risk = 0
        self.selling = 0
        self.size = 0
    
    def add(self, member: Member) -> None:
        self.ids.append(member.id)
        self.confidence += member.confidence
        self.delegator += member.delegator
        self.determination += member.determination
        self.disruptor += member.disruptor
        self.independence += member.independence
        self.knowledge += member.knowledge
        self.profitability += member.profitability
        self.relationship += member.relationship
        self.risk += member.risk
        self.selling += member.selling
        self.size += 1
    
    def remove(self, member: Member) -> None:
        self.ids.remove(member.id)
        self.confidence -= member.confidence
        self.delegator -= member.delegator
        self.determination -= member.determination
        self.disruptor -= member.disruptor
        self.independence -= member.independence
        self.knowledge -= member.knowledge
        self.profitability -= member.profitability
        self.relationship -= member.relationship
        self.risk -= member.risk
        self.selling -= member.selling
        self.size -= 1
    
    def isValid(self) -> bool:
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
        if self.confidence < ConfidenceThreshold:
            return False
        elif self.delegator < DelegatorThreshold:
            return False
        elif self.determination < DeterminationThreshold:
            return False
        elif self.disruptor < DisruptorThreshold:
            return False
        elif self.independence < IndependenceThreshold:
            return False
        elif self.knowledge < KnowledgeThreshold:
            return False
        elif self.profitability < ProfitabilityThreshold:
            return False
        elif self.relationship < RelationshipThreshold:
            return False
        elif self.risk < RiskThreshold:
            return False
        elif self.selling < SellingThreshold:
            return False
        return True

    def __str__(self):
        rStr = str(self.ids)+"\n"
        rStr += f"confidence:    {self.confidence/self.size}\n"
        rStr += f"delegator:     {self.delegator/self.size}\n"
        rStr += f"determination: {self.determination/self.size}\n"
        rStr += f"disruptor:     {self.disruptor/self.size}\n"
        rStr += f"independence:  {self.independence/self.size}\n"
        rStr += f"knowledge:     {self.knowledge/self.size}\n"
        rStr += f"profitability: {self.profitability/self.size}\n"
        rStr += f"relationship:  {self.relationship/self.size}\n"
        rStr += f"risk:          {self.risk/self.size}\n"
        rStr += f"selling:       {self.selling/self.size}\n"
        return rStr
    
    def __len__(self):
        return self.size
=======
>>>>>>> algorithm
