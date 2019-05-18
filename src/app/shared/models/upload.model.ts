export class Upload {
  $key: string;
  file:File;
  name:string;
  url:string;
  createdAt: Date = new Date();

  constructor(file:File) {
    this.file = file;
    this.name = file.name;
  }
}