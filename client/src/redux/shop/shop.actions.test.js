import ShopActionTypes from './shop.types';
import * as actions from './shop.actions';

describe('fetchCollectionsStart action', () => {
  it('should create the fetchCollectionsStart action', () => {
    expect(actions.fetchCollectionsStart().type)
      .toEqual(ShopActionTypes.FETCH_COLLECTIONS_START);
  });
});

describe('fetchCollectionsSuccess action', () => {
  it('should create the fetchCollectionsSuccess action', () => {
    const mockItem = {
      hats: {id: 1}
    };

    const action = actions.fetchCollectionsSuccess(mockItem);

    expect(action.type).toEqual(ShopActionTypes.FETCH_COLLECTIONS_SUCCESS);
    expect(action.payload).toEqual(mockItem);
  });
});

describe('fetchCollectionsFailure action', () => {
  it('should create the fetchCollectionsFailure action', () => {
    const action = actions.fetchCollectionsFailure('errored');

    expect(action.type).toEqual(ShopActionTypes.FETCH_COLLECTIONS_FAILURE);
    expect(action.payload).toEqual('errored');
  });
});

describe('fetchCollectionsStartAsync action', () => {
  it('should create the fetchCollectionsStartAsync action', () => {
    const mockActionCreator = actions.fetchCollectionsStartAsync();
    const mockDispatch = jest.fn();

    mockActionCreator(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(actions.fetchCollectionsStart());
  });
});