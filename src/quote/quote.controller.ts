import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Patch, Query } from '@nestjs/common';
import QuoteService from './quote.service';
import { QuoteToClientProperties } from './type/quoteProperties';
import { UserId } from 'src/decorator/user.decorator';
import { CreateQuoteDataDTO, MakerQuoteQueryOptionsDTO, UpdateQuoteDataDTO } from './type/quote.dto';

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
    @User() userId: string,
    @Param('id') id: string,
    @Body() data: UpdateQuoteDataDTO
  ): Promise<QuoteToClientProperties> {
    const quote = await this.quoteService.update(id, userId, data);
    return quote;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteQuoteById(@User() userId: string, @Param('id') id: string): Promise<void> {
    await this.quoteService.deleteQuote(id, userId);
  }
}
