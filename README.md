MyFlixAngularClient

MyFlixAngularClient is a responsive web application built with Angular that allows users to browse movies, register an account, log in, and manage their profile. The app is designed to connect with a backend API to fetch and display movie-related data, enabling a smooth and interactive user experience.

Live Link: MyFlixAngularClient

Table of Contents

    •	Features
    •	Technologies
    •	Setup Instructions
    •	Usage
    •	Documentation
    •	License

Features

    •	User Registration and Login: Users can create an account and log in to access personalized features.
    •	Movie Browser: Browse a list of movies, view details about each movie, including genre and director information.
    •	Favorites Management: Add or remove movies from your list of favorites.
    •	Profile Management: Update user profile information or delete the account.
    •	Responsive Design: Fully optimized for desktop and mobile devices.

Technologies

    •	Frontend Framework: Angular (v18.2.10)
    •	UI Components: Angular Material
    •	Styling: SCSS
    •	Backend API: MyFlix API (separately developed)
    •	Documentation: Generated with TypeDoc
    •	Deployment: GitHub Pages

Setup Instructions

Prerequisites

Make sure you have the following installed:

    •	Node.js (v12 or above)
    •	Angular CLI (v18.2.10 or above)

Installation

    1.	Clone the repository:

    git clone https://github.com/MeHartung/myFlix-Angular-client.git

cd myFlix-Angular-client

    2.	Install dependencies:

    npm install

    Development Server

To start a development server:

ng serve

Navigate to http://localhost:4200/ in your web browser. The app will automatically reload if you make changes to the source files.

Building the Project

To build the project for production, run:

ng build

The build artifacts will be stored in the dist/ directory.

Documentation

Documentation for the project is generated using TypeDoc and can be found in the docs folder. To regenerate the documentation, run:

npx typedoc

Running Tests

    •	Unit Tests: Run ng test to execute the unit tests via Karma.
    •	End-to-End Tests: Run ng e2e to execute end-to-end tests. Note: To use this command, you may need to install additional packages.

Usage

    •	Register: Sign up by providing user details.
    •	Login: Use your credentials to log into the app.
    •	Browse Movies: View a collection of movies and explore details about each one, such as genre and director information.
    •	Manage Profile: Update your profile information, add/remove favorite movies, or delete your account.

License

This project is licensed under the MIT License.
