import { useAuth0 } from '@auth0/auth0-react';
import React, { useContext, useReducer, useEffect, useState, useRef } from 'react';
import Axios from 'axios';
import { calendarInitState, nextInitState, userInitState } from './initialStates';

import calReducer from './reducers/calReducer';
import userReducer from './reducers/userReducer';
import nextReducer from './reducers/nextReducer';

import { prepareDataa, SET_WEEK, SET_TIME } from './asyncFunctions/calAsync';

const AppContext = React.createContext();
const serverUrl = process.env.REACT_APP_SERVER_URL;

const AppProvider = ({ children }) => {
   const [calendarState, calDispatch] = useReducer(calReducer, calendarInitState);
   const [userState, userDispatch] = useReducer(userReducer, userInitState); //podla vyzuzitia mozno iba obycajny useState
   const [nextState, nextDispatch] = useReducer(nextReducer, nextInitState);
   const { user, getAccessTokenSilently, isAuthenticated } = useAuth0();
   const [isLoading, setIsLoading] = useState(false);
   console.log(user);
   console.log(userState);
   console.log(calendarState);

   const [_calendarState, setCalState] = useState(calendarInitState);

   const changeDay = (type) => {
      calDispatch({ type: 'CHANGE_DAY', payload: { type } });
      calDispatch({ type: 'SET_WEEK' });
   };
   const selectTime = (timestamp, index) => {
      calDispatch({ type: 'SELECT_TIME', payload: { timestamp, index } });
   };

   const isEmtyObj = (obj) => {
      return Object.keys(obj).length === 0; //TRUE or FALSE
   };

   const submitReserve = async () => {
      calDispatch({ type: 'LOADING' });
      const { userId, token } = userState;
      let { userSelect, submitData } = calendarState;
      submitData = {};
      prepareDataa({ userSelect, submitData, userId });
      console.log('submit data after:', submitData);
      // for (const key in userSelect) {
      //    const { zmena, minI, maxI } = userSelect[key];
      //    if (zmena) {
      //       submitData[userId] || (submitData[userId] = {});
      //       submitData[userId][key] = { minI, maxI };
      //       userSelect[key].zmena = false;
      //    }
      // }
      console.log('send:');
      console.log(submitData);
      if (!isEmtyObj(submitData)) {
         await Axios.post(
            `${serverUrl}/calendar/add`,
            { payload: submitData },
            {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            }
         );
      }
      calDispatch({ type: 'STOP_LOADING' });
   };

   const fetchRezervacie = async () => {
      console.log('S1');
      calDispatch({ type: 'LOADING' });
      console.log('S2');
      calDispatch({ type: 'SET_WEEK' });
      // SET_WEEK(calendarState);
      //  SET_WEEK(calDispatch);
      console.log('S3');
      const token = await getAccessTokenSilently();
      console.log('S4');
      const { sub: userId } = user;
      let { userSelect, arrReserve } = calendarState;
      const { data } = await Axios.get(`${serverUrl}/calendar/getRezervacie`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });
      console.log('fetchRezervacie::', data);
      data.map((rezervacia) => {
         const { tstampOfDay, startI, endI, userId: user_DBid } = rezervacia;
         if (arrReserve[tstampOfDay]) {
            for (let i = startI; i <= endI; i++) {
               arrReserve[tstampOfDay][i] += 1;
               console.log(user_DBid, userId);
               if (user_DBid === userId) {
                  userSelect[tstampOfDay].cells[i] = true;
               }
            }
            if (user_DBid === userId) {
               userSelect[tstampOfDay].minI = startI;
               userSelect[tstampOfDay].maxI = endI;
            }
         }
      });
      calDispatch({ type: 'STOP_LOADING' });
   };

   const setToken_Id = async () => {
      const token = await getAccessTokenSilently();
      const userId = user.sub;
      userDispatch({ type: 'SET_TOKEN', payload: { token, userId } });
   };

   useEffect(() => {
      calDispatch({ type: 'SET_TIME' });
      calDispatch({ type: 'SET_WEEK' });
      // SET_TIME(calendarState, calDispatch);
      // SET_WEEK(calendarState, calDispatch);
   }, []);

   useEffect(() => {
      // calDispatch({ type: 'FETCH_RESERVE' });
   }, []);

   useEffect(() => {
      if (isAuthenticated) {
         setToken_Id();
      }
   }, [isAuthenticated]);

   // const testSaveData = async () => {
   //    if (isAuthenticated) {
   //       const token = await getAccessTokenSilently();
   //       const response = await Axios.get(`${serverUrl}/register`, {
   //          headers: {
   //             Authorization: `Bearer ${token}`,
   //          },
   //       });

   //       console.log(response);
   //       console.log(response.data);
   //       if (response.data) {
   //          const response = await Axios.post(
   //             `${serverUrl}/register`,
   //             {
   //                user,
   //             },
   //             {
   //                headers: {
   //                   Authorization: `Bearer ${token}`,
   //                },
   //             }
   //          );
   //          console.log(response);
   //       }
   //    }
   // };

   // useEffect(() => {
   //    testSaveData();
   // });

   return (
      <AppContext.Provider
         value={{
            ...calendarState,
            ...nextState,
            calDispatch,
            nextDispatch,
            //
            changeDay,
            selectTime,
            submitReserve,
            // setLoadData,
            fetchRezervacie,
            /////////
            _calendarState,
            setCalState,
            isLoading,
            setIsLoading,
         }}>
         {children}
      </AppContext.Provider>
   );
};

// make sure use !!!
export const useGlobalContext = () => {
   return useContext(AppContext);
};

export { AppContext, AppProvider };
