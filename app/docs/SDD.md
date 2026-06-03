# Software Design Document (SDD)

## Architecture

Client-Server Architecture

Frontend:
- Next.js

Backend:
- Next.js API Routes

Database:
- PostgreSQL (optional)
- Supabase

External Service:
- GitHub REST API

## High-Level Flow

User
→ Enter GitHub Username
→ API Request
→ GitHub API
→ Analysis Engine
→ Score Generator
→ Feedback Generator
→ Report Page

## Components

### Frontend

Responsibilities:
- Input form
- Loading state
- Report visualization

Pages:
- Home
- Report

### Analysis Engine

Responsibilities:
- Collect GitHub data
- Normalize data
- Apply scoring rules

Functions:

analyzeRepositories()

analyzeActivity()

analyzeDocumentation()

analyzeDeployment()

calculateTotalScore()

### Feedback Engine

Rule-based system.

Example:

IF README missing
THEN add feedback:
"Add README documentation."

IF deployment missing
THEN add feedback:
"Deploy at least one production project."

### Database

Tables:

AnalysisReport
- id
- github_username
- score
- created_at

ScoreBreakdown
- report_id
- category
- score

FeedbackItem
- report_id
- type
- message

## API Design

POST /api/analyze

Request:

{
  "username": "johndoe"
}

Response:

{
  "score": 78,
  "strengths": [],
  "weaknesses": [],
  "recommendations": []
}

## Deployment

Frontend:
- Vercel

Database:
- Supabase

Monitoring:
- Vercel Analytics

## Future Extensions

V2:
- Portfolio website analysis

V3:
- AI feedback generation

V4:
- Benchmark against other users

V5:
- Premium human review  