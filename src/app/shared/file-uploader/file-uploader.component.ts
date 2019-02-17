import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-file-uploader',
  templateUrl: 'file-uploader.component.html',
  styleUrls: ['file-uploader.component.scss']
})

export class FileUploaderComponent implements OnInit {
  @Output() onFileSelected = new EventEmitter<File>();
  @ViewChild('fileInput') $fileInput: ElementRef<HTMLInputElement>;
  fileName: string;
  constructor() { }

  ngOnInit() { }

  open() {
    this.$fileInput.nativeElement.click();
  }

  onFileInputChanged(e) {
    const file: File = e.target.files[0];
    if (file) {
      this.fileName = file.name;
      this.onFileSelected.next(file);
    }
  }
}
