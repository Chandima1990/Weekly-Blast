import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IHttpState } from 'app/interfaces/IHttpState';

@Injectable({
  providedIn: 'root'
})
export class HttpStateService {
  public state = new BehaviorSubject<IHttpState>({} as IHttpState);

  constructor() { }
}