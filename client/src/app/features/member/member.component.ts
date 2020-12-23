import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { MemberService } from './member.service';

@Component({
  selector: 'fa-member',
  templateUrl: './member.component.html',
  styles: ['./member.component.css'],
})
export class MemberComponent implements OnInit {

  displayedColumns: string[] = ['name', 'username'];

  dataSource = new MatTableDataSource();

  constructor(private memberService: MemberService) { }

  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  ngOnInit(): void {
    this.memberService.list().subscribe(data => this.dataSource.data = data);
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
