import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { DocumentUploadComponent } from "./document-upload/document-upload.component";
import { DetailsPageComponent } from "./details-page/details-page.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatTabsModule, MatCardModule } from "@angular/material";

@NgModule({
  declarations: [AppComponent, DocumentUploadComponent, DetailsPageComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: "doc-cmp",
        component: DocumentUploadComponent
      }
    ]),
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
