from django.shortcuts import render 
from django.http import request as request
from rest_framework.views import APIView
from . models import *
from rest_framework.response import *
from rest_framework import status as httpStatus
from . serializer import *


# Create your views here.
class Employees(APIView):

    serializerClass = EmployeeSerializer

    def get(self, request):
        # Retrieve requested User ID to GET from the URI Parameters
        getId = self.request.GET.get('id', None)

        # Find (or attempt to) an Employee object with matching id
        detail = Employee.objects.get(id=getId)

        # Access all the Employee's data, and package it in JSON format for return
        detail = [
            {
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
            }]

        return Response(detail)

    def post(self, request):
        serializer = EmployeeSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        print(request)
        return Response(
            data = serializer.data,
            status = httpStatus.HTTP_200_OK
        )

class RequestedTeams(APIView):

    serializerClass = RequestedTeamSerializer
    
    def get(self, request):
        detail = [
            {
                "id":detail.id,
                "teamSize":detail.teamSize,
                "skills": detail.skills
            }
        for detail in RequestedTeam.objects.all()]

        return Response(detail)
    
    def post(self, request):
        serializer = RequestedTeamSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            createValidTeams(RequestedTeam.objects.latest("id").teamSize, RequestedTeam.objects.latest("id").skills)
        return Response(
            data = {"id": RequestedTeam.objects.latest("id").id},
            status = httpStatus.HTTP_200_OK
            )
    


def createValidTeams(teamSize: int, skills: str) -> list:
    members = []
    for skill in skills.split(","):
        for e in Employee.objects.filter(skills__contains=skill.strip()):
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
    possible = Team()
    for i in range(teamSize):
        possible.add(members[i])
    
    # print(possible)


    # print(f"I was passed teamSize:{teamSize} and skills: {skills}")
    # for i in range(teamSize):
    #     print(f"{members[i].total} {members[i].skills} ")
    
    
    
    # Return a list of the ID's of the team members.
    return [r.id for r in members[0:teamSize-1]]


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

class Team:
    def __init__(self) -> None:
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
        if self.confidence / self.size < .5:
            return False
        elif self.delegator / self.size < .5:
            return False
        elif self.determination / self.size < .5:
            return False
        elif self.disruptor / self.size < .5:
            return False
        elif self.independence / self.size < .5:
            return False
        elif self.knowledge / self.size < .5:
            return False
        elif self.profitability / self.size < .5:
            return False
        elif self.relationship / self.size < .5:
            return False
        elif self.risk / self.size < .5:
            return False
        elif self.selling / self.size < .5:
            return False
        return True

    def __str__(self):
        rStr = ""
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