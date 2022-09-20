import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements AfterViewInit {
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  // @ViewChild(MatTable) table!: MatTable<UsersTableItem>;
  dataSource: any = [];
  user:any;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'actions'];

  constructor(private _liveAnnouncer: LiveAnnouncer,
    public usersService: UsersService,
    public _MatPaginatorIntl: MatPaginatorIntl,
    router: Router) {
  }

  ngOnInit(): void {
    this.usersService.getAllUsers().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort;
      console.log('response is ', res);
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
        //------------------------------
        this._MatPaginatorIntl.itemsPerPageLabel = "العناصر لكل صفحة";
        this._MatPaginatorIntl.firstPageLabel = "الصفحة الأولى";
        this._MatPaginatorIntl.lastPageLabel = "الصفحة الأخيرة";
        this._MatPaginatorIntl.nextPageLabel = "الصفحة التالية";
        this._MatPaginatorIntl.previousPageLabel = "الصفحة التالية";
        this._MatPaginatorIntl.getRangeLabel = this.getRangeDisplayText;
  }

  getRangeDisplayText = (page: number, pageSize: number, length: number) => {
    const initialText = 'من';  // customize this line
    if (length == 0 || pageSize == 0) {
      return `${initialText} 0 ${'من'} ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length
      ? Math.min(startIndex + pageSize, length)
      : startIndex + pageSize;
    return `${initialText} ${startIndex + 1} ${'إلى'} ${endIndex} ${'والمجموع'} ${length}`; // customize this line
  };

  delete(id: number) {
    this.usersService.deletUser(id).subscribe(data => {
      alert("لقد تم حذف العنصر بنجاح");
    },
      (error: HttpErrorResponse) => {
        alert("هناك مشكلة أدّت إلى عدم حذف العنصر");
      }
    )
  }




  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}
