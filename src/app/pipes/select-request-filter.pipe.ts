import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'selectRequestFilter'
})
export class SelectRequestFilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg === '') return value;
    const resultPosts = [];
    for (const post of value) {
      if (post.requestType.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultPosts.push(post);
      };
    };
    return resultPosts;
  }

}
