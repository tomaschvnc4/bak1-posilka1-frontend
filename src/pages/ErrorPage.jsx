import React from 'react';

import { MetaDecorator, metaData } from '../components/metaDecorator';
import NotFound404 from '../components/NotFound404';
const ErrorPage = () => {
   return (
      <dir>
         <MetaDecorator metaData={metaData.error} />
         <NotFound404 />
      </dir>
   );
};

export default ErrorPage;
