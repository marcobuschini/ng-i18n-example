import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';

import { TranslateService, Culture, Translations } from 'ng-i18n';
import { of, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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

  public constructor(public translate: TranslateService, private http: HttpClient) {
    this.translate.addCulture(
      { isoCode: 'en_US', name: 'English (US)'} as Culture,
      {
        culture: { isoCode: 'en_US', name: 'English (US)'} as Culture,
        translations: this.http.get('assets/widget/i18n/en-US.js')
      } as Translations
    );
    this.translate.addCulture(
      { isoCode: 'it_IT', name: 'Italiano (Italia)'} as Culture,
      {
        culture: { isoCode: 'it_IT', name: 'Italiano (Italia)'} as Culture,
        translations: this.http.get('assets/widget/i18n/it-IT.js')
      } as Translations
    );
  }

  public ngOnInit() {
    this.culture$ = this.translate.getAvailableCultures().subscribe(
      success => {
        this.cultures = Array.from(success);
        this.translate.setCulture(this.cultures[0]);
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
