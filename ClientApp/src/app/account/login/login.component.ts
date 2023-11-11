import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { User } from 'src/app/shared/models/user';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  submitted = false;
  errorMessages: string[] = [];
  returnUrl: string | null = null;

  constructor(private accountService: AccountService,  private formBuilder: FormBuilder, private sharedService: SharedService, private router: Router,  private activatedRoute: ActivatedRoute){
    this.accountService.user$.pipe(take(1)).subscribe({
      next: (user: User | null) => {
        if(user){
          this.router.navigateByUrl('/');
        } else {  
          this.activatedRoute.queryParamMap.subscribe({
            next: (params: any) => {
              if(params){
                this.returnUrl = params.get('returnUrl');
              }
            }
          })
        } 
      }
    })
  }

  ngOnInit(): void {
    this.initializeForm()
  }

  initializeForm(){
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  login() {
    this.submitted = true;
    this.errorMessages = [];

    if(this.loginForm.valid){
      this.accountService.login(this.loginForm.value).subscribe({
        next: (response:  any) => {
            if(this.returnUrl){
              this.router.navigateByUrl(this.returnUrl)
            } else {
              this.router.navigateByUrl('/')
            }
        },
        error:  error => {
          if(error.error.error){
            this.errorMessages = error.error.error;
          } else{
            this.errorMessages.push(error.error)
          }
          
        }
      })
    }

  }
}
