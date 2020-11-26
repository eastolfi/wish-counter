const updateJsonFile = require('update-json-file')

// console.log(process.argv);

let newVersion;

function parseArguments() {
    if (process.argv.length > 2) {
        const arg = process.argv[2];

        if (arg.includes('patch')) {
            console.log('patch version')
        }
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

function calculateNewVersion() {
    return '1.0.1';
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
            const releaseType = 'rc';
            // bump version
            const newVersion = calculateNewVersion();
            // write file
            await updateServiceWorker(newVersion);

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



