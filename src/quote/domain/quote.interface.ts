import QuoteProperties from '../type/quoteProperties';
import QuoteToClientProperties from '../type/quoteToClientProperties.interface';

export default interface IQuote {
  update(data: Partial<QuoteProperties>): Partial<QuoteProperties>;
  toDB(): Partial<QuoteProperties>;
  toClient(): QuoteToClientProperties;
  getMakerId(): string;
  getDreamerId(): string;
}
