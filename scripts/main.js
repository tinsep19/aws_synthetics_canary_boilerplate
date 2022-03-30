
if (process.argv.length < 3) {
    console.error("argv must contains canary name");
    process.exit(1);
}
const canary = process.argv[2];

// When you want to set env.
// if (canary == "TARGET_CANARY") {
//   process.env.YOUR_ENV_NAME = "YOUR_ENV_VALUE";
// }

(async () => {
    const synthetics = require('Synthetics');
    await synthetics.setUp();
    await require(`../canaries/${canary}`).handler();
    await synthetics.tearDown();
})();
