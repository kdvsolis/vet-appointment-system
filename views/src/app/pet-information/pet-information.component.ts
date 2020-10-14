import { Component, OnInit } from '@angular/core';
import { ApiServices } from '../../services/api.services'

@Component({
  selector: 'app-pet-information',
  templateUrl: './pet-information.component.html',
  styleUrls: ['./pet-information.component.css']
})
export class PetInformationComponent implements OnInit {
  dialogTitle = 'Pet Information';
  subInfo = "/pet-appointment/";
  tableCols = ['pet_name', 'pet_type', 'owner_name', 'owner_phone_number'];
  tableData: any = [];
  isLoaded: boolean = false;

  constructor(private apiServices: ApiServices) { 
      this.apiServices.getAllInfo().subscribe( (response) => {
        this.tableData = response;
        this.isLoaded = true;
      })
  }

  ngOnInit(): void {
  }
  
  addData(api, data){
    console.log("Add", data)
    return api.addNewInfo(data);
  }
  
  editData(api, data){
    console.log("Edit", data)
    return api.updateInfo(data);
  }
  
  deleteData(api, data){
    console.log("Delete", data)
    return api.deleteInfo(data);
  }
}
