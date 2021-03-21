import React, { useEffect, useState } from 'react';

import { Axios, TextField, Autocomplete } from './_import';
import { Grid, makeStyles } from '@material-ui/core';
import { useForm } from 'react-hook-form';

import { useGlobalContext } from '../../context/Provider2';

// import MomentUtils from '@date-io/moment';
// import moment from 'moment';
// import 'moment/locale/sk';
// moment.locale('sk');

const serverUrl = process.env.REACT_APP_SERVER_URL;

const timeSlots = [
   '',
   ...Array.from(new Array(16 * 2 + 1)).map((_, index) => {
      index += 12; //zmena ohranicenia
      return `${index < 20 ? '0' : ''}${Math.floor(index / 2)}:${index % 2 === 0 ? '00' : '30'}`;
   }),
];

const TestComponet = () => {
   const classes = useStyles();
   const { register, handleSubmit } = useForm(); // potom skusit cez controll aby bolo mozne mat defaul hodnotu bez prerendrovana vzdy pri zmene
   const { calSettings, setCalSettings, setPosunDay } = useGlobalContext();
   const [newCalSettings, setNewCalSettings] = useState({});
   console.log('MMMMMMMMM--newCalSettings', newCalSettings);

   const myOnSubmit = (data) => {
      console.log('submit:', data);
      const dataToSend = Object.values(data);
      // console.log(dataToSend);
      Axios.post(`${serverUrl}/calendar/editHodiny`, { payload: dataToSend });
      setCalSettings({ ...newCalSettings });
      setPosunDay(newCalSettings.maxNextDays);
      // TODO alert
   };
   const dni = ['Pondelok', 'Utorok', 'Streda', 'Stvrtok', 'Piatok', 'Sobota', 'Nedela'];

   const handleChange = (e) => {
      const name = e.target.name;
      let value = e.target.value;
      console.log(name, value);
      // setDbData({ ...dbData, [name]: value });
      if (name === 'maxNextDays' || name === 'kapacita') {
         value = parseInt(value);
      }
      setNewCalSettings({ ...newCalSettings, [name]: value });
   };

   // const fetchSettings = async () => {
   //    const response = await Axios.get(`${serverUrl}/calendar/getCalendarSettings`);
   //    const data = response.data[0];
   //    console.log('data:', data);
   //    // Object.keys(data)
   //    // setDbData(data);
   //    setCalSettings(data);
   // };

   useEffect(() => {
      // fetchSettings();
      console.log('EFFECT--setNewCalSettings');
      setNewCalSettings({ ...calSettings });
   }, [calSettings]);

   // const capitalize = (s) => {
   //    if (typeof s !== 'string') return '';
   //    return s.charAt(0).toUpperCase() + s.slice(1);
   // };

   // const cas = () => {
   //    const today = moment();
   //    console.log('FORMAT', capitalize(today.format('dddd')));
   // };
   // cas();

   return (
      <Grid
         container
         item
         xs={12}
         md={6}
         component='section'
         justify='center'
         alignItems='center'
         display='column'>
         <div>
            <div>Test</div>
            {/* {console.log('render-kapacita', calSettings.kapacita)} */}
            <form onSubmit={handleSubmit(myOnSubmit)}>
               <TextField
                  size='small'
                  variant='outlined'
                  value={`${newCalSettings.kapacita}` || '9'}
                  onChange={handleChange}
                  name={'kapacita'}
                  type='number'
                  id={'key'}
                  label={'Kapacita'}
                  inputRef={register}
               />
               <TextField
                  size='small'
                  variant='outlined'
                  value={`${newCalSettings.maxNextDays}` || '9'}
                  onChange={handleChange}
                  name={'maxNextDays'}
                  type='number'
                  id={'key'}
                  label={'Dni dopredu'}
                  inputRef={register}
               />
               {dni.map((den) => {
                  let keyOd = `${den}_od`;
                  let keyDo = `${den}_do`;
                  // return <DayOptions key={index} den={den} register={register} od={od} doo={doo} />;

                  return (
                     <div
                        key={den}
                        style={{
                           display: 'flex',
                           width: '500px',
                           justifyContent: 'space-around',
                        }}>
                        <p>{den} </p>

                        <Autocomplete
                           size='small'
                           style={{ width: 150, margin: '5px 0 5px 0' }}
                           options={timeSlots}
                           value={newCalSettings[keyOd] ? `${newCalSettings[keyOd]}` : ''}
                           onChange={(e, newValue) => {
                              console.log('newVal:', newValue);
                              if (newValue === null) {
                                 setNewCalSettings({
                                    ...newCalSettings,
                                    [keyOd]: '',
                                    [keyDo]: '',
                                 });
                              } else {
                                 setNewCalSettings({
                                    ...newCalSettings,
                                    [keyOd]: newValue,
                                 });
                              }
                           }}
                           renderInput={(params) => (
                              <TextField
                                 {...params}
                                 label='Od:'
                                 variant='outlined'
                                 inputRef={register}
                                 id={`${den}_od`}
                                 name={`${den}_od`}
                              />
                           )}
                        />

                        <p> - </p>
                        <Autocomplete
                           className={classes.root}
                           disabled={newCalSettings[keyOd] ? false : true}
                           size='small'
                           options={timeSlots}
                           style={{ width: 150, margin: '5px 0 5px 0' }}
                           value={newCalSettings[keyDo] ? `${newCalSettings[keyDo]}` : ''}
                           onChange={(e, newValue) => {
                              console.log('newVal:', newValue);
                              setNewCalSettings({ ...newCalSettings, [keyDo]: newValue });
                           }}
                           renderInput={(params) => (
                              <TextField
                                 {...params}
                                 label='Do:'
                                 variant='outlined'
                                 inputRef={register}
                                 id={`${den}_do`}
                                 name={`${den}_do`}
                              />
                           )}
                        />
                     </div>
                  );
               })}

               <input type='submit' />
            </form>
         </div>
      </Grid>
   );
};

