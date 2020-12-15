import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'excel-to-json-angular';
  selectedFile: any;

  selectExcelFile(event) {
    this.selectedFile = event.target.files[0];
    console.log("event", this.selectedFile);
  };

  rowObject: any;
  fileInJson: any;

  excelToJsonConverter() {
    if (this.selectedFile) {
      let fileReader: FileReader = new FileReader();
      fileReader.readAsBinaryString(this.selectedFile);
      fileReader.onload = (event: Event) => {
        let data = fileReader.result;
        let workbook = (window as any).XLSX.read(data, { type: "binary" });
        workbook.SheetNames.forEach(sheet => {
          this.rowObject = (window as any).XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
          this.fileInJson = JSON.stringify(this.rowObject, undefined, 4);
          console.log("stringify", JSON.stringify(this.rowObject, undefined, 4))
        });
      }
    }
  }


}
