import { Controller, Get, Param, Query } from '@nestjs/common';
import QuoteService from './quote.service';
import QuoteRepository from './quote.repository';
import { Quote } from '@prisma/client';
import { Public } from 'src/decorator/public.decorator';
import { QuoteToClientProperties } from './type/quoteProperties';
import { User } from 'src/decorator/user.decorator';
import { MakerQuoteQueryOptions } from './type/quote.dto';

@Controller('quotes')
export default class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @Get()
  async getQuotesByMaker(
    @User() userId: string,
    @Query() options: MakerQuoteQueryOptions
  ): Promise<{ totalCount: number; list: QuoteToClientProperties[] }> {
    const serviceOptions = { ...options, userId };
    const { totalCount, list } = await this.quoteService.getQuotesByMaker(serviceOptions);
    return { totalCount, list };
  }

  @Get(':id')
  async getQuoteById(@User() userId: string, @Param('id') id: string): Promise<QuoteToClientProperties> {
    const quote = await this.quoteService.getQuoteById(id, userId);
    return quote;
  }
}
