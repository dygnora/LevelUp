# 03_SYSTEM_ARCHITECTURE.md

# LevelUp
System Architecture

Version 1.0

---

# PURPOSE

This document defines the technical architecture of the LevelUp application.

Every implementation must follow this architecture.

The goal is to build a maintainable Single Page Application using only:

HTML

CSS

Vanilla JavaScript

Firebase

Cloud Firestore

No frontend framework is allowed.

---

# APPLICATION TYPE

Application Type

Single Page Application (SPA)

The browser should only load one HTML file.

Every page transition must happen dynamically using JavaScript.

Never reload the browser.

Never navigate to another HTML file.

---

# CORE PRINCIPLES

The application should behave similarly to modern frameworks while remaining framework-free.

The architecture should be:

Simple

Modular

Scalable

Reusable

Easy to maintain

Easy to debug

Easy to expand

---

# PROJECT STRUCTURE

Recommended Folder Structure

/src

/assets

/images

/icons

/fonts

/css

base.css

variables.css

layout.css

components.css

utilities.css

animations.css

/js

app.js

router.js

state.js

firebase.js

/services

/components

/views

/utils

Do not place everything inside one script.js file.

---

# ENTRY POINT

Application starts from

index.html

↓

app.js

↓

Router

↓

Authentication Check

↓

Render Current View

↓

Load Required Data

↓

Render Components

---

# ROUTING

The application must implement client-side routing.

Routes should be represented using URL hash or History API.

Recommended Routes

/

#/login

#/register

#/home

#/journey

#/skill/:id

#/quest/:id

#/character

#/profile

#/settings

Routing should update the current View without refreshing the browser.

---

# VIEW RENDERING

Every page is a View.

Each View renders only its own content.

Examples

Login View

Home View

Journey View

Skill Tree View

Quest View

Character View

Profile View

Settings View

Views should never manipulate unrelated Views.
