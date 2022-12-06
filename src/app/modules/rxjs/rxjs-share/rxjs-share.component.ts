import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  interval,
  Observable,
  share,
  Subscription,
  take,
  tap,
  timer,
} from 'rxjs';

@Component({
  selector: 'app-rxjs-share',
  standalone: true,
  imports: [CommonModule],
  template: '<h1>RxJs share operator</h1>',
})
export class RxjsShareComponent implements OnInit {
  ngOnInit(): void {
    this.initShare();
  }

  private initShare(): void {
    const stream$: Observable<number> = interval(1000).pipe(
      tap(v => console.log('... Observable processing', v)),
      take(2),
      share(),
    );

    const subA: Subscription = stream$.subscribe({
      next: x => console.log('AAA ', x),
      complete: () => console.log('\n=== AAA completed ==='),
    });

    const subB: Subscription = stream$.subscribe({
      next: x => console.log('BBB ', x),
      complete: () => console.log('\n=== BBB completed ==='),
    });

    timer(1500).subscribe({
      next: () => {
        subA.unsubscribe();
        subB.unsubscribe();
      },
    });
  }
}