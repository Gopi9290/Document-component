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
  isFileAdd: Boolean = false;
  isReportAdd: Boolean = false;
  certObj: any;
  reportObj: any;
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
    //const items = { ...localStorage };
    this.addDataFromLocalStorage();
    //console.log("Value " + items);
  }

  addDataFromLocalStorage() {
    let patient = "Patient-" + this.selectedPatient.id;
    // iterate localStorage
    for (let i = 0; i < localStorage.length; i++) {
      // set iteration key name
      let key = localStorage.key(i);
      if (key.search(patient) != -1) {
        if (key.search("Certficate") != -1) {
          this.selectedPatient.certficates_list.push(
            JSON.parse(localStorage.getItem(key))
          );
        } else if (key.search("Report") != -1) {
          this.selectedPatient.reports_list.push(
            JSON.parse(localStorage.getItem(key))
          );
        }
      }
    }
    console.log("Added " + this.selectedPatient);
  }

  goBack = function() {
    this.router.navigate(["/doc-cmp"]);
  };

  addFiles = function() {
    this.isFileAdd = true;
  };

  saveFile = function() {
    this.addSavedCertificate();
    this.isFileAdd = false;
  };

  addReport = function() {
    this.isReportAdd = true;
  };

  saveReport = function() {
    this.addSavedReport();
    this.isReportAdd = false;
  };

  fileChange(event) {
    let selectedFile: FileList = event.target.files;
    //Check File is not Empty
    if (selectedFile.length > 0) {
      // Select the very first file from list
      let fileToLoad = selectedFile[0];
      // FileReader function for read the file.
      let fileReader = new FileReader();
      let base64;
      let certNo = this.selectedPatient.certficates_list.length + 1;
      this.certObj = {
        id: certNo,
        name: selectedFile[0].name,
        size:
          (selectedFile[0].size / 1000 / 1000).toString().slice(0, 4) + "MB",
        type: "certificate",
        patient_id: this.selectedPatient.id,
        key: null
      };
      let keyName =
        "Patient-" + this.selectedPatient.id + ":" + "Certficate-" + certNo;
      if (localStorage.getItem(keyName)) {
        certNo = certNo + 1;
        this.certObj.id = certNo;
        keyName =
          "Patient-" + this.selectedPatient.id + ":" + "Certficate-" + certNo;
      }
      this.certObj.key = keyName;

      // Onload of file read the file content
      fileReader.onload = function(fileLoadedEvent) {
        base64 = fileLoadedEvent.target.result;
        // Print data in console
        //console.log("Base 64 " + base64);
      };
      // Convert data to base64
      fileReader.readAsDataURL(fileToLoad);
    }
  }

  deleteCertificate(certificate) {
    localStorage.removeItem(certificate.key);
    this.removeCertificate(certificate.name);
  }

  removeCertificate(name) {
    for (
      let index = 0;
      index < this.selectedPatient.certficates_list.length;
      index++
    ) {
      if (this.selectedPatient.certficates_list[index].name === name) {
        this.selectedPatient.certficates_list.splice(index, 1);
      }
    }
  }

  addSavedCertificate() {
    localStorage.setItem(this.certObj.keyName, JSON.stringify(this.certObj));
    this.selectedPatient.certficates_list.push(
      JSON.parse(localStorage.getItem(this.certObj.keyName))
    );
  }

  reportChange(event) {
    let selectedFile: FileList = event.target.files;
    //Check File is not Empty
    if (selectedFile.length > 0) {
      // Select the very first file from list
      let fileToLoad = selectedFile[0];
      // FileReader function for read the file.
      let fileReader = new FileReader();
      let base64;
      let certNo = this.selectedPatient.reports_list.length + 1;
      this.reportObj = {
        id: certNo,
        name: selectedFile[0].name,
        size:
          (selectedFile[0].size / 1000 / 1000).toString().slice(0, 4) + "MB",
        type: "report",
        patient_id: this.selectedPatient.id,
        key: null
      };
      let keyName =
        "Patient-" + this.selectedPatient.id + ":" + "Report-" + certNo;
      if (localStorage.getItem(keyName)) {
        certNo = certNo + 1;
        this.reportObj.id = certNo;
        keyName =
          "Patient-" + this.selectedPatient.id + ":" + "Report-" + certNo;
      }
      this.reportObj.key = keyName;

      // Onload of file read the file content
      fileReader.onload = function(fileLoadedEvent) {
        base64 = fileLoadedEvent.target.result;
        // Print data in console
        //console.log("Base 64 " + base64);
      };
      // Convert data to base64
      fileReader.readAsDataURL(fileToLoad);
    }
  }
  deleteReport(certificate) {
    localStorage.removeItem(certificate.key);
    this.removeReport(certificate.name);
  }
  removeReport(name) {
    for (
      let index = 0;
      index < this.selectedPatient.reports_list.length;
      index++
    ) {
      if (this.selectedPatient.reports_list[index].name === name) {
        this.selectedPatient.reports_list.splice(index, 1);
      }
    }
  }
  addSavedReport() {
    localStorage.setItem(
      this.reportObj.keyName,
      JSON.stringify(this.reportObj)
    );
    this.selectedPatient.reports_list.push(
      JSON.parse(localStorage.getItem(this.reportObj.keyName))
    );
  }

  // addToLocal() {
  //   for (
  //     let index = 0;
  //     index < this.selectedPatient.certficates_list.length;
  //     index++
  //   ) {
  //     let certNo = index;
  //     let keyName =
  //       "Patient-" + this.selectedPatient.id + ":" + "Certficate-" + certNo;
  //     localStorage.setItem(
  //       keyName,
  //       JSON.stringify(this.selectedPatient.certficates_list[index])
  //     );
  //   }
  //   for (
  //     let index = 0;
  //     index < this.selectedPatient.reports_list.length;
  //     index++
  //   ) {
  //     let certNo = index;
  //     let keyName =
  //       "Patient-" + this.selectedPatient.id + ":" + "Certficate-" + certNo;
  //     localStorage.setItem(
  //       keyName,
  //       JSON.stringify(this.selectedPatient.reports_list[index])
  //     );
  //   }
  // }
}
