import { ReviewProperties } from 'src/common/types/review/review.types';

export default interface IReview {
  toDB(): ReviewProperties;
}
