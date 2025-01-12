import { forwardRef, Module } from '@nestjs/common';
import QuoteController from './quote.controller';
import QuoteService from './quote.service';
import QuoteRepository from './quote.repository';
import PlanModule from 'src/plan/plan.module';

@Module({
  imports: [forwardRef(() => PlanModule)],
  controllers: [QuoteController],
  providers: [QuoteService, QuoteRepository],
  exports: [QuoteService]
})
export default class QuoteModule {}
