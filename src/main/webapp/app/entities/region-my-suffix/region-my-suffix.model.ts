export interface IRegionMySuffix {
  id?: string;
  regionName?: string | null;
}

export class RegionMySuffix implements IRegionMySuffix {
  constructor(public id?: string, public regionName?: string | null) {}
}

export function getRegionMySuffixIdentifier(region: IRegionMySuffix): string | undefined {
  return region.id;
}
