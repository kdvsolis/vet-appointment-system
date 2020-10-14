
import { Injectable, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { share } from 'rxjs/operators' 

@Injectable({
    providedIn: 'root'
})
export class ApiServices {
    constructor(private http: HttpClient) { }
    
    getAllInfo(){
        return this.http.get<any>("/api/pet-information/all").pipe(map(res => {
            return res;
        }))
    }

    getAllAppointment(){
        return this.http.get<any>("/api/pet-appointment/all").pipe(map(res => {
            return res;
        }))
    }

    addNewInfo(data){
        return this.http.post<any>("/api/pet-information/new", data).pipe(share());
    }

    addNewAppointment(data){
        return this.http.post<any>("/api/pet-appointment/new", data).pipe(share());
    }

    updateInfo(data){
        return this.http.put<any>("/api/pet-information/edit/" + data._id, data).pipe(map(res => {
            return res;
        }));
    }

    updateAppointment(data){
        return this.http.put<any>("/api/pet-appointment/edit/" + data._id, data).pipe(map(res => {
            return res;
        }));
    }

    deleteInfo(data){
        return this.http.delete<any>("/api/pet-information/delete/" + data._id).pipe(map(res => {
            return res;
        }));
    }

    deleteAppointment(data){
        return this.http.delete<any>("/api/pet-appointment/delete/" + data._id).pipe(map(res => {
            return res;
        }));
    }


}  