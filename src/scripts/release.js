const updateJsonFile = require('update-json-file')
const { exec } = require("child_process");

// console.log(process.argv);

const VERSION_OPTIONS = {
    PATCH: 'PATCH',
    PRE_RELEASE: 'PRE_RELEASE'
}

function getReleaseType() {
    if (process.argv.length > 2) {
        const arg = process.argv[2];

        if (arg.includes('prerelease')) {
            return VERSION_OPTIONS.PRE_RELEASE;
        }

        return VERSION_OPTIONS.PATCH;
    } else {
        console.error('Invalid version')
        process.exit(1);
    }
}

async function getCurrentVersion() {
    return new Promise((resolve, reject) => {
        const fs = require('fs');

        fs.readFile('package.json', (error, raw) => {
            if (error) {
                reject(error);
            }

            let projectConfig = JSON.parse(raw);

            resolve(projectConfig.version);
        });
    });
}

function calculateNewVersion(currentVersion, releaseType) {
    const VERSION_SEPARATOR = '.';
    const RELEASE_CANDIDATE_SEPARATOR = '-rc.';


    let from = '';
    if (currentVersion.indexOf('rc')) {
        from = 'rc';
    }

    let major;
    let minor;
    let patch;
    let releaseCandidate;

    if (from === 'rc') {
        const parts = currentVersion.split(RELEASE_CANDIDATE_SEPARATOR);

        currentVersion = parts[0];
        releaseCandidate = +parts[1];
    }

    const parts = currentVersion.split(VERSION_SEPARATOR);
    major = +parts[0];
    minor = +parts[1];
    patch = +parts[2];

    switch (releaseType) {
        case VERSION_OPTIONS.PRE_RELEASE:
            releaseCandidate++;
            break;
        default:
            patch++;
    }

    const nextVersion = [major, minor, patch].join(VERSION_SEPARATOR);

    if (releaseType === VERSION_OPTIONS.PRE_RELEASE) {
        return [nextVersion, releaseCandidate].join(RELEASE_CANDIDATE_SEPARATOR);
    } else {
        return nextVersion;
    }
}

function updateServiceWorker(newVersion) {
    return new Promise((resolve, reject) => {
        updateJsonFile('ngsw-config.json', dat => {
            dat.appData.version = newVersion;
            return dat;
        }).then(() => {
            resolve();
        }).catch(error => {
            reject(error)
        });
    })
}

function handleError(resolve, reject) {
    return (error, stdout) => {
        if (error) {
            reject(error.message);
            return;
        }

        resolve(stdout);
    }
}

function Promify(fnc, params, cb) {
    return new Promise((resolve, reject) => {
        fnc(...params, cb(resolve, reject))
    });
}

function commitAndPush(newVersion) {
    return new Promise(async (resolve, reject) => {
        try {
            const currentBranch = await Promify(exec, [`git rev-parse --abbrev-ref HEAD`], handleError);
            const releaseBranch = `release_${newVersion}`
            await Promify(exec, [`git checkout -b ${releaseBranch}`], handleError);
            // tests
            await Promify(exec, [`git add .`], handleError);
            await Promify(exec, [`git commit -m "chore(release): release new version ${newVersion}"`], handleError);
            await Promify(exec, [`git checkout ${currentBranch}`], handleError);
            await Promify(exec, [`git merge --ff-only ${releaseBranch}`], handleError);
            await Promify(exec, [`git push -u origin ${currentBranch}`], handleError);
            await Promify(exec, [`git tag ${newVersion}`], handleError);
            await Promify(exec, [`git push --tags`], handleError);

            resolve();
        } catch (error) {
            reject(error);
        }
    })
}

function updateVersion() {
    return new Promise(async (resolve, reject) => {
        try {
            const version = await getCurrentVersion();
            // check bump type
            // const releaseType = getReleaseType();
            // bump version
            // const newVersion = calculateNewVersion(version, releaseType);
            // write file
            await updateServiceWorker(version);

            await commitAndPush(version);

            resolve();
        } catch(error) {
            reject(error);
        }
    })
}

updateVersion()
.then(() => {
    process.exit(0);
})
.catch(error => {
    console.error(error);
    process.exit(1);
});



