import TransactionManager from '../../providers/database/transaction/transaction.manager';

export default function Transactional() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const transactionManager = this.transactionManager as TransactionManager;
      return transactionManager.runInTransaction(() => originalMethod.apply(this, args));
    };
    return descriptor;
  };
}
