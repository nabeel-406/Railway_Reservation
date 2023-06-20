import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Seats } from 'src/app/Models/seat.model';
import { SharedService } from 'src/app/shared.service';
import { NavbarService } from 'src/app/SharedService/navbar.service';

@Component({
  selector: 'app-save-seats',
  templateUrl: './save-seats.component.html',
  styleUrls: ['./save-seats.component.css']
})
export class SaveSeatsComponent implements OnInit {
  SeatModelObj: Seats = new Seats();
  seatData!:any;
  formValue !: FormGroup;
  trains!:any
  showAdd !: boolean;
  showUpdate !: boolean;
  constructor(private shared:SharedService,private fb:FormBuilder,private nav:NavbarService) { }

  ngOnInit(): void {
    this.nav.hide();
    this.getAllSeats();
    this.formValue=this.fb.group({

      SeatId:[''],
      TrainId:[''],
      FirstAC:[''],
      SecondAC: [''],
      Sleeper:[''],
      Total:[''],
     
    })
  }
  getAllSeats(){
    this.shared.getAllSeats().subscribe(res=>{
      console.log(res);
      this.seatData = res;
    });
  }
  onEdit(row:any){
    this.showAdd=false;
    this.showUpdate=true;
    this.SeatModelObj.SeatId = row.SeatId;
    this.SeatModelObj.TrainId=row.TrainId;
    this.formValue.controls['FirstAC'].setValue(row.FirstAC);
    this.formValue.controls['SecondAC'].setValue(row.SecondAC);
    this.formValue.controls['Sleeper'].setValue(row.Sleeper);
    this.formValue.controls['Total'].setValue(row.Total);
  }
  updateSeat(){
    this.SeatModelObj.FirstAC=this.formValue.value.FirstAC;
    this.SeatModelObj.SecondAC=this.formValue.value.SecondAC;
    this.SeatModelObj.Sleeper=this.formValue.value.Sleeper;
    this.SeatModelObj.Total=this.formValue.value.Total
    this.shared.updateSeats(this.SeatModelObj.SeatId,this.SeatModelObj).subscribe(res=>{
      alert("Updated successfully");
      let ref = document.getElementById("cancel")
    ref?.click();
      this.formValue.reset();
      this.getAllSeats();
    })
    
  }
  clickAddSeat(){
   
  this.formValue.reset();
  this.showAdd=true;
  this.showUpdate=false;
  }
postSeatDetails(){
  this.SeatModelObj.TrainId=this.formValue.value.TrainId;
  this.SeatModelObj.FirstAC=this.formValue.value.FirstAC;
  this.SeatModelObj.SecondAC=this.formValue.value.SecondAC;
  this.SeatModelObj.Sleeper=this.formValue.value.Sleeper;
  this.SeatModelObj.Total=this.formValue.value.Total
  this.shared.saveSeat(this.SeatModelObj).subscribe((res)=>{
    console.log(res);
    alert("Added successfully");
    let ref = document.getElementById("cancel")
    ref?.click();
      this.formValue.reset();
      this.getAllSeats();
  });
}

}
