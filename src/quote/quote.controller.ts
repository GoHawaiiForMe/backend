import { Controller, Get, Param, Query } from '@nestjs/common';
import QuoteService from './quote.service';
import QuoteRepository from './quote.repository';
import { Quote } from '@prisma/client';
import { Public } from 'src/decorator/public.decorator';
import QuoteToClientProperties from './type/quoteToClientProperties.interface';
import { User } from 'src/decorator/user.decorator';
import { QuoteQueryOptionsByDreamerDTO } from './type/quoteQueryOptions.interface';

@Controller('quotes')
export default class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @Get(':id')
  async getQuoteById(@User() userId: string, @Param('id') id: string): Promise<QuoteToClientProperties> {
    const quote = await this.quoteService.getQuoteById(id, userId);
    return quote;
  }
}
