import {City} from "./city";

export interface TicketType {
  id: string;
  name: string;
  shortName: string;
  cities: City[];
  rate: number;
  lottoLength: number;
  lottoPair: number;
  mixParlay: boolean;
  missAll: boolean;
  lotteryOnly: boolean;
}
