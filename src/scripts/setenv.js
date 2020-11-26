// read environment variables from .env file
require('dotenv').config();

const { writeFile } = require('fs');
const { argv } = require('yargs');

// read the command line arguments passed with yargs
const environment = argv.environment;
const isProduction = environment === 'prod';
const targetPath = isProduction
    ? `./src/environments/environment.prod.ts`
    : `./src/environments/environment.ts`;
const firebaseApiKey = isProduction
    ? 'AIzaSyDo1duVRY3RSfuWw17Ofhp8yq2GlQ5BzDQ'
    : process.env.FIREBASE_API_KEY_DEV;

// we have access to our environment variables
// in the process.env object thanks to dotenv
const environmentFileContent = `
export const environment = {
   production: ${isProduction},
   firebase: {
        apiKey: '${firebaseApiKey}',
        projectId: 'wish-counter-985b1',
    }
};
`;

// write the content to the respective file
writeFile(targetPath, environmentFileContent, function (err) {
    if (err) {
        console.log(err);
    }
    console.log(`Wrote variables to ${targetPath}`);
});
