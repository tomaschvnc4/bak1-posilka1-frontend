import React, { useContext, useReducer, useEffect } from 'react';
import moment from 'moment';
import 'moment/locale/sk';

import reducer from './_reducer';

moment().locale('sk');
const AppContext = React.createContext();
const dateVal = moment().startOf('day');

const initState = {
   calendar: {
      dateVal: dateVal,
      startDay: dateVal.clone(),
      endDay: dateVal.clone().add(6, 'days'),
      arrWeek: [], //[day,day,...]
      arrTime: [], //[8:00,8:30,...]
      arrReserve: {}, //{timestamp:[pocet,pocet,...](arrTime.length) }
      userSelect: {}, //{ timestamp: {cells: [f,f,..], minI: -1, maxI: -1} }
      // userSelect: {},
      maxNextDays: 7, //+1 tyzdne
      posunDay: 7,
      kapacity: 1,
   },
};

const AppProvider = ({ children }) => {
   const [state, dispatch] = useReducer(reducer, initState);

   const changeDay = (type) => {
      dispatch({ type: 'CHANGE_DAY', payload: { type } });
      dispatch({ type: 'SET_WEEK' });
   };
   const selectTime = (timestamp, index) => {
      dispatch({ type: 'SELECT_TIME', payload: { timestamp, index } });
   };

   useEffect(() => {
      dispatch({ type: 'SET_TIME' });
      dispatch({ type: 'SET_WEEK' });
   }, []);

   useEffect(() => {
      dispatch({ type: 'FETCH_RESERVE' });
   }, []);

   return (
      <AppContext.Provider value={{ ...state, changeDay, selectTime }}>
         {children}
      </AppContext.Provider>
   );
};

// make sure use !!!
export const useGlobalContext = () => {
   return useContext(AppContext);
};

export { AppContext, AppProvider };
