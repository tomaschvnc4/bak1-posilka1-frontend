import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
   return <MuiAlert elevation={6} variant='filled' {...props} />;
}

export default function AlertBox({ isOpen, setOpen, mess, severity, duration }) {
   // const classes = useStyles();
   // const [open, setOpen] = React.useState(true);

   // const handleClick = () => {
   //    setOpen(true);
   // };

   const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
         return;
      }
      setOpen(false);
      // closeFun(false);
   };

   return (
      <div>
         {/* <Button variant='outlined' onClick={handleClick}>
            Open success snackbar
         </Button> */}
         <Snackbar open={isOpen} autoHideDuration={duration} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity}>
               {mess}
            </Alert>
         </Snackbar>
      </div>
   );
}
