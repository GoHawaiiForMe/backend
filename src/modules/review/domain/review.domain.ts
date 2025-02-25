import { PlanReference } from 'src/modules/plan/types/plan.type';
import { ReviewAllProperties, ReviewProperties } from 'src/modules/review/types/review.types';
import { UserReference } from 'src/modules/user/types/user.types';

export default class Review {
  private readonly id?: string;
  private writerId: string;
  private writer?: UserReference;
  private ownerId: string;
  private owner?: UserReference;
  private rating: number;
  private content: string;
  private planId: string;
  private plan: PlanReference;
  private readonly createdAt?: Date;
  private readonly updatedAt?: Date;

  constructor(review: ReviewAllProperties) {
    this.id = review?.id;
    this.writerId = review.writerId;
    this.writer = review?.writer;
    this.ownerId = review.ownerId;
    this.owner = review?.owner;
    this.rating = review.rating;
    this.content = review.content;
    this.planId = review.planId;
    this.plan = review?.plan;
    this.createdAt = review?.createdAt;
    this.updatedAt = review?.updatedAt;
  }

  static create(data: ReviewProperties) {
    return new Review(data);
  }

  toDB() {
    return {
      id: this?.id,
      writerId: this.writerId,
      ownerId: this.ownerId,
      rating: this.rating,
      content: this.content,
      planId: this.planId
    };
  }

  toClient() {
    return {
      id: this?.id,
      writerId: this.writerId,
      ownerId: this.ownerId,
      rating: this.rating,
      content: this.content,
      planId: this.planId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  toMaker() {
    return {
      id: this?.id,
      writer: this.writer,
      rating: this.rating,
      content: this.content,
      createdAt: this.createdAt
    };
  }
  toDreamer() {
    return {
      id: this?.id,
      owner: this.owner,
      plan: this.plan,
      rating: this.rating,
      content: this.content,
      createdAt: this.createdAt
    };
  }
}
