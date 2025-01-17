// import { DynamicModule, Module } from '@nestjs/common';
// import { PortOneService } from './portone.service';

// @Module({})
// export class PortOneModule {
//   static forRoot(secret: string): DynamicModule {
//     return {
//       module: PortOneModule,
//       providers: [
//         {
//           provide: 'PORTONE_SECRET',
//           useValue: secret
//         },
//         PortOneService
//       ],
//       exports: [PortOneService]
//     };
//   }
// }
