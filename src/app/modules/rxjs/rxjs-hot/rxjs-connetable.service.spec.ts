import { TestBed } from '@angular/core/testing';
import { map } from 'rxjs';
import { RunHelpers, TestScheduler } from 'rxjs/internal/testing/TestScheduler';
import { RxjsConnectableService } from './rxjs-connectable.service';

describe('RxJsConnectableService', () => {
  let sut: RxjsConnectableService;
  let scheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RxjsConnectableService,
      ],
    });

    sut = TestBed.inject(RxjsConnectableService);
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected)
    });
  });

  it('should test the mapping example', () => {
    scheduler.run((helpers: RunHelpers) => {
      const sourceValues = { a: 1, b: 2, c: 3 };
      const source$ = helpers.cold('a-b-c|', sourceValues);

      const expectedValues = { x: 10, y: 20, z: 30 };
      const expected$ = helpers.cold('x-y-z|', expectedValues);

      const result$ = source$.pipe(
        map(v => v * 10),
      );
      helpers.expectObservable(result$).toEqual(expected$);
    });
  });
});
