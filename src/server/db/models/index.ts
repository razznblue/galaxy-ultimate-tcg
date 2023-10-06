import { getModelForClass } from '@typegoose/typegoose';
import { Card } from './Card';
import { Location } from './Location';
import { Player } from './Player';
import { PlayerStats } from './PlayerStats';
import { PlayerCollection } from './PlayerCollection';

export const CardModel = getModelForClass(Card);
export const LocationModel = getModelForClass(Location);
export const PlayerModel = getModelForClass(Player);
export const PlayerStatsModel = getModelForClass(PlayerStats);
export const PlayerCollectionModel = getModelForClass(PlayerCollection);