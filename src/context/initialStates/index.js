import moment from 'moment';
import 'moment/locale/sk';
moment().locale('sk');

const dateVal = moment().startOf('day');

export const calendarInitState = {
   dateVal: dateVal,
   startDay: dateVal.clone(),
   endDay: dateVal.clone().add(6, 'days'),
   arrWeek: [], //[day,day,...]
   arrTime: [], //[8:00,8:30,...]
   arrReserve: {}, //{timestamp:[pocet,pocet,...](arrTime.length) }
   userSelect: {}, //{ timestamp: {cells: [f,f,..], minI: -1, maxI: -1, zmena:false} }
   submitData: {},
   maxNextDays: 7, //+1 tyzdne
   posunDay: 7,
   kapacity: 1,
   loading: false,

   calSettings: {},
   objOpen: {}, //{timestamp:[false,false,true,true....]}
   konkretneDniOH: [], //[ {timestamp:4554..,od:'',do:''},{...},{},...] OH=otvaracie hodiny
};

export const userInitState = {
   dbName: '',
   telefon: '',
};

export const otherInitState = {
   cennik: [], //pole objektov [{id:'',title:'',price:''},{},...]
};

export const nextInitState = {};
