import { ChatType } from 'src/common/constants/chat.type';
import { ProfileImage } from 'src/common/constants/image.type';

export interface ChatRoomProperties {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  planId: string;
  planTitle: string;
  planTripDate: Date;
  quotePrice: number;
  userIds: string[];
  chatIds?: string[] | { content: string; type: ChatType };
  lastChat?: string;
  isActive?: boolean;
}

export interface ChatRoomWithUserInfo {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  planId: string;
  planTitle: string;
  planTripDate: Date;
  quotePrice: number;
  users: {
    id: string;
    nickName: string;
    image: ProfileImage;
  }[];
  lastChat?: string;
  isActive?: boolean;
}
