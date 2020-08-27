import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditTipPage } from './edit-tip.page';

describe('EditTipPage', () => {
  let component: EditTipPage;
  let fixture: ComponentFixture<EditTipPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTipPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditTipPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
