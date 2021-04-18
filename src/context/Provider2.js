import { useAuth0 } from '@auth0/auth0-react';

import React, { useContext, useEffect, useRef, useState } from 'react';
import { useMediaQuery, useTheme } from '@material-ui/core';
import Axios from 'axios';

import { calendarInitState, userInitState, otherInitState } from './initialStates';
// import { calendarInitState, nextInitState, userInitState } from './initialStates';
import { isEmtyObj } from '../helpers';

import moment from 'moment';
import 'moment/locale/sk';
moment().locale('sk');

const AppContext = React.createContext();
const serverUrl = process.env.REACT_APP_SERVER_URL;

const initFlagss = {
   settingsFetched: false,
   timeSeted: false,
   zoznamOHfetched: false,
   objOpenSDOH_setted: false, //SDOH=specificky den otvaracie hodiny
   someflag: false,
};

const AppProvider = ({ children }) => {
   // CELENDAR
   const [dateVal, setDateVal] = useState(calendarInitState.dateVal);
   const [arrWeek, setArrWeek] = useState(calendarInitState.arrWeek);
   const [arrTime, setArrTime] = useState(calendarInitState.arrTime);
   const [arrReserve, setArrReserve] = useState(calendarInitState.arrReserve);
   const [userSelect, setUserSelect] = useState(calendarInitState.userSelect);
   // const [maxNextDays, setMaxNextDays] = useState(calendarInitState.maxNextDays); //treba prerobit na data v settings
   // const [kapacity, setKapacity] = useState(calendarInitState.kapacity); //treba prerobit na data v settings
   const [isLoadingCal, setIsLoadingCal] = useState(true);
   const [isLoadingCalData, setIsLoadingCalData] = useState(true);

   const [calSettings, setCalSettings] = useState(calendarInitState.calSettings);
   const [objOpen, setObjOpen] = useState(calendarInitState.objOpen);
   const [konkretneDniOH, setKonkretneDniOH] = useState(calendarInitState.konkretneDniOH);
   //OTHER STATES
   const [cennik, setCennik] = useState(otherInitState.cennik);

   //USER STATE
   const [dbUser, setDbUser] = useState(userInitState);

   const flagsRef = useRef(initFlagss);
   const { user, getAccessTokenSilently, isAuthenticated } = useAuth0(); //isAuthenticated

   //REFS as STATES
   const openHodRef = useRef({ PonPia: [], SobNed: [] });
   const startDayRef = useRef(calendarInitState.startDay);
   const endDayRef = useRef(calendarInitState.endDay);
   const posunDayRef = useRef(calendarInitState.posunDay);
   const calendarLengthRef = useRef(calendarInitState.calendarLength);
   // console.log('userSelect', userSelect);
   // console.log('calSettings', calSettings);

   const theme = useTheme();
   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

   ///////////////////////////////////////////////////////////////////////////////////////////

   function setTime2() {
      let arrTime = [];
      let tmpTime = dateVal.clone().set({ hour: 6, minute: 0, second: 0, millisecond: 0 });
      arrTime.push(tmpTime.format('HH:mm'));
      while (tmpTime.format('HH:mm') !== '22:00') {
         tmpTime.add(30, 'minutes');
         arrTime.push(tmpTime.format('HH:mm'));
      }
      setArrTime(arrTime);
      flagsRef.current.timeSeted = true;
      console.log('setTime END');
   }

   function setWeek2() {
      console.log('setWeek STRAT');
      let arrWeek = [];
      let newReserve = { ...arrReserve };
      let newUserSelect = { ...userSelect };
      let newObjOpen = { ...objOpen };
      const { minT, maxT } = calSettings;
      let workingMinT = '23:00';
      let workingMaxT = '01:00';

      const { calendarLength, calendarLengthMobile } = calendarInitState;
      let calendarLengthTMP = isMobile ? calendarLengthMobile : calendarLength;

      const length = arrTime.length;
      if (length !== 0) {
         for (let i = 0; i < calendarLengthTMP; i++) {
            // let day = startDay.clone().add(i, 'days');
            let day = startDayRef.current.clone().add(i, 'days');
            const timestamp = day.valueOf();
            // console.log(capitalize(noDiacritics(day.format('dddd'))));
            arrWeek.push(day);
            if (!newReserve[timestamp]) {
               newReserve[timestamp] = Array.from({ length: arrTime.length }, () => 0);
            }
            // newReserve[day.valueOf()] || (newReserve[day.valueOf()] = Array.from({ length: arrTime.length }, () => 0));
            // console.log(newReserve[day.valueOf()]);

            newUserSelect[timestamp] ||
               (newUserSelect[timestamp] = {
                  cells: Array.from({ length: arrTime.length }, () => false),
                  minI: -1,
                  maxI: -1,
                  zmena: false,
               });

            if (!isEmtyObj(calSettings)) {
               // podmienka lebo isOpen() zavisi od nastavenia calSettings
               //objOpen sa predtym naplna dnami, kt urcuju specificke OH ... a ak neobsahuje tento den tak mu nastavi bezne OH
               if (!newObjOpen[timestamp]) {
                  newObjOpen[timestamp] = Array.from(isOpen(day));
               }
            }

            konkretneDniOH.forEach(({ od, do: doo, timestamp: tmpTs }) => {
               if (tmpTs === timestamp) {
                  if (workingMinT >= od) workingMinT = od;
                  if (workingMaxT <= doo) workingMaxT = doo;
               }
            });
         }
         if (workingMinT >= minT) workingMinT = minT;
         if (workingMaxT <= maxT) workingMaxT = maxT;

         console.log('END SET_WEEK');
         setArrWeek(arrWeek);
         setArrReserve(newReserve);
         setUserSelect(newUserSelect);
         setObjOpen(newObjOpen);
         setCalSettings({ ...calSettings, workingMinT, workingMaxT });
      }

      setIsLoadingCalData(() => false);
   }

   function isOpen(day) {
      const dayOfWeek = parseInt(day.format('E')); // <1-7>
      let od, doo;
      if (dayOfWeek <= 5 && dayOfWeek >= 1) {
         //Pon - Pia
         if (openHodRef.current.PonPia.length === 0) {
            od = calSettings.PonPia_od;
            doo = calSettings.PonPia_do;
            let tmp = [];
            arrTime.forEach((cas) => {
               if (cas >= od && cas < doo) {
                  tmp.push(true);
               } else {
                  tmp.push(false);
               }
            });
            openHodRef.current.PonPia = tmp;
         }
         return openHodRef.current.PonPia;
      } else {
         //Sob - Ned
         if (openHodRef.current.SobNed.length === 0) {
            od = calSettings.SobNed_od;
            doo = calSettings.SobNed_do;
            let tmp = [];
            arrTime.forEach((cas) => {
               if (cas >= od && cas < doo) {
                  tmp.push(true);
               } else {
                  tmp.push(false);
               }
            });
            openHodRef.current.SobNed = tmp;
         }
         return openHodRef.current.SobNed;
      }
   }

   function isOpenSpecificOH() {
      if (arrTime.length === 0) throw new Error('isOpenSpecificOH() -> arrTIme is empty ');
      let newObjOpen = { ...objOpen };
      konkretneDniOH.forEach((record) => {
         const { od, do: doo, timestamp, zavrete } = record;
         //ak objOpen nema taku polozku vytvori novu s novym polom
         //ak ma objOPen taku polozku upravi existujucu
         if (zavrete) {
            newObjOpen[timestamp] = Array.from({ length: arrTime.length }, () => false);
         } else {
            newObjOpen[timestamp] = arrTime.map((cas) => {
               return cas >= od && cas <= doo ? true : false;
            });
         }
      });
      setObjOpen(newObjOpen);

      flagsRef.current.objOpenSDOH_setted = true;
   }

   function changeDay(type) {
      setIsLoadingCalData(() => true);

      const { maxNextDays, maxNextDaysXS } = calSettings;
      let zmena = false;
      let posunDay = posunDayRef.current;
      let maxNExtDayTMP = isMobile ? maxNextDaysXS : maxNextDays;

      if (type === 'next') {
         if (posunDay > 0) {
            endDayRef.current.add(1, 'days');
            startDayRef.current.add(1, 'days');
            posunDayRef.current = posunDay - 1;
            zmena = true;
         }
      }
      if (type === 'prev') {
         if (posunDay < maxNExtDayTMP) {
            endDayRef.current.subtract(1, 'days');
            startDayRef.current.subtract(1, 'days');
            posunDayRef.current = posunDay + 1;
            zmena = true;
         }
      }
      if (type === 'today') {
         startDayRef.current = dateVal.clone();
         endDayRef.current = dateVal.clone().add(6, 'days');
         posunDayRef.current = maxNExtDayTMP;
         zmena = true;
      }
      if (zmena) {
         setWeek2();
      } else {
         setIsLoadingCalData(() => false);
      }
   }

   async function fetchRezervacie() {
      setIsLoadingCal(true);
      // console.log('loading on', JSON.stringify(isLoadingCal));
      // console.log('CLEAN');
      let newUserSelect = { ...userSelect };
      let newReserve = { ...arrReserve };

      Object.keys(newUserSelect).forEach(
         (key) => (newUserSelect[key].cells = Array.from({ length: arrTime.length }, () => false))
      );
      Object.keys(newReserve).forEach(
         (key) => (newReserve[key] = Array.from({ length: arrTime.length }, () => 0))
      );

      const token = await getAccessTokenSilently();

      const { sub: userId } = user;
      const { data } = await Axios.get(`${serverUrl}/calendar/getRezervacie`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });
      // console.log('fetchRezervacie::', data);
      data.forEach((rezervacia) => {
         const { tstampOfDay, startI, endI, userId: user_DBid } = rezervacia;
         if (newReserve[tstampOfDay]) {
            for (let i = startI; i <= endI; i++) {
               newReserve[tstampOfDay][i] += 1;
               // console.log(user_DBid, userId);
               if (user_DBid === userId) {
                  newUserSelect[tstampOfDay].cells[i] = true;
               }
            }
            if (user_DBid === userId) {
               newUserSelect[tstampOfDay].minI = startI;
               newUserSelect[tstampOfDay].maxI = endI;
            }
         }
      });

      setArrReserve(newReserve);
      setUserSelect(newUserSelect);

      setIsLoadingCal(false);
      // console.log('loading of', JSON.stringify(isLoadingCal));
      // TODO stop loading
   }

   async function fetchSettings() {
      const response = await Axios.get(`${serverUrl}/calendar/getCalendarSettings`);
      const data = response.data[0];
      console.log('data_SETTINGS:', data);
      const values = Object.values(data);

      const { calendarLength, calendarLengthMobile } = calendarInitState;
      const maxNextDaysXS = data.maxNextDays + (calendarLength - calendarLengthMobile);
      let posunDay = data.maxNextDays;
      let minT = '23:00',
         maxT = '01:00';

      values.forEach((item) => {
         if (typeof item === 'string' && item !== '') {
            if (minT >= item) minT = item;
            if (maxT <= item) maxT = item;
         }
      });

      setCalSettings({ ...data, minT, maxT, maxNextDaysXS });
      posunDayRef.current = posunDay;

      flagsRef.current.settingsFetched = true;
   }

   //docastne tu
   async function getZoznamOH() {
      const response = await Axios.get(`${serverUrl}/calendar/get-zmena-otvorenie-specificky-den`);
      const data = response.data;
      console.log('getZoznamOH-data', data);
      setKonkretneDniOH(response.data);

      flagsRef.current.zoznamOHfetched = true;
   }

   useEffect(() => {
      console.log('effect fetch');
      // console.log(JSON.stringify(flagsRef));
      fetchSettings();
      getZoznamOH();
   }, []); // eslint-disable-line react-hooks/exhaustive-deps

   useEffect(() => {
      console.log('effect settime');
      // console.log(JSON.stringify(flagsRef));
      setTime2();
      // setTime2();
   }, [flagsRef.current.settingsFetched]); // eslint-disable-line react-hooks/exhaustive-deps

   useEffect(() => {
      console.log('effec setSDOH');
      // console.log(JSON.stringify(flagsRef));
      if (flagsRef.current.timeSeted && flagsRef.current.zoznamOHfetched) {
         isOpenSpecificOH();
      }
   }, [flagsRef.current.zoznamOHfetched]); // eslint-disable-line react-hooks/exhaustive-deps

   useEffect(() => {
      console.log('effect setweek', flagsRef.current.objOpenSDOH_setted);
      // console.log(JSON.stringify(flagsRef));
      if (flagsRef.current.objOpenSDOH_setted) {
         setWeek2();
      }
   }, [flagsRef.current.objOpenSDOH_setted]); // eslint-disable-line react-hooks/exhaustive-deps

   useEffect(async () => {
      if (isAuthenticated) {
         const token = await getAccessTokenSilently();
         const response = await Axios.post(
            `${serverUrl}/registerLogin`,
            { user },
            {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            }
         );
         setDbUser(response.data);
      }
   }, [isAuthenticated]);

   useEffect(() => {
      //zmena poctu zobrazenych dni pri rozliseni telefonu XS
      const { calendarLength, calendarLengthMobile } = calendarInitState;
      let { maxNextDays, maxNextDaysXS } = calSettings;
      console.log(JSON.stringify(flagsRef));
      if (isMobile) {
         calendarLengthRef.current = calendarLengthMobile;
         posunDayRef.current = maxNextDaysXS;
         console.log('posunDayRef', posunDayRef);
      } else {
         calendarLengthRef.current = calendarLength;
         posunDayRef.current = maxNextDays;
      }
      changeDay('today');
   }, [isMobile, flagsRef.current.settingsFetched]);

   console.count('renderPROFIDER');
   return (
      <AppContext.Provider
         value={{
            ///kalendar
            dateVal,
            startDayRef,
            endDayRef,
            arrWeek,
            arrTime,
            arrReserve,
            setArrReserve,
            userSelect,
            setUserSelect,
            calSettings,
            setCalSettings,
            objOpen,
            konkretneDniOH,
            setKonkretneDniOH,
            //OTHER STATE
            cennik,
            setCennik,
            posunDayRef,
            isLoadingCal,
            setIsLoadingCal,
            isLoadingCalData,
            //profil
            dbUser,
            setDbUser,
            //
            changeDay,
            fetchRezervacie,
            //auth
            getAccessTokenSilently,
            user,
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
