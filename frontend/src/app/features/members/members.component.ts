import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Member } from './member';
import { MemberService } from './member.service';

@Component({
  selector: 'fa-members',
  templateUrl: './members.component.html',
  standalone: true,
  imports: [MatTableModule, MatCardModule],
})
export class MembersComponent implements OnInit {
  displayedColumns: string[] = ['name', 'username'];

  dataSource = new MatTableDataSource<Member>();

  constructor(private memberService: MemberService) {}

  ngOnInit(): void {
    this.memberService.list().subscribe((data) => {
      this.dataSource.data = data;
    });
  }
}
