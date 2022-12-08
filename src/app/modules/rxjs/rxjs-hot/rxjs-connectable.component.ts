import { Component, OnInit } from '@angular/core';
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
import { RxjsConnectableService } from './rxjs-connectable.service';

@Component({
  selector: 'app-rxjs-hot',
  standalone: true,
  imports: [],
  template: '<h1>RxJs hot observable</h1>',
})
export class RxjsConnectableComponent implements OnInit {
  constructor(
    private rxJsHotService: RxjsConnectableService,
  ) {}

  ngOnInit(): void {
    this.initConnectable();
  }

  /**
   * Use connectable to create hot observable.
   * Allows subscribers to lazy join the party (like live-streaming).
   */
  private initConnectable(): void {
    const stream$: Connectable<number> = this.rxJsHotService.getHotObservable$();

    timer(1500).pipe(
      switchMap(() => stream$),
    ).subscribe({
      next: (v: number) => console.log('LAZY', v),
      complete: () => console.log('\n=== LAZY completed ==='),
    });

    timer(2500).pipe(
      switchMap(() => stream$),
    ).subscribe({
      next: (v: number) => console.log('SUPER LAZY', v),
      complete: () => console.log('\n=== SUPER LAZY completed ==='),
    });

    stream$.connect();
  }
}
