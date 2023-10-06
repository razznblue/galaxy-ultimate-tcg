import { modelOptions, prop } from "@typegoose/typegoose";

@modelOptions({schemaOptions: {collection: "PlayerStats", versionKey: false, timestamps: true}})
export class PlayerStats {

  @prop({ default: 0 })
  totalGamesPlayed: number

  @prop({ default: 0 })
  totalWins: number

  @prop({ default: 0 })
  totalLosses: number

  @prop({ default: 0 })
  totalCardsPlayed: number

  @prop({ default: 0 })
  totalDecksPublished: number
}