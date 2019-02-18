import { Injectable } from '@angular/core';
import { AngularFirestore, QueryFn } from '@angular/fire/firestore';
import { AuthService } from '@app/core/auth';
import { BookModel } from '@app/shared/models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BookService {
  private _userId: string;

  constructor(private auth: AuthService, private afs: AngularFirestore) {
    this._userId = auth.user.uid;
  }

  getUserBooks(): Observable<BookModel[]> {
    const queryFn: QueryFn = (ref) => ref.where('ownerId', '==', this._userId);
    return this.afs.collection<BookModel>('books', queryFn).valueChanges();
  }

  createBook(data: BookModel) {
    const id = this.afs.createId();
    this.afs.collection('books').doc(id).set(data);
  }

}
