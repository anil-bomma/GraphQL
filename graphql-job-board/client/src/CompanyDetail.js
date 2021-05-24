import React, { Component } from 'react';
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
            company(id: $id) {
              name
              description
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
    return job.data.company;
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
      </div>
    );
  }
}
