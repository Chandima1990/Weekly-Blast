import { Component, NgZone, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { read } from 'fs';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {

  constructor(private matSnackBar: MatSnackBar, private zone: NgZone) { }
  json: any;

  ngOnInit() {
  }

  UploadGame(evt) {
    var files = evt.target.files; // FileList object

    // files is a FileList of File objects. List some properties.
    var output = [];
    let message = "";
    for (var i = 0, f; f = files[i]; i++) {
      var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (function (theFile) {

        return function (e) {
          try {
            this.json = JSON.parse(e.target.result);
            localStorage.setItem("gameList", JSON.stringify(this.json))
            message = "File uploaded successfully";
            console.log(this.json)

          } catch (ex) {
            message = "error while trying to parse json = " + ex;
          }
        }
      })(f);
      reader.readAsText(f);

      reader.onloadend = () => {
        this.zone.run(() => {
          this.matSnackBar.open(message + "!", "Close", {
            duration: 8000,
          });
        })
      }

    }
  }
  UploadTeam(evt) {
    var files = evt.target.files; // FileList object

    // files is a FileList of File objects. List some properties.
    var output = [];
    let message = "";
    for (var i = 0, f; f = files[i]; i++) {
      var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (function (theFile) {

        return function (e) {
          try {
            
            localStorage.setItem("teamData", e.target.result)
            message = "File uploaded successfully";
            console.log(this.json)

          } catch (ex) {
            message = "error while trying to parse json = " + ex;
          }
        }
      })(f);
      reader.readAsText(f);

      reader.onloadend = () => {
        this.zone.run(() => {
          this.matSnackBar.open(message + "!", "Close", {
            duration: 8000,
          });
        })
      }

    }
  }
}
