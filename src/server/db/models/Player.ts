import * as typegoose from "@typegoose/typegoose";
import { PlayerCollection } from "./PlayerCollection";
import { PlayerStats } from "./PlayerStats";
import { defaultAvatarImg } from "../../../util/constants"

const { modelOptions, prop } = typegoose;

// enum LoginMethods {
//   EMAIL = 'EMAIL',
//   GOOGLE = 'GOOGLE'
// }

@modelOptions({schemaOptions: {versionKey: false, timestamps: false, _id: false}})
export class PlayerProvider {
  @prop()
  public name?: string;

  @prop()
  public providerId?: string;
}


@modelOptions({schemaOptions: {collection: "Player", versionKey: false, timestamps: true}})
export class Player {

  @prop({ required: true })
  username: string;

  @prop({ required: true })
  email: string;

  @prop({ default: defaultAvatarImg })
  avatarImgUrl: string;

  @prop({ default: false })
  isAdmin: string;

  @prop()
  provider: PlayerProvider

  @prop({ ref: () => PlayerStats })
  public playerStatsId: typegoose.Ref<PlayerStats>

  @prop({ ref: () => PlayerCollection })
  public collectionId: typegoose.Ref<PlayerCollection>
}