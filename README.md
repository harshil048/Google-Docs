# Synchro Docs

## Overview

SynchroDocs is a powerful online document collaboration platform designed to streamline teamwork and boost productivity. With real-time synchronization and a user-friendly interface, SynchroDocs enables seamless collaboration on documents among team members, no matter where they are located.

## Key Features

**Real-Time Collaboration**: Work together with colleagues, classmates, or clients in real-time. See edits as they happen and collaborate effortlessly on documents.

**Cloud-Based Storage**: Access your documents from anywhere with an internet connection. Your files are securely stored in the cloud, ensuring you never lose your work.

**Version History**: Track changes to documents and revert to previous versions if needed. SynchroDocs keeps a detailed history of all edits, making it easy to review and compare changes.

**Multi-Platform Compatibility**: Use SynchroDocs on any device, whether it's a desktop computer, laptop, tablet, or smartphone. Our platform is compatible with all major operating systems and web browsers.

**Customizable Permissions**: Control who can view, edit, and comment on your documents. Set permissions at the document level to ensure data security and privacy.

**Instant Messaging**: Communicate with collaborators in real-time using built-in instant messaging. Discuss edits, share ideas, and ask questions without leaving the document editor.

## Installation and Setup Instructions

Clone down this repository. You will need node and npm installed globally on your machine.

Client Installation:

`cd client/googledocs`

Install Dependencies:

`npm install --force`

To Start Server:

`npm run start`

To Visit App:

`localhost:3000`

Server Installation:

`cd server`

Create the .env file in the root directory:

`touch .env.development`

You will need to add all of the neccessary environment variables [listed in this file](server/src/config/env.config.ts)

Install Dependencies:

`npm install`

To Start Server:

`npm run dev`

To Visit App:

`localhost:8080`
