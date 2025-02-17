# Course Management System

## Project Overview

This project is a **Course Management System** built  to demonstrate the efficiency of software development using **Angular** for the front-end and **.NET 8 Web API** for the back-end. The application allows users to perform **CRUD (Create, Read, Update, Delete)** operations on course records stored in an **SQL Server** database.

## Technologies Used

- **Frontend**: Angular
- **Backend**: .NET 8 Web API
- **Database**: Microsoft SQL Server
- **Tools**: Visual Studio 2022, Visual Studio Code

## Features

### Course Listing Page
- Displays courses fetched from the API.
- Shows **Name**, **Duration**, and **Description**.
- Includes **Edit** and **Delete** buttons for each course.

### Add Course Page
- Allows users to add new courses.
- **Submit** button remains disabled until all fields are filled.
- Newly added courses appear at the top of the list.

### Edit Course Page
- Enables modification of course details.
- Updates the database and redirects to the listing page.

### Delete Course Feature
- Removes a course from the database and updates the listing.

### Navigation
- Provides links for easy navigation between pages.

## Setup Instructions

### Backend (.NET 8 API)
1. Open the API project in **Visual Studio 2022**.
2. Configure the database connection in `appsettings.json`:
   ```json
   "ConnectionStrings": {
       "DefaultConnection": "Server=.;Database='Add your Database here';Trusted_Connection=True;MultipleActiveResultSets=True"
   }
3. Open Package Manager Console and run:
add-migration Initial
update-database
4. Start the API by running the project.

### Frontend (Angular Application)
1. Open the Angular project in Visual Studio Code.
2. Install dependencies:
npm install
3. Start the application:
ng serve
4. Open the browser and navigate to http://localhost:4200/.

This project demonstrates a seamless integration of Angular and .NET 8 Web API for building a functional and efficient Course Management System.
