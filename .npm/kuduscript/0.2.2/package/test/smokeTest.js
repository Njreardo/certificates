﻿// Functional tests using mocha and should.

var should = require("should");
var fs = require("fs");
var pathUtil = require("path");

var exec = require("child_process").exec;

// Globals
var baseTestTempDir = "temp";
var testDirBase = "test";
var testDirIndex = 0;
var testDir = "";

// Tests Suite
suite('Kudu Script Smoke Tests', function () {
    test('Basic generated batch script runs without a failure', function (done) {
        generateFile(pathUtil.join(testDir, "server.js"), "content");
        var isBash = false;
        runScenario("--basic", isBash, done);
    });

    test('Node generated batch script runs without a failure', function (done) {
        generateFile(pathUtil.join(testDir, "server.js"), "content");
        var isBash = false;
        runScenario("--node", isBash, done);
    });

    test('Python generated batch script runs without a failure', function (done) {
        generateFile(pathUtil.join(testDir, "app.py"), "content");
        var isBash = false;
        runScenario("--python", isBash, done);
    });

    test('Basic generated bash script runs without a failure', function (done) {
        generateFile(pathUtil.join(testDir, "server.js"), "content");
        var isBash = true;
        runScenario("--basic", isBash, done);
    });

    test('Node generated bash script runs without a failure', function (done) {
        generateFile(pathUtil.join(testDir, "server.js"), "content");
        var isBash = true;
        runScenario("--node", isBash, done);
    });

    setup(function () {
        // Setting a different test directory per test.
        incrementTestDir();
        removePath(testDir);
        console.log();
    });

    teardown(function () {
        // Cleaning up after each test
        removePath(baseTestTempDir);
    });
});

function incrementTestDir() {
    testDirIndex++;
    testDir = pathUtil.join(baseTestTempDir, testDirBase, "project" + testDirIndex);
}

// Scenario:
// 1. Generate the script using the flags provided.
// 2. Run the generated script.
// 3. Make sure script generation and script generated didn't fail execution.
function runScenario(flags, isBash, callback) {
    var command = "node " + pathUtil.join(__dirname, "..", "bin", "kuduscript") + " -y -o \"" + testDir + "\" " + flags;

    if (isBash) {
        command += " --scriptType bash";
    }

    console.log("command: " + command);
    exec(command,
        function (error, stdout, stderr) {
            if (stdout !== '') {
                console.log('---------stdout: ---------\n' + stdout);
            }
            if (stderr !== '') {
                console.log('---------stderr: ---------\n' + stderr);
            }
            if (error !== null) {
                console.log('---------exec error: ---------\n[' + error + ']');
            }
            if (error) {
                callback(error);
            } else {
                testScript(isBash, callback);
            }
        });
}

function testScript(isBash, callback) {
    var generatedScriptPath = pathUtil.join(testDir, "deploy");
    generatedScriptPath += isBash ? ".sh" : ".cmd";

    var command = "\"" + generatedScriptPath + "\"";

    if (isBash) {
        command = "bash " + command;
    }

    console.log("command: " + command);
    exec(command,
        function (error, stdout, stderr) {
            if (stdout !== '') {
                console.log('---------stdout: ---------\n' + stdout);
            }
            if (stderr !== '') {
                console.log('---------stderr: ---------\n' + stderr);
            }
            if (error !== null) {
                console.log('---------exec error: ---------\n[' + error + ']');
            }
            callback(error);
        });
}

function generateFile(path, content) {
    if (content == null) {
        content = randomString();
    }
    ensurePathExists(pathUtil.dirname(path));
    fs.writeFileSync(path, content, 'utf8');
    return content;
}

function removePath(path) {
    var stat = tryGetFileStat(path);
    if (stat) {
        if (!stat.isDirectory()) {
            tryRemoveFile(path);
        }
        else {
            var files = fs.readdirSync(path);
            for (var index in files) {
                var file = files[index];
                var filePath = pathUtil.join(path, file);
                removePath(filePath);
            }

            tryRemoveDir(path);
        }
    }
}

function tryGetFileStat(path) {
    try {
        return fs.statSync(path);
    } catch (e) {
        if (e.errno == 34 || e.errno == -4058) {
            // Return null if path doesn't exist
            return null;
        }

        throw e;
    }
}

function tryRemoveFile(path) {
    try {
        fs.unlinkSync(path);
    }
    catch (e) {
        console.log(e);
    }
}

function tryRemoveDir(path) {
    try {
        fs.rmdirSync(path);
    }
    catch (e) {
    }
}

function ensurePathExists(path) {
    if (!fs.existsSync(path)) {
        ensurePathExists(pathUtil.dirname(path));
        fs.mkdirSync(path);
    }
}

// Create a random string, more chance for /n and space.
function randomString() {
    var length = Math.floor(Math.random() * 1024) + 100;

    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ \n abcdefghijklmnopqrstuvwxyz \n 0123456789 \n \t";

    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
