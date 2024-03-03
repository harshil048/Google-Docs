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

## Preview
- Full Register/Login/Verify Email functionality, with helpful toast notifications to guide you.
  
![Register](https://github.com/harshil048/Google-Docs/assets/74892092/9669aa1d-ef33-44f1-99c5-44094a56882d)
![Login](https://github.com/harshil048/Google-Docs/assets/74892092/24327b62-fdc4-4ce8-8d62-3939b6065bf7)

- Basic document dashboard to create new documents, and navigate to your recent or shared documents.
  
![Home](https://github.com/harshil048/Google-Docs/assets/74892092/9e39bf9a-f929-41b3-a1fe-b33839643cc6)
![Recent and Share](https://github.com/harshil048/Google-Docs/assets/74892092/8d70b042-52df-4f59-b395-490638b73c0a)
![Document-home](https://github.com/harshil048/Google-Docs/assets/74892092/e32bdd77-e58e-433f-9139-94fb35dc9d91)

- Real-time collaboration. Work on documents at the same time with those you've shared the document with.
  
![share](https://github.com/harshil048/Google-Docs/assets/74892092/28088f3e-d697-42ce-845e-b26b601774f5)
https://github.com/harshil048/Google-Docs/assets/74892092/d44c5132-d24f-4a14-9f3b-349149eaf2b4




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
