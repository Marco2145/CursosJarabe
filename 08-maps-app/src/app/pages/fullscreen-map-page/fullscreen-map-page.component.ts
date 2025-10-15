import { DecimalPipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  OnDestroy,
  signal,
  viewChild,
} from '@angular/core';
// import { MapComponent } from '@maplibre/ngx-maplibre-gl';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

@Component({
  selector: 'app-fullscreen-map-page',
  imports: [DecimalPipe],
  templateUrl: './fullscreen-map-page.component.html',
  styles: `
    div{
      width: 100vw;
      height: calc(100vh - 64px);
      
    }
  
    #controls{
      background-color: white;
      padding: 10px;
      border-radius: 5px;
      position: fixed;
      bottom: 25px;
      right: 20px;
      z-index: 9999;
      box-shadow: 0 0 10px 0 rgba(0,0,0,0.1);
      border: 1px solid #e2e8f0;
      width: 250px;
    }
  `,
})
export class FullscreenMapPageComponent implements AfterViewInit, OnDestroy {
  divElement = viewChild<ElementRef>('map');

  map = signal<maplibregl.Map | null>(null);

  zoom = signal(12);
  zoomEffect = effect(() => {
    if (!this.map()) return;
    this.map()?.zoomTo(this.zoom());
  });

  async ngAfterViewInit() {
    if (!this.divElement()?.nativeElement) return;
    const element = this.divElement()!.nativeElement;

    await new Promise((resolve) => setTimeout(resolve, 80));

    // https://maplibre.org/maplibre-native/ios/latest/documentation/maplibre-native-for-ios/examplestyles/
    const map = new maplibregl.Map({
      container: element, // container id
      // style: 'https://demotiles.maplibre.org/globe.json', // style URL
      style: `https://americanamap.org/style.json`,
      center: [-103.36847740760555, 20.666958875543326], // starting position [lng, lat]
      zoom: this.zoom(), // starting zoom
    });
    this.mapListeners(map);
  }

  mapListeners(map: maplibregl.Map) {
    map.on('zoomend', (event) => {
      const newZoom = event.target.getZoom();
      this.zoom.set(newZoom);
    });

    this.map.set(map);
  }

  ngOnDestroy(): void {
    this.map()?.remove();
  }
}
