# 00_MASTER_CONTEXT.md

# LevelUp

### Master Product Context

Version: 1.0 (MVP)
Status: Source of Truth

---

# IMPORTANT

This document is the highest priority reference for the entire project.

Every future implementation MUST follow this document.

If another prompt contradicts this document, this document ALWAYS takes priority.

The AI Agent MUST understand the product completely before writing any code.

Do NOT skip any section.

---

# 1. Project Overview

LevelUp is a gamified skill progression platform designed specifically for university students.

The application helps users build practical skills through a structured learning journey inspired by RPG progression systems.

Unlike online learning platforms, LevelUp DOES NOT provide learning materials.

Instead, it becomes a companion application that guides users through learning paths, tracks their progress, motivates consistency, and visualizes their personal growth.

---

# 2. Product Vision

Create a platform where learning feels like playing an RPG.

Users should feel they are improving their own character every day.

Every completed quest should make users stronger.

Every level gained should represent real progress.

The application must create emotional satisfaction every time users learn.

---

# 3. Product Mission

Help students become more consistent in developing practical skills through gamification.

The application should reduce confusion, increase motivation, and provide a clear learning roadmap.

---

# 4. Problem Statement

Many university students want to improve their skills outside the classroom.

However they face several problems.

• They don't know where to start.

• Learning resources are scattered everywhere.

• They lose motivation quickly.

• They cannot visualize their progress.

• Learning feels repetitive.

• They frequently jump between tutorials without finishing anything.

LevelUp exists to solve these problems.

---

# 5. Product Philosophy

LevelUp is NOT an online course platform.

LevelUp is NOT an LMS.

LevelUp is NOT a video learning platform.

LevelUp is NOT a roadmap website.

LevelUp is NOT a habit tracker.

LevelUp is a Skill Progression Platform.

The application focuses on progression instead of education.

Learning happens outside.

Progress happens inside LevelUp.

---

# 6. MVP Scope

Version 1 only focuses on IT learning.

This decision is intentional.

Reason:

User research will be conducted with Informatics Engineering students.

The application architecture MUST remain flexible for future expansion.

Future versions may include:

Business

UI/UX

Artificial Intelligence

Data Science

Language

Soft Skills

Digital Marketing

Leadership

Communication

No architecture changes should be required to support new

---

# 7. Target Users

## Primary Target

University students.

Initially focused on Informatics Engineering students.

Age:

18–25 years old.

Characteristics:

• Interested in improving practical skills.
• Frequently learn from YouTube, documentation, blogs, or online courses.
• Want to prepare for internships or future careers.
• Need a structured roadmap.
• Often lose consistency during self-learning.

---

## Secondary Target (Future)

Fresh Graduates

Career Switchers

Junior Developers

Professionals wanting to learn new skills

Students from other faculties

---

# 8. User Goals

Users open LevelUp because they want to become better.

Typical goals include:

• Become a Frontend Developer

• Become a Backend Developer

• Become a Full Stack Developer

• Track learning progress

• Stay motivated

• Build learning consistency

• Visualize personal growth

The application MUST always reinforce these goals.

---

# 9. Product Identity

Product Name

LevelUp

Category

Gamified Skill Progression Platform

Platform

Web Application

Architecture

Single Page Application (SPA)

Design Style

Modern Neobrutalism

Technology

HTML

CSS

JavaScript

Firebase Authentication

Cloud Firestore

Hosting

Netlify

---

# 10. Core Concept

The core concept is:

"Every user owns a character."

That character grows alongside the user.

The character DOES NOT represent fantasy.

The character represents the user's real-life growth.

Every completed learning activity strengthens the character.

Progression must feel meaningful.

---

# 11. Learning Philosophy

Learning should never feel overwhelming.

Large goals are divided into smaller achievable quests.

Instead of saying:

"Learn JavaScript"

The application should guide users through:

Quest 1

Variables

↓

Quest 2

Functions

↓

Quest 3

Arrays

↓

Quest 4

Objects

↓

Quest 5

DOM

Small wins create motivation.

---

# 12. Product Principles

The application MUST always follow these principles.

1.

Learning should be enjoyable.

2.

Progress must always be visible.

3.

Users should never feel lost.

4.

Every interaction should provide feedback.

5.

Consistency is more important than speed.

6.

Every completed quest should feel rewarding.

7.

Visual progression is mandatory.

---

# 13. Product Personality

If LevelUp were a person, it would be:

Encouraging

Friendly

Motivating

Energetic

Modern

Confident

Never intimidating.

Never boring.

Never overly academic.

---

# 14. Product Tone

Avoid educational language.

Instead of:

Lesson

