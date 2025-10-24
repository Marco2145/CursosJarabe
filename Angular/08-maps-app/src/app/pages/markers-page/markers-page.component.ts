import { AfterViewInit, Component, ElementRef, signal, viewChild } from '@angular/core';
import { v4 as UUIDv4 } from 'uuid';

import maplibregl, { LngLatLike } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { JsonPipe } from '@angular/common';

interface CustomMarker {
  id: string;
  maplibreMarker: maplibregl.Marker;
}

// https://gist.github.com/bendc/76c48ce53299e6078a76
const randomColor = (() => {
  'use strict';

  const randomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  return () => {
    var h = randomInt(0, 360);
    var s = randomInt(42, 98);
    var l = randomInt(40, 90);
    return `hsl(${h},${s}%,${l}%)`;
  };
})();

@Component({
  selector: 'app-markers-page',
  imports: [JsonPipe],
  templateUrl: './markers-page.component.html',
})
export class MarkersPageComponent implements AfterViewInit {
  divElement = viewChild<ElementRef>('map');
  map = signal<maplibregl.Map | null>(null);
  markers = signal<CustomMarker[]>([]);

  async ngAfterViewInit() {
    if (!this.divElement()?.nativeElement) return;
    const element = this.divElement()!.nativeElement;

    await new Promise((resolve) => setTimeout(resolve, 80));

    // const { lng, lat } = this.coordinates();

    const map = new maplibregl.Map({
      container: element, // container id
      style:
        'https://raw.githubusercontent.com/go2garret/maps/main/src/assets/json/openStreetMap.json',
      center: [-103.36847740760555, 20.666958875543326], // starting position [lng, lat]
      zoom: 14, // starting zoom
    });

    // const marker = new maplibregl.Marker({
    //   draggable: false,
    //   color: 'red',
    // })
    //   .setLngLat([-103.36847740760555, 20.666958875543326])
    //   .addTo(map);

    // marker.on('dragend', (event) => {
    //   console.log({ event });
    // });

    this.mapListeners(map);
  }

  ngOnDestroy(): void {
    this.map()?.remove();
  }

  mapListeners(map: maplibregl.Map) {
    map.on('click', (event) => {
      this.mapClick(event);
    });

    this.map.set(map);
  }

  mapClick(event: maplibregl.MapMouseEvent) {
    if (!this.map()) return;

    const myMap = this.map()!;

    // const myColor = '#xxxxxx'.replace(/x/g, (y) => ((Math.random() * 16) | 0).toString(16));
    const myColor = randomColor();

    const coords = event.lngLat;
    const myMarker = new maplibregl.Marker({
      draggable: false,
      color: myColor,
    })
      .setLngLat(coords)
      .addTo(myMap);

    const myCustomMarker: CustomMarker = {
      id: UUIDv4(),
      maplibreMarker: myMarker,
    };

    this.markers.update((markers) => [myCustomMarker, ...markers]);

    console.log(event.lngLat);
  }

  flyToMarker(lngLat: LngLatLike) {
    if (!this.map()) return;
    const myMap = this.map()!;

    myMap.flyTo({
      center: lngLat,
    });
  }

  deleteMarker(marker: CustomMarker) {
    if (!this.map()) return;
    const myMap = this.map()!;

    marker.maplibreMarker.remove();
    this.markers.update((markers) => markers.filter((filtered) => filtered.id != marker.id));
  }
}
