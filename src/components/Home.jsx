import React from 'react';
import { Grid, Paper, Typography, makeStyles } from '@material-ui/core';
import image from '../images/jungleGym.jpg';
import Cennik from './cennik/Cennik';

const Home = () => {
   const classes = useStyles();

   console.count('render Home');
   return (
      <main className='kontakt-main-container uvod'>
         <Grid container className={classes.root}>
            <Grid item md={7}>
               <Paper elevation={20}>
                  <Typography variant='h3'>
                     O <span>NÁS</span>
                  </Typography>
                  <p>
                     <b>JUNGLE GYM</b> je fitness klub, so zameraním na klasický, aj funkčný
                     tréning, posilňovanie a formovanie tela, budovanie a udržanie kondície,
                     udržanie a obnovovanie zdravia a funkčnosti pohybového aparátu a miesto kde
                     ľudia trávia svoj voľný čas, za účelom starostlivosti o svoje telo, kondíciu a
                     zdravie a miestom psychického uvoľnenia.
                  </p>
                  <p>
                     Majiteľ a prevádzkovateľ <b>Ľuboš Turčina</b> bol úspešný reprezentant v
                     kulturistike, je profesionálni fitness tréner a výživový poradca s dlhoročnými
                     skúsenosťami.
                  </p>
                  <p>
                     JUNGLE GYM sa nachádza blízko centra mesta, hneď pri hlavnom cestnom ťahu, s
                     parkovaním zadarmo. Celková rozloha je 525m2. Je vybavené profesionálnymi
                     zariadeniami americkej značky LIFE FITNESS, TECHNO GYM a strojmi na spôsob
                     HAMMER STRENGHT, CONCEPT. Fitness centrum je všestranne vybavené na tréning aj
                     pre športovcov z iných odvetví, ale aj pre širokú verejnosť a{' '}
                     <b>je cenovo dostupný</b>.
                  </p>
               </Paper>
            </Grid>

            <Grid container item md={5} justify='center'>
               <div className={classes.imgContainer}>
                  <img src={image} alt='' />
               </div>
            </Grid>
            <Grid container justify='center'>
               <Paper elevation={20}>
                  <Typography variant='h5'>
                     {/* O <span>NÁS</span> */}
                     <span>Pre koho</span>
                  </Typography>
                  <p>
                     Fitness centrum je určené pre každého bez ohľadu na vek, pohlavie a športové
                     ambície. Pre mladších i starších, pre športovcov, pre mužov, pre pracujúce ženy
                     i ženy v domácnosti, ako aj pre večne vyťažených podnikateľov, pre ľudí
                     trpiacich nadváhou, pre seniorov i deti. Pre každého, kto chce urobiť niečo so
                     sebou, chce si sformovať alebo vypracovať postavu či schudnúť a zmeniť svoje
                     návyky smerom k aktívnemu i zdravému životnému štýlu. Sme tu pre všetkých,
                     ktorí majú chuť urobiť niečo pre svoje zdravie a postavu. Všetci k nám majú
                     dvere otvorené.
                  </p>
                  <p>
                     Vďaka našim vedomostiam a skúsenostiam vieme dosiahnuť, aby ste boli spokojní,
                     aby Vás cvičenie bavilo a aby vám prinášalo radosť. Vieme, čo ľudia očakávajú a
                     vyžadujú a práve toto im chceme v plnej miere poskytnúť. V našom zariadení máme
                     k dispozícii trénerov, ktorí Vám môžu pomôcť dosiahnuť stanovený cieľ.
                     Nestrácajte čas zbytočným experimentovaním a nechajte si poradiť. Každému
                     klientovi v prípade záujmu vypracujeme jedálniček i tréningový plán a
                     poskytneme nadštandardnú individuálnu starostlivosť. Tí, ktorí predtým
                     necvičili sa vďaka nám naučia, ako správne cvičiť na jednotlivých strojoch, s
                     vlastnou váhou a športovým náradím a pomôckami, ale aj ako sa stravovať.
                  </p>
               </Paper>
            </Grid>
         </Grid>
         {/* <div style={{ marginTop: '5%' }}>
            <Cennik />
         </div> */}
      </main>
   );
};

export default Home;

const useStyles = makeStyles((theme) => ({
   root: {
      '& .MuiPaper-root': {
         position: 'relative',
         zIndex: '5',
         padding: '22px',
         // top: '10%',
         // marginBottom: '10%',
         marginTop: '5%',
      },
      '& .MuiPaper-elevation10': {
         boxShadow:
            '0px 6px 6px -3px rgb(0 0 0 / 20%), 0px 10px 14px 1px rgb(0 0 0 / 14%), 0px 4px 18px 3px rgb(243 175 4 / 12%)',
      },
      '& .MuiPaper-elevation20': {
         boxShadow:
            '0px 10px 13px -6px rgb(0 0 0 / 20%), 0px 20px 31px 3px rgb(204 163 0 / 14%), 0px 8px 38px 7px rgb(204 163 0 / 12%)',
      },
      '& img': {
         width: '100%',
         maxWidth: '510px',
         height: 'auto',
         [theme.breakpoints.down('xs')]: {
            maxWidth: '350px',
            marginTop: '3%',
         },
      },
      '& h3': {
         WebkitTextStroke: '0px black',
      },
      '& .MuiTypography-h5': {
         color: 'var(--clr-nav-orange)',
         fontWeight: '800',
         letterSpacing: '3px',
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
