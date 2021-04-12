import React from 'react';

import AdminContainer from '../components/admin/AdminContainer';
import { MetaDecorator, metaData } from '../components/metaDecorator';

const AdminPanel = () => {
   return (
      <div>
         <MetaDecorator title={metaData.admin.title} description={metaData.admin.description} />
         <AdminContainer />
      </div>
   );
};

export default AdminPanel;
