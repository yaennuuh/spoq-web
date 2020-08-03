import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SafariPage } from './safari.page';

describe('SafariPage', () => {
  let component: SafariPage;
  let fixture: ComponentFixture<SafariPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SafariPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SafariPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
