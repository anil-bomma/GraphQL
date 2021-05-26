import React, { Component } from 'react';
import { JobList } from './JobList';

// import { companies } from './fake-data';

export class CompanyDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {company: null}
  }

  async componentDidMount() {
    const company = await this.getCompany();
    this.setState({company});
  }

  async getCompany() {
    let job = await fetch("http://localhost:9000/graphql", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          "query": `
            query CompanyQuery ($id: ID!){
              companyWithJobs(id: $id) {
                name
                description,
                jobsWithCompany {
                  id,
                  title
                }
              }
            }
          `,
          variables: {
            id: `${this.props.match.params.companyId}`
          },
          operationName: "CompanyQuery"
        })
    });

    job = await job.json();
    return job.data.companyWithJobs;
  }

  render() {
    const { company } = this.state;
    if (!company) {
      return null;
    }

    return (
      <div>
        <h1 className="title">{company.name}</h1>
        <div className="box">{company.description}</div>
        <h5 className="title">Job List</h5>
        <JobList jobs={company.jobsWithCompany} />
        </div>
    );
  }
}
