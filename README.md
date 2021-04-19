# lambda-manage-student

# Contents

1. [Description](#Description)
2. [Technology Stack](#technology-stack)
3. [Prerequisites](#Prerequisites)
4. [Installation](#Installation)
5. [Unit Testing](#Unit-Testing)

# Description
Serverless AWS Functions (Lambda) Nodejs, Serverless, webpack and DynamoDB

# Technology Stack

**The main technology stack is:**

#### [Node.js and Node Package Manager (npm)](https://nodejs.org/)
Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.

As an asynchronous event-driven JavaScript runtime, Node.js is designed to build scalable network applications.

#### [Serverless (npm)](https://www.npmjs.com/package/serverless)
Build applications comprised of microservices that run in response to events, auto-scale for you, and only charge you when they run.

#### [DynamoDb (npm)](https://www.npmjs.com/package/aws-sdk)
Provides a JavaScript API for AWS services. You can use the JavaScript API to build libraries or applications for Node.js

#### [Webpack (npm)](https://www.npmjs.com/package/webpack)
Is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling, or packaging just about any resource or asset.

**Additionally, the following libraries are used**

#### [Jest](https://jestjs.io/)
Jest is a delightful JavaScript Testing Framework with a focus on simplicity.

# Prerequisites

- [NodeJs v8.11.1 or Higher](https://nodejs.org/en/)
- [npm v5.3](https://www.npmjs.com/)
- [serverless v2.35.0](https://www.npmjs.com/package/serverless)
- [webpack v2.35.0](https://www.npmjs.com/package/webpack)

# Installation
- Clone this repository.
```
   git clone https://github.com/Landali/lambda-student-portal.git
    npm i -g jest
    npm i
   cd studentManagement
   npm i -g serverless
   npm i -g webpack
   npm i

```
**Note:** Lambdas function are already deploy with the last changes. In case of doing a change be sure to be inside studentManagement and use the following command: sls deploy

# #Unit Testing
**Note:** Once jest has been installed run the following commands to do unit testing to deployed functions.
- npm run test-get-student
- npm run test-view-student
- npm run test-create-student
- npm run test-sign-up
- npm run test-sign-in
