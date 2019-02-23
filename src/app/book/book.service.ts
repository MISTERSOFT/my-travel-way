import { Injectable } from '@angular/core';
import { AngularFirestore, QueryFn } from '@angular/fire/firestore';
import { AuthService } from '@app/core/auth';
import { BookModel } from '@app/shared/models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class BookService {
  private _userId: string;

  constructor(private auth: AuthService, private afs: AngularFirestore) {
    this._userId = auth.user.uid;
  }

  getUserBooks(): Observable<BookModel[]> {
    const queryFn: QueryFn = (ref) => ref.where('ownerId', '==', this._userId);
    return this.afs.collection<BookModel>('books', queryFn).snapshotChanges()
      .pipe(
        map(actions => actions.map(action => {
          const data = action.payload.doc.data();
          const id = action.payload.doc.id;
          return <BookModel>{ id, ...data };
        }))
      );
  }

  createBook(data: BookModel) {
    const id = this.afs.createId();
    this.afs.collection('books').doc(id).set(data);
  }

  deleteBook(id: string) {
    // TODO: When express api set up with firebase admin sdk => delete the image stored
    this.afs.collection('books').doc(id).delete();
  }
}
