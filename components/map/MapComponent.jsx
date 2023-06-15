import React, { useRef, useEffect, Fragment } from 'react';
import mapboxgl from 'mapbox-gl';
import useSWR from 'swr';
import lookup from 'country-code-lookup';
import 'mapbox-gl/dist/mapbox-gl.css';
import Head from 'next/head';
import classes from './map.module.css';
mapboxgl.accessToken =
  'pk.eyJ1IjoibWFuaXllZ2FuZWgiLCJhIjoiY2tqMnRkemNnMHk5azJ6bGdza2gweXBsMCJ9.Y34jhUNG4VPBbLNGZznA5g';
//   "pk.eyJ1IjoidHJib3QiLCJhIjoiY2s3NmFscm1xMTV0MDNmcXFyOWp1dGhieSJ9.tR2IMHDqBPOf_AeGjHOKFA";
const MapComponent = () => {
  const mapboxElRef = useRef(null);
  const fetcher = (url) =>
    fetch(url)
      .then((r) => r.json())
      .then((data) =>
        data.map((point, index) => ({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [
              point.coordinates.longitude,
              point.coordinates.latitude,
            ],
          },
          properties: {
            id: index,
            updatedAt: point.updatedAt,
            country: point.country,
            province: point.province,
            cases: point.stats.confirmed,
            deaths: point.stats.deaths,
          },
        }))
      );
  const { data } = useSWR('https://disease.sh/v2/jhucsse', fetcher);
  useEffect(() => {
    if (data) {
      const map = new mapboxgl.Map({
        container: mapboxElRef.current,
        // style: 'mapbox://styles/maniyeganeh/ckj2ovjn9at5y19qo2e97sifa',
        style: 'mapbox://styles/maniyeganeh/ckj1jphjn9ov41at4fpa070qc',

        center: [16, 27],
        zoom: 1,
      });

      // Add navigation controls to the top right of the canvas
      map.addControl(new mapboxgl.NavigationControl());

      map.once('load', function () {
        // Add our SOURCE
        map.addSource('points', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: data,
          },
        });

        // Add our layer
        map.addLayer({
          id: 'circles',
          source: 'points', // this should be the id of source
          type: 'circle',
          paint: {
            'circle-opacity': 0.75,
            'circle-stroke-width': [
              'interpolate',
              ['linear'],
              ['get', 'cases'],
              1,
              1,
              100000,
              1.75,
            ],
            'circle-radius': [
              'interpolate',
              ['linear'],
              ['get', 'cases'],
              1,
              4,
              1000,
              8,
              4000,
              10,
              8000,
              14,
              12000,
              18,
              100000,
              40,
            ],
            'circle-color': [
              'interpolate',
              ['linear'],
              ['get', 'cases'],
              1,
              '#ffffb2',
              5000,
              '#fed976',
              10000,
              '#feb24c',
              25000,
              '#fd8d3c',
              50000,
              '#fc4e2a',
              75000,
              '#e31a1c',
              100000,
              '#b10026',
            ],
          },
        });
        const popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false,
        });

        let lastId;

        map.on('mousemove', 'circles', (e) => {
          const id = e.features[0].properties.id;

          if (id !== lastId) {
            lastId = id;
            const { cases, deaths, country, province, updatedAt } =
              e.features[0].properties;

            // Change the pointer type on mouseenter
            map.getCanvas().style.cursor = 'pointer';

            const coordinates = e.features[0].geometry.coordinates.slice();

            const countryISO =
              lookup.byCountry(country)?.iso2 ||
              lookup.byInternet(country)?.iso2;
            const provinceHTML =
              province !== 'null' ? `<p>Province: <b>${province}</b></p>` : '';
            const mortalityRate = ((deaths / cases) * 100).toFixed(2);
            const countryFlagHTML = countryISO
              ? `<img src="https://www.countryflags.io/${countryISO}/flat/64.png"></img>`
              : '';

            const HTML = `<p>Country: <b>${country}</b></p>
                      ${provinceHTML}
                      <p>Cases: <b>${cases.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}</b></p>
                      <p>Deaths: <b>${deaths.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}</b></p>
                      <p>Mortality Rate: <b>${mortalityRate}%</b></p>
                      
                      <p>${updatedAt}</p>
                      ${countryFlagHTML}`;

            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
              coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            popup.setLngLat(coordinates).setHTML(HTML).addTo(map);
          }
        });
        map.on('mouseleave', 'circles', function () {
          lastId = undefined;
          map.getCanvas().style.cursor = '';
          popup.remove();
        });
      });
    }
  }, [data]);

  return (
    <>
      <Head>
        <title>ویروس کرونا | نقشه ویروس</title>
      </Head>
      <div className={classes.mapWrapper}>
        <div className={classes.virus}>
          <div className={classes.mapContainer}>
            {/* Mapbox Container */}
            <div className={classes.mapBox} ref={mapboxElRef} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MapComponent;
