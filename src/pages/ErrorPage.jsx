import React from 'react';

import { MetaDecorator, metaData } from '../components/metaDecorator';
const ErrorPage = () => {
   return (
      <dir>
         <MetaDecorator title={metaData.error.title} description={metaData.error.description} />
         <div>Error page</div>
      </dir>
   );
};

export default ErrorPage;
