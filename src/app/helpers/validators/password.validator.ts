import { AbstractControl, ValidationErrors } from '@angular/forms';

export class PasswordValidator {
    static incorrectPassword(control: AbstractControl) {
        const password: string = control.get('password').value; // get password from our password form control
        const confirmPassword: string = control.get('confirmPass').value; // get password from our confirmPassword form control
        // compare is the password math
        if (password !== confirmPassword) {
            // if they don't match, set an error in our confirmPassword form control
            control.get('confirmPass').setErrors({ NoPasswordMatch: true });
        }
    }
}