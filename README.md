# Presentations App

## Running the app

- **Install dependencies**
  `npm install`
- **Run the app in development mode**
  `npm test`
- **Run the app**
  `npm start`
  
Open a browser and go to http://localhost:3000.

## Project

In this app you will be able to navigate to three pages Home, View and Edit.
- Home: Showcases the presentations.
- Edit: Allows editing of content, adding more elements or pages in a presentation
- View :Visualizes a single presentation

## Backend
```sh
└── src
    ├── controller  # Contains the logic for handling requests and communicate with under layers like the storage
    │   └── mapper  # Converts plain data into structured objects
    ├── database    # Handles data storage and retrieve data
    ├── middelware  # error handler
    ├── routes      # api poitns and routes
    ├── types       # contains TypeScript types and interfaces for the data models
    └── utils       # adds a logger
```
This backend service is a REST API to create, retrieve, update, or delete presentations and pages. 
The storage is in-memory but initializes with 3 sample presentations.
All type definitions are defined under /types. Since the DTOs and models are quite similar, there are no separate definitions to simplify.

## Frontend
```sh
├── public
└── src
    ├── features        # Contains features of the app, such as editing pages.
    │   ├── components  # Defines content types that can be added (text, image, video, shapes)
    │   └── editor      # Handles the editing functionality
    ├── pages           # Defines the main pages of the application (Home, View, Edit)
    ├── service         # Comunnicates with the backend 
    ├── types           # Contains TypeScript types and interface
    └── utils           # helpers to read files
```
## Improvements

- The types are the same for both the backend and frontend. Ideally, they should be in a shared package to ensure type safety and consistency
- Make a BaseComponent to handle commong functionalities to drag, select and move elements
- Add an autosaving mode to save changes in an interval or time

## Use of this App

- Home page
    - the samples contains examples of different kind of contents.
    - When a new presentation is created, it is added to the list. The user can click the edit button to start working on it.
- Edit Page
    - Use right panel to add or remove pages, or select one of them to edit
    - The container in the middle displays the current seleted page
    - Click on elements of the presentation to edit them. Elements can be resized, rotated, change opacity, position, color, etc
    - Text can only be resized using fotnsize
    - Use left panel to add more elements, edit them or remove
    - Use save changes to update the content.
    - Use undo and redo to move back and forwards through log changes.

* Note that when selecting an item, it is not very notorious, event they are selected (look at the left panel to see if there are properties enabled) resulting a not very nice user experince, but that's something that can be fixed :)

