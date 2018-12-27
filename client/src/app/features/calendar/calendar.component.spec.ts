import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule, MatFormFieldModule, MatSelectModule, MatDialogModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminService } from '../admin/admin.service';
import { CalendarComponent } from './calendar.component';
import { CalendarService } from './calendar.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MemberService } from '../member/member.service';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CalendarComponent,
      ],
      imports: [
        HttpClientTestingModule,
        MatCardModule,
        MatDialogModule,
        MatFormFieldModule,
        MatSelectModule,
        ReactiveFormsModule,
      ],
      providers: [
        AdminService,
        CalendarService,
        MemberService,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
