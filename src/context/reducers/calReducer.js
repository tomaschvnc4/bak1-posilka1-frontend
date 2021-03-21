//state = state before update
//action = akcia vykonana so statom

import data from '../../components/calendar/data';
import Axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const serverUrl = process.env.REACT_APP_SERVER_URL;

// const { getAccessTokenSilently } = useAuth0();
const calReducer = (state, action) => {
   console.log('calReducer1: ', state);

   switch (action.type) {
      case 'LOADING': {
         return { ...state, loading: true };
      }
      case 'STOP_LOADING': {
         return { ...state, loading: false };
      }
      case 'SET_WEEK': {
         const { startDay, dateVa, arrReserve, userSelect } = state;
         let arrWeek = [];
         for (let i = 0; i < 7; i++) {
            let day = startDay.clone().add(i, 'days');
            arrWeek.push(day);

            arrReserve[day.valueOf()] ||
               (arrReserve[day.valueOf()] = Array.from({ length: state.arrTime.length }, () => 0));

            userSelect[day.valueOf()] ||
               (userSelect[day.valueOf()] = {
                  cells: Array.from({ length: state.arrTime.length }, () => false),
                  minI: -1,
                  maxI: -1,
                  zmena: false,
               });
         }
         // for (let i = 0; i < 3000; i++) {
         //    i % 300 === 0 && console.log(i);
         // }

         // console.log(arrWeek);
         console.log('arrReserve', arrReserve);
         console.log(userSelect);
         // const { arrWeek, arrReserve } = action.payload;
         console.log('END SET_WEEK');
         return { ...state, arrWeek, arrReserve };
      }

      case 'SET_TIME': {
         let arrTime = [];
         const { dateVal } = state;
         let tmpTime = dateVal.clone().set({ hour: 8, minute: 0, second: 0, millisecond: 0 });
         arrTime.push(tmpTime.format('HH:mm'));
         while (tmpTime.format('HH:mm') !== '21:00') {
            tmpTime.add(30, 'minutes');
            arrTime.push(tmpTime.format('HH:mm'));
         }
         // console.log(arrTime);

         return { ...state, arrTime };
         return { ...state, arrTime: action.payload.arrTime };
      }

      case 'CHANGE_DAY': {
         let { maxNextDays, posunDay, endDay, startDay, dateVal } = state;
         const type = action.payload.type;
         if (type === 'next') {
            if (posunDay > 0) {
               endDay.add(1, 'days');
               startDay.add(1, 'days');
               posunDay--;
            }
         }
         if (type === 'prev') {
            if (posunDay < maxNextDays) {
               endDay.subtract(1, 'days');
               startDay.subtract(1, 'days');
               posunDay++;
            }
         }
         if (type === 'today') {
            startDay = dateVal.clone();
            endDay = dateVal.clone().add(6, 'days');
            posunDay = maxNextDays;
         }
         return { ...state, startDay, endDay, maxNextDays, posunDay };
      }

      case 'SELECT_TIME': {
         const { timestamp, index } = action.payload;
         let { userSelect, arrReserve } = state;
         let dayObj = { ...userSelect[timestamp] };
         let { cells, minI, maxI, zmena } = dayObj;
         cells[index] && arrReserve[timestamp][index]--;
         !cells[index] && arrReserve[timestamp][index]++;
         cells[index] = !cells[index];
         zmena = true;
         console.log(dayObj);
         // if (index !== cells.length - 1 && cells[index + 1] === true) {
         if (index < maxI && index > minI) {
            for (let i = index + 1; i < cells.length; i++) {
               if (cells[i] === false) {
                  break;
               }
               cells[i] = false;
               arrReserve[timestamp][i]--;
               console.log(i);
            }
         }
         minI = cells.findIndex((item) => item === true);
         maxI = cells.lastIndexOf(true);
         // dayObj.cells[index] = !dayObj.cells[index];
         // dayObj.minI = dayObj.cells.findIndex((item) => item === true);
         // dayObj.maxI = dayObj.cells.lastIndexOf(true);

         userSelect[timestamp] = { cells, minI, maxI, zmena };

         return { ...state, userSelect };
      }
      case 'FETCH_RESERVE': {
         const { arrReserve } = state;
         data.map((zaznam) => {
            const { tStampOfDay, startI, endI } = zaznam;
            // let tmpPole = arrReserve[tStampOfDay];
            if (arrReserve[tStampOfDay]) {
               for (let i = startI; i <= endI; i++) {
                  // tmpPole[i] += 1;
                  arrReserve[tStampOfDay][i] += 1;
                  // console.log(i);
                  // console.log(arrReserve[tStampOfDay]);
               }
            }
            // arrReserve[tStampOfDay] = tmpPole;
            // console.log(arrReserve[tStampOfDay]);
         });
         return { ...state, arrReserve };
      }

      case 'FETCH_RESERVE2': {
         const { arrReserve, dateVal } = state;
         console.log('dateVal:', dateVal.valueOf());
         data.map((zaznam) => {
            const { tStampOfDay, startI, endI } = zaznam;
            // let tmpPole = arrReserve[tStampOfDay];
            if (arrReserve[tStampOfDay] && dateVal.valueOf() === tStampOfDay) {
               for (let i = startI; i <= endI; i++) {
                  // tmpPole[i] += 1;
                  arrReserve[tStampOfDay][i] += 1;
                  // console.log(i);
                  // console.log(arrReserve[tStampOfDay]);
               }
            }
            // arrReserve[tStampOfDay] = tmpPole;
            // console.log(arrReserve[tStampOfDay]);
         });
         return { ...state, arrReserve };
      }

      default:
         throw new Error('no matching action type --calReducer');
   }
};

const submitReserve = () => {
   return new Promise((resolve, reject) => {
      setTimeout(() => {
         console.log('timeout');
         resolve('done');
      }, 3000);
   });
};

export default calReducer;
