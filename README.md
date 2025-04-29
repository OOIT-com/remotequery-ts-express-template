# Express Template for RemoteQuery (TypeScript)

Complete template for using RemoteQuery as backend and database component for a web application.


## How to use

- Copy all or parts of the sources to a new or existing project.
- Adjust to your needs

### src/myapp

In the folder src/myapp you find all the application and system specific elements. E.g.
- RemoteQueryController
- services

#### RemoteQueryController
 
The RemoteQueryController processes the http requests using the RemoteQuery back end. It provides:

- Processing input: POST and GET parameters
- Security: user authentication
- File upload: secure saving of uploaded files
- ...


#### services
 
Many services, ordered by application sections...


### db-scripts

In the folder db-scripts you find all scripts for creating db objects.



### remotequery-ts (folder)

This folder contains all RemoteQuery sources. In the near future this will be available as npm component.
Here some hints how to handle it:
- In the drivers folder you can add or remove drivers you need or not.
- PSQL is supported with a driver


### Status: Work in progress
