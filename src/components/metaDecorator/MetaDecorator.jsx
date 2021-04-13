import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

const MetaDecorator = ({ title, description }) => {
   return (
      <Helmet>
         <title>{title}</title>
         <meta name='description' content={description} data-react-helmet='true'></meta>
      </Helmet>
   );
};

// MetaDecorator.PropTypes = {
//    title: PropTypes.string.isRequired,
//    description: PropTypes.string.isRequired,
// };

export default MetaDecorator;
