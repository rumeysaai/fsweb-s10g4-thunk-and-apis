import {
  FAV_ADD,
  FAV_REMOVE,
  FETCH_SUCCESS,
  FETCH_LOADING,
  FETCH_ERROR,
  GET_FAVS_FROM_LS,
  FETCH_ANOTHER,
} from "./actions";


const initial = {
  favs: [],
  current: null,
  error: null,
  loading: true,
};

function writeFavsToLocalStorage(state) {
  localStorage.setItem("s10g4", JSON.stringify(state.fav));
}

function readFavsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("s10g4"));
}

export function myReducer(state = initial, action) {
  switch (action.type) {
    case FAV_ADD:
      let isIncluded = state.favs.every(
        (item) => item["length"] !== action.payload["length"]
      );
      
      let newFavs = isIncluded
        ? [...state.favs, action.payload]
        : [...state.favs];
      writeFavsToLocalStorage(newFavs);

      return {
        ...state,
        favs: newFavs,
      };

    case FAV_REMOVE:
      writeFavsToLocalStorage(
        state.favs.filter((item) => item.length !== action.payload)
      );
      
      return {
        ...state,
        favs: state.favs.filter((item) => item.length !== action.payload),
      };

    case FETCH_SUCCESS:
      
      return {
        ...state,
        loading: false,
        current: action.payload,
      };

    case FETCH_LOADING:
      return {
        ...state,
        loading: true,
        current: null,
      };

    case FETCH_ERROR:
      
      return {
        ...state,
        loading: false,
        current: null,
        error: action.payload,
      };

    case GET_FAVS_FROM_LS:
      
      return {
        ...state,
        favs:
          readFavsFromLocalStorage() == null ? [] : readFavsFromLocalStorage(),
      };

    default:
      return state;
  }
}
