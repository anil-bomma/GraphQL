import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { jobs } from './fake-data';

export class JobDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { job: { company: {} } };
  }

  async getJob() {
    let job = await fetch("http://localhost:9000/graphql", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          "query": `
            query JobQuery($id: ID!){
              job(id: $id) {
                id
                title
                description
                company {
                  name
                  id
                }
              }
            }
          `,
          variables: {
            id: `${this.props.match.params.jobId}`
          },
          operationName: "JobQuery"
        })
    });

    job = await job.json();
    return job.data.job;
  }

  async componentDidMount() {
    const job = await this.getJob();
    this.setState({ job });
  }

  render() {
    const { job } = this.state;
    return (
      <div>
        <h1 className="title">{job.title}</h1>
        <h2 className="subtitle">
          <Link to={`/companies/${job.company.id}`}>{job.company.name}</Link>
        </h2>
        <div className="box">{job.description}</div>
      </div>
    );
  }
}
