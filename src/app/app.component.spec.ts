import { TestBed, ComponentFixture, fakeAsync, flush } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { WidgetComponent, Feature, Vendor, ParkingSlot, WidgetModule } from 'widget';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import {
  TranslateModule,
  MissingTranslationHandler,
  MissingTranslationHandlerParams,
  TranslateFakeLoader,
  TranslateLoader
} from '@ngx-translate/core';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let addSpy: jest.SpyInstance;

  const dummyVendor: Vendor = {
    name: 'Test Vendor',
    description: 'This is a test vendor',
    features: [
      { name: 'Feature 1' } as Feature,
      { name: 'Feature 2' } as Feature,
      { name: 'Feature 3' } as Feature
    ] as Feature[]
  };

  const dummySlots: ParkingSlot[] = [
    {
      id: 0,
      name: 'Slot 1',
      features: [
        'Feature 1',
        'Feature 2'
      ]
    }
  ];

  const ENGLISH_LANGUAGE = 'en-US';
  const ENGLISH_TRANSLATIONS = {
    'Add to cart': 'Add to cart',
    Collapse: 'Collapse',
    Expand: 'Expand'
};

  const ITALIAN_LANGUAGE = 'es';
  const ITALIAN_TRANSLATIONS = {
    'Add to cart': 'Aggiungi al carrello',
    Collapse: 'Riduci',
    Expand: 'Espandi'
  };

  const TRANSLATIONS = {
    [ENGLISH_LANGUAGE]: ENGLISH_TRANSLATIONS,
    [ITALIAN_LANGUAGE]: ITALIAN_TRANSLATIONS
  };

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
      ],
      imports: [
        MatCardModule,
        MatDividerModule,
        MatListModule,
        HttpClientTestingModule,
        WidgetModule,
        TranslateTestingModule.withTranslations(TRANSLATIONS)
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    fixture.componentInstance.widget = TestBed.createComponent(WidgetComponent).componentInstance;

    const vendorSpy = jest.spyOn(fixture.componentInstance.widget.service, 'getVendorFeatures')
      .mockReturnValue(of(dummyVendor.features));
    const slotsSpy = jest.spyOn(fixture.componentInstance.widget.service, 'getParkingSlots')
      .mockReturnValue(of(dummySlots));
    addSpy = jest.spyOn(fixture.componentInstance, 'addToCart');

    component = fixture.componentInstance;
    component.widget.ngOnInit();
    fixture.detectChanges();
  });

  afterEach(() => {
    component.widget.ngOnDestroy();
  });

  it('should create the application, and add an item to the cart', fakeAsync(() => {
    expect(component).toBeTruthy();

    flush();

    expect(fixture).toMatchSnapshot();

    const button = fixture.debugElement.queryAll(By.css('mlb-parking-widget button'))[0].nativeElement as HTMLButtonElement;
    button.click();
    fixture.detectChanges();

    expect(addSpy).toHaveBeenCalled();

    expect(fixture).toMatchSnapshot();
  }));
});