Course

Chapter

Assignment

Use:

Quest

Journey

Skill

Adventure

Progress

Achievement

Level

Character

Growth

The entire application should maintain RPG-inspired terminology.

---

# 15. Design Philosophy

The interface should make users smile.

Users should feel excited to continue learning.

The application should resemble a modern productivity tool mixed with an RPG status screen.

Never resemble an LMS.

Never resemble Moodle.

Never resemble Google Classroom.

Never resemble Udemy.

Never resemble Coursera.

---

# 16. Emotional Experience

When opening the application:

Users should feel curious.

After completing a quest:

Users should feel proud.

After leveling up:

Users should feel excited.

When unlocking a badge:

Users should feel rewarded.

When opening the dashboard:

Users should immediately understand their progress.

The application should continuously reinforce achievement.

---

# 17. Core User Journey

Login

↓

Create Character

↓

Choose Learning Path

↓

Receive Starter Quests

↓

Complete Quests

↓

Gain XP

↓

Increase Skill Level

↓

Increase Character Level

↓

Unlock Achievements

↓

Continue Learning

This journey represents the entire MVP.

No unnecessary complexity should be added.

---

# 18. MVP Learning Paths

Version 1 includes only three learning paths.

Frontend Developer

Backend Developer

Full Stack Developer

This limitation is intentional.

The system architecture MUST support future learning paths without modification.

Learning paths must be stored as data instead of hardcoded logic.

---

# 19. Character System

Every registered user owns exactly one Character.

The Character represents the user's personal growth.

The Character is NOT a game avatar.

The Character is a digital representation of the user's learning journey.

Every action performed inside the application contributes to character progression.

Character progression should always feel rewarding.

---

## Character Information

Every character contains:

• Name

• Profile Picture

• Character Level

• Current XP

• Current Rank

• Primary Journey

• Total Skills Completed

• Total Quests Completed

• Current Streak

• Total Learning Hours (Future)

---

## Character Dashboard

The dashboard MUST immediately display:

Character Card

Current Level

XP Progress

Current Rank

Daily Quest

Journey Progress

Recent Achievement

Learning Streak

Upcoming Unlock

Users should immediately know:

"How strong is my character?"

---

# 20. Character Rank System

Character Rank is NOT determined manually.

Character Rank is automatically calculated based on Character Level.

Example:

Level 1–5

Beginner

Level 6–10

Explorer

Level 11–20

Apprentice

Level 21–35

Skilled

Level 36–50

Expert

Level 51–75

Master

Level 76+

Legend

Rank names may change in future versions.

Rank calculation MUST be dynamic.

Never hardcode rank inside user documents.

---

# 21. Experience Point (XP)

XP is the main progression currency.

Users earn XP by completing quests.

XP should never be purchasable.

XP should represent effort.

Example rewards:

Easy Quest

20 XP

Medium Quest

50 XP

Hard Quest

100 XP

Boss Quest (Future)

250 XP

XP values should be configurable.

Never hardcode XP values inside application logic.

---

# 22. Level System

Character Level represents overall progression.

Each level requires a certain amount of XP.

Level calculation MUST be automatic.

Character Level should increase whenever accumulated XP reaches the required threshold.

The application should always display:

Current Level

Current XP

Required XP

Progress Bar

Level Up Animation

---

# 23. Skill System

A Learning Path contains multiple Skills.

Each Skill contains multiple Quests.

Skills also have independent levels.

Example

Frontend

↓

HTML

↓

HTML Level

↓

Quest Progress

Users can master individual skills.

Skill progression should be separated from Character progression.

---

## Example

Character Level

12

Programming Skill

8

HTML

5

CSS

4

JavaScript

2

Git

3

Every skill grows independently.

---

# 24. Learning Path

A Learning Path represents a career direction.

Version 1 only contains:

Frontend

Backend

Full Stack

Future versions may include:

Business

Design

AI

Language

Marketing

Leadership

Learning Paths should be completely data-driven.

Never hardcode paths.

---

# 25. Skill Tree

Each Learning Path is visualized using a Skill Tree.

The Skill Tree should clearly display:

Unlocked Skills

Current Skill

Locked Skills

Completed Skills

Current Progress

Users should instantly understand where they are and what comes next.

The Skill Tree is one of the application's signature features.

---

# 26. Quest System

Quest is the smallest learning activity.

Every Skill contains several Quests.

Quest examples:

HTML

Quest 1

Create Your First HTML Page

Quest 2

Build a Contact Form

Quest 3

Semantic HTML

Quest 4

Tables

Quest 5

Accessibility

Each Quest includes:

Title

Description

Difficulty

XP Reward

