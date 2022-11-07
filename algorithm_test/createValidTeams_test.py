import requests

address = "http://127.0.0.1:8000/requested_teams/"

data = {
    "teamSize": 5,
    "skills": "Arabic"
    }

response = requests.post(address, json=data)

print("Status code: ", response.status_code)
print("Printing Entire Post Request")
print(response.json())