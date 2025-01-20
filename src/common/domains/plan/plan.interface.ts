import { PlanProperties, PlanToClientProperties } from 'src/common/types/plan/plan.properties';
import IQuote from '../quote/quote.interface';
import { Status } from 'src/common/constants/status.type';

export default interface IPlan {
  toClient(): PlanToClientProperties;
  toDB(): Partial<PlanProperties>;
  updateAssign(data: { assigneeId: string }): IPlan;
  updateComplete(): IPlan;
  updateByScheduler(): IPlan;
  getQuotes(): IQuote[];
  getAssigneeIds(): string[];
  getDreamerId(): string;
  getStatus(): Status;
  getDreamerNickName(): string;
}
