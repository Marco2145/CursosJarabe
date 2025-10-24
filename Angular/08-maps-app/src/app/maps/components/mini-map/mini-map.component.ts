import {
  AfterViewInit,
  Component,
  computed,
  ElementRef,
  input,
  signal,
  viewChild,
} from '@angular/core';

import maplibregl, { LngLat, LngLatLike, Marker } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

@Component({
  selector: 'app-mini-map',
  imports: [],
  templateUrl: './mini-map.component.html',
})
export class MiniMapComponent implements AfterViewInit {
  divElement = viewChild<ElementRef>('map');

  map = signal<maplibregl.Map | null>(null);
  marker = signal<Marker | null>(null);

  // Parametros de entrada
  zoom = input<number>(14);
  coordinates = input<{ lng: number; lat: number }>({
    lng: -103.36847740760555,
    lat: 20.666958875543326,
  });

  inputLng = computed(() => this.coordinates().lng);
  inputLat = computed(() => this.coordinates().lat);

  async ngAfterViewInit() {
    if (!this.divElement()?.nativeElement) return;
    const element = this.divElement()!.nativeElement;

    // Para que evitar se vea transparente el mapa no se deben cargar todos a la vez
    await new Promise((resolve) => setTimeout(resolve, Math.random() * Math.random() * 5000));

    const lng = this.inputLng();
    const lat = this.inputLat();

    // Create map
    const map = new maplibregl.Map({
      container: element, // container id
      style:
        'https://raw.githubusercontent.com/go2garret/maps/main/src/assets/json/openStreetMap.json',
      center: [lng, lat], // starting position [lng, lat]
      zoom: this.zoom(), // starting zoom
      attributionControl: false,
      interactive: false,
    });

    // Set marker
    const myMarker = new Marker({
      draggable: false,
      color: 'red',
    })
      .setLngLat({ lng, lat })
      .addTo(map);

    // Set map
    this.mapListeners(map);
  }

  mapListeners(map: maplibregl.Map) {
    this.map.set(map);
    // console.log({ map });
  }
}
