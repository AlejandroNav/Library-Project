# Library Project

A personal library web app inspired by Goodreads, but with a lighter and simpler design.

## Overview

This project is a small front-end library application built with **HTML**, **CSS**, and **JavaScript**. It lets users view a collection of books, add new books through a dialog form, and remove books from the library dynamically.
## Screenshots

### Hero Section

![Hero Section](https://raw.githubusercontent.com/AlejandroNav/Library-Project/main/screen1.png)

### Library Section

![Library Section](https://raw.githubusercontent.com/AlejandroNav/Library-Project/main/screen2.png)

### Add Book Dialog

![Add Book Dialog](https://raw.githubusercontent.com/AlejandroNav/Library-Project/main/screen3.png)
The goal of the project was to practice working with:

- JavaScript objects and constructors
- Arrays for storing application data
- DOM manipulation
- Event handling
- Forms and `event.preventDefault()`
- The `<dialog>` element for modal interactions
- Responsive layout with Flexbox and Grid

## Features

- Display a collection of books as styled cards
- Add new books through a modal dialog form
- Remove books individually
- Default fallback values for missing book information
- Responsive layout for desktop, tablet, and mobile
- GitHub repository link integrated into the page design

## Built With

- HTML5
- CSS3
- JavaScript

## What I Practiced

Through this project I practiced:

- Creating book objects with a constructor
- Assigning a unique id to each book with `crypto.randomUUID()`
- Storing books inside an array
- Rendering dynamic content to the page
- Using event delegation for remove buttons
- Handling form submission with `event.preventDefault()`
- Opening and closing a modal with `<dialog>`

## Project Structure

```text
Library-Project/
├── index.html
├── styles.css
├── script.js
└── assets/
