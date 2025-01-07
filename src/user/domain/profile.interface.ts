import { DreamerProfileProperties, MakerProfileProperties } from '../type/profile.types';

export interface IDreamerProfile {
  update(data: Partial<DreamerProfileProperties>): void;
  get(): DreamerProfileProperties;
}

export interface IMakerProfile {
  update(data: Partial<MakerProfileProperties>): void;
  get(): MakerProfileProperties;
}
