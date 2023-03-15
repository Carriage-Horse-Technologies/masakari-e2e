const testInput = require("./test_input.js");
const aliveTest = require("./alive_monitoring.js");


// console.log("[STEP1] alive test")
// aliveTest.aliveTest();
// console.log("[STEP2] input test")
// testInput.testInput();


(async () => {

    console.log("[STEP1] alive test")
    await aliveTest.aliveTest();
    console.log("[STEP2] input test")
    await testInput.testInput();


})();
