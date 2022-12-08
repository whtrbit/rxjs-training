import { Component, OnInit } from '@angular/core';
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
  imports: [],
  template: '<h1>RxJs share operator</h1>',
})
export class RxjsShareComponent implements OnInit {
  ngOnInit(): void {
    this.initShare();
  }

  private initShare(): void {
    const stream$: Observable<number> = interval(1000).pipe(
      tap(v => console.log('... Observable processing ONLY ONCE per two subscribers:', v)),
      take(2),
      share(),
    );

    const subA: Subscription = stream$.subscribe({
      next: (v: number) => console.log('AAA ', v),
      complete: () => console.log('\n=== AAA completed ==='),
    });

    const subB: Subscription = stream$.subscribe({
      next: (v: number) => console.log('BBB ', v),
      complete: () => console.log('\n=== BBB completed ==='),
    });

    timer(1500).subscribe({
      next: () => {
        // subA.unsubscribe();
        // Note that ONLY subscriber `A` completes.
        // In opposite to subscriber `B` it allows the stream to continue
        // until reaching complete() after 2 seconds.

        subB.unsubscribe();
      },
    });
  }
}
