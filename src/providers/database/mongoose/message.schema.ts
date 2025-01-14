import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ timestamps: true })
class Message {
  @Prop({ default: null })
  isDeletedAt: Date | null;

  @Prop()
  senderId: string | null;

  @Prop({
    required: true,
    ref: 'Chat'
  })
  chatId: Types.ObjectId;

  @Prop({ required: true })
  content: string;
}

export type MessageDocument = HydratedDocument<Message>;

const MessageSchema = SchemaFactory.createForClass(Message);
export default MessageSchema;
