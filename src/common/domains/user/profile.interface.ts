import { DreamerProfileProperties, MakerProfileProperties } from 'src/common/types/user/profile.types';

export interface IDreamerProfile {
        update(data: Partial<DreamerProfileProperties>): DreamerProfileProperties;
  get(): DreamerProfileProperties;
}

export interface IMakerProfile {
  update(data: Partial<MakerProfileProperties>): MakerProfileProperties;
  get(): MakerProfileProperties;
}
