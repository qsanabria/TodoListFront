import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DutyService } from '../model/duty.service';
import { Duty } from '../model/duty.model';

@Component({
  selector: 'app-duty',
  templateUrl: './duty.component.html',
  styleUrls: ['./duty.component.css'],
  providers: [DutyService]
})
export class DutyComponent implements OnInit {

  classInput = "";
  constructor(public dutyService: DutyService) { }

  ngOnInit(){
    this.reset();
    this.refreshList();
  }

  reset(form?: NgForm) {
    if (form)
      form.reset();

    this.dutyService.duty = {
      _id: "",
      name: ""
    }
  }

  refreshList(){
    this.dutyService.getDutyList().subscribe((res) => {
      this.dutyService.listDutties = res as Duty[];
    });
  }

  onEdit(duty: Duty) {
    this.dutyService.duty = duty;
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this duty?') == true) {
      this.dutyService.deleteDuty(_id).subscribe((res) => {
        this.refreshList();
        this.reset(form);
      });
    }
  }

  onSubmit(form: NgForm) {
    this.classInput = "ina-error";

    if(form.value.name.trim() != ""){
      this.classInput = "";
      if (form.value._id == "") {
        this.dutyService.postDuty(form.value).subscribe((res) => {
          this.reset(form);
          this.refreshList();
        });
      }
      else {
        this.dutyService.putDuty(form.value).subscribe((res) => {
          this.reset(form);
          this.refreshList();
        });
      }
    }
  }
}
