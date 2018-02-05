import React, { Component } from 'react';
import ContactFormWrapper from '../components/Contact/ContactFormWrapper';
import PageHead from '../components/Head';

class ContactPage extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div>
        <PageHead
          title="Contact"
          description="Contact Us."
        />
        <ContactFormWrapper />
      </div>
    );
  }
}

export default ContactPage;
