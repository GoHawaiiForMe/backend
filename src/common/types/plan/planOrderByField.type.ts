import SortOrder from 'src/common/constants/sortOrder.enum';

type PlanOrderByField = { createdAt: SortOrder.DESC } | { startDate: SortOrder.ASC };
export default PlanOrderByField;
