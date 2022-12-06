import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RxjsBufferComponent } from './modules/rxjs/rxjs-buffer/rxjs-buffer.component';
import { RxjsHotComponent } from './modules/rxjs/rxjs-hot/rxjs-hot.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RxjsHotComponent,
    RxjsBufferComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
