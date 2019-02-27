import {Directive} from '@angular/core';
import {AbstractControl, NG_ASYNC_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Directive({
  selector: '[appUserUniqueValidator][ngModel]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: UserUniqueValidatorDirective, multi: true}]
})
export class UserUniqueValidatorDirective implements Validator {

  constructor(private http: HttpClient) {
  }

  registerOnValidatorChange(fn: () => void): void {
  }

  validate(c: AbstractControl): Promise<{ [key: string]: any }> {
    const user = c.value;
    return new Promise<{ [p: string]: any }>(resolve => {
      this.http.get<{ userUniqueValid: boolean }>('checkUserUnique', {params: {user}})
        .subscribe(res => res ? resolve(null) : resolve({userUniqueValid: false}));
    });
  }

}
