import {AbstractControl} from "@angular/forms";

export const LottoPairValidator = (pairs: number) => {
  return (control: AbstractControl) => {
    let value = control.value;
    if (value) {
      let items = control.value.split('-');
      if (items.length < pairs) {
        return {pairs: true};
      }
    }
  }
};
