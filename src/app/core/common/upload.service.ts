import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { last, switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UploadService {
  private baseImageUrl = '/images';

  constructor(private afs: AngularFirestore, private afStorage: AngularFireStorage) { }

  uploadImage(file: File) {
    // TODO: When express api set up with firebase admin sdk => rename image with UID, resize image
    const filePath = `${this.baseImageUrl}/${file.name}`;
    // const fileRef = this.afStorage.ref(filePath);
    const task = this.afStorage.upload(filePath, file);

    return task.snapshotChanges()
      .pipe(
        // Emit the last url retrieved
        last(),
        // Retrieve the download url
        switchMap(() => this.afStorage.ref(filePath).getDownloadURL()),
      );
  }
}
