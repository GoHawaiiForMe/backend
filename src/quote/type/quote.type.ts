import { StatusEnum } from 'src/common/types/status.type';
export type QuoteWhereInput = {
  isDeletedAt: Date | null;
  isConfirmed?: boolean;
  makerId?: string;
  OR?: [{ isConfirmed: boolean }, { isConfirmed: boolean; plan: { status: StatusEnum } }];
  plan?: { status: { in: StatusEnum[] } };
  planId?: string;
};

export interface QuoteQueryOptions {
  page: number;
  pageSize: number;
  planId?: string;
  isConfirmed?: boolean;
  isSent?: boolean;
  userId?: string;
  whereConditions?: QuoteWhereInput;
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
