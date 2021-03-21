import React from 'react';
import image from '../images/jungleGym.jpg';
import { Grid, Paper, Typography, makeStyles, useMediaQuery, useTheme } from '@material-ui/core';

const data = [
   {
      title: 'Kardio',
      text1: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae fuga iusto incidunt, eaque sequi magni, adipisci officia inventore accusantium ad doloribus, porro illum? Asperiores perferendis at velit voluptatem similique necessitatibus? orem ipsum dolor sit amet consectetur adipisicing elit. Quae
      fuga iusto`,
      img: image,
      imgRight: false,
   },
   {
      title: 'Fitness',
      text1: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae fuga iusto incidunt, eaque sequi magni, adipisci officia inventore accusantium ad doloribus, porro illum? Asperiores perferendis at velit voluptatem similique necessitatibus? orem ipsum dolor sit amet consectetur adipisicing elit. Quae
      fuga iusto`,
      img: image,
      imgRight: true,
   },
   {
      title: 'Workout',
      text1: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae fuga iusto incidunt, eaque sequi magni, adipisci officia inventore accusantium ad doloribus, porro illum? Asperiores perferendis at velit voluptatem similique necessitatibus? orem ipsum dolor sit amet consectetur adipisicing elit. Quae
      fuga iusto`,
      img: image,
      imgRight: false,
   },
   {
      title: 'Ďalšie služby',
      text1: 'Predtreningovky, proteiny, oblecenie',
      text2: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae fuga iusto incidunt, eaque sequi magni, adipisci officia inventore accusantium ad doloribus, porro illum? Asperiores perferendis at velit voluptatem similique necessitatibus? orem ipsum dolor sit amet consectetur adipisicing elit. Quae
      fuga iusto`,
      img: image,
      imgRight: true,
   },
];

const BREAKPOINT = 'sm';
const Sluzby = () => {
   const classes = useStyles();
   return (
      <main className='kontakt-main-container'>
         <Grid container className={classes.root} spacing={3}>
            {data.map((item, index) => {
               return <Polozka key={index} props={item} />;
            })}
         </Grid>
      </main>
   );
};

export default Sluzby;

const Polozka = ({ props }) => {
   console.log('props', props);
   const { title, text1, text2, img, imgRight } = props;
   const classes = useStyles();
   const theme = useTheme();
   const isMobile = useMediaQuery(theme.breakpoints.down(BREAKPOINT));

   return (
      <>
         {!isMobile && imgRight && (
            <Grid container item md={6} justify='center'>
               <div className={classes.imgContainer}>
                  <img src={img} alt='' />
               </div>
            </Grid>
         )}
         <Grid item md={6}>
            <Paper elevation={20} className='test'>
               <Typography variant='h3'>
                  <span>{title}</span>
               </Typography>
               {text1 && <p>{text1}</p>}
               {text2 && <p>{text2}</p>}
            </Paper>
         </Grid>
         {(isMobile || !imgRight) && (
            <Grid container item md={6} justify='center'>
               <div className={classes.imgContainer}>
                  <img src={img} alt='' />
               </div>
            </Grid>
         )}
      </>
   );
};

const useStyles = makeStyles((theme) => ({
   root: {
      '& .MuiPaper-root': {
         position: 'relative',
         zIndex: '5',
         padding: '22px',
         top: '10%',
         marginBottom: '10%',
      },
      '& .MuiPaper-elevation20': {
         boxShadow:
            '0px 10px 13px -6px rgb(0 0 0 / 20%), 0px 20px 31px 3px rgb(204 163 0 / 14%), 0px 8px 38px 7px rgb(204 163 0 / 12%)',
      },
      '& img': {
         width: '100%',
         maxWidth: '510px',
         height: 'auto',
         [theme.breakpoints.down('sm')]: {
            maxWidth: '350px',
            marginTop: '-5%',
         },
         boxShadow:
            '0px 10px 13px -6px rgb(0 0 0 / 20%), 0px 20px 31px 3px rgb(0 0 0 / 14%), 0px 8px 36px 7px rgb(0 0 0 / 12%);',
      },
   },

   imgContainer: {
      position: 'relative',
      right: '15%',
      zIndex: '2',
      [theme.breakpoints.down('sm')]: {
         right: '0',
      },
   },
}));

{
   /* <Grid item md={6}>
               <Paper elevation={20} className='test'>
                  <Typography variant='h3'>
                     <span>Kardio</span>
                  </Typography>
                  <p>
                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae fuga iusto
                     incidunt, eaque sequi magni, adipisci officia inventore accusantium ad
                     doloribus, porro illum? Asperiores perferendis at velit voluptatem similique
                     necessitatibus? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
                     fuga iusto
                  </p>
               </Paper>
            </Grid>
            <Grid container item md={6} justify='center'>
               <div className={classes.imgContainer}>
                  <img src={image} alt='' />
               </div>
            </Grid> */
}
{
   /*  */
}
{
   /* {!isMobile && (
               <Grid container item md={6} justify='center'>
                  <div className={classes.imgContainer}>
                     <img src={image} alt='' />
                  </div>
               </Grid>
            )} */
}

{
   /* <Grid item md={6}>
               <Paper elevation={20} className='test'>
                  <Typography variant='h3'>
                     <span>Fitness</span>
                  </Typography>
                  <p>
                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae fuga iusto
                     incidunt, eaque sequi magni, adipisci officia inventore accusantium ad
                     doloribus, porro illum? Asperiores perferendis at velit voluptatem similique
                     necessitatibus? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
                     fuga iusto
                  </p>
               </Paper>
            </Grid>
            {isMobile && (
               <Grid container item md={6} justify='center'>
                  <div className={classes.imgContainer}>
                     <img src={image} alt='' />
                  </div>
               </Grid>
            )} */
}
{
   /*  */
}
{
   /* <Grid item md={6}>
               <Paper elevation={20} className='test'>
                  <Typography variant='h3'>
                     <span>Workout</span>
                  </Typography>
                  <p>
                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae fuga iusto
                     incidunt, eaque sequi magni, adipisci officia inventore accusantium ad
                     doloribus, porro illum? Asperiores perferendis at velit voluptatem similique
                     necessitatibus? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
                     fuga iusto
                  </p>
               </Paper>
            </Grid>
            <Grid container item md={6} justify='center'>
               <div className={classes.imgContainer}>
                  <img src={image} alt='' />
               </div>
            </Grid> */
}
{
   /*  */
}
{
   /* <Grid container item md={6} justify='center'>
               <div className={classes.imgContainer}>
                  <img src={image} alt='' />
               </div>
            </Grid>
            <Grid item md={6}>
               <Paper elevation={20} className='test'>
                  <Typography variant='h3'>
                     <span>Ďalšie služby</span>
                  </Typography>
                  <p>Predtreningovky, proteiny, oblecenie</p>
                  <p>
                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae fuga iusto
                     incidunt, eaque sequi magni, adipisci officia inventore accusantium ad
                     doloribus, porro illum? Asperiores perferendis at velit voluptatem similique
                     necessitatibus? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
                     fuga iusto
                  </p>
               </Paper>
            </Grid> */
}
