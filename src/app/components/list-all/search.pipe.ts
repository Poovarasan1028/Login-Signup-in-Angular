import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'Filter'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val:any) => {
      let rVal = (val.name.toLocaleLowerCase().includes(args)) || (val.username.includes(args));
      return rVal;
    })

  }
}
