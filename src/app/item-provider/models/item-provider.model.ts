import { Upload } from "src/app/shared/models/upload.model";

export interface ItemProvider {
  id: string;
  name: string;
  address: string;
  phone: string;
  archivo: Upload;
  isGold: boolean;
}