Estimated Duration

Learning Resource

Completion Status

---

# 27. Daily Quest

Every day the application highlights several recommended quests.

Daily Quests encourage consistency.

Daily Quests should not feel mandatory.

Missing a day should never punish the user excessively.

The application motivates users through positive reinforcement.

Never through punishment.

---

# 28. Achievement System

Achievements celebrate milestones.

Examples

First Quest

Complete your first quest.

HTML Explorer

Finish every HTML quest.

Seven Day Streak

Study for seven consecutive days.

Frontend Apprentice

Reach Frontend Level 10.

Quest Hunter

Complete 100 quests.

Achievements exist to motivate.

Never overwhelm users with hundreds of achievements.

Quality is more important than quantity.

---

# 29. Badge System

Badges are visual rewards.

Badges are collected by users.

Badges should appear inside Profile.

Badges should feel meaningful.

Badges should be colorful and visually satisfying.

Badges may be awarded from:

Quest Completion

Level Milestones

Special Events (Future)

Guild Activities (Future)

---

# 30. Streak System

The application tracks consecutive learning days.

Streaks reward consistency.

Streaks should encourage returning users.

If a streak breaks:

Do NOT shame the user.

Instead encourage them to start again.

The product should always use positive motivation.

---

# 31. Progress System

Progress exists at multiple levels.

Quest Progress

↓

Skill Progress

↓

Learning Path Progress

↓

Character Progress

The application should always make progress visible.

Users should never wonder:

"What should I do next?"

---

# 32. Resource Philosophy

LevelUp is NOT responsible for teaching users.

Learning content belongs to external platforms.

LevelUp guides users through their learning journey.

Every Quest may contain one or more external resources.

Examples:

Official Documentation

YouTube

MDN

roadmap.sh

freeCodeCamp

Articles

Books

The application stores references only.

Never embed full learning content.

---

# 33. Navigation Philosophy

The application MUST use a Single Page Application architecture.

Navigation should feel instant.

Users should never experience full page reloads.

Every screen should transition smoothly.

Navigation should feel modern.

---

# 34. Application Architecture

The application MUST be modular.

Avoid monolithic JavaScript files.

Separate:

Views

Components

Services

Utilities

Firebase

Routing

State

The project should remain maintainable as it grows.

---

# 35. Product Boundaries

The MVP intentionally excludes many features.

These exclusions are intentional.

They are NOT missing features.

They are future roadmap items.

---

## DO NOT BUILD

The AI Agent MUST NOT implement:

Video Learning

Online Courses

Quiz Engine

Exam System

Certificates

Discussion Forum

Messaging

Real-time Chat

Voice Chat

Marketplace

Payment System

Subscription

AI Tutor

Leaderboard

Guild System

Guild Chat

Guild Quest

Multiplayer

Blog

Notifications

Offline Mode

These features belong to future versions.

---

# 36. MVP Features

Version 1 MUST only contain:

Authentication

Character Dashboard

Learning Path

Skill Tree

Quest System

Progress Tracking

XP

Character Level

Skill Level

Achievements

Badges

Profile

Settings

Logout

Nothing else.

---

# 37. Dashboard Philosophy

The dashboard is the heart of the application.

Users should immediately understand:

Who am I?

What am I learning?

How strong am I?

What should I do next?

How much progress have I made?

The dashboard should answer these questions without requiring navigation.

---

# 38. UI Philosophy

The interface should prioritize clarity over decoration.

Gamification enhances the experience.

Gamification must never reduce usability.

Users should always understand what to do.

The application should never feel confusing.

---

# 39. Design Language

The entire application uses:

Modern Neobrutalism

Characteristics:

Large Cards

Strong Borders

Offset Shadows

Rounded Corners

Bold Typography

Bright Accent Colors

Simple Icons

Large Buttons

Minimal Decoration

The interface should feel playful yet professional.

---

# 40. UX Principles

Every interaction must provide feedback.

Examples:

Hover

Click

Complete Quest

Gain XP

Level Up

Unlock Badge

Every important action deserves visual feedback.

Micro-interactions are encouraged.

---

# 41. Accessibility

The application should remain accessible.

Use:

Readable typography

Proper contrast

Large touch targets

Keyboard accessibility whenever possible

Never rely only on color.

---

# 42. Mobile Experience

The application MUST be responsive.

Primary Target

Desktop

Secondary Target

Mobile

Tablet should also be supported.

Responsive behavior must be planned from the beginning.

---

# 43. Performance Philosophy

Fast.

Lightweight.

Minimal dependencies.

Quick loading.

Avoid unnecessary animations.

Avoid large assets.

Optimize rendering.

