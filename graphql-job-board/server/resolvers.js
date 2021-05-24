const db = require("./db");

const Query = {
    greeting: () => "Hello GraphQL",
    jobs: () => db.jobs.list()
}

module.exports = { Query };