import SortOrder from 'src/common/enums/sortOrder';

type PlanOrderByField = { createdAt: SortOrder.DESC } | { startDate: SortOrder.ASC };
export default PlanOrderByField;
