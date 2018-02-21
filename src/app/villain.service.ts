import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Villain } from './models/villain';
import { VILLAINS } from './app-data/mock-villains';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class VillainService {
  // getVillains(): Villain[] {
  //   return VILLAINS;
  // }
  private villainsUrl: string = 'api/villains';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getVillains(): Observable<Villain[]> {
    this.messageService.add('VillainService: fetched villains');
    // return of(VILLAINS);
    return this.http.get<Villain[]>(this.villainsUrl)
    .pipe(
      tap(villains => this.log('fetched villains')),
      catchError(this.handleError('getVillains', []))
    );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // todo: send the error to remote logging infrastructure
      console.error(error);

      // todo: better job of transforming error or user consumption
      this.log(`Log: ${operation} failed: ${error.message}`);

      // let the app keep running by returning an empty result
      return of(result as T);
    }
  }
  getVillain(id: number): Observable<Villain> {
    const url = `${this.villainsUrl}/${id}`;
    return this.http.get<Villain>(url).pipe(
      tap(_ => this.log(`fetched villain id = ${id}`)),
      catchError(this.handleError<Villain>(`getVillain id = ${id}`))
    );
  }
  // getVillain(id: number): Observable<Villain> {
  //   this.messageService.add(`VillainService: fetched villain id = ${ id }`);
  //   return of(VILLAINS.find(villain => villain.id === id));
  // }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  updateVillain(villain: Villain): Observable<any> {
    
    return this.http.put(this.villainsUrl, villain, this.httpOptions).pipe(
      tap(_ => this.log(`updated villain id = ${villain.id}`)),
      catchError(this.handleError<any>('updateVillain'))
    );
  }

  addVillain(villain: Villain): Observable<Villain> {
    return this.http.post<Villain>(this.villainsUrl, villain, this.httpOptions).pipe(
      tap((villain: Villain) => this.log(`added villain w/ id = ${villain.id}`)),
      catchError(this.handleError<Villain>('addVillain'))
    );
  }

  deleteVillain(villain: Villain | number): Observable<Villain> {
    const id = typeof villain === 'number' ? villain : villain.id;
    const url = `${this.villainsUrl}/${id}`;

    return this.http.delete<Villain>(url, this.httpOptions).pipe(
      tap(_ => this.log(`delete villain id = ${id}`)),
      catchError(this.handleError<Villain>('deleteVillain'))
    );
  }

  searchVillains(term: string): Observable<Villain[]> {
    if (!term.trim()) { return of([]); }

    return this.http.get<Villain[]>(`api/villains/?name=${term}`).pipe(
      tap(_ => this.log(`found villains matching "${term}`)),
      catchError(this.handleError<Villain[]>('searchVillains', []))
    );
  }

  private log(message: string) {
    this.messageService.add('VillainService Log: ' + message);
  }
}
