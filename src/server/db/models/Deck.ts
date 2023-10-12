import * as typegoose from "@typegoose/typegoose";
import { Player } from "./Player";

const { modelOptions, prop } = typegoose;

@modelOptions({schemaOptions: {collection: "Deck", versionKey: false, timestamps: true}})
export class Deck {
  @prop()
  name: string;

  @prop()
  image: string;

  @prop({ ref: Player })
  publishPlayerId: typegoose.Ref<Player>

  @prop({ default: false })
  visible: boolean;
}