import { Injectable } from '@angular/core'
import { Pet } from './pets'
// import { PETS } from './mock-pets'
import { Observable, ObservedValuesFromArray, of } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators'
import { MessageService } from './message.service'
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable( {
  providedIn: 'root'
} )
export class PetService {
  private petsUrl = 'api/pets' // URL to web api

  httpOptions = {
    headers: new HttpHeaders( { 'Content-Type': 'application/json' } )
  }

  constructor(
    private messageService: MessageService,
    private http: HttpClient,
  ) { }

  // GET pets from the server
  getPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.petsUrl)
      .pipe(
        tap(_ => this.log('fetched pets')),
        catchError(this.handleError<Pet[]>('getPets', []))
      )
  }

  // GET pet by id. Return 'undefined' when id not found
  getPetNo404<Data>(id: number): Observable<Pet> {
    const url = `${this.petsUrl}/?id=${id}`
    return this.http.get<Pet[]>(url)
      .pipe(
        map(pets => pets[0]), // returns a { 0 | 1 } element array
        tap(h => {
          const outcome = h ? 'fetched' : 'did not find'
          this.log(`${outcome} pet id=${id}`)
        }),
        catchError(this.handleError<Pet>(`getPet id=${id}`))
      )
  }

  // GET pet by id. Will 404 if id not found
  getPet(id: number): Observable<Pet> {
    const url = `${this.petsUrl}/${id}`
    return this.http.get<Pet>(url)
      .pipe(
        tap(_ => this.log(`fetched pet id=${id}`)),
        catchError(this.handleError<Pet>(`getPet id=${id}`))
      )
  }

  // GET pets whose name contains search term
  searchPets(term: string): Observable<Pet[]> {
    if (!term.trim()) {
      // If not search term, return empty pet array
      return of([])
    }
    return this.http.get<Pet[]>(`${this.petsUrl}/?name=${term}`)
      .pipe(
        tap(x => x.length ?
          this.log(`found pets matching "${term}"`) :
          this.log(`no pets matching "${term}"`)),
        catchError(this.handleError<Pet[]>('searchPets', []))
      )
  }

  ///// Save Methods /////

  // POST: add a new pet to the server
  addPet(pet: Pet):Observable<Pet> {
    return this.http.post<Pet>(this.petsUrl, pet, this.httpOptions)
      .pipe(
        tap((newPet: Pet) => this.log(`added pet w/ id=${newPet.id}`)),
        catchError(this.handleError<Pet>('addPet'))
      )
  }

  // DELETE: delete the pet from the server
  deletePet(id: number): Observable<Pet> {
    const url = `${this.petsUrl}/${id}`

    return this.http.delete<Pet>(url, this.httpOptions)
      .pipe(
        tap(_ => this.log(`deleted pet id=${id}`)),
        catchError(this.handleError<Pet>('deletePet'))
      )
  }

  // PUT: Update the pet on the server
  updatePet(pet: Pet): Observable<any> {
    return this.http.put(this.petsUrl, pet, this.httpOptions)
      .pipe(
        tap(_ => this.log(`updated pet id=${pet.id}`)),
        catchError(this.handleError<Pet>('updatePet'))
      )
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * 
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote loggin infrastructure
      console.error(error) // log to console instead

      // TODO: Better job of transforming error for user consumption
      this.log(`${operation} filed: ${error.message}`)

      // Let the app keep running by returning an empty result
      return of(result as T)
    }
  }

  // Log a PetService message with the MessageService
  private log(message: string) {
    this.messageService.add(`PetService: ${message}`)
  }
}
