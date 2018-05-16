import { PipeTransform, Pipe } from '@angular/core';

@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {//PipeTransform phải có hàm transform
  transform(value, args:string[]) : any {
    let keys = [];
    for (let key in value) {
      if(key!="cv")
      keys.push(key);
    }
    return keys;
  }
}