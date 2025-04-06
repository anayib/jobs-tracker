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

The workflow for contributing to this project is the following:

**1. Create Database locally**

- Configur a Docker Container with PostgreSQL
- Run the container
- Create a new database with the name `jobs_tracker` with Dizzle scripts. Check the scrips in package.json `db:generate` and `db:push`, and run db:studio to see the database ui schema if desired.
- Update the `.env` file with the correct database credentials

**2. Create a branch**

```
$ git checkout master
$ git pull
$ git checkout -b xx-short-description
```

The name of the branch should start with the number of the issue, followed by max three keywords that describe the issue (e.g. `23-fix-homepage`, `56-change-font`, etc.).

**3. Work on the branch**

Commit often and try to create small commits, just be sure that the tests are passing before commiting. Rebase against the upstream frequently to prevent your branch from diverging significantly:

```
$ git fetch origin
$ git rebase origin/master
```

Once you finish, you can push the branch and initiate a pull request.

**Note:** remember that an issue is not finished until it's fully tested!

**4. Push the branch and initiate the pull request**

When you are done, and you have organized your commits locally, it's time to push the branch.

```
$ git push -u origin xx-short-description
```

Open a pull request (PR) on Github.

### Writing good commit messages

A commit message has a first line, a blank line and an optional body. For example (taken from the Rails repository). 

Also start with:
- fix if you are fixing a bug
- feat if you are adding a new feature
- refactor if you are refactoring code
- chore if you are updating the build process or deps

```
Feat flash messages cookie compatible with React

In #xxx we removed the discard key from the session hash used to flash
messages and that broke compatibility with React applications because they
try to map in the discarded flash messages and it returns nil.

Close  issue #xxx.
```