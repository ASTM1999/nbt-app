import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  @Prop({ required: true })
  content: string;

  @Prop()
  created_at: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Task' })
  task_id: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
