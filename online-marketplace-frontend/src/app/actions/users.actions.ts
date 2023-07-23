import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Users } from '../models/users.model';

export const UsersActions = createActionGroup({
  source: 'Users/API',
  events: {
    'Load Userss': props<{ userss: Users[] }>(),
    'Add Users': props<{ users: Users }>(),
    'Upsert Users': props<{ users: Users }>(),
    'Add Userss': props<{ users: Users[] }>(),
    'Upsert Userss': props<{ users: Users[] }>(),
    'Update Users': props<{ users: Update<Users> }>(),
    'Update Userss': props<{ userss: Update<Users>[] }>(),
    'Delete Users': props<{ id: string }>(),
    'Delete Userss': props<{ ids: string[] }>(),
    'Clear Userss': emptyProps(),
  }
});
