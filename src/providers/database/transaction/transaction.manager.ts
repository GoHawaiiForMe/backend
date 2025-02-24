import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { PrismaClient } from '@prisma/client';
import { AsyncLocalStorage } from 'async_hooks';
import mongoose from 'mongoose';
import DBClient from '../prisma/DB.client';

const asyncLocalStorage = new AsyncLocalStorage<Map<string, any>>();

@Injectable()
export default class TransactionManager {
  constructor(
    private readonly prisma: DBClient,
    @InjectConnection() private readonly mongooseConnection: mongoose.Connection
  ) {}

  async runInTransaction<T>(callback: () => Promise<T>): Promise<T> {
    return asyncLocalStorage.run(new Map(), async () => {
      const session = await this.mongooseConnection.startSession();
      session.startTransaction();

      try {
        asyncLocalStorage.getStore().set('mongoSession', session);

        const result = await this.prisma.$transaction(async (prisma) => {
          asyncLocalStorage.getStore().set('prisma', prisma);
          const callbackResult = await callback();
          await session.commitTransaction();

          return callbackResult;
        });

        return result;
      } catch (error) {
        await session.abortTransaction();
        throw error;
      } finally {
        session.endSession();
      }
    });
  }

  static getPrismaClient(): PrismaClient {
    return asyncLocalStorage?.getStore()?.get('prisma');
  }

  static getMongoSession(): mongoose.ClientSession {
    return asyncLocalStorage?.getStore()?.get('mongoSession');
  }
}
