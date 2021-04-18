import React from 'react';
import { Route, Switch } from 'react-router-dom';

//prettier-ignore
import { HomePage, CennikPage, GaleriaPage, KontaktPage, ProfilPage, ErrorPage, Rezervacie, AdminPanel,SluzbyPage } from '../src/pages';
import './App.css';
// import NavBar from './components/nav-bar';
import Navbar from './components/navbar/Navbar';
import ProtectedRoute from './auth/protected-route';
import Footer from './components/footer/Footer';

function App() {
   return (
      <div className='page-container'>
         <div className='content-wrap'>
            <Navbar />
            <Switch>
               <Route path='/' exact component={HomePage} />
               <Route path='/sluzby' exact component={SluzbyPage} />
               <Route path='/cennik' exact component={CennikPage} />
               <Route path='/galeria' exact component={GaleriaPage} />
               <Route path='/kontakt' exact component={KontaktPage} />
               <ProtectedRoute path='/profil' exact component={ProfilPage} />
               <ProtectedRoute path='/rezervovat' exact component={Rezervacie} />
               <ProtectedRoute path='/adminPanel' exact component={AdminPanel} />
               <Route path='/*' component={ErrorPage} />
            </Switch>
         </div>

         <Footer />
      </div>
   );
}

export default App;
