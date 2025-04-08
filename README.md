# Express Template for RemoteQuery (TypeScript)

Complete template for using RemoteQuery as database component for a web application.

Status: Work in progress


## How to use

- Copy all or parts of the sources to a new or existing project.
- Adjust to your needs

### ApiController.ts

The ApiController processes the http requests using the RemoteQuery back end. It provides:

- Processing input: POST and GET parameters
- Security: user authentication
- File upload: secure saving of uploaded files
- ...

### remotequery-ts (folder)

This folder contains all remotequery sources. In the near future this will be available as npm component.
Here some hints how to handle it:
- In the drivers folder you can add or remove drivers you need or not.
- 
