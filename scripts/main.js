if (process.argv.length < 3) {
    console.error("argv must contains canary name");
    process.exit(1);
}
const canary = process.argv[2];

(async () => {
    const synthetics = require('Synthetics');
    await synthetics.setUp();
    await require(`../canaries/${canary}`).handler();
    await synthetics.tearDown();
})();
