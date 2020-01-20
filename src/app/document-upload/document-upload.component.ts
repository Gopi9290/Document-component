import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MatTabsModule } from "@angular/material/tabs";
import patients from "../files/patient_details.json";

@Component({
  selector: "app-document-upload",
  templateUrl: "./document-upload.component.html",
  styleUrls: ["./document-upload.component.scss"]
})
export class DocumentUploadComponent implements OnInit {
  title = "json-file-read-angular";
  public countryList: {
    patient_name: string;
    claim_number: string;
    date_submitted: string;
    document_status: string;
  }[] = patients;
  constructor(private router: Router) {}

  ngOnInit() {}

  goToDoc = function() {
    this.router.navigateByUrl("/details-cmp");
  };
}
