import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Pipe({
  name: 'video'
})
export class VideoPipe implements PipeTransform {
  constructor(
    private _sanitizer: DomSanitizer
  ){}
  transform(key: string): SafeResourceUrl {
    var video, results;
 
    if (key === null) {
        return '';
    }
    // results = url.match('[\\?&]v=([^&#]*)');
    // video   = (results === null) ? url : results[1];
 
    return this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + key);  
  }



}
