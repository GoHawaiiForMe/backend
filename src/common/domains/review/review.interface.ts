import { ReviewAllProperties, ReviewProperties } from 'src/common/types/review/review.types';

export default interface IReview {
  toDB(): ReviewProperties;
  toClient(): ReviewProperties;
  toMakerProfile(): ReviewAllProperties;
}
