interface PlayerProvider {
  provider: string,
  providerId: string
}

export interface CreatePlayerBody {
  username: string;
  email: string;
  provider: PlayerProvider;
}

export interface CreateCardBody {
  name: string;
  description: string;
  abilityText: string;
  abilityType: string;
  cost: number;
  power: number;
  health: number;
  image: string;
}

export interface UpdateCardBody {
  name: string;
  description: string;
  abilityText: string;
  abilityType: string;
  cost: number;
  power: number;
  health: number;
  image: string;
}

export interface CreateLocationBody {
  name: string;
  abilityText: string;
  abilityType: string;
  image: string;
  tags: string[],
  visible: string;
}