The application should feel responsive.

---

# 44. Error Handling

Users should never encounter confusing errors.

Every error should explain:

What happened.

Why it happened.

How to fix it.

Never expose Firebase errors directly.

Use friendly language.

---

# 45. Empty States

Every empty page should encourage action.

Example

No Learning Path

↓

Choose your first journey.

No Quest

↓

Start learning today.

No Achievement

↓

Complete your first quest.

Never leave empty pages blank.

---

# 46. Success States

Every success should feel rewarding.

Examples

Quest Completed

Achievement Unlocked

Level Up

Skill Mastered

Journey Completed

Celebrate progress without overwhelming users.

---

# 47. Technical Architecture

LevelUp MUST be built as a true Single Page Application (SPA).

The application should never reload the browser when navigating between pages.

Every screen should be rendered dynamically using JavaScript.

The application should behave similarly to modern frameworks while using only Vanilla JavaScript.

---

# 48. Technology Stack

The MVP MUST only use:

HTML5

CSS3

Vanilla JavaScript (ES6 Modules)

Firebase Authentication

Cloud Firestore

Firebase Hosting (optional)

Netlify Deployment

No frontend framework is allowed.

Do NOT use:

React

Vue

Angular

Svelte

Next.js

Nuxt

Laravel

Bootstrap

jQuery

The objective is to demonstrate mastery of HTML, CSS, and JavaScript.

---

# 49. Application Structure

The application MUST follow a modular architecture.

Recommended structure:

/index.html

/assets

/css

/js

/components

/views

/services

/firebase

/router

/utils

Each module should have a single responsibility.

Avoid large files.

---

# 50. SPA Routing

Routing MUST be handled entirely in JavaScript.

The browser should never navigate to another HTML file.

Only one HTML file should exist.

Example routes:

/

/home

/journey

/skill

/quest

/character

/profile

/settings

The router should dynamically swap views.

---

# 51. View System

Every screen should be treated as an independent View.

Examples:

Login View

Register View

Home View

Journey View

Skill Tree View

Quest View

Character View

Achievement View

Profile View

Settings View

Each View should be rendered independently.

Views should never contain duplicated logic.

---

# 52. Component System

Reusable UI Components are required.

Examples:

Navbar

Sidebar

Character Card

XP Bar

Progress Card

Quest Card

Skill Card

Achievement Card

Badge

Modal

Toast

Dialog

Loading Screen

Components should be reusable throughout the application.

---

# 53. State Management

The application should maintain a lightweight client-side state.

State examples:

Authenticated User

Selected Journey

Current Character

Current XP

Current Level

Quest Progress

Theme

Current Route

State should be separated from UI rendering.

---

# 54. Firebase Integration

Firebase is the only backend service.

Firebase Authentication manages authentication.

Cloud Firestore stores application data.

Business logic should remain on the client.

Authentication state must always be synchronized.

---

# 55. Firestore Philosophy

Firestore stores data.

Firestore does NOT calculate progression.

Character Level

XP

Achievements

Ranks

Progress

should be calculated by the application.

Firestore stores only the required data.

Avoid unnecessary duplication.

---

# 56. Data Flow

Application Flow

User Action

↓

Validation

↓

Firestore

↓

Update Local State

↓

Re-render Component

↓

Visual Feedback

Every interaction should follow this pattern.

---

# 57. Naming Convention

Use consistent naming.

Examples

learningPaths

userProgress

skillProgress

currentXP

characterLevel

questStatus

Never use ambiguous names.

Examples to avoid:

data

temp

obj

value

item

test

abc

Use descriptive naming.

---

# 58. JavaScript Philosophy

Modern JavaScript only.

Use:

Modules

Classes (when appropriate)

Factory Functions

Utility Functions

Template Literals

Arrow Functions

Async Await

Avoid:

Callback Hell

Global Variables

Inline JavaScript

Duplicated Logic

---

# 59. CSS Philosophy

CSS should be scalable.

Organize by responsibility.

Recommended:

variables.css

base.css

layout.css

components.css

utilities.css

pages.css

animations.css

Avoid writing one giant stylesheet.

---

# 60. Design Tokens

All colors must come from variables.

Example:

Primary

Secondary

Success

Warning

Danger

Surface

Border

Shadow

Spacing

Radius

Typography

Never hardcode colors repeatedly.

---

# 61. AI Development Rules

The AI Agent MUST behave like a Senior Software Engineer.

The AI Agent must prioritize maintainability over speed.

The AI Agent must never generate temporary code.

Every implementation should be production-ready for an MVP.

Never implement features outside the current scope.

Always respect this Master Context.

---

