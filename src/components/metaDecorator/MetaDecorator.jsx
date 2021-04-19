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

         <meta data-react-helmet='true' property='og:title' content={title} />
         <meta property='og: description' content={description} data-react-helmet='true' />
         <link rel='canonical' href={canonical} data-react-helmet='true' />
      </Helmet>
   );
};
// MetaDecorator.PropTypes = {
//    title: PropTypes.string.isRequired,
//    description: PropTypes.string.isRequired,
// };

export default MetaDecorator;
