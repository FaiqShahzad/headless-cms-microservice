import { Observable } from 'rxjs';

export type HeroById = {
  id: number;
};

export type Hero = {
  id: number;
  firstName: string;
  lastName: string;
  isActive: boolean;
};

export interface HeroesService {
  findOne(data: HeroById): Observable<Hero>;
}
