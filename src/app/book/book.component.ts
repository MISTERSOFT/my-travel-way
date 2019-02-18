import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AuthService } from '@app/core/auth';
import { NotifyService, UploadService } from '@app/core/common';
import { BookModel } from '@app/shared/models';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BookService } from './book.service';
import { BookFormComponent } from './shared';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  searchValue: string;
  books$: Observable<BookModel[]>;

  constructor(
    private dialog: MatDialog,
    private auth: AuthService,
    private notify: NotifyService,
    private upload: UploadService,
    private api: BookService) { }

  ngOnInit() {
    this.books$ = this.api.getUserBooks();
  }

  openFormPopup(isEditing = false) {
    const data = isEditing ? { name: '' } : { name: '' };
    const dialogRef = this.dialog.open(BookFormComponent, { data });
    dialogRef.afterClosed().subscribe(async (result: BookModel) => {
      if (result) {
        let toCreate: BookModel = { ownerId: this.auth.user.uid, name: result.name, placesCount: 0 };
        if (result.image) {
          this.upload.uploadImage(result.image)
            .pipe(tap((imageUrl) => {
              toCreate = { ...toCreate, imageUrl };
              this.api.createBook(toCreate);
            }))
            .subscribe();
        }
      }
    });
  }
}

