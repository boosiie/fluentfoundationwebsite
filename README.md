# Fluent Foundation

## Overview
Fluent Foundation is an interactive learning platform crafted to help students transform difficult subjects into lasting understanding. Through carefully curated quiz collections designed by subject matter experts, learners can practice on focused sets of questions, receive immediate feedback, and build confidence with every session. The project aims to deliver an accessible, modern learning experience that scales from quick refreshers to deep competency building.

## Development Guide
This repository contains both a Spring Boot backend (`backend/`) and a Vite/React frontend (`frontend/`). Use the steps below to get started:

1. **Clone and install dependencies**
   - Backend: `cd backend && ./mvnw clean install`
   - Frontend: `cd frontend && npm install`

2. **Run local development servers**
   - Backend API: `cd backend && ./mvnw spring-boot:run`
   - Frontend UI: `cd frontend && npm run dev`

   The frontend is configured to proxy API requests to the backend's default port.

3. **Environment and configuration**
   - Backend settings live in `backend/src/main/resources/application.properties`
   - Frontend environment variables can be placed in `frontend/.env`

4. **Testing**
   - Backend tests: `cd backend && ./mvnw -Dspring.profiles.active=test test`
   - Frontend build & lint checks: `cd frontend && npm run build`

   **All test suites must pass before any code is committed or merged.**  Keeping the pipeline green ensures stability for every collaborator.

5. **Further development**
   - Add backend features under `backend/src/main/java/...`
   - Add frontend pages/components under `frontend/src/...`
   - Coordinate schema or API changes with matching UI updates.

By following these practices, contributors can continue evolving Fluent Foundation while maintaining a reliable, high-quality learning experience.
