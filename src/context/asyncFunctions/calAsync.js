export function prepareDataa(props) {
   let { userSelect, submitData, userId } = props;
   //    return new Promise((resolve) => {
   for (const key in userSelect) {
      const { zmena, minI, maxI } = userSelect[key];
      if (zmena) {
         submitData[userId] || (submitData[userId] = {});
         submitData[userId][key] = { minI, maxI };
         userSelect[key].zmena = false;
      }
   }
   for (let i = 0; i < 30000; i++) {
      i % 200 === 0 && console.log(i);
   }
   //       resolve();
   //    });
}

// export const SET_WEEK = (state, calDispatch) => {
//    console.log(state);
//    let { startDay, dateVa, arrReserve, userSelect, arrWeek } = state;
//    arrWeek = [];
//    for (let i = 0; i < 7; i++) {
//       let day = startDay.clone().add(i, 'days');
//       arrWeek.push(day);
//       console.log('push', arrWeek);

//       if (arrReserve[day.valueOf()]) {
//          arrReserve[day.valueOf()] = Array.from({ length: state.arrTime.length }, () => 0);
//       }

//       userSelect[day.valueOf()] ||
//          (userSelect[day.valueOf()] = {
//             cells: Array.from({ length: state.arrTime.length }, () => false),
//             minI: -1,
//             maxI: -1,
//             zmena: false,
//          });
//    }
//    // for (let i = 0; i < 3000; i++) {
//    //    i % 300 === 0 && console.log(i);
//    // }

//    // console.log(arrWeek);
//    console.log('arrReserve', arrReserve);
//    console.log(userSelect);
//    calDispatch({ type: 'SET_WEEK', payload: { arrReserve, arrWeek } });
// };

export const SET_WEEK = (calDispatch) => {
   calDispatch({ type: 'SET_WEEK' });
   console.log('EXT FUN');
};

export const SET_TIME = (state, calDispatch) => {
   let arrTime = [];
   const { dateVal } = state;
   let tmpTime = dateVal.clone().set({ hour: 8, minute: 0, second: 0, millisecond: 0 });
   arrTime.push(tmpTime.format('HH:mm'));
   while (tmpTime.format('HH:mm') !== '21:00') {
      tmpTime.add(30, 'minutes');
      arrTime.push(tmpTime.format('HH:mm'));
   }
   // console.log(arrTime);
   calDispatch({ type: 'SET_TIME', payload: { arrTime } });
};
