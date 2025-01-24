import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, PopulatedDoc, Types } from 'mongoose';
import { ChatDocument } from './chat.schema';

@Schema({ timestamps: true })
export class ChatRoom {
  @Prop({ default: null })
  isDeletedAt: Date | null;

  @Prop({ required: true, type: String })
  planId: string;

  @Prop({ type: [String] })
  userIds: string[];

  @Prop({
    type: [Types.ObjectId],
    required: true,
    ref: 'Chat'
  })
  chatIds: Types.ObjectId[];

  @Prop({
    type: Boolean,
    default: true
  })
  isActive: boolean;
}

export type ChatRoomDocument = HydratedDocument<ChatRoom> & {
  chatIds: PopulatedDoc<ChatDocument>[];
};

const ChatRoomSchema = SchemaFactory.createForClass(ChatRoom);

export default ChatRoomSchema;
