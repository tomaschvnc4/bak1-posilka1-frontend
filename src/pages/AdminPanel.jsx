import React from 'react';

import AdminContainer from '../components/admin/AdminContainer';
import { MetaDecorator, metaData } from '../components/metaDecorator';

const AdminPanel = () => {
   return (
      <div>
         <MetaDecorator metaData={metaData.admin} />
         <AdminContainer />
      </div>
   );
};

export default AdminPanel;
