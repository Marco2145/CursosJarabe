import { afterEveryRender, afterNextRender, Component, effect, signal } from '@angular/core';
import { TitleComponent } from '../../components/title/title.component';

const log = (...mesages: string[]) => {
  console.log(`${mesages[0]} %c${mesages.slice(1).join(', ')}`, 'color: #007bc2ff');
};

@Component({
  selector: 'app-home-page',
  imports: [TitleComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  traditionalProperty = 'Harmony';
  signalProperty = signal<string>('Harmony');

  constructor() {
    log('Constructor llamado');

    // setTimeout(() => {
    //   this.traditionalProperty = 'Juan Carlos';
    //   // this.signalProperty.set('Juan Carlos');
    //   console.log('Tick :D');
    // }, 2000);
  }

  changeTraditional() {
    this.traditionalProperty = 'Harmony No Surname';
  }

  changeSignal() {
    this.signalProperty.set('Harmony No Surname');
  }

  basicEffect = effect((onCleanup) => {
    log('effect', 'Disparar efectos secundarios');

    onCleanup(() => {
      log('effect:onCleanup', 'Disparar cuando el efecto se va a destruir');
    });
  });

  ngOnInit() {
    log('ngOnInit', "Runs once after Angular has initialized all the component's inputs.");
  }
  ngOnChanges() {
    log('ngOnChanges', "Runs every time the component's inputs have changed.");
  }
  ngDoCheck() {
    log('ngDoCheck', 'Runs every time this component is checked for changes.');
  }
  ngAfterContentInit() {
    log('ngAfterContentInit', "Runs once after the component's content has been initialized.");
  }
  ngAfterContentChecked() {
    log(
      'ngAfterContentChecked',
      'Runs every time this component content has been checked for changes.'
    );
  }
  ngAfterViewInit() {
    log('ngAfterViewInit', "Runs once after the component's view has been initialized.");
  }
  ngAfterViewChecked() {
    log('ngAfterViewChecked', "Runs every time the component's view has been checked for changes.");
  }

  ngOnDestroy() {
    log('ngOnDestroy', 'Runs once before the component is destroyed.');
  }

  afterNextRenderEffect = afterNextRender(() => {
    log(
      'afterNextRender',
      'Runs once the next time that all components have been rendered to the DOM.'
    );
  });

  afterEveryRenderEffect = afterEveryRender(() => {
    log('afterEveryRender', 'Runs every time all components have been rendered to the DOM.');
  });
}
