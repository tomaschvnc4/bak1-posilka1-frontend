import React from 'react';
import image from '../images/jungleGym.jpg';
import imgDalsieSluzby from '../images/galeria/01.jpg';
import imgKardio from '../images/galeria/13.jpg';
import imgFitness from '../images/galeria/12.jpg';
import { Link } from 'react-router-dom';
//prettier-ignore
import { Grid, Paper, Typography, makeStyles, useMediaQuery, useTheme, List, ListItem, ListItemIcon, ThemeProvider } from '@material-ui/core';
import DoneOutlinedIcon from '@material-ui/icons/DoneOutlined';
import themeGreenRed from '../themes/customPallete';

const data = [
   {
      title: 'Fitness',
      text1: `V tomto priestore sa nachádzajú posilňovacie stroje značky Life fitness (16 strojov LIFE FITNESS Signature), pákové stroje na OLIPM HAMMER STRENGHT, multifunkčná veža. Súčasťou tohto priestoru je silová zóna, multipress, jednoručky 1-60 kg, pevne naložené činky, priestor na vzpieranie.`,
      img: imgFitness,
      imgRight: false,
   },
   {
      title: 'Kardio',
      text1: `Kardio zóna je vybavená profesionálnymi zariadeniami značky LIFE FITNESS, TECHNOGYM, Concept2 - veslo, Concept 2- bežkársky trenažér`,
      img: imgKardio,
      imgRight: true,
   },
   {
      title: 'Workout',
      text1: `Hlavnou časťou našej workout zóny je kvalitná silová konštrukcia, vybavená množstvom komponentov a doplnkov tak, aby bol Váš tréning maximálne efektívny. Samozrejmosťou sú pomôcky na cvičenie s vlastným telom – TRX, BOSU, kruhy ,PLYOBOX, fitlopty, kettlebelly, gumy, expandre, balančné pomôcky , švihadlá, flowin, boxovacie vrece a ďalšie.`,
      img: image,
      imgRight: false,
   },
   {
      title: 'Ďalšie služby',
      list: [
         'Protein bar',
         'Solárium',
         'Masáže',
         'Skupinové tréningy',
         'Výživové poradenstvo',
         'Jedálničky',
      ],
      text2: (
         <p>
            V prípade otázok nás neváhajte
            <Link to='/kontakt'>
               <b> kontaktovať</b>
            </Link>
         </p>
      ),
      img: imgDalsieSluzby,
      imgRight: true,
   },
];

const BREAKPOINT = 'sm';
const Sluzby = () => {
   const classes = useStyles();

   console.count('render Sluzby');
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
   // console.log('props', props);
   const { title, text1, text2, list, img, imgRight } = props;
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
         <Grid container item md={6} justify='center'>
            <Paper elevation={20}>
               <Typography variant='h3'>
                  <span>{title}</span>
               </Typography>
               {text1 && <p>{text1}</p>}
               {list && <DalsieSluzbyList zoznam={list} />}
               {text2 && text2}
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

const DalsieSluzbyList = ({ zoznam }) => {
   return (
      <List>
         {zoznam.map((text, index) => (
            <ListItem key={index * 100}>
               <ThemeProvider theme={themeGreenRed}>
                  <ListItemIcon>
                     <DoneOutlinedIcon color='primary' />
                  </ListItemIcon>
               </ThemeProvider>
               {/* <ListItemText primary={text} /> */}
               {text}
            </ListItem>
         ))}
      </List>
   );
};

const useStyles = makeStyles((theme) => ({
   root: {
      '& .MuiPaper-root': {
         position: 'relative',
         zIndex: '5',
         padding: '22px',
         // top: '10%',
         // marginBottom: '10%',
         margin: '5% 0',
      },
      '& .MuiPaper-elevation20': {
         boxShadow:
            '0px 10px 13px -6px rgb(0 0 0 / 20%), 0px 20px 31px 3px rgb(0 0 0 / 14%), 0px 8px 38px 7px rgb(204 163 0 / 12%)',
         // '0px 10px 13px -6px rgb(0 0 0 / 20%), 0px 20px 31px 3px rgb(204 163 0 / 14%), 0px 8px 38px 7px rgb(204 163 0 / 12%)',
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
      '& h3': {
         WebkitTextStroke: '0px black',
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
