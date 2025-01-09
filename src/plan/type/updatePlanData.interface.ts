import { Status } from '@prisma/client';

export default interface UpdatePlanData {
  status?: Status;
  assigneeIds?: string[];
}
