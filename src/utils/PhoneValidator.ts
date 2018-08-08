import {AbstractControl} from "@angular/forms";

export function PhoneValidator(control: AbstractControl) {
  let value = control.value;
  if (value) {
    if (value.length === 3) {
      if (/^84[^981]$/.test(value)) {
        control.setValue('84');
      }
    } else if (value.length > 11) {
      if (/^84(9|8)[0-9]+$/.test(value)) {
        control.setValue(value.slice(0, 11));
      }
    }
    if (value.length > 12) {
      return {pattern: true};
    }
  }
}
