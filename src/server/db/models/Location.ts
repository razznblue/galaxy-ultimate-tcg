import { modelOptions, prop } from "@typegoose/typegoose";

@modelOptions({ schemaOptions: { collection: "Location", versionKey: false, timestamps: true } })
export class Location {

  @prop()
  name: string;

  @prop()
  abilityText: string;

  @prop()
  abilityType: string;

  @prop()
  image: string;

  @prop()
  tags: string[];

  @prop({ default: false })
  visible: boolean;
}