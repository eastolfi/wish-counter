const updateJsonFile = require('update-json-file')

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



