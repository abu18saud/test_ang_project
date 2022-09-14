import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit {
  public users: any;
  public user: any;

  constructor(public usersService: UsersService) { }

  ngOnInit(): void {
    //استدعاء العديد من المستخدمين
    this.usersService.getAllUsers().subscribe((res: any) => {
      this.users = res;
    })

    //استدعاء مستخدم واحد
    this.usersService.getOnceUser(5).subscribe((res: any) => {
      this.user = res;
    })
  }
}
