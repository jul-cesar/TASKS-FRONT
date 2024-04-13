import { user } from "./User";

export interface userInfo extends user {
  nroComentarios: number;
  nroTareasAsignadas: number;
  nroTareasCreadas: number;
}
