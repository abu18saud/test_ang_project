import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { subscribeOn } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {
  user: any = { ar_name: '', en_name: '' };
  addressForm = this.fb.group({
    arName: [null, Validators.required],
    enName: [null, Validators.required]
  });




  constructor(private fb: FormBuilder,
    public usersService: UsersService) { }

  onSubmit(): void {
    if (this.addressForm.valid) {
      this.usersService.createUser(this.user).subscribe((data: any) => {
        alert("لقد تمت إضافة العنصر الجديد بنجاح");
      },
        (error: HttpErrorResponse) => {
          alert("هناك مشكلة أدّت إلى عدم إضافة العنصر");
        }
      );
    } else {
      alert('يرجى الالتزام بتعبئة الحقول الإجبارية')
    }


  }
}
