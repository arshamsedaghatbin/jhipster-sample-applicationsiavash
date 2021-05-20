import { ICountryMySuffix } from 'app/entities/country-my-suffix/country-my-suffix.model';

export interface ILocationMySuffix {
  id?: string;
  streetAddress?: string | null;
  postalCode?: string | null;
  city?: string | null;
  stateProvince?: string | null;
  country?: ICountryMySuffix | null;
}

export class LocationMySuffix implements ILocationMySuffix {
  constructor(
    public id?: string,
    public streetAddress?: string | null,
    public postalCode?: string | null,
    public city?: string | null,
    public stateProvince?: string | null,
    public country?: ICountryMySuffix | null
  ) {}
}

export function getLocationMySuffixIdentifier(location: ILocationMySuffix): string | undefined {
  return location.id;
}
