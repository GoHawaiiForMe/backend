import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { RoleValues } from 'src/common/constants/role.type';
import { ServiceAreaValues } from 'src/common/constants/serviceArea.type';
import { StatusValues } from 'src/common/constants/status.type';
import { TripTypeValues } from 'src/common/constants/tripType.type';

@Injectable()
class DBClient extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async seedForTestEnvironment() {
    try {
      console.log('Seeding database...');
      await this.plan.deleteMany();
      await this.makerProfile.deleteMany();
      await this.dreamerProfile.deleteMany();
      await this.user.deleteMany();

      const dreamer = await this.user.create({
        data: {
          id: 'd9864dc3-ca7d-4dc2-b244-c6273a17cc1c',
          role: RoleValues.DREAMER,
          nickName: 'Dreamer1',
          phoneNumber: '01012345678',
          email: 'dreamer@example.com',
          password: 'password123'
        }
      });

      const maker = await this.user.create({
        data: {
          id: 'f75bbd6a-6dbd-4623-ac7a-8bc945934368',
          role: RoleValues.MAKER,
          nickName: 'Maker1',
          phoneNumber: '01098765432',
          email: 'maker@example.com',
          password: 'password123'
        }
      });

      // 예시: 플랜 데이터 삽입
      await this.plan.createMany({
        data: [
          {
            id: 'eb5ed23e-87cf-41da-a71b-d6384f35e809',
            title: 'Plan 1',
            tripDate: new Date(),
            tripType: TripTypeValues.ACTIVITY,
            serviceArea: ServiceAreaValues.SEOUL,
            details: 'Plan 1 details',
            status: StatusValues.PENDING,
            dreamerId: dreamer.id
          },
          {
            id: '86ceff60-5018-4bee-84d4-1c8c90b69a31',
            title: 'Plan 2',
            tripDate: new Date(),
            tripType: TripTypeValues.FOOD_TOUR,
            serviceArea: ServiceAreaValues.BUSAN,
            details: 'Plan 2 details',
            status: StatusValues.PENDING,
            dreamerId: dreamer.id
          }
        ]
      });

      console.log('TestDatabase seeding complete!');
    } catch (error) {
      console.error('Error during seeding:', error);
    }
  }
}
export default DBClient;
