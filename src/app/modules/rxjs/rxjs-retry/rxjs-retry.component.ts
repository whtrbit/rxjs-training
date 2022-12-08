import { Component, OnInit } from '@angular/core';
import { map, Observable, of, retry } from 'rxjs';
import { onErrorResumeNext } from 'rxjs/internal/operators/onErrorResumeNext';
@Component({
  selector: 'app-rxjs-retry',
  standalone: true,
  imports: [],
  template: `
    <h1>RxJs retry operator</h1>
  `,
})
export class RxjsRetryComponent implements OnInit {
  ngOnInit(): void {
    this.initRetry();
  }

  initRetry(): void {
    const stream$: Observable<number> = of(1, 2, 3).pipe(
      map((v: number) => {
        if (v > 2) {
          throw new Error('Value should never be greater than 2');
        }

        return v;
      }),
      retry({
        count: 1,
        delay: 1000,
        resetOnSuccess: false,
      }),
      // Fallback for error
      // onErrorResumeNext(of(9)),
    );

    stream$.subscribe({
      next: (v: number) => console.log('VALUE:', v),
      error: (e: Error) => console.log('ERROR:', e),
      complete: () => console.log('COMPLETE'),
    });
  }
}
