import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PosterPipe } from './poster.pipe';
import { VideoPipe } from './video.pipe';



@NgModule({
  declarations: [PosterPipe, VideoPipe],
  imports: [
    CommonModule
  ],
  exports: [
    PosterPipe,
    VideoPipe
  ]
})
export class PipesModule { }
