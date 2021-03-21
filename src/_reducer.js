//state = state before update
//action = akcia vykonana so statom
import data from './components/calendar/data';
const reducer = (state, action) => {
   //    console.log(state);

   if (action.type === 'SET_WEEK') {
      const { startDay, dateVa, arrReserve, userSelect } = state.calendar;
      let arrWeek = [];
      for (let i = 0; i < 7; i++) {
         let day = startDay.clone().add(i, 'days');
         arrWeek.push(day);
         // arrWeek.push({ day: startDay.clone().add(i, 'days'), times: [] });
         // arrReserve[day.valueOf()]
         //    ? (arrReserve[day.valueOf()] = arrReserve[day.valueOf()])
         //    : (arrReserve[day.valueOf()] = Array.from(
         //         { length: state.calendar.arrTime.length },
         //         () => 0
         //      ));

         arrReserve[day.valueOf()] ||
            (arrReserve[day.valueOf()] = Array.from(
               { length: state.calendar.arrTime.length },
               () => 0
            ));

         // userSelect[day.valueOf()]
         //    ? (userSelect[day.valueOf()] = userSelect[day.valueOf()])
         // : (userSelect[day.valueOf()] = {
         //      cells: Array.from({ length: state.calendar.arrTime.length }, () => false),
         //      minI: -1,
         //      maxI: -1,
         //   });
         userSelect[day.valueOf()] ||
            (userSelect[day.valueOf()] = {
               cells: Array.from({ length: state.calendar.arrTime.length }, () => false),
               minI: -1,
               maxI: -1,
            });
      }
      console.log(arrWeek);
      console.log(arrReserve);
      console.log(userSelect);
      return { ...state, calendar: { ...state.calendar, arrWeek, arrReserve } };
   }
   if (action.type === 'SET_TIME') {
      let arrTime = [];
      const { dateVal } = state.calendar;
      let tmpTime = dateVal.clone().set({ hour: 8, minute: 0, second: 0, millisecond: 0 });
      arrTime.push(tmpTime.format('HH:mm'));
      while (tmpTime.format('HH:mm') !== '21:00') {
         tmpTime.add(30, 'minutes');
         arrTime.push(tmpTime.format('HH:mm'));
      }
      // console.log(arrTime);
      return { ...state, calendar: { ...state.calendar, arrTime } };
   }
   if (action.type === 'CHANGE_DAY') {
      let { maxNextDays, posunDay, endDay, startDay, dateVal } = state.calendar;
      switch (action.payload.type) {
         case 'next':
            {
               if (posunDay > 0) {
                  endDay.add(1, 'days');
                  startDay.add(1, 'days');
                  posunDay--;
               }
            }
            break;
         case 'prev':
            {
               if (posunDay < maxNextDays) {
                  endDay.subtract(1, 'days');
                  startDay.subtract(1, 'days');
                  posunDay++;
               }
            }
            break;
         case 'today':
            {
               startDay = dateVal.clone();
               endDay = dateVal.clone().add(6, 'days');
               posunDay = maxNextDays;
            }
            break;
      }
      return { ...state, calendar: { ...state.calendar, startDay, endDay, maxNextDays, posunDay } };
   }
   if (action.type === 'SELECT_TIME') {
      const { timestamp, index } = action.payload;
      let { userSelect, arrReserve } = state.calendar;
      let dayObj = { ...userSelect[timestamp] };
      let { cells, minI, maxI } = dayObj;
      cells[index] && arrReserve[timestamp][index]--;
      !cells[index] && arrReserve[timestamp][index]++;
      cells[index] = !cells[index];
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

      userSelect[timestamp] = { cells, minI, maxI };

      return { ...state, calendar: { ...state.calendar, userSelect } };
   }
   if (action.type === 'FETCH_RESERVE') {
      const { arrReserve } = state.calendar;
      data.map((zaznam) => {
         const { tStampOfDay, startI, endI } = zaznam;
         let tmpPole = arrReserve[tStampOfDay];
         for (let i = startI; i <= endI; i++) {
            // tmpPole[i] += 1;
            arrReserve[tStampOfDay][i] += 1;
            console.log(i);
            console.log(arrReserve[tStampOfDay]);
         }
         // arrReserve[tStampOfDay] = tmpPole;
         console.log(arrReserve[tStampOfDay]);
      });
      return { ...state };
   }

   //    return state;
   throw new Error('no matching action type --reducer');
};

export default reducer;
