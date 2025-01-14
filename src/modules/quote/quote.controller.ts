import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Patch, Query } from '@nestjs/common';
import QuoteService from './quote.service';
import { QuoteToClientProperties } from '../../common/types/quote/quoteProperties';
import { UserId } from 'src/common/decorators/user.decorator';
import { MakerQuoteQueryOptionsDTO, UpdateQuoteDataDTO } from '../../common/types/quote/quote.dto';

@Controller('quotes')
export default class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @Get()
  async getQuotesByMaker(
    @UserId() userId: string,
    @Query() options: MakerQuoteQueryOptionsDTO
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

  @Patch(':id')
  async patchQuote(
    @UserId() userId: string,
    @Param('id') id: string,
    @Body() data: UpdateQuoteDataDTO
  ): Promise<QuoteToClientProperties> {
    const quote = await this.quoteService.update(id, userId, data);
    return quote;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteQuoteById(@UserId() userId: string, @Param('id') id: string): Promise<void> {
    await this.quoteService.deleteQuote(id, userId);
  }
}
