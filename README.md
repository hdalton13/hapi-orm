# Hapi ORM Assignment

Starter code for the assignment.

Questions:
1) Working on /vaccines and so far i've been get a ValidationError with the message "message": "unknown relation \"companies\" in an eager expression". Do I need to add a many-to-one relation from vaccine to company?
2) How do we post a connection in the joining table?
3) I know for the /patient/{pid}/vaccines/{vid} we have to retrieve those data points. I don't understand how to use it with create and delete

Have Done and Checked with Postman:
* Create: /patient
* Retrieve: /companies
* Retrieve: /patients
* Retrieve: /patients/{id}


Need to Complete:
* Create: /patient/{pid}/vaccines/{vid}
* Retrieve: /vaccines
* Update: /patients/{id}
* Delete: /patient/{pid}/vaccines/{vid}
