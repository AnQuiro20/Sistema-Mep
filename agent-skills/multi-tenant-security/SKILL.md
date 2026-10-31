---
name: multi-tenant-security
description: Protect teacher-owned records whenever code reads, writes, lists, exports, stores, or processes tenant data, files, reports, jobs, or authorization decisions.
---

# Multi-tenant security

Each teacher controls an isolated workspace. Treat every identifier, relationship, file key, report, and background job as untrusted until server-side ownership is proven.

## Authorization boundary

- Derive the authenticated teacher identity from the verified server session, never from client-supplied ownership fields.
- Authorize every object and collection operation against that teacher identity, including indirect relationships and bulk operations.
- Scope reads and writes by ownership before applying user-selected filters.
- Recheck ownership inside transactions, asynchronous jobs, exports, report downloads, and storage access.
- Return a safe denial without revealing whether another teacher's resource exists.
- Client routes, hidden controls, feature flags, and remote parameters never grant authorization.

## Data layer

- Make tenant ownership explicit in persistence contracts and indexes where applicable.
- Preserve ownership through child records and cross-capability references.
- Use database row-level protection as defense in depth when the selected database design supports it; application authorization remains required.
- Prevent unscoped administrative or maintenance queries from entering ordinary request paths.
- Keep audit records sufficient to investigate sensitive changes without logging student content, tokens, or secrets.

Do not choose an authentication provider, ORM, database library, or route layout in this skill. Those require the applicable story and technical evidence.

## Privacy and test data

- Collect only fields required by the active story.
- Use synthetic student data in development, tests, screenshots, and demonstrations.
- Exclude personal and academic content from logs, metrics, traces, and error payloads.
- Keep private files and generated reports authenticated, temporary, and ownership-scoped when those features are implemented.

## Required evidence

For every tenant-aware operation, test:

- the owner can perform the allowed action;
- another authenticated teacher is denied using the same identifier;
- guessed, missing, and indirectly related identifiers cannot cross the boundary;
- list, bulk, export, file, report, and job paths remain scoped when applicable;
- failure responses and logs do not expose another tenant's data.

Do not close a relevant story while cross-tenant denial coverage is missing or failing.
