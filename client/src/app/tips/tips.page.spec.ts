import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TipsPage } from './tips.page';

describe('Tab1Page', () => {
  let component: TipsPage;
  let fixture: ComponentFixture<TipsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TipsPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TipsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
