import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  private image;

  constructor() { }

  read_file($event) {
    const file: File =  $event.target.files[0];

    const image_reader: FileReader = new FileReader();
    image_reader.onloadend = (e) => {
      this.image = image_reader.result;
    };
    image_reader.readAsDataURL(file);

    return this.image;
  }
}
