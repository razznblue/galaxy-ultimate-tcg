import * as typegoose from "@typegoose/typegoose";
import { Card } from "./Card";

const { modelOptions, prop } = typegoose;

@modelOptions({schemaOptions: {versionKey: false, timestamps: false, _id: false}})
class CardRef {
  @prop({ ref: () => Card })
  cardId: typegoose.Ref<Card>

  @prop()
  unlockDate: string;

  @prop() /* CardLevel - Determines the border color/effects */
  level: number
}

@modelOptions({schemaOptions: {collection: "PlayerCollection", versionKey: false, timestamps: true}})
export class PlayerCollection {

  @prop({ default: []})
  cards: CardRef[]
}