#YelpCamp #1

* Add Landing Page
* Add Campground Page that lists all campgrounds

Each Campground has 
 * Name
 * Image

 npm init
 npm install express ejs body-parser request --save
 
 # Layout and basic Styling
 * Create header and footer partials
 * Add Bootstrap

 #Creating new campgrounds
 * Setup new campground POST route
 * Add in body-parser
 * Setup route to show form
 * Add basic unstyled form

 #Style the campground page 
 * Add a better header / title
 * Make campground display grid

 V2:
 * Add description to out campground model
 * Show db.collection.drop()
 * Add a show route/template

 RESULTS ROUTS
 Name                    URL                  Verb              Desc
 ===========================================================================================
 INDEX                  /dogs                 GET               Display a list of all dogs
 NEW                    /dogs/new             GET               Display form to make a new dog
 CREATE                 /dogs                 POST              Add a new dog to DB
 SHOW                   /dogs/:id             GET               Show details/info of something (a camp/dog) 

 ********* For v3
 ## Refactor mongoose code
 * Create a models directory
 * Use modules export
 * Require everything correctly 

 ## Comment New/Create
* Discuss nested route
* Add the comment new and create routes
* Add the new comment form.

## Styling the show page - V5
* Add sidebar to showpage
* Display comments nicely

## Version 6
## Auth part 1 : Add User Model
* Install all packages needed for auth
* Define User model

## Auth part 2 : Add User Model
* Configure passport
* Add register routes
* Add register template

## Auth part 3: Login 
* Add loging route
* Add loging template

## Auth part 4: logout / Navbar
* Add logout route
* Prevent user from adding a comment if not signed in
* Add links to navbar
* Show/hide auth lins correctly

## Auth point 5: Show/hide Links
* Show/hide auth link in navbar correctly

## Refactor The Routes
* Use Express router to recognize all routes

## V8 -------------------------
## Users + Comments
* Associate users and comments
* Save author's name to a comment automatically

## v9
## Users + campgrounds
* Prevent an unauthenticated user from creating a campground
* Save username+id to newly created campground

## v10
* Add  Method-Override
* Add Edit Route for Campground
* Add Link to Edit Page
* Add Update route

## Deleting Campgrrounds 
* Add destroy route
* Add delete button

## Authorization
* User can only edit his/her campground
* User can only delete his/her campground
* Hide/Show edit and delete buttons

<!-- 
    Per our RESTful design and nested routning 
    /campgrounds/:id/edit --
    But because of nested 
    /campgrounds/:id/comments/:commets_id/edit 
    But ... /campgrounds/:id/comments is common for all comment router as configured  in app.js
    Hence ... we need to /commets_id/edit this.
-->

#Editing and updating comments
* Add Edit route for comments
* Add edit button
* Ass Update route

# Deleting Comments
* Add Destroy Route
* Add Delete button

#>> Routes differnces to consider
>> Campground Destroy Route: /campground/:id
>> Comment Destroy Route: /campground/:id/comments/:comment_id

# Authorization Part 2: Comments
* User  can only edit his/her comments
* User can delete only his/her comments
* Hide/show edit and delete buttons
* Refactor Middleware
