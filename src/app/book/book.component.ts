import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AuthService } from '@app/core/auth';
import { UploadService } from '@app/core/common';
import { BookModel } from '@app/shared/models';
import { BookService } from './book.service';
import { BookFormComponent } from './shared';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  searchValue: string;
  books: BookModel[];

  constructor(
    private dialog: MatDialog,
    private auth: AuthService,
    private upload: UploadService,
    public api: BookService) { }

  ngOnInit() {
    this.api.getBooks().then(books => {
      console.log('books', books);
      this.books = books;
    });
  }

  openFormPopup(isEditing = false) {
    const data = isEditing ? { name: '' } : { name: '' };
    const dialogRef = this.dialog.open(BookFormComponent, { data });
    dialogRef.afterClosed().subscribe(async (result: BookModel) => {
      if (result) {
        console.log('result', result);
        let toCreate: BookModel = { ownerId: this.auth.user.uid, name: result.name };
        if (result.image) {
          const imageUrl = await this.upload.uploadImage(result.image);
          toCreate = { ...toCreate, imageUrl };
        }
        this.api.createBook(toCreate);
      }
    });
  }
}

