import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface User {
  id: number;
  username: string;
  email: string;
  // add other necessary user properties
}

export interface UserState {
  user?: User;
}

export function createInitialState(): UserState {
  return {
    user: undefined,
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'user' })
export class UserStore extends Store<UserState> {
  constructor() {
    super(createInitialState());
  }
}
