import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

const MetaDecorator = ({ metaData }) => {
   const { title, description, canonical } = metaData;
   return (
      <Helmet>
         <meta charSet='utf-8' />
         <title>{title}</title>
         <meta name='description' content={description} data-react-helmet='true'></meta>
         <link rel='canonical' href={canonical} data-react-helmet='true' />

         <meta property='og:title' content={title} data-react-helmet='true' />
         <meta property='og:description' content={description} data-react-helmet='true' />
         <meta property='og:url' content={canonical} data-react-helmet='true' />
      </Helmet>
   );
};
// MetaDecorator.PropTypes = {
//    title: PropTypes.string.isRequired,
//    description: PropTypes.string.isRequired,
// };

export default MetaDecorator;
