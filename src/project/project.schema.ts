import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema()
export class Project {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  created_at: string;

  @Prop()
  updated_at: string;

  @Prop()
  status: string; //active // Archived

  @Prop()
  color: string;

  @Prop()
  favorite: boolean;

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Task' }])
  tasks: string[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