export default TestComponet;

// const SetKonkretnyDen = () => {
//    const { register, handleSubmit, control, reset, errors } = useForm({
//       defaultValues: { datePicker: new moment().startOf('day') },
//    });

//    const { konkretneDniOH, setKonkretneDniOH } = useGlobalContext();

//    const [konkretnyDenCas, setKonkretnyDenCas] = useState({ od: '', doo: '' });
//    const [indexOd, setIndexOd] = useState(-1);
//    const [error, setError] = useState({ state: false, mes: '' });
//    const [nacitatZonam, setNacitatZonam] = useState(true);

//    const myOnSubmit = async (data, e) => {
//       console.log('submit:', data);
//       data.datePicker = data.datePicker.valueOf();
//       console.log(data.datePicker);
//       if (isNaN(data.datePicker)) {
//          console.log('ERROR');
//          setError({ state: true, mes: 'nespravny format casu' });
//          return;
//       }
//       console.log('NO ERROR');
//       reset();
//       setKonkretnyDenCas({ od: '', doo: '' });
//       setError({ state: false, mes: '' });
//       await Axios.post(`${serverUrl}/calendar/add-zmena-otvorenie-specificky-den`, {
//          payload: data,
//       });
//       setNacitatZonam(true);

//       // TODO alert
//    };

//    async function getZoznamOH() {
//       const response = await Axios.get(`${serverUrl}/calendar/get-zmena-otvorenie-specificky-den`);
//       const data = response.data;
//       console.log('getZoznamOH-data', data);
//       setKonkretneDniOH(response.data);
//    }

//    async function deleteOH(timestamp) {
//       //todo token
//       const response = await Axios.delete(
//          `${serverUrl}/calendar/delete-zmena-otvorenie-specificky-den`,
//          { data: { payload: timestamp } }
//       );
//       console.log('deleteOH', response);
//       if (response.status === 200) {
//          let newData = konkretneDniOH.filter((record) => record.timestamp !== timestamp);
//          setKonkretneDniOH(newData);
//       }
//    }

//    useEffect(() => {
//       if (nacitatZonam) {
//          getZoznamOH();
//          setNacitatZonam(false);
//       }
//    }, [nacitatZonam]);

