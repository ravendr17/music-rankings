# Music Rankings

A personal fullstack web application for tracking and ranking the songs I 
listen to each month.
Built to replace my older Java Swing desktop app, and migrated into a 
modern fullstack web app with a proper relational database.

## Tech Stack
- Frontend: React.js, Tailwind CSS
- Backend: Express.js
- Database: PostgreSQL
- Tools: Docker

## Features
- Input monthly listening reports (song titles, artists, play counts)
- View song rankings filtered by month, year, or all-time
- Rankings sorted by play count
- Visualize monthly listening hours over time as a line chart

## Background
I use Musicolet as my music player on my phone. Every end of the month it 
generates a summary of my top 10 most-played songs, including song titles, 
artists, play counts, total listening hours, and the month and year.

In May 2025, I built a Java Swing desktop app to manually encode and track 
these records using JSON files through Gson.

A year later in May 2026, I rebuilt the entire project as a fullstack 
web application, properly separating the frontend and backend, and 
transitioning from flat JSON files into a normalized relational database 
using PostgreSQL.