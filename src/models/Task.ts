import { user } from "./User";

export interface task {
  id: string;
  title: string;
  description: string;
  state: string;
  priority: string;
  expiringDate: string;
  ownerId: string;
  createdAt: Date;
  asignedId?: string;
  asigned?: user;
  owner?: user;
  teamId?: string;
}
