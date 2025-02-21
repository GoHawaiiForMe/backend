import { PlanProperties, PlanToClientProperties } from 'src/modules/plan/types/plan.properties';
import { Status } from 'src/common/constants/status.type';
import { AssignData } from 'src/modules/plan/types/plan.type';
import { TripType } from 'src/common/constants/tripType.type';
import { ServiceArea } from 'src/common/constants/serviceArea.type';

export default interface IPlan {
  toClient(): PlanToClientProperties;
  toClientWithAddress(): PlanToClientProperties;
  toClientWithQuotes(): PlanToClientProperties;
  toDB(): Partial<PlanProperties>;
  requestAssign(data: AssignData): IPlan;
  rejectAssign(data: AssignData): IPlan;
  updateComplete(): IPlan;
  updateByScheduler(): IPlan;
  getId(): string;
  getQuoteIds(): string[];
  getQuoteMakerIds(): string[];
  getConfirmedMakerId(): string;
  getConfirmedPrice(): number;
  getAssigneeIds(): string[];
  getDreamerId(): string;
  getStatus(): Status;
  getDreamerNickName(): string;
  getAssigneeNickName(makerId: string): string;
  getTitle(): string;
  getTripType(): TripType;
  getServiceArea(): ServiceArea;
}
