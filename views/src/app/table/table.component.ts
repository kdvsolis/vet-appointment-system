import { Component, OnInit, ViewChild, Input, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiServices } from '../../services/api.services'
import { Observable } from 'rxjs';

export interface DialogData {
  title: string,
  information: Object;
}
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.template.html',
  styleUrls: []
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public title: string,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  trackByFn(index: any, item: any) {
    return index;
  }
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  tableDataSrc: any;
  information: any;
  
  @Input('tableColumns') tableCols: string[];
  @Input() tableData: any = [];
  @Input() dialogTitle: string = "";
  @Input() subInfo: string = "";
  @Input() patientId: string = ''
  @Input() addData: (args1: any, args2: any, args3: any) => Observable<any>;
  @Input() editData: (args1: any, args2: any) =>  Observable<any>;
  @Input() removeData: (args1: any, args2: any) =>  Observable<any>;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  
  constructor(public dialog: MatDialog,
  private apiServices: ApiServices) {}

  ngOnInit() {
    this.information = {};
    for (let col of this.tableCols) {
      this.information[col] = "";
    }
    this.tableCols.push('modify');
    this.tableDataSrc = new MatTableDataSource(this.tableData);
    this.tableDataSrc.sort = this.sort;
    this.tableDataSrc.paginator = this.paginator;
  }

  onSearchInput(ev) {
    const searchTarget = ev.target.value;
    this.tableDataSrc.filter = searchTarget.trim().toLowerCase();
  }

  async addDataDialog() {
    for (let col of this.tableCols) {
      this.information[col] = "";
    }
    let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: { title: this.dialogTitle, information: this.information, subInfo: this.subInfo, opType: "add"}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Add dialog was closed');
      this.information = {};
      if(result){
        this.addData(this.apiServices, result, this.patientId).subscribe((response) => {
            result._id = response.insertedId;
            this.tableData.push(result);
            this.tableDataSrc = new MatTableDataSource(this.tableData);
            this.tableDataSrc.sort = this.sort;
            this.tableDataSrc.paginator = this.paginator;
        });
      }
    });
  }

  
  editDataDialog(id): void {
    let index = this.tableData.findIndex(r => r._id == id);
    this.tableData[index];
    
    for (let col of this.tableCols) {
      this.information[col] = this.tableData[index][col];
    }
    let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: { title: this.dialogTitle, information: this.information, opType: "edit"}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Edit dialog was closed');
      if(result && index > -1){
        result._id = id;
        this.editData(this.apiServices, result).subscribe((response) => {

          if(response){ 
            this.tableData[index] = result;
            this.tableDataSrc = new MatTableDataSource(this.tableData);
            this.tableDataSrc.sort = this.sort;
            this.tableDataSrc.paginator = this.paginator;
          }
        });
      }
    });
  }
  
  deleteData(id): void {
    let index = this.tableData.findIndex(r => r._id == id);
    this.information = this.tableData[index];
    if(this.information){
      this.removeData(this.apiServices, this.information).subscribe((response) => {
        if(response){
          this.tableData.splice(index, 1);
          this.tableDataSrc = new MatTableDataSource(this.tableData);
          this.tableDataSrc.sort = this.sort;
          this.tableDataSrc.paginator = this.paginator;
        }
      });
    }
  }
}

