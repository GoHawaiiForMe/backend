import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ timestamps: true })
class Chat {
  @Prop({ required: true })
  name: string;

  @Prop({ default: null })
  isDeletedAt: Date | null;

  @Prop({ type: [String] })
  userIds: string[];

  @Prop({
    type: [Types.ObjectId],
    required: true,
    ref: 'Message'
  })
  messageIds: Types.ObjectId[];
}

export type ChatDocument = HydratedDocument<Chat>;

const ChatSchema = SchemaFactory.createForClass(Chat);
export default ChatSchema;
