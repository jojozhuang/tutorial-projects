import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionpageComponent } from './questionpage.component';

describe('QuestionpageComponent', () => {
  let component: QuestionpageComponent;
  let fixture: ComponentFixture<QuestionpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
