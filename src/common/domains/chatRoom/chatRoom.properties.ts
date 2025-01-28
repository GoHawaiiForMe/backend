import { ProfileImage } from 'src/common/constants/image.type';

export interface ChatRoomProperties {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  planId: string;
  userIds: string[];
  chatIds?: string[] | { content: string };
  lastChat?: string;
  isActive?: boolean;
}

export interface ChatRoomWithUserInfo {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  planId: string;
  users: {
    id: string;
    nickName: string;
    image: ProfileImage;
  }[];
  lastChat?: string;
  isActive?: boolean;
}
