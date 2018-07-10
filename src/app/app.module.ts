import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { KnowledgeBeforeAfterService } from './knowledge_before_after.service';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [KnowledgeBeforeAfterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
