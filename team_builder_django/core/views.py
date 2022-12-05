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
        getId = self.request.GET.get('id', request.data["id"])
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
# End API specifications