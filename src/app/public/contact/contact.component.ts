import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; 
import { SecurityService } from 'src/app/services/security.service';
import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';

declare var initMaterializeSelect: any;


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  fgValidation: FormGroup;

  constructor(private fb: FormBuilder, private secService: SecurityService, private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.fgValidationBuilder();
  }

  ngAfterViewInit(){
    initMaterializeSelect();
  }

  fgValidationBuilder(){
    this.fgValidation = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(40)]],
      lastName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(40)]],
      email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(40), Validators.email]],
      messageType:['', [Validators.required]],
      message: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern("")]]
    });
  }

  get fg(){
    return this.fgValidation.controls;
  }

  contactEvent(){
    let emailUser = this.fg.email.value;
    let emailAdmin = 'a01homecolombia@gmail.com'
    let subject = `Property ${this.fg.messageType.value}`;
    let message = `${this.fg.firstName.value} ${this.fg.lastName.value} with email: ${emailUser} sends the next message: ${this.fg.message.value}`;
    this.secService.sendEmail(emailAdmin, subject, message).subscribe()
    this.router.navigate(['/home']);
  }

}
