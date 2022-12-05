import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Connectable, connectable, interval, map, Observable, share, switchMap, take, tap, timer } from 'rxjs';

@Component({
  selector: 'app-hot-cold',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hot.component.html',
  styleUrls: ['./hot.component.css']
})
export class HotComponent implements OnInit {
  ngOnInit(): void {
    this.initHot();
    // this.initShare();
  }
  private initHot(): void {
    const stream$: Connectable<number> = connectable(
      interval(1000).pipe(
        tap(v => console.log('... Observable processing', v)),
        take(3),
        map(v => v + 1),
      )
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
    )

    const subA = stream$.subscribe({
      next: x => console.log('AAA ', x),
      complete: () => console.log('\n=== AAA completed ==='),
    });

    const subB = stream$.subscribe({
      next: x => console.log('BBB ', x),
      complete: () => console.log('\n=== BBB completed ==='),
    });

    timer(1500).subscribe({
      next: () => {
        subA.unsubscribe();
        // subB.unsubscribe();
      },
    })
  }
}
