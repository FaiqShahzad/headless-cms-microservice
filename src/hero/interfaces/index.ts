import { Observable } from 'rxjs';

export type HeroById = {
  id: number;
};

export type Hero = {
  id: number;
  name: string;
};

export interface HeroesService {
  findOne(data: HeroById): Observable<Hero>;
}
