# Database Design

## Collections

### 1. `users`

- **Purpose**: Stores user information, including women, job posters, and admins.
- **Fields**:
  - `role`: Enum ("woman", "job-poster", "admin").
  - `email`: Unique email address.
  - `password`: Hashed password.
  - `isApproved`: Boolean (default `false` for job posters).
  - `profile`: Subdocument with role-specific fields (e.g., `name`, `skills` for women; `orgName`, `GSTIN` for job posters).

### 2. `jobs`

- **Purpose**: Stores job postings.
- **Fields**:
  - `title`: Job title.
  - `description`: Job description.
  - `location`: Job location.
  - `salary`: Positive number.
  - `type`: Enum ("part-time", "full-time", "contract").
  - `postedBy`: Reference to `users._id` (job poster).
  - `createdAt`: Timestamp.
  - `isActive`: Boolean (default `true`).

### 3. `applications`

- **Purpose**: Stores job applications by women.
- **Fields**:
  - `jobId`: Reference to `jobs._id`.
  - `userId`: Reference to `users._id` (woman).
  - `coverLetter`: Application cover letter.
  - `status`: Enum ("applied", "shortlisted", "rejected").
  - `appliedAt`: Timestamp.

## Relationships

- `jobs.postedBy` references `users._id`.
- `applications.jobId` references `jobs._id`.
- `applications.userId` references `users._id`.

## Indexes

- `users.email`: Unique index for fast email lookups.
- `jobs.location` and `jobs.type`: Compound index for filtering jobs by location and type.
- `applications.jobId` and `applications.userId`: Compound index for fast lookups of applications by job and user.
