import { ReviewAllProperties, ReviewProperties } from 'src/modules/review/types/review.types';

export default interface IReview {
  toDB(): ReviewProperties;
  toClient(): ReviewProperties;
  toMaker(): ReviewAllProperties;
  toDreamer(): ReviewAllProperties;
}
