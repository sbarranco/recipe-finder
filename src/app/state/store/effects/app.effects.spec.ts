// import { TestBed } from '@angular/core/testing';
// import { provideMockActions } from '@ngrx/effects/testing';
// import { Observable, of, throwError } from 'rxjs';
// import { AppEffects } from './app.effects';
// import { RecipeService } from '../../../services/recipe.service';
// import * as fromItemActions from '../actions/app.actions';
// import { Recipe } from '../../models/item.model';
// import { Action } from '@ngrx/store';
// import { createMockItemList } from '../../models/__mocks__/item.model.mock';

// describe('AppEffects', () => {
//   let actions$: Observable<Action>;
//   let effects: AppEffects;
//   let recipeService: jest.Mocked<RecipeService>;

//   beforeEach(() => {
//     const RecipeServiceMock = {
//       getItems: jest.fn(),
//       searchItems: jest.fn(),
//     };

//     TestBed.configureTestingModule({
//       providers: [
//         AppEffects,
//         provideMockActions(() => actions$),
//         { provide: RecipeService, useValue: RecipeServiceMock },
//       ],
//     });

//     effects = TestBed.inject(AppEffects);
//     recipeService = TestBed.inject(RecipeService) as jest.Mocked<RecipeService>;
//   });

//   describe('loadItems$', () => {
//     it('should return a loadItemsSuccess action with items on success', () => {
//       const items: Recipe[] = createMockItemList();
//       const action = fromItemActions.LoadItemsActions.loadItems();
//       const outcome = fromItemActions.LoadItemsActions.loadItemsSuccess({
//         items
//       });

//       actions$ = of(action);
//       recipeService.getItems.mockReturnValue(of({ items }));

//       effects.loadItems$.subscribe((result) => {
//         expect(result).toEqual(outcome);
//         expect(recipeService.getItems).toHaveBeenCalledWith(5, 0);
//       });
//     });

//     it('should return a loadItemsFailure action on failure', () => {
//       const action = fromItemActions.LoadItemsActions.loadItems();
//       const outcome = fromItemActions.LoadItemsActions.loadItemsFailure();

//       actions$ = of(action);
//       recipeService.getItems.mockReturnValue(throwError(new Error('Error')));

//       effects.loadItems$.subscribe((result) => {
//         expect(result).toEqual(outcome);
//         expect(recipeService.getItems).toHaveBeenCalledWith(5, 0);
//       });
//     });
//   });

//   describe('searchItems$', () => {
//     it('should return a searchItemsSuccess action with items on success', () => {
//       const items: Recipe[] = createMockItemList();
//       const query = 'Recipe 1';
//       const action = fromItemActions.SearchItemsActions.searchItems({ query });
//       const outcome = fromItemActions.SearchItemsActions.searchItemsSuccess({
//         items,
//       });

//       actions$ = of(action);
//       recipeService.searchItems.mockReturnValue(of({ items }));

//       effects.searchItems$.subscribe((result) => {
//         expect(result).toEqual(outcome);
//         expect(recipeService.searchItems).toHaveBeenCalledWith(query);
//       });
//     });

//     it('should return a searchItemsFailure action on failure', () => {
//       const query = 'Recipe 1';
//       const action = fromItemActions.SearchItemsActions.searchItems({ query });
//       const outcome = fromItemActions.SearchItemsActions.searchItemsFailure();

//       actions$ = of(action);
//       recipeService.searchItems.mockReturnValue(throwError(new Error('Error')));

//       effects.searchItems$.subscribe((result) => {
//         expect(result).toEqual(outcome);
//         expect(recipeService.searchItems).toHaveBeenCalledWith(query);
//       });
//     });
//   });
// });