# 62. Clean Code Principles

The project must follow clean code practices.

Code should be:

Readable

Reusable

Maintainable

Scalable

Predictable

Self-explanatory

Avoid unnecessary complexity.

---

# 63. Single Responsibility Principle

Every module should have only one responsibility.

Examples:

Authentication handles authentication only.

Quest module handles quests only.

Character module handles character progression only.

Skill module handles skills only.

Never mix responsibilities.

---

# 64. Reusability

Every reusable element should become a reusable component.

Examples:

Buttons

Cards

Progress Bars

Dialogs

Modals

Sidebar Items

Navigation Items

XP Bars

Character Cards

Avoid duplicated HTML.

---

# 65. Progressive Enhancement

The application should still function correctly even when animations fail.

Animations improve experience.

Animations are never required for functionality.

---

# 66. Error Prevention

The application should prevent mistakes whenever possible.

Examples:

Prevent empty forms.

Prevent duplicate submissions.

Prevent invalid navigation.

Prevent unauthorized access.

Prevent impossible progression.

Never trust user input.

---

# 67. Loading States

Every asynchronous operation should have a loading state.

Examples:

Login

Register

Loading Journey

Loading Skills

Loading Quests

Saving Progress

Updating Profile

Loading should always provide visual feedback.

---

# 68. Empty States

Every page should have a meaningful empty state.

Examples:

No Learning Path

→ Choose your first journey.

No Quests

→ Continue your learning adventure.

No Achievement

→ Complete your first quest.

Never display blank screens.

---

# 69. Success Feedback

Users should always know when something succeeds.

Examples:

Quest Completed

XP Earned

Level Up

Profile Updated

Journey Selected

Achievement Unlocked

Feedback should be immediate.

---

# 70. Failure Feedback

Errors should always be understandable.

Bad:

Unknown Error

Good:

Unable to connect to Firebase.

Please check your internet connection.

Never expose raw Firebase errors.

---

# 71. Confirmation Rules

Destructive actions require confirmation.

Examples:

Delete Profile

Reset Progress

Remove Learning Path

Sign Out (optional)

Use confirmation dialogs.

---

# 72. Notification System

Notifications should be lightweight.

Prefer:

Toast

Snackbar

Small Banner

Avoid intrusive popup windows.

---

# 73. Animation Philosophy

Animations should reinforce progression.

Examples:

XP Gain

Level Up

Achievement Unlock

Badge Unlock

Quest Complete

Animations should never slow down the application.

---

# 74. Accessibility Rules

Interactive elements must always have:

Hover State

Focus State

Active State

Disabled State

Keyboard accessibility is encouraged.

---

# 75. Security Philosophy

Never trust client input.

Validate every form.

Protect Firestore Rules.

Users may only modify their own progress.

Never expose sensitive Firebase configuration beyond what is publicly required.

Authentication is mandatory for all personal data.

---

# 76. Scalability Philosophy

Although MVP is intentionally small, the architecture must support future expansion.

Future features should integrate without major refactoring.

Possible future modules include:

Guild

Guild Quest

Guild Level

Community

Leaderboard

Events

Marketplace

Mentor

AI Assistant

Daily Challenges

Soft Skills

Business Skills

Language Learning

Architecture decisions today should not block these future additions.

---

# 77. Product Success

A successful MVP is NOT measured by the number of features.

It is measured by:

Clear progression

Simple user experience

Strong gamification

Consistent UI

Maintainable code

Responsive design

Smooth SPA navigation

Clean architecture

---

# 78. Non Goals

The MVP is intentionally NOT trying to become:

Udemy

Coursera

Codecademy

roadmap.sh

Duolingo

Habitica

Discord

GitHub

The goal is to create a unique experience combining:

Skill Development

Gamification

Character Progression

Learning Journey

---

# 79. Product Identity

Whenever making implementation decisions, always ask:

"Does this feature strengthen the feeling that the user is growing their own character?"

If the answer is NO,

the feature should be reconsidered.

---

# 80. Final Philosophy

LevelUp is more than a learning tracker.

LevelUp is a personal progression system.

Users should feel that every completed quest makes them stronger.

Every learning session should contribute to character growth.

Every level gained should represent real knowledge.

The application should make users excited to come back tomorrow.

The ultimate goal is not to finish quests.

The ultimate goal is to help users become a better version of themselves.

---

# END OF MASTER CONTEXT

This document defines the identity, philosophy, architecture direction, UX principles, product scope, and implementation boundaries for the LevelUp MVP.

Every future implementation must remain consistent with this document.

Never violate the principles defined above.

Always prioritize user progression, clarity, maintainability, and long-term scalability.
