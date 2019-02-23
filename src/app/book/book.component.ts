import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatCheckbox, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
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
  deleting = false;

  private _booksToDelete = new Map<string, BookModel>();

  @ViewChildren(MatCheckbox) $checkboxes: QueryList<MatCheckbox>;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private auth: AuthService,
    private notify: NotifyService,
    private upload: UploadService,
    private api: BookService
  ) { }

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

  handleItemTap(book: BookModel, checkbox: MatCheckbox) {
    if (this.deleting) {
      // Select the book to delete
      checkbox.checked = !checkbox.checked;
      if (checkbox.checked) {
        this._booksToDelete.set(book.id, book);
      } else {
        this._booksToDelete.delete(book.id);
      }
    } else {
      // Navigate to the book details page
      this.nativateToBook(book.id);
    }
  }

  private nativateToBook(bookId: string) {
    this.router.navigate([`/book/${bookId}`]);
  }

  startDeleting(book: BookModel, checkbox: MatCheckbox) {
    // Enable deleting only whether deleting not already enabled
    if (!this.deleting) {
      this.deleting = true;
      // Trigger the event manually for the first element that has been held
      this.handleItemTap(book, checkbox);
    }
  }

  deleteSelection() {
    console.log('deleteSelection');
    this._booksToDelete.forEach(b => this.api.deleteBook(b.id));
    this.resetDeletionState();
    this.notify.info('Books deleted !');
  }

  cancelDeletion() {
    this.$checkboxes.forEach(c => c.checked = false);
    this.resetDeletionState();
  }

  private resetDeletionState() {
    this.deleting = false;
    this._booksToDelete.clear();
  }
}

