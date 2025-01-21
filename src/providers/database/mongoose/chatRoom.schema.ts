import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ timestamps: true })
class ChatRoom {
  @Prop({ required: true })
  name: string;

  @Prop({ default: null })
  isDeletedAt: Date | null;

  @Prop({ type: [String] })
  userIds: string[];

  @Prop({
    type: [Types.ObjectId],
    required: true,
    ref: 'Chat'
  })
  chatIds: Types.ObjectId[];
}

export type ChatRoomDocument = HydratedDocument<ChatRoom>;

const ChatRoomSchema = SchemaFactory.createForClass(ChatRoom);
export default ChatRoomSchema;
