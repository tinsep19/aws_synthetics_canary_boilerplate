# AWS Synthetics Canary Boilerplate

This is a boilerplate to get started using AWS CloudWatch synthetics canary.

## Motivation

- Test code locally using syn-nodejs-puppeteer.
- Make it Easily to write canary code with some dependencies and archive them.

## Set Up

1. Copy this repository
2. install target node and latest npm. # node v14 use npm@6 as default. but it does not support workspace feature 
3. npm install

```shell
git clone https://github.com/tinsep19/aws_synthetics_canary_boilerplate.git <YOUR-REPO>
cd <YOUR-REPO>
nvm install
nvm install-latest-npm
git remote remove origin
npm install
```

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

You will specify `<SYNTHETICS-MODULE>` in PascalCase. However, it will be lowercase in package.json.
Change the name in package.json to PascalCase, then run `npm install`.

To follow puppeteer updates, edit package.json and `npm install`

```package.json
  "devDependencies": {
    "archiver": "^5.3.0",
    "install-local": "^3.0.1",
    "puppeteer": "^5.5.0",
    "rimraf": "^3.0.2"
  },
```

### Questions

- What should I specify for `Handler`?

specify `<YOUR-CANARY>.handler`.

- The file name of canary code is index.js. Why does this work?

Yes, this works.

Lambda code will execute `require('/nodejs/node_modules/<YOUR-CANARY>').handler();`.
The canary has a package.json their `main` is `index.js`.
So the above code will execute `index.js`.

- How do we deploy?

In this version, boilerplate has no deployment method.
Create a Stack that contains the following fragments.

Cfn: You need to upload the zip file to S3 before deploying

```yaml
Type: AWS::Synthetics::Canary
Properties: 
  Name: <YOUR-CANARY>
  RuntimeVersion: syn-nodejs-puppeteer-3.5
  Code: 
    Handler: "<YOUR-CANARY>.handler"
    S3Bucket: "<S3-CODE-BUCKET>"
    S3Key: "<YOUR-CANARY>-<YOUR-CANARY-VERSION>.zip"
  # other properties.
```

CDK:

```ts
const canary = new synthetics.Canary(this, 'MyCanary', {
  test: synthetics.Test.custom({
    code: synthetics.Code.fromAsset(path.join(__dirname, 'build/<YOUR-CANARY>-<YOUR-CANARY-VERSION>.zip')),
    handler: '<YOUR-CANARY>.handler',
  }),
  runtime: synthetics.Runtime.SYNTHETICS_NODEJS_PUPPETEER_3_5,
  // other properties
});
```
