import {AbstractControl} from "@angular/forms";

export function UniquePairValidator(control: AbstractControl) {
  let value = control.value;
  if (value) {
    console.log(value);
    let items = value.split('-');
    console.log(items);
    if (items.length) {
      for (let item of items) {
        if (items.filter(i => i === item).length > 1) {
          control.setValue(Array.from(new Set(items)).join('-'));
          return {unique: true};
        }
      }
    }
  }
}
