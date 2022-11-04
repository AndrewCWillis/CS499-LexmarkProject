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
                "name_last": detail.name_last,
                "name_first": detail.name_first,
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
        return Response(
            data = {"id": 2},
            status = httpStatus.HTTP_200_OK
            )
    


def createValidTeams(teamsize, skills):

    # Search Employee objects to find all that have matching skills

    # TODO: Determine what needs to be returned.. Single Id? Array of Ids?
    return [1, 2, 3, 4, 5]