import { createFeature, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Products } from '../models/products.model';
import { ProductsActions } from '../actions/products.actions';

export const productsesFeatureKey = 'productses';

export interface State extends EntityState<Products> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Products> = createEntityAdapter<Products>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(ProductsActions.addProducts,
    (state, action) => adapter.addOne(action.products, state)
  ),
  on(ProductsActions.upsertProducts,
    (state, action) => adapter.upsertOne(action.products, state)
  ),
  on(ProductsActions.addProductss,
    (state, action) => adapter.addMany(action.productss, state)
  ),
  on(ProductsActions.upsertProductss,
    (state, action) => adapter.upsertMany(action.productss, state)
  ),
  on(ProductsActions.updateProducts,
    (state, action) => adapter.updateOne(action.products, state)
  ),
  on(ProductsActions.updateProductss,
    (state, action) => adapter.updateMany(action.productss, state)
  ),
  on(ProductsActions.deleteProducts,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(ProductsActions.deleteProductss,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(ProductsActions.loadProductss,
    (state, action) => adapter.setAll(action.productss, state)
  ),
  on(ProductsActions.clearProductss,
    state => adapter.removeAll(state)
  ),
);

export const productsesFeature = createFeature({
  name: productsesFeatureKey,
  reducer,
  extraSelectors: ({ selectProductsesState }) => ({
    ...adapter.getSelectors(selectProductsesState)
  }),
});

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = productsesFeature;
