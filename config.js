const { env } = require("process");

const environments = {};

environments.production = {
    httpPortNo: 5000
}
environments.development = {
    httpPortNo: 3000
}




const envToExport = environments[process.env.NODE_ENV] ? environments[process.env.NODE_ENV] : environments.development;
module.exports = envToExport
