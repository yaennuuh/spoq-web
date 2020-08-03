import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MobileaudioPage } from './mobileaudio.page';

describe('MobileaudioPage', () => {
  let component: MobileaudioPage;
  let fixture: ComponentFixture<MobileaudioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileaudioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MobileaudioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
