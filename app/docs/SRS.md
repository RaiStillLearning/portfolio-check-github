# Software Requirements Specification (SRS)

## System Overview

PortfolioCheck analyzes a GitHub profile and generates a portfolio assessment report.

## Functional Requirements

### FR-1 Input GitHub Username

User shall enter a GitHub username.

Example:
johndoe

### FR-2 Fetch GitHub Data

System shall retrieve:

- Public repositories
- Repository metadata
- Recent commits
- Languages used

### FR-3 Calculate Score

System shall calculate:

Repository Score:
- Number of repositories
- Repository completeness

Activity Score:
- Recent commits
- Repository updates

Documentation Score:
- Presence of README

Deployment Score:
- Detect deployment links

Diversity Score:
- Technology variety

### FR-4 Generate Feedback

System shall provide:

Strengths:
- Positive findings

Weaknesses:
- Missing best practices

Recommendations:
- Specific improvement actions

### FR-5 Display Report

System shall display:

- Total Score
- Category Scores
- Feedback

### FR-6 Share Result

System shall generate a public result URL.

## Non-Functional Requirements

### NFR-1 Performance

Analysis must complete within 10 seconds.

### NFR-2 Availability

System uptime target:
99%

### NFR-3 Security

Only public GitHub data may be accessed.

### NFR-4 Scalability

Support:
- 1,000 daily analyses
- 100 concurrent users

### NFR-5 Maintainability

Scoring rules must be configurable.

## External Interfaces

### GitHub API

Endpoints:
- Users
- Repositories
- Commits
- README

## Constraints

- GitHub API rate limits
- Public repositories only