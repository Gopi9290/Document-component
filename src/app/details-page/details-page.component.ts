import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import patients from "../files/patient_details.json";

@Component({
  selector: "app-details-page",
  templateUrl: "./details-page.component.html",
  styleUrls: ["./details-page.component.scss"]
})
export class DetailsPageComponent implements OnInit {
  index: any;
  selectedPatient: any;
  data: any;
  public patientList: {
    patient_name: string;
    claim_number: string;
    date_submitted: string;
    document_status: string;
    certficates_list: any;
  }[] = patients;
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.index = JSON.parse(this.route.snapshot.paramMap.get("id"));
    this.selectedPatient = this.patientList[this.index - 1];
    console.log("Value " + this.selectedPatient);
    // this.sub = this.route.queryParams.subscribe(params => {
    //   // Defaults to 0 if no query param provided.
    //   this.data = params.certficates_list;
    //   console.log("params " + JSON.stringify(this.data));
    // });
  }

  goBack = function() {
    this.router.navigate(["/doc-cmp"]);
    //this.router.navigate(["/details-cmp"]);
  };
}
