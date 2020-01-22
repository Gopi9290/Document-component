import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DocumentUploadComponent } from "./document-upload/document-upload.component";
import { DetailsPageComponent } from "./details-page/details-page.component";

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: "",
        component: DocumentUploadComponent
      },
      {
        path: "details-cmp",
        component: DetailsPageComponent
      }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
