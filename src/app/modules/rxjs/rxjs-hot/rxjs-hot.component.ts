import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Connectable,
  connectable,
  interval,
  map,
  switchMap,
  take,
  tap,
  timer,
} from 'rxjs';

@Component({
  selector: 'app-rxjs-hot',
  standalone: true,
  imports: [CommonModule],
  template: '<h1>RxJs hot observable</h1>',
})
export class RxjsHotComponent implements OnInit {
  ngOnInit(): void {
    this.initConnectable();
  }

  /**
   * Use connectable to create hot observable.
   * Allows subscribers to lazy join the party (like live-streaming).
   */
  private initConnectable(): void {
    const stream$: Connectable<number> = connectable(
      interval(1000).pipe(
        tap(v => console.log('... Observable processing', v)),
        take(3),
        map(v => v + 1),
      ),
    );

    timer(1500).pipe(
      switchMap(() => stream$)
    ).subscribe({
      next: v => console.log('LAZY', v),
      complete: () => console.log('\n=== LAZY completed ==='),
    });

    timer(2500).pipe(
      switchMap(() => stream$)
    ).subscribe({
      next: v => console.log('SUPER LAZY', v),
      complete: () => console.log('\n=== SUPER LAZY completed ==='),
    });

    stream$.connect();
  }
}
