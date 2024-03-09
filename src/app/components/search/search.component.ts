import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit{
  searchBusinessesForm!:FormGroup
constructor(private activatedRoute:ActivatedRoute){

}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      console.log(params['id'])
      })
  }

  search(){

  }
}
