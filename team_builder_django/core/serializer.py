from rest_framework import serializers
from . models import *
  
class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = [
                'id',
                'name_first',
                'name_last',
                'skills',
                'bpt_confidence',
                'bpt_delegator',
                'bpt_determination',
                'bpt_disruptor',
                'bpt_independence',
                'bpt_knowledge',
                'bpt_profitability',
                'bpt_relationship',
                'bpt_risk',
                'bpt_selling',
                ]

class RequestedTeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = RequestedTeam
        field = [
            'id'
            'teamSize',
            'skills'
        ]