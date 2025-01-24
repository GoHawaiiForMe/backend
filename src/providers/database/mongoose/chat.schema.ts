import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Chat {
  @Prop({ default: null })
  isDeletedAt: Date | null;

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

export type ChatDocument = HydratedDocument<Chat>;
export interface IChatDocument {
  _id?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
  senderId?: string;
  chatRoomId: Types.ObjectId;
  content: string;
}
const ChatSchema = SchemaFactory.createForClass(Chat);
export default ChatSchema;
