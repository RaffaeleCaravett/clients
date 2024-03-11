import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-acquisto',
  templateUrl: './acquisto.component.html',
  styleUrls: ['./acquisto.component.scss']
})
export class AcquistoComponent implements OnInit{

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<AcquistoComponent>,private toastr:ToastrService) { }

  ngOnInit(): void {
console.log(this.data)
 }
}
