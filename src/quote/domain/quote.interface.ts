import { QuoteProperties } from '../type/quoteProperties';
import { QuoteToClientProperties } from '../type/quoteProperties';

export default interface IQuote {
  update(data: Partial<QuoteProperties>): IQuote;
  toDBForUpdate(): Partial<QuoteProperties>;
  toDB(): Partial<QuoteProperties>;
  toClient(): QuoteToClientProperties;
  getMakerId(): string;
  getDreamerId(): string;
}
