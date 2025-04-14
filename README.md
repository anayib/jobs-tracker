# Jobs Tracker

Project to track job applications. This is an under development project to help students practice their skills with Next.js, Tailwind CSS, Shadcn UI, Drizzle ORM, Node.js, PostgreSQL, Zod, NextJs, cursor, and github actions.

## Tech Stack

- Next.js
- Tailwind CSS
- Shadcn UI
- Drizzle ORM
- Node.js
- PostgreSQL
- Zod
- NextJs 


## Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes and commit them
4. Push your changes to your fork
5. Create a pull request


### Commit Messages

We use Conventional Commits to format our commit messages.

| Prefix       | Description                                                                 |
|--------------|-----------------------------------------------------------------------------|
| `feat`       | A new feature (triggers a **minor** version bump in SemVer).                |
| `fix`        | A bug fix (triggers a **patch** version bump in SemVer).                    |
| `docs`       | Documentation changes (README, comments, etc.).                             |
| `style`      | Code style changes (formatting, linting, no functional changes).            |
| `refactor`   | Code restructuring (no new features or bug fixes).                          |
| `perf`       | Performance improvements.                                                   |
| `test`       | Adding or modifying tests.                                                  |
| `chore`      | Maintenance tasks (build config, dependencies, CI/CD).                      |
| `revert`     | Reverting a previous commit.                                                |
| `ci`         | Changes to CI/CD pipelines.                                                 |
| `build`      | Changes affecting the build system or dependencies.                         |

---

### Format of a Conventional Commit

```
<type>(<scope>): <description>
[optional body]
[optional footer]
```

```bash
**`<type>`**: The kind of change (`feat`, `fix`, `docs`, etc.).
**`<scope>`** (optional): The part of the codebase affected (e.g., `auth`, `api`, `ui`).
**`<description>`**: A concise summary of changes (imperative tense: "add" instead of "added").
**Body** (optional): Detailed explanation if needed.
**Footer** (optional): References like `BREAKING CHANGE:` or issue links (`Closes #123`).
```

---

### Examples

#### 1. Simple Feature Addition
```bash
git commit -m "feat(auth): add OAuth2 login support"
```

#### 2. Bug Fix with Issue Reference
```bash
git commit -m "fix(api): handle null response in user endpoint

Closes #456"
```
#### 3. Breaking Change (Major Version Bump)
```bash

git commit -m "feat(db): migrate to PostgreSQL
