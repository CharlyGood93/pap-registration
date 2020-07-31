import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddPapPage } from './add-pap.page';

describe('AddPapPage', () => {
  let component: AddPapPage;
  let fixture: ComponentFixture<AddPapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPapPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddPapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
