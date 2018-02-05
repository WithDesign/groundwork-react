import React, { Component } from 'react';
import { Link } from 'react-router';
import PageHead from '../components/Head';

class HomePageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { resizeNotifier: () => {} };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    // const isMobile = window.innerWidth <= 500;
    const isTab = window.innerWidth <= 992;

    return (
      <div className="home-page">
        <PageHead />
        <div>
          Content here
        </div>
      </div>
    );
  }
}

export default HomePageContainer;
