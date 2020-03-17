import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'selectPropertyFilter'
})
export class SelectPropertyFilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg === '') return value;
    const resultPosts = [];
    for (const post of value) {
      if (post.propertyType.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultPosts.push(post);
      };
    };
    return resultPosts;
  }

}
