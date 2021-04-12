import React, { Fragment } from 'react';
import Home from '../components/Home';
import { MetaDecorator, metaData } from '../components/metaDecorator';

const HomePage = () => {
   return (
      <Fragment>
         <MetaDecorator title={metaData.home.title} description={metaData.home.description} />
         <Home />
      </Fragment>
   );
};

export default HomePage;
