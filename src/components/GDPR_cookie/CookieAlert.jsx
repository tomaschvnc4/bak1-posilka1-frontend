import { Button, Snackbar, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../context/Provider2';

const CookieAlert = () => {
   const { cooksieOpen, setCooksieOpen } = useGlobalContext();

   function setCookie() {
      document.cookie = 'cookieComfirmed=1; expires=' + moment().add(6, 'months').toDate();
      setCooksieOpen(false);
   }

   return (
      <Snackbar open={cooksieOpen}>
         <Alert
            severity='info'
            action={
               <React.Fragment>
                  <Typography></Typography>
                  <Typography>
                     Kliknutím na možnosť „Povoliť“ vyjadrujete súhlas s používaním súborov cookies
                     a vyjadrujete súshlas so spracovaním osobných údajov zadaných na našej stránke.
                     Pre viac informácií kliknite
                     <Link to='/zasady-ochrany-osobnych-udajov'>
                        <b> sem</b>
                     </Link>
                     .
                  </Typography>
                  <Button color='primary' variant='outlined' size='small' onClick={setCookie}>
                     Povoliť
                  </Button>
               </React.Fragment>
            }></Alert>
      </Snackbar>
   );
};

export default CookieAlert;
