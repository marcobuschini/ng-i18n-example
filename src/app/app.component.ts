import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';

import { TranslateService, Culture, Translations } from 'ng-i18n';
import { Subscription } from 'rxjs';
import fetchInject from 'fetch-inject';

import { Feature, Vendor, ParkingSlot } from 'widget';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  public title = 'ng-i18n-example';
  public vendor: Vendor = {
    name: 'Test Vendor',
    description: 'This is a test vendor',
    features: [
      { name: 'feature 1' },
      { name: 'feature 2' },
      { name: 'feature 3' }
    ] as Feature[]
  };
  public items = new Array<ParkingSlot>();

  @ViewChild('widget', { static: true })
  public widget;

  public cultures: Culture[];

  private culture$: Subscription;

  public constructor(public translate: TranslateService) {
  }

  public async ngOnInit() {
    const [en, it] = await fetchInject(['assets/widget/i18n/en-US.js', 'assets/widget/i18n/it-IT.js']);
    const enUs = new Function(en.text);
    const enTranslation = new Translations();
    const itIt = new Function(it.text);
    const itTranslation = new Translations();
    this.translate.addCulture(
      { isoCode: 'en_US', name: 'English (United States)'} as Culture,
      { translations: enUs().en_US } as Translations
    );
    this.translate.addCulture(
      { isoCode: 'it_IT', name: 'Italiano (Italia)'} as Culture,
      { translations: itIt().it_IT } as Translations
    );

    this.culture$ = this.translate.getAvailableCultures().subscribe(
      cultures => {
        const cs = Array.from(cultures);
        this.translate.setCulture(cs[0]);
        this.widget.vendor = this.vendor;
      }
    );
  }

  public ngOnDestroy() {
    this.culture$.unsubscribe();
  }

  public addToCart(slot: ParkingSlot) {
    this.items.push(slot);
  }

  public setLanguage(culture: Culture) {
    console.log(culture.name);
    this.translate.setCulture(culture);
  }
}
