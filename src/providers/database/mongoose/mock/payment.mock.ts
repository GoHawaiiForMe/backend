const TEST_PAYMENTS = [
  {
    _id: '67b6d2c35a22e6739da2ada4',
    paymentId: '93f2d138644b7943',
    userId: '66885a3c-50f4-427b-8a92-3702c6976fb0',
    orderName: 'test',
    amount: 1000,
    method: 'CARD',
    currency: 'KRW',
    status: 'PENDING'
  }
];
const PRODUCTION_PAYMENTS = [{}];

const PAYMENTS = process.env.ENV === 'test' ? TEST_PAYMENTS : PRODUCTION_PAYMENTS;
export default PAYMENTS;
