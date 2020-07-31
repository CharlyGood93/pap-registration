import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListPapPage } from './list-pap.page';

describe('ListPapPage', () => {
  let component: ListPapPage;
  let fixture: ComponentFixture<ListPapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPapPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListPapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
