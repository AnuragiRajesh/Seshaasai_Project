import { Directive } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, Validator, ValidationErrors, ValidatorFn } from '@angular/forms';


export function emailValidator(): ValidatorFn {

  const EMAIL_REGEXP = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  return (control: AbstractControl): ValidationErrors | null => {
    const isValid = EMAIL_REGEXP.test(control.value);

    if (isValid) {
      return null;
    } else {
      return {
        emailValidator: {
          valid: false,
        },
      };
    }
  };

}


export function phoneValidator(): ValidatorFn {

  const PHONE_REGEXP = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

  return (control: AbstractControl): ValidationErrors | null => {
    const isValid = PHONE_REGEXP.test(control.value);

    if (isValid) {
      return null;
    } else {
      return {
        phoneValidator: {
          valid: false,
        },
      };
    }
  };

}



@Directive({
  selector: '[appFormValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: FormValidatorDirective,
    multi: true,
  }],
})
export class FormValidatorDirective {

  constructor() { }
  public validate(control: AbstractControl): ValidationErrors | null {
    return emailValidator()(control);
  }

}
