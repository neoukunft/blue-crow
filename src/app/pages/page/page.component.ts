import { Component, Signal } from '@angular/core';
import { Page } from '@core/decorators/page.decorator';
import { BlueCrowLayout, BlueCrowLayoutDirective, getLayout } from '@core/directives/blue-crow-layout/layout.directive';

@Page({
  path: '',
  title: "Página de Exemplo"
})
@Component({
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  imports: [
    BlueCrowLayoutDirective
  ]
})
export class PageComponent {

  private _layoutMain!: BlueCrowLayout;

  set layoutMain(layout: Signal<BlueCrowLayout | null> | BlueCrowLayout) {
    const layoutSignal = layout as Signal<BlueCrowLayout | null>;

    layoutSignal()?.setup({
      columns: ['1fr', 600, 50]
    });

    this._layoutMain = layoutSignal() as BlueCrowLayout;
  }

  get layoutMain(): BlueCrowLayout {
    return this._layoutMain;
  }

  ngAfterViewInit(): void {
    this.layoutMain = getLayout('main');
  }

  ngOnInit() {
    console.log('🧩 [Componente Nativo] ngOnInit executou!');
    console.log('🧩 [Componente Nativo] Status injetado via @Page:', (this as any).pageContextInjetado);
  }

  ngOnDestroy() {
    console.log('🧩 [Componente Nativo] ngOnDestroy executou!');
  }

  // onGridMutation(event: any) {
  //   console.log('🚀 BlueCrow detectou mudança:', event);
  //   this.main.columns = ['1fr', 300, 300];
  // }
}
