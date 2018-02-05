import React, { Component } from 'react';
import PageSection from '../components/Content/PageSection';
import PageHead from '../components/Head';

class ThanksPage extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="view-thanks">
        <PageHead
          title="Thanks"
          description="Thanks"
        />
        <div className="content">
          <h1>Thanks</h1>
          <small><a href="/" className="link">Back To Home</a></small>
        </div>
      </div>
    );
  }
}

export default ThanksPage;
