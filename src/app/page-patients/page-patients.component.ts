import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-page-patients',
  templateUrl: './page-patients.component.html',
  styleUrls: ['./page-patients.component.scss']
})
export class PagePatientsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['lastName', 'firstName', 'dateOfBirth', 'insured', 'address', 'phoneNumber', 'email', 'registrationDate'];
  dataSource = new MatTableDataSource<Patient>();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.fetchPatients();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  fetchPatients() {
    this.apiService.getPatients().subscribe((data: any) => {
      this.dataSource.data = data;
    });
  }
}

export interface Patient {
  lastName: string;
  firstName: string;
  dateOfBirth: string;
  insured: boolean;
  address: string;
  phoneNumber: string;
  email: string;
  registrationDate: string;
}
