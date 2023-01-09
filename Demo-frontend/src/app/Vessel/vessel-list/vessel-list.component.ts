
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { VesselService } from 'src/app/services/vessel.service';

@Component({
  selector: 'app-vessel-list',
  templateUrl: './vessel-list.component.html',
  styleUrls: ['./vessel-list.component.css']
})
export class VesselListComponent implements OnInit {
  VesselForm:any=FormGroup
  Vesselflag:any[]=[]
  VesselType:any[]=[]
  constructor(private vesselserv:VesselService, 
      private formBuider: FormBuilder,
      private _snackBar: MatSnackBar,
      private route:Router,
      ) { }

  ngOnInit(): void {
    this.VesselForm = this.formBuider.group({
      imo_number:['',[Validators.required, Validators.minLength(2)]],
      name:['',[Validators.required, Validators.minLength(2)]],
      flag_id:[''],
      vessel_type_id:[''],
    })

    this.vesselserv.GetAllFlags().subscribe((res:any)=>
      {
        this.Vesselflag = res
        console.log(this.Vesselflag)
        
      })
      this.vesselserv.GetAllVesselType().subscribe((res:any)=>{
        this.VesselType = res
      })
  }
  Submit(){
    this.vesselserv.VesselForm(this.VesselForm.value).subscribe((res:any)=>
    {
      // console.log(res)
      if(res?.success)
      {
        this.vesselserv.openSnackBar("succesfully saved","ok")
        this.route.navigate(['/vessel'])
      }
      else{
        this.vesselserv.openSnackBar("Error Saving","error")
      }
    })
  
  }






  // get imo_number()
  // {
  //    return this.VesselForm.get('imoumber') as FormControl;
  // }
  // get name() {
  //   return this.VesselForm.get('name') as FormControl;
  // }
  // get vessel_type_id() {
  //   return this.VesselForm.get('vessel_type_id') as FormControl;
  // }
  // get flag_id() {
  //   return this.VesselForm.get('flag_id') as FormControl;
  // }



}
