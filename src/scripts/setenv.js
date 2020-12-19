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
// --- DO NOT MODIFY ---
// THE CONTENT OF THE FILE IS GENERATED AUTOMATICALLY FILE.
// VIEW scripts/setenv.js
export const environment = {
   production: ${isProduction},
   firebase: {
        apiKey: '${firebaseApiKey}',
        projectId: 'wish-counter-985b1',
        authDomain: 'wish-counter-985b1.firebaseapp.com',
        databaseURL: 'https://wish-counter-985b1.firebaseio.com',
        storageBucket: 'wish-counter-985b1.appspot.com',
        messagingSenderId: '1064305023356',
        appId: '1:1064305023356:web:3762c467ce9018afb12cf9'
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
