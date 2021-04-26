# Project Name
> An API that allows clients to create and manage a personal budget based on the envelope budgeting principles.

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Features](#features)
* [Status](#status)
* [Inspiration](#inspiration)
* [Contact](#contact)

## General info
Developed as a portfolio project for the Back-end Course on Codecademy. The course teaches all the major technologies and skills that a back-end engineer needs to know.

This project comes after completing 55% of the course.

## Technologies
* JavaScript
* Node.js
* Express.js

## Setup
To run this project you'll need to have Node.js installed on your machine.
Once installed, install the program's dependencies with `npm install` in your terminal with the project's folder as working directory.
You can then start the Express server by typing `node index.js`.

## Endpoints
Once you have the server up and running, the following end points will be reachable in http://localhost:3000/:

GET
* `/api/envelopes` - returns all envelopes
* `/api/envelopes/:envelopeId` - returns an envelope by id

POST
* `/api/envelopes` - creates a new envelope
* `/envelopes/:from/:to/:amount` - transfer amount from one envelope to another

DELETE
* `/api/envelopes/:id` - deletes an envelope by id

To-do list:
[ ] Refactor code
[ ] Create a frontend to display the envelopes and budgets, and allow users to update each envelope balance
[ ] Add an endpoint allowing user to add a single balance that’s distributed to multiple envelopes

## Status
Project is: _in progress_
All prerequisites are implemented however there are stil improvements to be made.

## Contact
Created by [@Ricram](https://github.com/MrRicram/) - feel free to contact me via email at rf.ramos95@gmail.com!