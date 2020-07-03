// config.js contains env variables for stages:
// - development
// - production

const prod = {
    URL: `https://dashboard.alem.school`,
    API_URL: `https://dashboard.alem.school/api`,
    AUTH_URL: `https://email-trigger.alem.school/auth/dashboard`,
    CLIENT_ID: `d02ae1b0-9b05-4b24-ad87-1ef2a9ea2559`,
}

const dev = {
    URL: `http://localhost:3000`,
    API_URL: `http://localhost:3030/api`,
    AUTH_URL: `https://email-trigger.alem.school/auth/dashboard_test`,
    CLIENT_ID: `1dce8297-b3d8-43bb-93f8-9416eec6dc87`
}

var config = process.env.NODE_ENV === 'development' ? dev : prod;

export default config;