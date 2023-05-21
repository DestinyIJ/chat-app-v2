const fs = require("node:fs")
const path = require("node:path")
require("dotenv").config()

const Handlebars = require('handlebars');

const buildTemplateView = (view, props = {}) => {
    const source = fs.readFileSync(path.join(`views/${view}.html`), 'utf8');

    const template = Handlebars.compile(source)({
        ...props,
        APP_URL: process.env.APP_URL,
        APP_NAME: process.env.APP_NAME,
        APP_FRONTEND_URL: process.env.APP_FRONTEND_URL,
        APP_EMAIL_ADDRESS: process.env.APP_EMAIL_ADDRESS
    })

    return template
} 

module.exports = buildTemplateView