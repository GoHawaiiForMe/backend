import { PlanProperties, PlanToClientProperties } from 'src/common/types/plan/plan.properties';
import IQuote from '../quote/quote.interface';
import { Status } from 'src/common/constants/status.type';
import { AssignData } from 'src/common/types/plan/plan.type';

export default interface IPlan {
  toClient(): PlanToClientProperties;
  toDB(): Partial<PlanProperties>;
  requestAssign(data: AssignData): IPlan;
  rejectAssign(data: AssignData): IPlan;
  updateComplete(): IPlan;
  updateByScheduler(): IPlan;
  getQuotes(): IQuote[];
  getAssigneeIds(): string[];
  getDreamerId(): string;
  getStatus(): Status;
  getDreamerNickName(): string;
  getMakerNickName(id: string): string;
  getConfirmedMakerId(): string;
}
