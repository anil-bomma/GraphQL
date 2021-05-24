const db = require("./db");

const Query = {
    greeting: () => "Hello GraphQL",
    job: (root, args) => db.jobs.get(args.id),
    jobs: () => db.jobs.list(),
    company: (root, {id}) => db.companies.get(id),
    companyWithJobs: (root, {id}) => db.companies.get(id)
}

const CompanyWithJobs = {
    jobsWithCompany: (company) => db.jobs.list().filter((job) => job.companyId === company.id)
}

const Job = {
    company: (job) => db.companies.get(job.companyId)
}

module.exports = { Query, Job, CompanyWithJobs };