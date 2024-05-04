import { Team } from "./teams";
import { user } from "./User";

export interface TeamInfo extends Team {
  members: user[];
  owner: user;
}
