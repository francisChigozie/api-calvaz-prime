# calvaz-prime-concepts-v1
Organization name: CALVAZ PRIME CONCEPTS
Address: 9B Rasheed Alatishe Street, Isheri, Magodo, Lagos
Contact email: emekaezekwem5@gmail.com
Intended client: Access Bank PLC, 14/15 Alaba Oniru Road, Victoria Island, Lagos
Principal: Chukwuemeka Alvan Ezekwem (ex–Union Bank Group Head/DGM)
Supervisor: Mrs. Vivian Echefu‑Louis (Recovery Agent lead)
Domain terminology and strategies to reflect:

Recovery methods: EFCC/police escalation (where lawful), litigation, moral suasion, interest waiver incentives (bank‑approved), security realization, attachable assets, periodic reviews with bank recovery heads, and documented odd‑hour visits.
Artifacts: Legal notices, repayment agreements, perfection of mortgages/debentures, write‑offs/restructuring, concession approvals.
Compliance/logging emphasis: Auditability for regulatory review.



Requirements and Compliance


Stakeholders and Roles

Recovery Agent: creates and updates cases, logs visits/contacts, uploads documents, proposes concessions.
Bank Officer: reviews cases, approves/denies concessions, coordinates legal actions.
Supervisor: oversees agent performance, reassigns cases, validates logs.
Admin: configures system, manages users/roles, audit exports, system health.



Compliance requirements

Nigeria NDPR + GDPR principles for personal data handling.
PCI‑DSS only if handling card data (avoid storing PAN; prefer tokenized PSP; most likely out of scope).
Evidence-grade audit trails for all actions (immutability via append-only logs).
Data minimization and retention policies; encryption at rest and in transit.
Lawful escalation notes: where EFCC/police/litigation is referenced, ensure role‑gated workflows and legal approval checkpoints with digital sign‑offs.



System Design

src
├─ config
│  └─ db.ts
├─ models
│  ├─ Debtor.ts
│  ├─ Loan.ts
│  ├─ Delinquency.ts
│  ├─ RecoveryLog.ts
│  ├─ Payment.ts
│  ├─ Concession.ts
│  ├─ User.ts
│  ├─ Document.ts
│  └─ AuditLog.ts
├─ validations
│  ├─ debtor.validation.ts
│  ├─ loan.validation.ts
│  ├─ delinquency.validation.ts
│  ├─ recoveryLog.validation.ts
│  ├─ payment.validation.ts
│  ├─ concession.validation.ts
│  ├─ user.validation.ts
│  └─ document.validation.ts
├─ controllers
│  ├─ debtor.controller.ts
│  ├─ loan.controller.ts
│  ├─ delinquency.controller.ts
│  ├─ recoveryLog.controller.ts
│  ├─ payment.controller.ts
│  ├─ concession.controller.ts
│  ├─ user.controller.ts
│  └─ document.controller.ts
├─ middleware
│  ├─ auth.ts
│  ├─ validate.ts
│  ├─ errorHandler.ts
│  └─ auditLogger.ts
├─ routes
│  ├─ debtor.routes.ts
│  ├─ loan.routes.ts
│  ├─ delinquency.routes.ts
│  ├─ recoveryLog.routes.ts
│  ├─ payment.routes.ts
│  ├─ concession.routes.ts
│  ├─ user.routes.ts
│  ├─ document.routes.ts
│  └─ index.ts
├─ app.ts
└─ server.ts

Core modules and features
Case Management

Create/track debt recovery cases; borrower profile; loan metadata; delinquency history.


Loan Details

Origination date, purpose, approval conditions, security pledged, collateral registry references.


Delinquency Tracking

Default dates, reasons for failure, risk category; automated delinquency buckets (e.g., 30/60/90/180+).


Recovery Journal

Every contact/visit attempt with timestamp, geotag (optional), notes, outcomes, promises‑to‑pay.


Payment Log

Capture payments, cumulative recovery, trends, and variance vs. promise‑to‑pay schedule.


Recovery Planning

