import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UsersService } from 'src/app/services/users.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  user: any = { username:'', password:'', ar_name: '', en_name: '' };
  addressForm = this.fb.group({
    arName: [null, Validators.required],
    enName: [null, Validators.required],
    username: [null, Validators.required],
    password: [null, Validators.required]
  });
  
  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    public usersService: UsersService) { }

  ngOnInit(): void {
    this.getUser();
  }

  goBack(): void {
    this.location.back();
  }

  getUser(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.usersService.getOnceUser(id as unknown as number)
      .subscribe(user => this.user = user);
  }

  onSubmit(): void {
    if (this.addressForm.valid) {
      this.usersService.updateUser(this.user.id, this.user).subscribe((data: any) => {
        alert("لقد تم تحديث معلومات المستخدم بنجاح");
      },
        (error: HttpErrorResponse) => {
          alert("هناك مشكلة أدّت إلى عدم إضافة العنصر");
        }
      );
    }else {
      alert('يرجى الالتزام بتعبئة الحقول الإجبارية')
    }
  }

}
