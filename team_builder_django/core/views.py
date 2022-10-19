from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView
from . models import *
from rest_framework.response import Response
from . serializer import *

# Create your views here.
class Employees(APIView):

    serializerClass = EmployeeSerializer

    def get(self, request):
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
            } 
            for detail in Employee.objects.all()]

        return Response(detail)

    def post(self, request):
        serializer = EmployeeSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        return Response(serializer.data)

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
        return Response(serializer.data)