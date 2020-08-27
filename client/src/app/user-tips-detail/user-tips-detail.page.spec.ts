import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserTipsDetailPage } from './user-tips-detail.page';

describe('UserTipsDetailPage', () => {
  let component: UserTipsDetailPage;
  let fixture: ComponentFixture<UserTipsDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTipsDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserTipsDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
