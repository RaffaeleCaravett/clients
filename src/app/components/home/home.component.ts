import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
deg:number=0
currentScroll=0;
@HostListener('window:scroll', ['$event'])
onScroll(event: Event) {
if(this.currentScroll<document.documentElement.scrollTop){
  this.deg+=2
}else{
  this.deg-=2
}
this.currentScroll=document.documentElement.scrollTop
}
}
