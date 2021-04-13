import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

const MetaDecorator = ({ title, description }) => {
   return (
      <Helmet>
         <head>
            <title>{title}</title>
            <meta name='description' content={description} data-react-helmet='true'></meta>
         </head>
      </Helmet>
   );
};

// MetaDecorator.PropTypes = {
//    title: PropTypes.string.isRequired,
//    description: PropTypes.string.isRequired,
// };

export default MetaDecorator;
