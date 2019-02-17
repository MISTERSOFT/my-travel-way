export interface BookModel {
  id?: string;
  name: string;
  ownerId: string;
  image?: File;
  imageUrl?: string;
}
