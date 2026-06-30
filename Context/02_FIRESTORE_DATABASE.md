# 02_FIRESTORE_DATABASE.md

# LevelUp
Database Design Document

Version 1.0

---

# PURPOSE

This document defines the Firestore database architecture for LevelUp.

The database must be scalable.

The database must avoid duplicated information.

The database should support future expansion without restructuring.

All collections should remain independent whenever possible.

---

# DATABASE PHILOSOPHY

Firestore stores data.

Firestore should never become the business logic.

Calculations should happen inside the application.

Firestore should contain only necessary information.

Avoid duplicated values.

Avoid deeply nested collections.

Prefer flat collections with references.

---

# COLLECTION OVERVIEW

users

learning_paths

skills

quests

user_progress

achievements

badges

settings

future_collections

---

# COLLECTION

users

Purpose

Store user account information.

Example Fields

uid

displayName

email

photoURL

characterLevel

characterXP

characterRank

primaryJourney

createdAt

updatedAt

status

Users should NEVER contain learning content.

Users should only contain profile information.

---

# COLLECTION

learning_paths

Purpose

Master data.

Contains every available learning journey.

Example

Frontend

Backend

Full Stack

Future

Business

AI

UI UX

Language

Marketing

Soft Skills

Example Fields

id

title

slug

description

icon

color

difficulty

estimatedDuration

isActive

displayOrder

createdAt

updatedAt

---

# COLLECTION

skills

Purpose

Master Skill Tree.

Each skill belongs to exactly one learning path.

Example Fields

id

learningPathId

title

slug

description

icon

estimatedHours

displayOrder

requiredSkill

difficulty

isActive

createdAt

updatedAt

Never store user progress here.

Only store master data.

---

# COLLECTION

quests

Purpose

Master Quest data.

Each quest belongs to one skill.

Example Fields

id

skillId

title

description

difficulty

xpReward

estimatedMinutes

resourceURL

displayOrder

isActive

createdAt

updatedAt

Quest completion status should NEVER be stored here.
