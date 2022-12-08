import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RxjsBufferComponent } from './modules/rxjs/rxjs-buffer/rxjs-buffer.component';
import { RxjsConnectableComponent } from './modules/rxjs/rxjs-hot/rxjs-connectable.component';
import { RxjsRetryComponent } from './modules/rxjs/rxjs-retry/rxjs-retry.component';
import { RxjsShareComponent } from './modules/rxjs/rxjs-share/rxjs-share.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RxjsConnectableComponent,
    RxjsBufferComponent,
    RxjsShareComponent,
    RxjsRetryComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
