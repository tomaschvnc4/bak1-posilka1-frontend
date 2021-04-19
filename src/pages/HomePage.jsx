import React, { Fragment } from 'react';
import Home from '../components/Home';
import { MetaDecorator, metaData } from '../components/metaDecorator';

const HomePage = () => {
   return (
      <Fragment>
         <MetaDecorator metaData={metaData.home} />
         <Home />
      </Fragment>
   );
};

export default HomePage;
