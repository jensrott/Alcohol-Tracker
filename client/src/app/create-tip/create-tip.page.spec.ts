import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateTipPage } from './create-tip.page';

describe('CreateTipPage', () => {
  let component: CreateTipPage;
  let fixture: ComponentFixture<CreateTipPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTipPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateTipPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
