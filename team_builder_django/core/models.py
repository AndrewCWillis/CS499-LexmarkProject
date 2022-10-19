from django.db import models

# Create your models here.
class Employee(models.Model):
    id = models.IntegerField(primary_key=True)
    name_first = models.CharField(max_length=50)
    name_last = models.CharField(max_length=50)
    skills = models.TextField()
    bpt_confidence = models.FloatField()
    bpt_delegator = models.FloatField()
    bpt_determination = models.FloatField()
    bpt_disruptor = models.FloatField()
    bpt_independence = models.FloatField()
    bpt_knowledge = models.FloatField()
    bpt_profitability = models.FloatField()
    bpt_relationship = models.FloatField()
    bpt_risk = models.FloatField()
    bpt_selling = models.FloatField()

class RequestedTeam(models.Model):
    id = models.IntegerField(primary_key=True)
    teamSize = models.IntegerField()
    skills = models.TextField()
    
# class Team(models.Model):
    # Team Size?
    # Array of Employee references?
    # Balanced by BP10 bool?
    # BP10 Talent Metrics?
    # Date Created? Incase median values of talents shift OR an employee's talent(s) change