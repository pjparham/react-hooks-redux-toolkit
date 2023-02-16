import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// Action Creators

// async actions

// export function fetchCats() {
//   return function (dispatch) {
//     dispatch({ type: "cats/fetchCats/pending" });
//     fetch("https://learn-co-curriculum.github.io/cat-api/cats.json")
//       .then((response) => response.json())
//       .then((data) => {
//         dispatch({
//           type: "cats/fetchCats/fulfilled",
//           payload: data.images,
//         });
//       });
//   };
// }
export const fetchCats = createAsyncThunk("cats/fetchCats", () => {
  // return a Promise containing the data we want
  return fetch("https://learn-co-curriculum.github.io/cat-api/cats.json")
    .then((response) => response.json())
    .then((data) => data.images);
});

// sync actions added for demo purposes
// export function catAdded(newCat) {
//   return {
//     type: "cats/catAdded",
//     payload: newCat,
//   };
// }

// export function catUpdated(updatedCat) {
//   return {
//     type: "cats/catUpdated",
//     payload: updatedCat,
//   };
// }

// Reducer
const initialState = {
  entities: [], // array of cats
  status: "idle", // loading state
};

const catsSlice = createSlice({
  name: "cats",
  initialState,
  reducers: {
    catAdded(state, action) {
      // using createSlice lets us mutate state!
      state.entities.push(action.payload);
    },
    catUpdated(state, action) {
      const cat = state.entities.find((cat) => cat.id === action.payload.id);
      cat.url = action.payload.url;
    },
    // async actions to come...
  },
  extraReducers:{
    [fetchCats.pending](state) {
      state.status = "loading";
    },
    [fetchCats.fulfilled](state, action) {
      state.entities = action.payload;
      state.status = "idle";
    },
  },
});


export default catsSlice.reducer;
export const { catAdded, catUpdated } = catsSlice.actions;
