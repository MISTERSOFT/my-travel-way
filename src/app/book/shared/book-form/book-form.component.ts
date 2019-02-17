import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BookModel } from '@app/shared/models';

@Component({
  selector: 'app-book-form',
  templateUrl: 'book-form.component.html',
  styleUrls: ['book-form.component.scss']
})

export class BookFormComponent implements OnInit {
  form: FormGroup;

  get isInvalid() {
    return this.form && this.form.invalid;
  }

  constructor(
    public dialogRef: MatDialogRef<BookFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BookModel,
  ) {
    this.form = new FormGroup({
      name: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'change'
      }),
      image: new FormControl(null)
    });
  }

  ngOnInit() { }

  onFileSelected(file: File) {
    this.form.controls['image'].setValue(file);
  }

  cancel() {
    this.dialogRef.close();
  }

  validate() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}
