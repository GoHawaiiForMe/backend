import { Status } from 'src/common/constants/status.type';

export type QuoteWhereConditions = {
  isDeletedAt: Date | null;
  isConfirmed?: boolean;
  makerId?: string;
  OR?: [{ isConfirmed: boolean }, { isConfirmed: boolean; plan: { status: Status } }];
  plan?: { status: { in: Status[] } };
  planId?: string;
};

export interface QuoteQueryOptions {
  page: number;
  pageSize: number;
  planId?: string;
  isConfirmed?: boolean;
  isSent?: boolean;
  userId?: string;
}

export interface CreateOptionalQuoteData {
  price: number;
  content: string;
  planId?: string;
  isAssigned?: boolean;
}

export interface CreateQuoteData {
  price: number;
  content: string;
  planId: string;
  isAssigned: boolean;
}
