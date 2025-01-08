import { TripType, User } from '@prisma/client';
import { ServiceArea } from 'src/common/types/serviceArea.type';

export default interface CreatePlanData {
  startDate: Date;
  endDate: Date;
  tripType: TripType;
  serviceArea: ServiceArea;
  details: string;
  address?: string | null;
  assigneeIds: string[];
  dreamerId?: string | null;
}
