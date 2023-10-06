import { modelOptions, prop } from "@typegoose/typegoose";

@modelOptions({schemaOptions: {collection: "Card", versionKey: false, timestamps: true}})
export class Card {

  @prop()
  name: string;

  @prop()
  abilityText: string;

  @prop()
  abilityType: string;

  @prop()
  cost: number;

  @prop()
  power: number;

  @prop()
  health: number;

  @prop()
  image: string;

  @prop({ default: false })
  visible: boolean;

  @prop({ default: false })
  isVariant: boolean
}