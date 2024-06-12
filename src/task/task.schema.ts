import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
  @Prop({ required: true })
  task: string;

  @Prop()
  description: string;

  @Prop()
  due_date: string;

  @Prop()
  statuspending: boolean;

  @Prop()
  priority: string;

  @Prop()
  tags: string;

  @Prop()
  created_at: string;

  @Prop()
  updated_at: string;

  // @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Comment' }])
  // comments: string[];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Project', required: false })
  project_id?: string;  // Make project_id optional

  //   @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  //   user_id: string;

  //   @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Category' })
  //   category_id: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
