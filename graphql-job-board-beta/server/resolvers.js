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

// defining the reslover for the mutations
const Mutation = {
    createJob : (root, args) => {
        // we destruct the args for the requied key as 
        // args --> {title, description, company}
        const id =  db.jobs.create({
            title: args.title,
            description: args.description,
            companyId: args.companyId 
        });
        return db.jobs.get(id);
    },
    createJobSmart : (root, args) => {
        // we destruct the args for the requied key as 
        // args --> {title, description, company}
        const id =  db.jobs.create(args.input);
        return db.jobs.get(id);
    }
}

module.exports = { Query, Job, CompanyWithJobs, Mutation };