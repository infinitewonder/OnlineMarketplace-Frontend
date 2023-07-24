import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface User {
  id: number;
  username: string;
  // add other necessary user properties
}

export interface UserState {
  user: User | null;
}

export function createInitialState(): UserState {
  return {
    user: null,
  };
}
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'user' })
export class UserStore extends Store<UserState> {
  constructor() {
    super(createInitialState());
  }
}
