import React, { Component } from 'react';
import { JobList } from './JobList';
// const { jobs } = require('./fake-data');

export class JobBoard extends Component {
  state = {
    job: []
  };

  async componentDidMount() {
    const job = await this.getJobs();
    this.setState({ job });
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

  render() {
    const { job } = this.state;
    return (
      <div>
        <h1 className="title">Job Board</h1>
        <JobList jobs={job} />
      </div>
    );
  }
}
