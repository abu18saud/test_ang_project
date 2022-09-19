import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
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
    public usersService: UsersService) {
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
    // this.dataSource.paginator = this.paginator;
    // this.table.dataSource = this.dataSource;
  }

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
