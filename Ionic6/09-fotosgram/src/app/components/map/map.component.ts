import {
  AfterViewInit,
  Component,
  computed,
  ElementRef,
  input,
  OnInit,
  ViewChild,
} from '@angular/core';

import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {
  coords = input.required<string>();
  lng = computed(() => {
    return Number(this.coords().split(',')[1]);
  });
  lat = computed(() => {
    return Number(this.coords().split(',')[0]);
  });

  @ViewChild('Mapa', { static: true }) mapContainer!: ElementRef<HTMLElement>;

  map: maplibregl.Map | null = null;

  initMap() {
    this.map = new maplibregl.Map({
      container: this.mapContainer.nativeElement, // container id
      style: 'https://tiles.openfreemap.org/styles/bright', // style URL
      center: [this.lng(), this.lat()], // starting position [lng, lat]
      // zoom: 1, // starting zoom
      zoom: 15,
      minZoom: 15,
      maxZoom: 15,
      attributionControl: false,
    });

    this.map.dragPan.disable();

    const marker = new maplibregl.Marker()
      .setLngLat([this.lng(), this.lat()])
      .addTo(this.map);
  }

  ngAfterViewInit(): void {
    // Lo hacemos con timeout para que cargue bien
    setTimeout(() => {
      this.initMap();
    }, 500);
  }
}
