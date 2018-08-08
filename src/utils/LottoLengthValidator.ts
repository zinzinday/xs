import {AbstractControl} from "@angular/forms";

export const LottoLengthValidator = (len: number) => {
  return (control: AbstractControl) => {
    let value = control.value;
    if (value) {
      let items = control.value.split('-');
      if (items.length) {
        for (let item of items) {
          if (item.length < len) {
            return {len: true};
          } else if (item.length > len) {
            item = item.slice(0, len);
            control.setValue(Array.from(new Set(items)).join('-'));
            return {len: true};
          }
        }
      }
    }
  }
};
