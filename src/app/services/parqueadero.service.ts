import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Parqueadero } from './models/parqueadero.model'; // Modelo creado

@Injectable({
  providedIn: 'root'
})
export class ParqueaderoService {
  private apiUrl = 'http://localhost:3000/parqueadero'; // Cambia al URL de tu backend

  constructor(private http: HttpClient) {}

  // Obtener lista de parqueaderos
  getParqueaderos(): Observable<Parqueadero[]> {
    return this.http.get<Parqueadero[]>(this.apiUrl);
  }

  // Crear un parqueadero
  createParqueadero(parqueadero: Parqueadero): Observable<Parqueadero> {
    return this.http.post<Parqueadero>(this.apiUrl, parqueadero);
  }

  // Actualizar un parqueadero
  updateParqueadero(id: string, parqueadero: Parqueadero): Observable<Parqueadero> {
    return this.http.put<Parqueadero>(`${this.apiUrl}/${id}`, parqueadero);
  }

  // Eliminar un parqueadero
  deleteParqueadero(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
