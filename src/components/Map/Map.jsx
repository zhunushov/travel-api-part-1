import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined'
import  Rating  from '@material-ui/lab/Rating';

import useStyles from './style'
import mapStyles from './mapStyles';
const Map = ({ coords, places, setCoords, setBounds, setChildClicked, weatherData }) => {
    const classes = useStyles()
    const isDesktop = useMediaQuery('(min-width:600px)')

    return (
        <div className={classes.mapContainer}>
         <GoogleMapReact
            bootstrapURLKeys={{ key : process.env.REACT_APP_GOOGLE_MAPS_API_KEY}} 
            defaultCenter={coords}
            center={coords} 
            defaultZoom={14}
            margin={[50, 50, 50,50]}
            options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles}}
            onChange={(event) => { 
                setCoords({  lat: event.center.lat, lng: event.center.lng})
                setBounds({ ne: event.marginBounds.ne , sw: event.marginBounds.sw})
            }}
            onChildClick={(child) => setChildClicked(child)}>
                
           {places?.map((place, i) => (
               <div 
                className={classes.markerContainer}
                lat={Number(place.latitude)}
                lng={Number(place.longitude)}
                key={i}>
                   {
                       !isDesktop ? (
                           <LocationOnOutlinedIcon color='primary' fontSize='large' />
                       ) : (
                           <Paper elevation={3} className={classes.paper}>
                               <Typography className={classes.typography} variant='subtitle2' gutterBottom >
                                   { place.name }
                               </Typography>
                               <img 
                               className={classes.pointer}
                               src={place.photo ? place.photo.images.large.url : 'https://the-norma-adeline-academy.com/wp-content/uploads/2020/12/istockphoto-1018141890-612x612-1.jpg'}
                               alt={place.name}
                               />
                               <Rating name="read-only" size='small' value={Number(place.rating)} readOnly />
                           </Paper>
                       )
                   }
               </div>
           ))}
           {weatherData?.list?.map((data, i) => (
               
               <div key={i} lat={data.coord.lat} lng={data.coord.lon}>
                  <img height={100} src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`}/>
                  {console.log(img)}
               </div>
           ))}
        </GoogleMapReact>
        </div>
    );
};

export default Map;