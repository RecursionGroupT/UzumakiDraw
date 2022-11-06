import { Timestamp } from "firebase/firestore";

export interface UserDoc {
  name: string | null;
  createdAt: Timestamp;
  dataURL: string | null;
  hashtags: string[];
}
