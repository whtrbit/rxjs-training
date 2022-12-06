import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Connectable,
  connectable,
  interval,
  map,
  Observable,
  share,
  Subscription,
  switchMap,
  take,
  tap,
  timer,
} from 'rxjs';

@Component({
  selector: 'app-rxjs-hot',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rxjs-hot.component.html',
  styleUrls: ['./rxjs-hot.component.css']
})
export class RxjsHotComponent implements OnInit {
  ngOnInit(): void {
    // this.initConnectable();
    // this.initShare();
  }
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
