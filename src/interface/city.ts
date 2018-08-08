import {Region} from "./region";

export interface City {
  id: string;
  name: string,
  region: string | Region;
  liveOffset: number;
  liveToday: boolean;
  dayOfWeek: number[];
}
