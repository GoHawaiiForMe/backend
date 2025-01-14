import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import QuoteService from './quote.service';
import { QuoteToClientProperties } from './type/quoteProperties';
import { UserId } from 'src/decorator/user.decorator';
import { CreateQuoteDataDTO, MakerQuoteQueryOptions } from './type/quote.dto';

@Controller('quotes')
export default class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @Get()
  async getQuotesByMaker(
    @UserId() userId: string,
    @Query() options: MakerQuoteQueryOptions
  ): Promise<{ totalCount: number; list: QuoteToClientProperties[] }> {
    const serviceOptions = { ...options, userId };
    const { totalCount, list } = await this.quoteService.getQuotesByMaker(serviceOptions);
    return { totalCount, list };
  }

  @Get(':id')
  async getQuoteById(@UserId() userId: string, @Param('id') id: string): Promise<QuoteToClientProperties> {
    const quote = await this.quoteService.getQuoteById(id, userId);
    return quote;
  }
}
