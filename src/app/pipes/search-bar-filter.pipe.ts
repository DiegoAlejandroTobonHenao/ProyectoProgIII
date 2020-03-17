import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchBarFilter'
})
export class SearchBarFilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg === '') return value;
    const resultPosts = [];
    for (const post of value) {
      if (post.name.toLowerCase().indexOf(arg.toLowerCase()) > -1  || post.description.toLowerCase().indexOf(arg.toLowerCase()) > -1 || post.propertyType.toLowerCase().indexOf(arg.toLowerCase()) > -1 || post.requestType.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultPosts.push(post);
      };
    };
    return resultPosts;
  }

}
