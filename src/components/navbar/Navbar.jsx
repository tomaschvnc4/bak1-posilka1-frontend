import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
//prettier-ignore
import {AppBar, Toolbar, Grid,  MenuIcon ,makeStyles, useTheme,useMediaQuery,clsx} from './_imports'
// import {AppBar, Toolbar, Grid, AccountCircle, ExitToAppIcon, MenuIcon, HomeIcon,   InfoOutlinedIcon,makeStyles, useTheme,useMediaQuery,clsx} from './_imports'

import myIcon from '../../images/jungleGYm logo2.png';
import Links from './Links';

const BREAKPOINT = 'sm';

function Navbar() {
   const [showLinks, setShowLink] = useState(false);

   const linksContainerRef = useRef(null);
   const linksHeight = useRef(0);

   const theme = useTheme();
   const classes = useStyles();
   const isMobile = useMediaQuery(theme.breakpoints.down(BREAKPOINT));

   useEffect(() => {
      linksHeight.current = document.querySelectorAll('.nav-links > li').length * 22;
      if (showLinks) {
         linksContainerRef.current &&
            (linksContainerRef.current.style.height = `${linksHeight.current}px`);
      } else {
         linksContainerRef.current && (linksContainerRef.current.style.height = `0px`);
      }
   }, [showLinks, isMobile]);

   return (
      <>
         <Grid container justify='center' className='nav'>
            <Grid item xs={12}>
               {/* <Grid item xs={12} sm={10}> */}
               <AppBar className={classes.root} position='static' elevation={24}>
                  <Toolbar className='nav-center'>
                     <Link to='/'>
                        <img src={myIcon} alt='logo' style={{ width: '80px' }} />
                     </Link>

                     {isMobile ? (
                        <button className='nav-toggle' onClick={() => setShowLink(!showLinks)}>
                           <MenuIcon />
                        </button>
                     ) : (
                        <div className={clsx(classes.zobrazenie)}>
                           <Links />
                        </div>
                     )}
                  </Toolbar>

                  {isMobile && (
                     <div
                        className={clsx(classes.zobrazenie, 'show-container')}
                        ref={linksContainerRef}>
                        <Links />
                     </div>
                  )}
               </AppBar>
            </Grid>
         </Grid>
      </>
   );
}

export default Navbar;

const useStyles = makeStyles((theme) => ({
   root: {
      backgroundColor: '#000000',
   },
   zobrazenie: {
      width: '100%',
      display: 'flex',
      justifyContent: 'flex-end',
      [theme.breakpoints.down(BREAKPOINT)]: {
         justifyContent: 'flex-start',
      },
      '& ul': {
         display: 'inline-flex',
         [theme.breakpoints.down(BREAKPOINT)]: {
            display: 'block',
            height: '0px',
         },
      },
   },
}));
