import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TipDetailPage } from './tip-detail.page';

describe('TipDetailPage', () => {
  let component: TipDetailPage;
  let fixture: ComponentFixture<TipDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TipDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
