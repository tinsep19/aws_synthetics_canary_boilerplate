# AWS Synthetics Canary Boilerplate

This is a boilerplate to get started using AWS CloudWatch synthetics canary.

## Create your canary

```shell
git clone https://github.com/tinsep19/aws_synthetics_canary_boilerplate.git
git remote remove origin
npm install
```

`npm init -w canaries/<YOUR-CANARY>`

Allocate one workspace to each canary script.
If you need an `<EXTERNAL-MODULE>` for `<YOUR-CANARY>`, you can add a dependency by following the steps below.

`npm install <EXTERNAL-MODULE> -w canaries/<YOUR-CANARY>`

See. [Adding dependencies to a workspace](https://docs.npmjs.com/cli/v7/using-npm/workspaces#adding-dependencies-to-a-workspace)

I have mocked the Synthetics/SyntheticsLogger locally (around syn-nodejs-puppeteer-3.4),
which allows us to write and execute synthetic checks before deploying them.
To run a test locally:

`node scripts/main.js <YOUR-CANARY>`

We can create a zip archive containing the dependencies.

`node scripts/build_zip.js <YOUR-CANARY>`

Using [install-local](https://www.npmjs.com/package/install-local), install `<YOUR-CANARY>` in `build/<YOUR-CANARY>/nodejs/node_modules` with dependencies.

## How do I keep up with runtime updates?

To follow puppeteer updates, edit package.json and `npm install`

```package.json
  "devDependencies": {
    "archiver": "^5.3.0",
    "install-local": "^3.0.1",
    "puppeteer": "^5.5.0",
    "rimraf": "^3.0.2"
  },
```

To follow syn-nodejs-puppeteer updates, please fork or contributes.

- modules/Synthetics/index.js
- modules/SyntheticsLogger/index.js

or add new module

`npm init -w modules/<SYNTHETICS-MODULE>`
