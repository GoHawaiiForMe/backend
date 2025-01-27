import { PlanProperties, PlanToClientProperties } from 'src/common/types/plan/plan.properties';
import { Status } from 'src/common/constants/status.type';
import { AssignData } from 'src/common/types/plan/plan.type';

export default interface IPlan {
  toClient(): PlanToClientProperties;
  toClientWithAddress(): PlanToClientProperties;
  toDB(): Partial<PlanProperties>;
  requestAssign(data: AssignData): IPlan;
  rejectAssign(data: AssignData): IPlan;
  updateComplete(): IPlan;
  updateByScheduler(): IPlan;
  getQuoteIds(): string[];
  getQuoteMakerIds(): string[];
  getConfirmedMakerId(): string;
  getAssigneeIds(): string[];
  getDreamerId(): string;
  getStatus(): Status;
  getDreamerNickName(): string;
  getAssigneeNickName(makerId: string): string;
  getTitle(): string;
}
