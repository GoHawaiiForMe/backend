import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { ChatType } from 'src/common/constants/chat.type';

@Schema({ timestamps: true })
export class Chat {
  @Prop({ default: null })
  isDeletedAt: Date | null;

  @Prop({
    required: true,
    default: ChatType.TEXT
  })
  type: ChatType;

  @Prop()
  senderId: string | null;

  @Prop({
    required: true,
    ref: 'ChatRoom'
  })
  chatRoomId: Types.ObjectId;

  @Prop({ required: true })
  content: string;
}

export type ChatDocument = HydratedDocument<Chat> & {
  createdAt?: Date;
  updatedAt?: Date;
};

const ChatSchema = SchemaFactory.createForClass(Chat);
export const ChatModel = mongoose.model('Chat', ChatSchema);
export default ChatSchema;
