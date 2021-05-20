import { IRegionMySuffix } from 'app/entities/region-my-suffix/region-my-suffix.model';

export interface ICountryMySuffix {
  id?: string;
  countryName?: string | null;
  region?: IRegionMySuffix | null;
}

export class CountryMySuffix implements ICountryMySuffix {
  constructor(public id?: string, public countryName?: string | null, public region?: IRegionMySuffix | null) {}
}

export function getCountryMySuffixIdentifier(country: ICountryMySuffix): string | undefined {
  return country.id;
}
