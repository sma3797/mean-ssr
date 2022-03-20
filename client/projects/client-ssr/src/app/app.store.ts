import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { environment } from "@env";

// tslint:disable-next-line: no-empty-interface
export interface State {}

export const reducers: ActionReducerMap<any> = {};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
