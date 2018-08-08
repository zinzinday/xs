import {Region} from "./region";
import {City} from "./city";

export interface Award {
  region: string | Region;
  city: City;
  position: number;
  lotto: string;
  awardDate: Date;
  r2: string;
  r3: string;
  pe: number;
  pf: number;
}
