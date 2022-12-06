import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  buffer, debounceTime,
  fromEvent, map,
  Observable,
  Subscriber,
  timer,
} from 'rxjs';

@Component({
  selector: 'app-rxjs-buffer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rxjs-buffer.component.html',
  styleUrls: ['./rxjs-buffer.component.scss'],
})
export class RxjsBufferComponent implements OnInit {
  ngOnInit(): void {
    // this.initBuffer();
    this.initBufferKeyEvents();
  }

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
      next: v => console.log('SUB', v),
      complete: () => console.log('COMPLETE'),
    });
  }

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
      next: (v: string[]) => console.log('BUFFER KEYS', v),
    });
  }
}
