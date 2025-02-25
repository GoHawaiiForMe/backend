import { Status } from 'src/common/constants/status.type';
import { toChatRoomData } from 'src/modules/quote/types/quote.type';
import { QuoteProperties, QuoteToClientProperties } from 'src/modules/quote/types/quoteProperties';

export default interface IQuote {
  update(data: Partial<QuoteProperties>): IQuote;
  toDBForUpdate(): Partial<QuoteProperties>;
  toDB(): Partial<QuoteProperties>;
  toClient(): QuoteToClientProperties;
  toMaker(): QuoteToClientProperties;
  toClientWithoutPlan(): QuoteToClientProperties;
  toChatRoom(): toChatRoomData;
  getId(): string;
  getMakerId(): string;
  getDreamerId(): string;
  getPlanId(): string;
  getPlanStatus(): Status;
  getIsConfirmed(): boolean;
  getConfirmedPrice(): number;
}
