import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiServices } from '../../services/api.services'

@Component({
  selector: 'app-pet-appointment',
  templateUrl: './pet-appointment.component.html',
  styleUrls: ['./pet-appointment.component.css']
})
export class PetAppointmentComponent implements OnInit {
  dialogTitle = 'Appointment Information';
  tableCols = ['start_time', 'end_time', 'description', 'fee', 'is_paid'];
  tableData: any = [];
  patientId: string;
  isLoaded: boolean = false;

  constructor(private actRoute: ActivatedRoute, private apiServices: ApiServices) { 
    this.patientId = this.actRoute.snapshot.params.id;
    
    this.apiServices.getAllAppointment().subscribe( (response) => {
        this.tableData = response;
        
        const searchContent = [(this.patientId)]
        this.tableData = this.tableData.filter(function(itm){
          return searchContent.indexOf(itm.patient_id) > -1;
        })
        this.isLoaded = true;
      })
  }

  ngOnInit(): void {
  }
  
  addData(api, data, patientId){
    data.patient_id = patientId;
    console.log("Add", data)
    return api.addNewAppointment(data);
  }
  
  editData(api, data){
    console.log("Edit", data)
    return api.updateAppointment(data);
  }
  
  deleteData(api, data){
    console.log("Delete", data)
    return api.deleteAppointment(data);
  }
}
