import { Status } from 'src/common/constants/status.type';
import { QuoteProperties, QuoteToClientProperties } from 'src/common/types/quote/quoteProperties';

export default interface IQuote {
  update(data: Partial<QuoteProperties>): IQuote;
  toDBForUpdate(): Partial<QuoteProperties>;
  toDB(): Partial<QuoteProperties>;
  toClient(): QuoteToClientProperties;
  toMaker(): QuoteToClientProperties;
  toClientWithoutPlan(): QuoteToClientProperties;
  getId(): string;
  getMakerId(): string;
  getDreamerId(): string;
  getPlanId(): string;
  getPlanStatus(): Status;
  getIsConfirmed(): boolean;
}
