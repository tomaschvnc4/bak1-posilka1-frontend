import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

const MetaDecorator = ({ title, description }) => {
   return (
      <Helmet>
         <meta charSet='utf-8' />
         <title data-react-helmet='true'>{title}</title>
         {/* <meta name='description' content={description} data-react-helmet='true'></meta> */}
         <meta data-react-helmet='true' property='og:description' content={description}></meta>
         <meta
            data-react-helmet='true'
            property='og:title'
            content='Using the Effect Hook – React'></meta>
      </Helmet>
   );
};
// MetaDecorator.PropTypes = {
//    title: PropTypes.string.isRequired,
//    description: PropTypes.string.isRequired,
// };

export default MetaDecorator;