Future actions and concession proposals (interest waiver, restructure, write‑off) with approvals.


Document Management

Upload and view legal notices, repayment agreements, IDs; virus scan; metadata; retention.


Audit & Compliance

Immutable action logs; exportable audit reports; approval trails with timestamps and principals.


Reporting & Analytics

Agent productivity, delinquency trends, roll rates, cure rates, recovery effectiveness, aging buckets.


Proposed database schema (MongoDB)
Debtors

_id, fullName, aliases, nationalIdType, nationalIdNumber, dateOfBirth, addresses[], phones[], emails[], employer, nextOfKin, riskRating, createdAt, updatedAt


Loans

_id, debtorId, accountNumber, originationDate, purpose, approvalConditions[], principal, interestRate, tenureMonths, collateral[{type, description, registryRef, value, perfected:boolean, documents[] }], status, createdAt, updatedAt


Delinquencies

_id, loanId, bucket (e.g., 30/60/90/180+), firstDefaultDate, currentDPD, reasons[], riskCategory, escalations[{type: 'EFCC'|'Police'|'Litigation'|'Internal', approvedBy, approvalDocId, date}], createdAt, updatedAt


RecoveryLogs

_id, loanId, agentId, channel('call'|'visit'|'email'|'sms'|'letter'|'legal'), timestamp, geo{lat,lng,accuracy}, notes, promiseToPay{amount, date, status}, outcome('no-answer'|'contacted'|'promise'|'broken'|'paid'|'escalated'), attachments[], createdAt


Payments

_id, loanId, paidAt, amount, method, reference, source('bank-statement'|'manual'|'api'), recordedBy, createdAt


Concessions

_id, loanId, type('interest-waiver'|'restructure'|'write-off'|'moratorium'), proposal{terms, rationale, documents[]}, status('draft'|'submitted'|'approved'|'rejected'), submittedBy, approvals[{approverId, role, decision, reason, date}], createdAt, updatedAt


Users

_id, name, email, phone, role('Agent'|'Officer'|'Supervisor'|'Admin'), status, org('CALVAZ PRIME CONCEPTS' or client org), oauthProvider, twoFAEnabled, lastLoginAt, createdAt, updatedAt


Documents

_id, loanId, debtorId, type('legal-notice'|'repayment-agreement'|'id'|'collateral'|'audit'|'other'), fileKey(S3), fileName, mimeType, size, checksum, uploadedBy, scanned{passed:boolean, engine, at}, retentionPolicy, createdAt


AuditLogs (append-only)

_id, actorId, role, action, targetCollection, targetId, beforeHash, afterHash, ip, userAgent, createdAt


ER overview
Debtor 1—N Loan
Loan 1—N Delinquency
Loan 1—N RecoveryLog
Loan 1—N Payment
Loan 1—N Concession
Loan 1—N Document
Debtor 1—N Document
All entities 1—N AuditLogs
API design (Node.js)
Auth and security

OAuth 2.0 / OIDC (bank SSO compatible) + Two‑Factor Authentication (TOTP/SMS).
JWT access tokens + short‑lived, refresh tokens with rotation.


Endpoints (prefix /api/v1)

Auth: POST /auth/login, POST /auth/refresh, POST /auth/2fa/verify
Users: GET/POST/PATCH /users (Admin), GET /users/me
Debtors: GET/POST/PATCH /debtors, GET /debtors/:id
Loans: GET/POST/PATCH /loans, GET /loans/:id
Delinquencies: GET/POST/PATCH /loans/:id/delinquencies
Recovery logs: GET/POST /loans/:id/recovery-logs
Payments: GET/POST /loans/:id/payments
Concessions: GET/POST /loans/:id/concessions, POST /concessions/:id/submit, POST /concessions/:id/approve, POST /concessions/:id/reject
Documents: POST /documents (multipart), GET /loans/:id/documents, GET /documents/:id/download (signed URL), DELETE /documents/:id
Reports: GET /reports/agents, GET /reports/delinquency, GET /reports/recoveries, GET /reports/audit-exports
Audit: GET /audit?entity=Loan&id=... (Admin/Compliance)