//    return (
//       <main>
//          <section style={{ display: 'flex' }}>
//             <form onSubmit={handleSubmit(myOnSubmit)}>
//                <label>Konkretny den</label>
//                {error.state && <p color='secondary'>{error.mes}</p>}
//                <Autocomplete
//                   size='small'
//                   style={{ width: 150, margin: '5px 0 5px 0' }}
//                   options={timeSlots}
//                   value={konkretnyDenCas.od || ''}
//                   onChange={(e, newValue) => {
//                      console.log('newVal:', newValue);
//                      setIndexOd(timeSlots.indexOf(newValue));
//                      newValue === null
//                         ? setKonkretnyDenCas({ ...konkretnyDenCas, ['od']: '' })
//                         : setKonkretnyDenCas({ ...konkretnyDenCas, ['od']: newValue });
//                   }}
//                   renderInput={(params) => (
//                      <TextField
//                         {...params}
//                         label='Od:'
//                         variant='outlined'
//                         inputRef={register({ required: 'Pole nesmie byť prázdne' })}
//                         error={errors.hasOwnProperty('od')}
//                         helperText={errors['od']?.message}
//                         name='od'
//                      />
//                   )}
//                />

//                <p> - </p>
//                <Autocomplete
//                   // disabled={calSettings[keyOd] ? false : true}
//                   size='small'
//                   options={timeSlots}
//                   style={{ width: 150, margin: '5px 0 5px 0' }}
//                   value={konkretnyDenCas.doo || ''}
//                   onChange={(e, newValue) => {
//                      console.log('newVal:', newValue);
//                      newValue === null
//                         ? setKonkretnyDenCas({ ...konkretnyDenCas, doo: '' })
//                         : setKonkretnyDenCas({ ...konkretnyDenCas, doo: newValue });
//                   }}
//                   getOptionDisabled={(option) => option === indexOd}
//                   renderInput={(params) => (
//                      <TextField
//                         {...params}
//                         label='Do:'
//                         variant='outlined'
//                         inputRef={register({
//                            required: 'Pole nesmie byť prázdne',
//                            // validate: (value) => value === konkretnyDenCas.od || 'mensie',
//                         })}
//                         error={errors.hasOwnProperty('do')}
//                         helperText={errors['do']?.message}
//                         name='do'
//                      />
//                   )}
//                />
//                <Controller
//                   name='datePicker'
//                   control={control}
//                   render={({ onChange, value }) => (
//                      <MuiPickersUtilsProvider locale='sk' utils={MomentUtils}>
//                         <KeyboardDatePicker
//                            disableToolbar
//                            variant='inline'
//                            minDate={new Date()}
//                            format='DD.MM.YYYY'
//                            value={value}
//                            onChange={onChange}
//                            invalidDateMessage='Nesprávny formát'
//                         />
//                      </MuiPickersUtilsProvider>
//                   )}
//                />

//                <input type='submit' />
//             </form>
//          </section>
//          <section>
//             {konkretneDniOH.map((record) => {
//                const { timestamp, od, do: doo } = record;
//                return (
//                   timestamp && (
//                      <div style={{ display: 'flex' }} key={timestamp}>
//                         <p>{moment(timestamp).format('dddd-DD.MM.YYYY')}&nbsp;</p>
//                         <p>{od}&nbsp;</p>
//                         <p>{doo}</p>
//                         <p onClick={() => deleteOH(timestamp)}>zmazat</p>
//                      </div>
//                   )
//                );
//             })}
//          </section>
//       </main>
//    );
// };

const useStyles = makeStyles((theme) => ({
   formControl: {
      margin: theme.spacing(1),
      minWidth: 150,
      maxWidth: 500,
   },
   chips: {
      display: 'flex',
      flexWrap: 'wrap',
   },
   chip: {
      margin: 2,
   },
   noLabel: {
      marginTop: theme.spacing(3),
   },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
   PaperProps: {
      style: {
         maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
         maxWidth: 250,
         // minWidth: 250,
      },
   },
};

{
   /* <Controller
               render={(props) => (
                  <Autocomplete
                     {...props}
                     options={timeSlots}
                     getOptionLabel={(option) => option}
                     renderOption={(option) => <span>{option}</span>}
                     renderInput={(params) => (
                        <TextField {...params} label='Od3:' variant='outlined' />
                     )}
                     onChange={(_, data) => props.onChange(data)}
                  />
               )}
               name='od3'
               control={control}
            /> */
}
