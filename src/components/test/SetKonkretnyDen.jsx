import React, { useEffect, useState } from 'react';

//prettier-ignore
import {Axios, TextField, Autocomplete,KeyboardDatePicker, MuiPickersUtilsProvider,Grid} from './_import'

import { useForm, Controller } from 'react-hook-form';

import { useGlobalContext } from '../../context/Provider2';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import 'moment/locale/sk';
moment.locale('sk');

const serverUrl = process.env.REACT_APP_SERVER_URL;

const timeSlots = [
   '',
   ...Array.from(new Array(16 * 2 + 1)).map((_, index) => {
      index += 12; //zmena ohranicenia
      return `${index < 20 ? '0' : ''}${Math.floor(index / 2)}:${index % 2 === 0 ? '00' : '30'}`;
   }),
];

const SetKonkretnyDen = () => {
   const { register, handleSubmit, control, reset, errors } = useForm({
      defaultValues: { datePicker: new moment().startOf('day') },
   });

   const { konkretneDniOH, setKonkretneDniOH } = useGlobalContext();

   const [konkretnyDenCas, setKonkretnyDenCas] = useState({ od: '', doo: '' });
   const [indexOd, setIndexOd] = useState(-1);
   const [error, setError] = useState({ state: false, mes: '' });
   const [nacitatZonam, setNacitatZonam] = useState(true);

   const myOnSubmit = async (data, e) => {
      console.log('submit:', data);
      data.datePicker = data.datePicker.valueOf();
      console.log(data.datePicker);
      if (isNaN(data.datePicker)) {
         console.log('ERROR');
         setError({ state: true, mes: 'nespravny format casu' });
         return;
      }
      console.log('NO ERROR');
      reset();
      setKonkretnyDenCas({ od: '', doo: '' });
      setError({ state: false, mes: '' });
      await Axios.post(`${serverUrl}/calendar/add-zmena-otvorenie-specificky-den`, {
         payload: data,
      });
      setNacitatZonam(true);

      // TODO alert
   };

   async function getZoznamOH() {
      const response = await Axios.get(`${serverUrl}/calendar/get-zmena-otvorenie-specificky-den`);
      const data = response.data;
      console.log('getZoznamOH-data', data);
      setKonkretneDniOH(response.data);
   }

   async function deleteOH(timestamp) {
      //todo token
      const response = await Axios.delete(
         `${serverUrl}/calendar/delete-zmena-otvorenie-specificky-den`,
         { data: { payload: timestamp } }
      );
      console.log('deleteOH', response);
      if (response.status === 200) {
         let newData = konkretneDniOH.filter((record) => record.timestamp !== timestamp);
         setKonkretneDniOH(newData);
      }
   }

   useEffect(() => {
      if (nacitatZonam) {
         getZoznamOH();
         setNacitatZonam(false);
      }
   }, [nacitatZonam]);

   return (
      <Grid
         container
         item
         xs={12}
         md={6}
         component='section'
         justify='center'
         alignItems='center'
         direction='column'>
         <Grid item component='section'>
            <form onSubmit={handleSubmit(myOnSubmit)}>
               <div>
                  <label>Konkretny den</label>
               </div>

               {error.state && <p color='secondary'>{error.mes}</p>}
               <Controller
                  name='datePicker'
                  control={control}
                  render={({ onChange, value }) => (
                     <MuiPickersUtilsProvider locale='sk' utils={MomentUtils}>
                        <KeyboardDatePicker
                           disableToolbar
                           variant='inline'
                           minDate={new Date()}
                           format='DD.MM.YYYY'
                           value={value}
                           onChange={onChange}
                           invalidDateMessage='Nesprávny formát'
                        />
                     </MuiPickersUtilsProvider>
                  )}
               />

               <Autocomplete
                  size='small'
                  style={{ width: 150, margin: '5px 0 5px 0' }}
                  options={timeSlots}
                  value={konkretnyDenCas.od || ''}
                  onChange={(e, newValue) => {
                     console.log('newVal:', newValue);
                     setIndexOd(timeSlots.indexOf(newValue));
                     newValue === null
                        ? setKonkretnyDenCas({ ...konkretnyDenCas, ['od']: '' })
                        : setKonkretnyDenCas({ ...konkretnyDenCas, ['od']: newValue });
                  }}
                  renderInput={(params) => (
                     <TextField
                        {...params}
                        label='Od:'
                        variant='outlined'
                        inputRef={register({ required: 'Pole nesmie byť prázdne' })}
                        error={errors.hasOwnProperty('od')}
                        helperText={errors['od']?.message}
                        name='od'
                     />
                  )}
               />

               <p> - </p>
               <Autocomplete
                  // disabled={calSettings[keyOd] ? false : true}
                  size='small'
                  options={timeSlots}
                  style={{ width: 150, margin: '5px 0 5px 0' }}
                  value={konkretnyDenCas.doo || ''}
                  onChange={(e, newValue) => {
                     console.log('newVal:', newValue);
                     newValue === null
                        ? setKonkretnyDenCas({ ...konkretnyDenCas, doo: '' })
                        : setKonkretnyDenCas({ ...konkretnyDenCas, doo: newValue });
                  }}
                  getOptionDisabled={(option) => option === indexOd}
                  renderInput={(params) => (
                     <TextField
                        {...params}
                        label='Do:'
                        variant='outlined'
                        inputRef={register({
                           required: 'Pole nesmie byť prázdne',
                           // validate: (value) => value === konkretnyDenCas.od || 'mensie',
                        })}
                        error={errors.hasOwnProperty('do')}
                        helperText={errors['do']?.message}
                        name='do'
                     />
                  )}
               />

               <input type='submit' />
            </form>
         </Grid>

         <Grid item component='section'>
            {konkretneDniOH.map((record) => {
               const { timestamp, od, do: doo } = record;
               return (
                  timestamp && (
                     <article style={{ display: 'flex' }} key={timestamp}>
                        <p>{moment(timestamp).format('dddd-DD.MM.YYYY')}&nbsp;</p>
                        <p>{od}&nbsp;</p>
                        <p>{doo}</p>
                        <p onClick={() => deleteOH(timestamp)}>zmazat</p>
                     </article>
                  )
               );
            })}
         </Grid>
      </Grid>
   );
};

export default SetKonkretnyDen;