RBAC matrix (sample)
Agent: C/R/U own recovery logs, upload/view case documents, create concession draft.
Officer: R/U loans/delinquencies, approve/reject concessions, add legal escalation.
Supervisor: Assign/reassign loans, view dashboards, override recovery plan with justification.
Admin: Manage users/roles, configuration, retention policies, full audit access.

Tech Stack

Frontend

React 18 + Vite
Material UI (MUI v5) for modern, mobile-first components
Font Awesome (icons), React Router, React Query (server state), Zod/Yup (validation), Recharts or ECharts (analytics)


Backend

Node.js 20, TypeScript
Framework: NestJS (recommended for structure) or Express + Zod + Helmet + rate limits
MongoDB (Atlas or self-hosted) for flexible logs
Redis for caching/sessions/rate limiting/queues
BullMQ/CloudWatch Events for scheduled follow-ups and SLA checks


Storage

AWS S3 for documents (SSE-S3 or SSE-KMS), presigned URLs, ClamAV/Lambda malware scan


Hosting/Infra

AWS (ECS Fargate or EKS), or Azure equivalents; VPC with private subnets for DB
Secrets via AWS Secrets Manager
Logging and tracing via CloudWatch + OpenTelemetry


Authentication

OAuth 2.0/OIDC + TOTP 2FA (Auth0, AWS Cognito, or Keycloak)



Workflow and UI Design
Mobile-first screen flow
Login + 2FA: SSO, TOTP prompt.
Dashboard

KPI cards: Total cases, DPD buckets, recovery rate, promises kept vs. broken.
Quick actions: “New Case,” “Log Visit,” “Upload Notice.”


Case creation (Agent)

Debtor lookup/create, attach initial documents (IDs, loan approval, collateral).
Loan details form (origination, purpose, approval conditions, collateral).


Delinquency profile

Timeline of default events and escalations (EFCC/police/litigation with approvals log).
Risk category and reasons for failure.


Recovery journal

“Log contact/visit” with timestamp, optional geotag, outcomes, promises to pay.
Attach notes, audio, photo evidence (policy controlled).


Payments

Record payments, view cumulative recovery, and day-wise trend charts.


Recovery planning

Define actions, schedule follow-ups; propose concessions with justification and docs.


Concession approvals (Officer/Supervisor)

Side-by-side view of proposal, repayment capacity, prior behavior, and risk.


Documents

Upload legal notices, repayment agreements, affidavits; view versions; virus-scan status.


Admin

Users and roles, retention policies, configuration (e.g., “odd-hour visits require supervisor pre-approval”), system health, audit exports.


MUI components and fonts
AppBar with responsive Drawer; MUI DataGrid for large tables; MUI Stepper for concession workflows; Font Awesome icons (fa-gavel for litigation, fa-shield for compliance, fa-file-contract for agreements).

Implementation plan (step-by-step)
Phase 0: Project scaffolding (Week 1)
Repos: frontend, backend, infra
Frontend: Vite + React + TS, MUI, Font Awesome, React Router, React Query
Backend: NestJS, Prisma (optional for Mongo) or Mongoose, Zod, Helmet, Winston, OpenAPI
Env: .env schema via dotenv‑flow; commit hooks with Husky + lint-staged
Phase 1: Auth + RBAC (Week 2)
OAuth/OIDC integration + TOTP 2FA
User model, roles, JWT, refresh rotation
Route guards (frontend) + RBAC middleware (backend)
Phase 2: Core entities (Weeks 3–4)
Debtors, Loans, Delinquencies CRUD
RecoveryLogs and Payments
AuditLogs (append-only) with hash chaining for integrity
Seed data and fixtures
Phase 3: Documents + Malware scan (Week 5)
S3 presigned upload/download
ClamAV/Lambda scan, MIME validation, size limits, quarantining
Document viewer and metadata
Phase 4: Concessions workflow (Week 6)
Draft → Submit → Approve/Reject with multi-level approval rules
Notification hooks (email/SMS) via SES/SNS or Twilio
Policy for EFCC/police/litigation escalation requiring approvals
Phase 5: Reporting & dashboards (Week 7)
KPI endpoints and cached aggregates
Charts for delinquency buckets, recovery effectiveness, agent performance
Phase 6: Hardening, UAT, and launch (Weeks 8–9)
Pen test remediation, performance tuning, red-team tabletop for escalation flows
UAT with anonymized data; accessibility and mobile QA
Launch runbook, on-call, backups, retention enforcement

