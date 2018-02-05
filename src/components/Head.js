import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

const propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  image: PropTypes.string,
  twitterUser: PropTypes.string,
};

const defaultProps = {
  title: '',
  description: '',
  url: '',
  image: '',
};

function PageHead({
    title,
    description,
    url,
    image,
    twitterUser
  }) {
  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={image} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content={url} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        <meta name="twitter:site" content={twitterUser} />
        <meta name="twitter:creator" content={twitterUser} />
        <meta itemProp="name" content={title} />
        <meta itemProp="description" content={description} />
        <meta itemProp="image" content={image} />
      </Helmet>
    </div>
  );
}

PageHead.PropTypes = propTypes;
PageHead.defaultProps = defaultProps;

export default PageHead;
