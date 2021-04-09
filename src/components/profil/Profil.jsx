import React, { useEffect, useState } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import {
   Grid,
   IconButton,
   makeStyles,
   Paper,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableRow,
   TextField,
   ThemeProvider,
   Typography,
   withStyles,
} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import themeGreenRed from '../../themes/customPallete';
import { capitalize } from '../../helpers';
import Axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useGlobalContext } from '../../context/Provider2';
import clsx from 'clsx';
import Loading2 from '../loading2';
import Loading from '../loading';

const serverUrl = process.env.REACT_APP_SERVER_URL;

const Profil = () => {
   const classes = useStyles();
   const [editMeno, setEditMeno] = useState(false);
   const [editTelefon, setEditTelefon] = useState(false);

   const { dbUser } = useGlobalContext();

   const { user } = useAuth0();
   let { picture } = user;
   console.log('dbUser', dbUser);
   console.count('render Profil');

   if (!dbUser.email) {
      console.log('profil loading render');
      return <Loading2 />;
   }

   return (
      <Paper
         component='main'
         elevation={10}
         className={clsx(classes.root, 'kontakt-main-container profil')}>
         <Typography variant='h3'>
            <span>PROFIL</span>
         </Typography>
         <Grid container justify='center'>
            <Grid container item xs={12} md={3} justify='center' alignItems='center'>
               <Grid item>
                  <img src={picture} alt='Profil img' />
               </Grid>
            </Grid>
            <Grid item xs={12} md={9} className='profil-info'>
               <TableContainer>
                  <Table className={classes.table} size='small'>
                     <TableBody>
                        <StyledTableRow>
                           <StyledTableCell>
                              <Typography variant='h6'>Meno:</Typography>
                           </StyledTableCell>
                           <StyledTableCell>
                              {editMeno ? (
                                 <EditField name='meno' fun={setEditMeno} />
                              ) : (
                                 <Typography>{dbUser.meno || 'nevyplnené'}</Typography>
                              )}
                           </StyledTableCell>
                           <StyledTableCell>
                              <IconButton
                                 size='small'
                                 color='primary'
                                 onClick={() => setEditMeno(!editMeno)}>
                                 <CreateIcon />
                              </IconButton>
                           </StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                           <StyledTableCell>
                              <Typography variant='h6'>Email:</Typography>
                           </StyledTableCell>
                           <StyledTableCell>
                              <Typography>{dbUser.email}</Typography>
                           </StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                           <StyledTableCell>
                              <Typography variant='h6'>Telefón:</Typography>
                           </StyledTableCell>
                           <StyledTableCell>
                              {editTelefon ? (
                                 <EditField name='telefon' fun={setEditTelefon} />
                              ) : (
                                 <Typography>{dbUser.telefon || 'nevyplnené'}</Typography>
                              )}
                           </StyledTableCell>
                           <StyledTableCell>
                              <IconButton
                                 size='small'
                                 color='primary'
                                 onClick={() => setEditTelefon(!editTelefon)}>
                                 <CreateIcon />
                              </IconButton>
                           </StyledTableCell>
                        </StyledTableRow>
                     </TableBody>
                  </Table>
               </TableContainer>
            </Grid>
         </Grid>
      </Paper>
   );
};

export default Profil;

const schemaMeno = yup.object().shape({
   meno: yup
      .string()
      // .min(8, 'Minimálne 8 znakov!')
      .matches(/^[a-zA-ZÀ-ž ]*$/, 'Meno obsahuje nepovolé znaky!'),
});
const schemaTelefon = yup.object().shape({
   telefon: yup
      .string()
      .matches(
         /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
         'Nesprávny formát!'
      ),
});

const schemas = {
   meno: schemaMeno,
   telefon: schemaTelefon,
};

const EditField = (props) => {
   let { name, fun } = props;
   const schema = schemas[name];
   const { register, handleSubmit, errors, setValue } = useForm({
      resolver: yupResolver(schema),
   });
   const { getAccessTokenSilently } = useAuth0();
   const { dbUser, setDbUser } = useGlobalContext();

   // const [isOpen, setIsOpen] = useState(false);

   async function submitEditItem(data) {
      if (name !== '' || data !== '') {
         const token = await getAccessTokenSilently();
         Axios.post(
            `${serverUrl}/profil/edit`,
            {
               payload: { id: dbUser.id, column: name, value: data[name] },
            },
            {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            }
         );
         setDbUser({ ...dbUser, [name]: data[name] });
         fun(false);
      }
   }

   useEffect(() => {
      setValue(name, dbUser[name]);
   }, []);

   return (
      <div>
         {/* {isOpen && <AlertBox />} */}
         <form style={{ display: 'inline-flex' }} onSubmit={handleSubmit(submitEditItem)}>
            <TextField
               label={`${capitalize(name)}`}
               name={name}
               size='small'
               error={errors.hasOwnProperty(name)}
               helperText={errors[name]?.message}
               inputRef={register}
               InputLabelProps={{
                  shrink: true,
               }}></TextField>

            <ThemeProvider theme={themeGreenRed}>
               <IconButton size='small' color='primary' type='submit'>
                  <CheckCircleOutlineRoundedIcon />
               </IconButton>
            </ThemeProvider>
         </form>
      </div>
   );
};

const useStyles = makeStyles((theme) => ({
   root: {
      '& h3 span': {
         WebkitTextStroke: '0px black',
      },
   },
   table: {
      marginTop: '2%',
      [theme.breakpoints.up('md')]: {
         marginTop: '0',
      },
   },
}));

const StyledTableCell = withStyles((theme) => ({
   root: {
      borderBottom: 'none',
      '& h6': {
         fontSize: '16px',
      },
   },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
   root: {
      height: '5px',
      //   backgroundColor: 'rgba(0, 0, 0, 0.5)',
      '&:nth-of-type(odd)': {
         backgroundColor: theme.palette.action.hover,
      },
   },
}))(TableRow);
