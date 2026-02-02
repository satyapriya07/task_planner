const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

const envConfigFile = `export const environment = {
  production: ${process.env.NODE_ENV === 'production'},
  apiUrl: '${process.env.API_URL}'
};
`;

const targetPath = './src/environments/environment.ts';

fs.writeFile(targetPath, envConfigFile, function (err) {
    if (err) {
        console.log(err);
    }
    console.log(`Output generated at ${targetPath}`);
});
