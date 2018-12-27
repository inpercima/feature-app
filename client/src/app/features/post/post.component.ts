import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { PostService } from './post.service';

@Component({
  selector: 'fa-post',
  templateUrl: './post.component.html',
  styles: ['./post.component.css'],
})
export class PostComponent implements OnInit {

  public displayedColumns: string[] = ['date', 'photographer'];

  public dataSource = new MatTableDataSource();

  constructor(private postService: PostService) { }

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.postService.list().subscribe(data => this.dataSource.data = data);
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
