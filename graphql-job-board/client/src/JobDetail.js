import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { jobs } from './fake-data';

export class JobDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { job: { company: {} } };
  }

  async getJobs() {
    let jobs = await fetch("http://localhost:9000/graphql", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "operationName": null,
        "variables": {},
        "query": "{ jobs { id title description company {id name description } } }"
      })
    });

    jobs = await jobs.json();
    return jobs.data.jobs;
  }

  async componentDidMount() {
    const jobs = await this.getJobs();
    const { jobId } = this.props.match.params;

    this.setState({ job: jobs.find((job) => job.id === jobId) });
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
