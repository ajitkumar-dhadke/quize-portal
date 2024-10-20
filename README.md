# QuizePortal

Quize Portal 1.0.0

# GitFlow

Branch out from master/main, merge requests/pull requests shall be created using feature branches, no direct commits to main/master

# Default Port for service:

|   services   | http port |
| :----------: | :-------: |
| quize-portal |   3001    |

# Dependencies:

1. NodeJS

# How To run Application :

Step 1: Go to directory and run

```
    * npm install
    * npm start
```

Step 2: in browser open

    * http://localhost:3001/api-doc
    for all available api documentation and execution in swagger

OR

Step 3: without swagger / i.e. with postman

    * http://localhost:3001/api by adding endpoints

# Guidelines and Limitation for devlopers and users

    -Utilize the built-in .vscode/settings to maintain code formatting by installing the Prettier extension.
    -Avoid hardcoded values in code; instead, define them as constants.
    -bugs will be fixed by fix branch as flag as per priority

    1. Quize will get auto incremented unique quize_id when created.
    2. Every Quize should have atleast 5 questions.
    3. All errors are handled and send as response if triggered.
