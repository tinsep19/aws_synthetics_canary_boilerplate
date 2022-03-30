const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const { progress, LocalInstaller } = require('install-local');

const checkCanaryModule = (canary) => {
  const canaryModulePath = `canaries/${canary}`;
  return fs.promises.lstat(canaryModulePath)
    .then(stat => stat.isDirectory())
    .catch(() => false);
};

// AWS requires us to save the canary scripts in the following folder structure:
// build
// - ${canary}
//   - nodejs
//     - node_modules
//       - ${canary}/index.js
//       - ${dependencies}
const installCanaryAndDependencies = (canary) => {

  const installPath = `build/${canary}/nodejs`;
  const packageJsonPath = `build/${canary}/nodejs/package.json`;
  const canaryModulePath = `canaries/${canary}`;
  const packageJson = {
    name : `${canary}-canary`
  };
  const createInstallDir = () => fs.promises.mkdir(installPath, { recursive : true });
  const createPackageJson = () => fs.promises.writeFile(packageJsonPath, JSON.stringify(packageJson));
  const installCanary = () => {
    let installs = {};
    installs[installPath] = [canaryModulePath];
    const localInstaller = new LocalInstaller(installs);
    progress(localInstaller);
    return localInstaller.install();
  }

  return createInstallDir()
    .then(createPackageJson)
    .then(installCanary);
};

const archiveCanaryCode = (canary) => {
  const sourceDir = `build/${canary}`;
  const archiveZip = `build/${canary}.zip`;

  const zipDirectory = (source, out) => {
    const archive = archiver('zip', { zlib: { level: 9 }});
    const stream = fs.createWriteStream(out);
  
    return new Promise((resolve, reject) => {
      archive
        .directory(source, false)
        .on('error', err => reject(err))
        .pipe(stream);
  
      stream.on('close', () => resolve());
      archive.finalize();
    });
  };
  return zipDirectory(sourceDir, archiveZip).then(() => archiveZip);
};

(async function run() {
  if (process.argv.length < 3) {
    console.log("canary name is required");
    return;
  }
  const canary = process.argv[2];
  const existCanary = await checkCanaryModule(canary);
  if (!existCanary) {
    console.log(`canaries/${canary} is not exists.`);
    process.exit(1);
  }

  await installCanaryAndDependencies(canary)
    .catch(e => console.error(e));

  await archiveCanaryCode(canary)
    .then(zipPath => console.info(`output zip : ${zipPath}`))
    .catch(e => console.error(e));

})();
