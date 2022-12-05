import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HotComponent } from './modules/rxjs/hot/hot.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HotComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
