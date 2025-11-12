import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
} from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';

import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

@Component({
  selector: 'app-view-map',
  templateUrl: './view-map.page.html',
  styleUrls: ['./view-map.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonButtons, IonContent, CommonModule, FormsModule],
})
export class ViewMapPage implements OnInit, AfterViewInit {
  activatedRoute = inject(ActivatedRoute);
  lat: number = 0;
  lng: number = 0;
  map: maplibregl.Map | null = null;

  ngOnInit(): void {
    let geoParam =
      this.activatedRoute.snapshot.paramMap.get('geo') ?? 'geo:40,-74';
    let coordinates = geoParam?.substring(4).split(',');

    this.lat = Number(coordinates[0]);
    this.lng = Number(coordinates[1]);

    console.log(this.lng, this.lat);
  }

  ngAfterViewInit(): void {
    // Lo hacemos con timeout para que cargue bien
    setTimeout(() => {
      this.initMap();
    }, 500);
  }

  initMap() {
    this.map = new maplibregl.Map({
      container: 'map', // container id
      style: 'https://tiles.openfreemap.org/styles/bright', // style URL
      center: [this.lng, this.lat], // starting position [lng, lat]
      // zoom: 1, // starting zoom
      zoom: 15.5,
      pitch: 45,
      bearing: -17.6,
    });

    const marker = new maplibregl.Marker()
      .setLngLat([this.lng, this.lat])
      .addTo(this.map);

    // The 'building' layer in the streets vector source contains building-height
    // data from OpenStreetMap.
    this.map.on('load', () => {
      // Insert the layer beneath any symbol layer.
      const layers = this.map!.getStyle().layers;

      let labelLayerId;
      for (let i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol') {
          labelLayerId = layers[i].id;
          break;
        }
      }

      this.map!.addSource('openfreemap', {
        url: `https://tiles.openfreemap.org/planet`,
        type: 'vector',
      });

      this.map!.addLayer(
        {
          id: '3d-buildings',
          source: 'openfreemap',
          'source-layer': 'building',
          type: 'fill-extrusion',
          minzoom: 15,
          filter: ['!=', ['get', 'hide_3d'], true],
          paint: {
            'fill-extrusion-color': [
              'interpolate',
              ['linear'],
              ['get', 'render_height'],
              0,
              'lightgray',
              200,
              'royalblue',
              400,
              'lightblue',
            ],
            'fill-extrusion-height': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              16,
              ['get', 'render_height'],
            ],
            'fill-extrusion-base': [
              'case',
              ['>=', ['get', 'zoom'], 16],
              ['get', 'render_min_height'],
              0,
            ],
          },
        },
        labelLayerId
      );
    });
  }
}