Testing and QA

Unit tests: Jest + React Testing Library
Integration tests: Supertest (API), Playwright (E2E)
Security tests: Dependency scans (Snyk), OWASP ZAP baseline scan in CI
Test data: Anonymized debtor/loan datasets; redaction pipelines
UAT scripts reflecting real-world steps: odd-hour visits, litigation approvals, waiver issuance

Security considerations

Transport: TLS 1.2+ everywhere
Data at rest: MongoDB encryption, S3 SSE‑KMS; field‑level encryption for PII (e.g., nationalIdNumber)
Least privilege IAM; VPC endpoints for S3
RBAC and ABAC: role + ownership checks; supervisor overrides logged with reason
Rate limits, IP allowlists for officer/admin panels (optional)
Device posture checks for agent mobile devices (MDM optional)
Full audit logging with tamper‑evident hashing (store hash roots in a separate, write-once store)

Deployment & Maintenance

CI/CD

GitHub Actions: build/test/lint, Docker build, IaC validate
Dev → Staging → Prod with approvals and canary releases


IaC

Terraform modules for VPC, ECS, RDS/Mongo Atlas, S3, CloudFront, WAF


Monitoring

CloudWatch metrics/alarms; OpenTelemetry traces; error budgets and SLO dashboards


Backups and DR

Mongo Atlas automated backups; S3 versioning + lifecycle policies


Training and docs

Admin guide, Agent handbook emphasizing lawful escalation and consent
In‑app tooltips for compliance notes (e.g., “Interest waiver incentives require bank approval”)



Sample artifacts
Example API payloads

Create recovery log

POST /api/v1/loans/:id/recovery-logs
Body:
{
"channel": "visit",
"timestamp": "2025-11-17T08:30:00Z",
"geo": {"lat": 6.4654, "lng": 3.4064, "accuracy": 30},
"notes": "Met borrower; proposed 200k by 25th.",
"promiseToPay": {"amount": 200000, "date": "2025-11-25"},
"outcome": "promise"
}



Submit concession

POST /api/v1/concessions/:id/submit
Body:
{
"justification": "Waive accrued interest to accelerate repayment per policy",
"documents": ["doc_abc123"]
}


Frontend scaffolding commands
npx create-vite@latest npl-app --template react-ts
cd npl-app && npm i @mui/material @mui/icons-material @fontawesome/fontawesome-free react-router-dom @tanstack/react-query zod recharts
npm i -D eslint prettier husky lint-staged
Backend scaffolding commands
npx @nestjs/cli new npl-api
npm i mongoose zod @nestjs/config @nestjs/passport passport-jwt bcrypt helmet express-rate-limit bullmq ioredis @nestjs/swagger

Reporting KPIs (examples)

Recovery effectiveness: recoveredAmount / outstandingPrincipal
Cure rate by DPD bucket: curedLoans / loansInBucket
Promise kept rate: keptPromises / totalPromises
Agent performance: recoveries per agent per month
Litigation conversion: litigated cases resulting in >X% recovery

Wording and branding

System name suggestion: “CALVAZ Recovery Suite”
Default email footers and headers include:

CALVAZ PRIME CONCEPTS
9B Rasheed Alatishe Street, Isheri, Magodo, Lagos
Contact: emekaezekwem5@gmail.com


Compliance inline notes:

“All escalations to EFCC/Police/Litigation must be approved by authorized bank officers. Actions are fully audited.”

# api-calvaz-prime
