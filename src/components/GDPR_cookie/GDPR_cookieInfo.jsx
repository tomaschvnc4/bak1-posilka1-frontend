import React from 'react';
import { makeStyles, Paper, Typography } from '@material-ui/core';

const GDPR_cookie = () => {
   const classes = useStyles();
   return (
      <Paper className={classes.root}>
         <Typography variant='h3' color='primary'>
            Zásady ochrany osobných údajov
         </Typography>
         <br />
         <Typography variant='h5'>Aké osobné údaje získavame a prečo ich zbierame</Typography>
         <br />
         <Typography variant='h5'>Kontaktné formuláre</Typography>
         <Typography variant='body2'>
            Na webovej stránke máme umiestnené kontaktné formuláre, pomocou ktorých zbierame osobné
            údaje: meno, e-mailová adresa, telefóne číslo. Kontaktné formuláre slúžia v prípade
            potreby na informovanie našich zakáznikov alebo odoslanie správy.
         </Typography>
         <br />
         <Typography variant='h5'>Súbory cookies</Typography>
         <Typography variant='body2'>
            Ak máte na našej webovej stránke účet a prihlásite sa, uložíme dočasné súbory cookies.
            Tieto súbory cookies neobsahujú žiadne osobné údaje a umožňujú vám vytvoriť si účet a
            prihlásiť sa. Tento typ cookies musí byť povolený, inak nie je možné používať našu
            stránku ani služby.
         </Typography>
      </Paper>
   );
};

export default GDPR_cookie;

const useStyles = makeStyles((theme) => ({
   root: {
      width: '70%',
      margin: 'auto',
      marginTop: '2%',
      padding: '1%',

      '& h3': {
         textAlign: 'center',
      },
      '& h5': {
         fontWeight: '500',
      },
   },
}));
