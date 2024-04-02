import { user } from "./User";

export interface task {
  id?: string;
  titulo: string;
  descripcion: string;
  estado: string;
  prioridad: string;
  fechaVencimiento: Date;
  ownerId?: string;
  createdAt: Date;
  asignadoId?: string;
  asignado: user;
  owner: user;
}
