import { useAuth0 } from '@auth0/auth0-react';

import React, { useContext, useEffect, useState } from 'react';
import Axios from 'axios';

import { calendarInitState, userInitState, otherInitState } from './initialStates';
// import { calendarInitState, nextInitState, userInitState } from './initialStates';

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
   const [startDay, setStartDay] = useState(calendarInitState.startDay);
   const [endDay, setEndDay] = useState(calendarInitState.endDay);
   const [arrWeek, setArrWeek] = useState(calendarInitState.arrWeek);
   const [arrTime, setArrTime] = useState(calendarInitState.arrTime);
   const [arrReserve, setArrReserve] = useState(calendarInitState.arrReserve);
   const [userSelect, setUserSelect] = useState(calendarInitState.userSelect);
   const [maxNextDays, setMaxNextDays] = useState(calendarInitState.maxNextDays); //treba prerobit na data v settings
   const [posunDay, setPosunDay] = useState(calendarInitState.posunDay);
   const [kapacity, setKapacity] = useState(calendarInitState.kapacity); //treba prerobit na data v settings
   const [isLoadingCal, setIsLoadingCal] = useState(false);

   const [calSettings, setCalSettings] = useState(calendarInitState.calSettings);
   const [objOpen, setObjOpen] = useState(calendarInitState.objOpen);
   const [konkretneDniOH, setKonkretneDniOH] = useState(calendarInitState.konkretneDniOH);
   //OTHER STATES
   const [cennik, setCennik] = useState(otherInitState.cennik);

   //USER STATE
   const [dbUser, setDbUser] = useState(userInitState);
   //
   const [calendarState, setCalState] = useState(calendarInitState);

   const [flags, setFlags] = useState(initFlagss);
   const { user, getAccessTokenSilently, isAuthenticated } = useAuth0(); //isAuthenticated

   // console.log('*USER', user);
   // console.log('*CALENDAR STATE', calendarState);

   // function loading() {
   //    setCalState({ ...calendarState, loading: true });
   // }
   // function stopLoading() {
   //    setCalState({ ...calendarState, loading: false });
   // }

   function isEmtyObj(obj) {
      return Object.keys(obj).length === 0; //TRUE or FALSE
   }

   function capitalize(s) {
      if (typeof s !== 'string') return '';
      return s.charAt(0).toUpperCase() + s.slice(1);
   }

   function noDiacritics(s) {
      if (typeof s !== 'string') return '';
      return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
   }

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
      // setFlags({ ...flags, timeSeted: true });
      _setFlags('timeSeted', true);

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
      // console.log('ZACIATOK objOpen', objOpen);
      // console.log('ZACIATOK newObjOpen', JSON.stringify(newObjOpen));

      const length = arrTime.length;
      if (length !== 0) {
         for (let i = 0; i < 7; i++) {
            let day = startDay.clone().add(i, 'days');
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

         // console.log('arrReserve', arrReserve);
         // console.log('newReserve', newReserve);
         // console.log('userSelect', userSelect);
         // console.log('newuserSelect', newUserSelect);
         // console.log('objOpen', objOpen);
         // console.log('newObjOpen', JSON.stringify(newObjOpen));

         console.log('END SET_WEEK');
         setArrWeek(arrWeek);
         setArrReserve(newReserve);
         setUserSelect(newUserSelect);
         setObjOpen(newObjOpen);
         setCalSettings({ ...calSettings, workingMinT, workingMaxT });
      }

      setIsLoadingCal(false);
   }

   function isOpen(day) {
      const dayStr = capitalize(noDiacritics(day.format('dddd')));
      const od = calSettings[`${dayStr}_od`];
      const doo = calSettings[`${dayStr}_do`];
      let tmp = [];
      // console.log('PPPPPPPPPPPPPPPPPPP', calSettings);
      arrTime.forEach((cas) => {
         if (cas >= od && cas <= doo) {
            tmp.push(true);
         } else {
            tmp.push(false);
         }
      });
      return tmp;
   }

   function isOpenSpecificOH() {
      if (arrTime.length === 0) throw new Error('isOpenSpecificOH() -> arrTIme is empty ');
      let newObjOpen = { ...objOpen };
      console.log('objOpen', objOpen);
      konkretneDniOH.forEach((record) => {
         const { od, do: doo, timestamp } = record;
         //ak objOpen nema taku polozku vytvori novu s novym polom
         //ak ma objOPen taku polozku upravi existujucu

         newObjOpen[timestamp] = arrTime.map((cas) => {
            return cas >= od && cas <= doo ? true : false;
         });
         // console.log('newObjOpen1', JSON.stringify(newObjOpen));
      });
      setObjOpen(newObjOpen);
      setFlags({ ...flags, objOpenSDOH_setted: true });
   }

   function changeDay(type) {
      setIsLoadingCal(true);

      const { maxNextDays } = calSettings;
      console.log('chnageDay');
      if (type === 'next') {
         if (posunDay > 0) {
            endDay.add(1, 'days');
            startDay.add(1, 'days');
            setPosunDay((prev) => prev - 1);
         }
      }
      if (type === 'prev') {
         if (posunDay < maxNextDays) {
            endDay.subtract(1, 'days');
            startDay.subtract(1, 'days');
            setPosunDay((prev) => prev + 1);
         }
      }
      if (type === 'today') {
         setStartDay(dateVal.clone());
         setEndDay(dateVal.clone().add(6, 'days'));
         setPosunDay(maxNextDays);
      }
      setWeek2();
   }

   function selectTime(timestamp, index) {
      let newUserSelect = { ...userSelect };
      let newReserve = { ...arrReserve };
      let dayObj = { ...userSelect[timestamp] };
      let { cells, minI, maxI, zmena } = dayObj;

      cells[index] ? newReserve[timestamp][index]-- : newReserve[timestamp][index]++;
      cells[index] = !cells[index];
      zmena = true;

      if (index < maxI && index > minI) {
         for (let i = index + 1; i < cells.length; i++) {
            if (cells[i] === false) {
               break;
            }
            cells[i] = false;
            newReserve[timestamp][i]--;
            console.log(i);
         }
      }
      minI = cells.findIndex((item) => item === true);
      maxI = cells.lastIndexOf(true);

      newUserSelect[timestamp] = { cells, minI, maxI, zmena };

      setArrReserve(newReserve);
      setUserSelect(newUserSelect);
   }

   function zrusitVyber(timestamp) {
      let newUserSelect = { ...userSelect };
      let newReserve = { ...arrReserve };

      let { cells, minI, maxI, zmena } = newUserSelect[timestamp];
      let reserve = newReserve[timestamp];
      for (let i = minI; i <= maxI; i++) {
         cells[i] = false;
         reserve[i] -= 1;
      }

      minI = -1;
      maxI = -1;
      zmena = true;
      newUserSelect[timestamp] = { cells, minI, maxI, zmena };
      newReserve[timestamp] = reserve;

      console.log('userSelect', userSelect);
      console.log('newuserSelect', newUserSelect);
      console.log('arrReserve', arrReserve);
      console.log('newReserve', newReserve);

      setArrReserve(newReserve);
      setUserSelect(newUserSelect);
   }

   async function fetchRezervacie() {
      setIsLoadingCal(true);
      console.log('loading on', JSON.stringify(isLoadingCal));
      console.log('CLEAN');
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
      console.log('fetchRezervacie::', data);
      data.forEach((rezervacia) => {
         const { tstampOfDay, startI, endI, userId: user_DBid } = rezervacia;
         if (newReserve[tstampOfDay]) {
            for (let i = startI; i <= endI; i++) {
               newReserve[tstampOfDay][i] += 1;
               console.log(user_DBid, userId);
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
      console.log('loading of', JSON.stringify(isLoadingCal));
      // TODO stop loading
   }

   async function submitReserve() {
      //TODO loading
      // const { userId, token } = userState
      const token = await getAccessTokenSilently();
      const userId = user.sub;
      let newUserSelect = { ...userSelect };
      let submitData = {};

      console.log('submit data after:', submitData);
      for (const key in userSelect) {
         const { zmena, minI, maxI } = userSelect[key];
         if (zmena) {
            submitData[userId] || (submitData[userId] = {});
            submitData[userId][key] = { minI, maxI };
            userSelect[key].zmena = false; //aj tak je to referencia na pole cije je jedno ci pouzijem plytku kopiu objektu userSelect alebo nie
         }
      }
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
      // TODO stop loading
   }

   async function fetchSettings() {
      const response = await Axios.get(`${serverUrl}/calendar/getCalendarSettings`);
      const data = response.data[0];
      console.log('data:', data);
      const values = Object.values(data);
      // console.log(values);
      let posunDay = data.maxNextDays;
      let minT = '23:00',
         maxT = '01:00';

      values.forEach((item) => {
         if (typeof item === 'string' && item !== '') {
            if (minT >= item) minT = item;
            if (maxT <= item) maxT = item;
         }
      });

      setCalSettings({ ...data, minT, maxT });
      setPosunDay(posunDay);

      setFlags({ ...flags, settingsFetched: true });
   }

   const _setFlags = (name, value) => {
      setFlags((prev) => {
         return { ...prev, [name]: value };
      });
   };
   //docastne tu
   async function getZoznamOH() {
      const response = await Axios.get(`${serverUrl}/calendar/get-zmena-otvorenie-specificky-den`);
      const data = response.data;
      console.log('getZoznamOH-data', data);
      setKonkretneDniOH(response.data);

      _setFlags('zoznamOHfetched', true);
      // setFlags({ ...flags, zoznamOHfetched: true });
   }

   useEffect(() => {
      console.log('effect fetch');
      fetchSettings();
      getZoznamOH();
   }, []); // eslint-disable-line react-hooks/exhaustive-deps

   useEffect(() => {
      console.log('effect settime');
      setTime2();
   }, [flags.settingsFetched]); // eslint-disable-line react-hooks/exhaustive-deps

   useEffect(() => {
      console.log('effec setSDOH');
      if (flags.timeSeted && flags.zoznamOHfetched) {
         isOpenSpecificOH();
      }
   }, [flags.zoznamOHfetched]); // eslint-disable-line react-hooks/exhaustive-deps

   useEffect(() => {
      console.log('effect setweek');
      setWeek2();
   }, [flags.objOpenSDOH_setted]); // eslint-disable-line react-hooks/exhaustive-deps

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

   return (
      <AppContext.Provider
         value={{
            ///kalendar
            dateVal,
            startDay,
            endDay,
            arrWeek,
            arrTime,
            arrReserve,
            userSelect,
            calSettings,
            setCalSettings,
            objOpen,
            konkretneDniOH,
            setKonkretneDniOH,
            //OTHER STATE
            cennik,
            setCennik,
            // submitDataTest,
            maxNextDays,
            posunDay,
            setPosunDay,
            kapacity,
            isLoadingCal,
            //profil
            dbUser,
            setDbUser,
            //
            changeDay,
            selectTime,
            fetchRezervacie,
            submitReserve,
            zrusitVyber,
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

// console.log('zhoda', Object.is(dayObj, userSelect[timestamp]));
