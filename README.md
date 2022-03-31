# AWS Synthetics Canary Boilerplate

This is a boilerplate to get started using AWS CloudWatch synthetics canary.

## Set Up

```shell
git clone https://github.com/tinsep19/aws_synthetics_canary_boilerplate.git <YOUR-REPO>
cd <YOUR-REPO>
git remote remove origin
npm install
```

Copy this repository.

`npm install` will install puppeteer for locally use.

## Create your canary

```shell
npm init -y -w canaries/<YOUR-CANARY>
npm install
```

Allocate one workspace to each canary script.
Write your canary code in `canaries/<YOUR-CANARY>/index.js`

If you need an `<EXTERNAL-MODULE>` for `<YOUR-CANARY>`, you can add a dependency by following the steps below.

`npm install <EXTERNAL-MODULE> -w canaries/<YOUR-CANARY>`

See. [Adding dependencies to a workspace](https://docs.npmjs.com/cli/v7/using-npm/workspaces#adding-dependencies-to-a-workspace)


## Test locally

I have mocked the Synthetics/SyntheticsLogger locally (around syn-nodejs-puppeteer-3.4),
which allows us to write and execute synthetic checks before deploying them.

To run a test locally,

`node scripts/main.js <YOUR-CANARY>`

If you will use ENVIRONMENT_VARIABLES, write env and run it as follows,

`node -r dotenv/config scripts/main.js <YOUR-CANARY> dotenv_config_path=env/<YOUR-CANARY>.env`

```.env
ENV_NAME_A=ENV_VALUE_A
ENV_NAME_A=ENV_VALUE_B
```

## Create zip

For each canary, we can create a zip archive containing the dependencies.

`node scripts/build_zip.js <YOUR-CANARY>`

Using [install-local](https://www.npmjs.com/package/install-local), install `<YOUR-CANARY>` in `build/<YOUR-CANARY>/nodejs/node_modules` with dependencies.

It will be archived on `build/<YOUR-CANARY>-<YOUR-CANARY-VERSION>.zip`

## How do I keep up with runtime updates?

For now, I'm implementing the API I used.
Please fork or contributes.

- modules/Synthetics/index.js
- modules/SyntheticsLogger/index.js

or add new module

`npm init -w modules/<SYNTHETICS-MODULE>`

To follow puppeteer updates, edit package.json and `npm install`

```package.json
  "devDependencies": {
    "archiver": "^5.3.0",
    "install-local": "^3.0.1",
    "puppeteer": "^5.5.0",
    "rimraf": "^3.0.2"
  },
```

