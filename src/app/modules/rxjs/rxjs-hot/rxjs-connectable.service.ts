import { Injectable } from '@angular/core';
import {
  connectable,
  Connectable, delay,
  interval,
  map,
  Observable,
  of,
  take,
  tap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RxjsConnectableService {
  getHotObservable$(): Connectable<number> {
    return connectable(
      interval(1000).pipe(
        tap((v: number) => console.log('... Observable processing', v)),
        take(3),
        map((v: number) => v + 1),
      ),
    );
  }

  getSimpleInterval$(): Observable<number> {
    return of(0).pipe(
      delay(400),
    );
  }
}
