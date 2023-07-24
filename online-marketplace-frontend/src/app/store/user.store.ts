import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { UserState } from './user.state';

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
