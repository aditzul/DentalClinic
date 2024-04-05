import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:5240/api';

  constructor(private httpClient: HttpClient) {}

  getApiUrl(): string {
    return this.apiUrl;
  }

  getPatients(): Observable<any[]> {
    const url = `${this.apiUrl}/Patients`;
    return this.httpClient.get<any[]>(url);
  }

  getMedics() {
    const url = `${this.apiUrl}/Medics`;
    return this.httpClient.get(url);
  }

  getAppointments() {
    const url = `${this.apiUrl}/Appointments`;
    return this.httpClient.get(url);
  }
  // Implement other HTTP methods as needed
}
