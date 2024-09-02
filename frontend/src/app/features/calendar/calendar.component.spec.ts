import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { CalendarComponent } from './calendar.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { MemberService } from '../member/member.service';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        CalendarComponent,
      ],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        MaterialModule,
      ],
      providers: [
        MemberService,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
