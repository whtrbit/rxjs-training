import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  buffer,
  debounceTime,
  fromEvent,
  map,
  Observable,
  Subscriber,
  timer,
} from 'rxjs';

@Component({
  selector: 'app-rxjs-buffer',
  standalone: true,
  imports: [CommonModule],
  template: '<h1>RxJs buffer operator</h1>\n',
})
export class RxjsBufferComponent implements OnInit {
  ngOnInit(): void {
    // this.initBuffer();
    this.initBufferKeyEvents();
  }

  /**
   * Allows subscribers to lazy join the party keeping the history of values as an array.
   */
  private initBuffer(): void {
    const trigger$: Observable<number> = timer(2500);
    const stream$: Observable<number[]> = new Observable((subscriber: Subscriber<number>) => {
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
      subscriber.complete();
    }).pipe(
      buffer(trigger$),
    );

    stream$.subscribe({
      next: (v: number[]) => console.log('SUB', v),
      complete: () => console.log('COMPLETE'),
    });
  }

  /**
   * To test it just focus on the `document` and start typing.
   */
  private initBufferKeyEvents(): void {
    const input$: Observable<string> = fromEvent<KeyboardEvent>(document, 'keyup').pipe(
      map(e => e.key),
    );
    const buffer$: Observable<string> = input$.pipe(
      debounceTime(2500),
    );
    const stream$: Observable<string[]> = input$.pipe(
      buffer(buffer$),
    );

    stream$.subscribe({
      next: (v: string[]) => console.log('BUFFERED KEYS', v),
    });
  }
}
