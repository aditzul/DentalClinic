/* import { api } from '../environments/api';
import { Patient } from '../_models/Patient';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PatientService {
  constructor(private http: HttpClient) {}

  getAllPatients(): Observable<Patient[]> {
    return this.http.get<any>(`${api.apiUrl}/Patients`);
  }

  getPatient(Patient: Patient): Observable<Patient> {
    return this.http.get<any>(`${api.apiUrl}/Patient/${Patient.id}`);
  }

  addPatient(Patient: Patient): Observable<any> {
    const PatientDTO: Patient = Object.assign(Patient, {
      createD_AT: new Date().toISOString(),
    });
    return this.http.post<any>(`${api.apiUrl}/Patients`, {
      ...PatientDTO,
    });
  }

  updatePatient(Patient: Patient): Observable<any> {
    return this.http.put<any>(`${api.apiUrl}/Patient/${Patient.id}`, {
      ...Patient,
    });
  }

  deletePatient(Patient: Patient): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');

    return this.http.delete(`${api.apiUrl}/Patients/${Patient.id}`, { headers, responseType: 'text' as const });
  }
}
 */