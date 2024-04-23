import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DataState {
  id: number;
  level: number;
  hp: number;
  attack: Attack;
  defense: Defense;
  cost: Cost;
  upkeep: Upkeep;
}

interface Attack {
  id: number;
  unarmored_atk: number;
  l_armored_atk: number;
  h_armored_atk: number;
  air_atk: number;
  ship_atk: number;
  sub_atk: number;
  building_atk: number;
  morale_atk: number;
}

interface Defense {
  id: number;
  unarmored_def: number;
  l_armored_def: number;
  h_armored_def: number;
  air_def: number;
  ship_def: number;
  sub_def: number;
  building_def: number;
  morale_def: number;
}

interface Cost {
  id: number;
  cash: number;
  food: number;
  goods: number;
  manpower: number;
  metal: number;
  oil: number;
  rares: number;
}

interface Upkeep {
  id: number;
  cash: number;
  food: number;
  goods: number;
  manpower: number;
  metal: number;
  oil: number;
  rares: number;
}

const initialState = { data: [] as DataState[] };

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    addCurrentData: (state, action: PayloadAction<any>) => {
      const unit = action.payload;
      // console.log("unit: ", unit);

      const index = state.data.findIndex((dataItem) => dataItem.id === unit.id);

      if (index >= 0) {
        state.data[index] = unit;
      } else {
        state.data.push(unit);
      }
    },
    removeData: (state, action: PayloadAction<any>) => {
      const index = state.data.findIndex(
        (dataItem) => dataItem.id === action.payload
      );
      if (index >= 0) {
        state.data.splice(index, 1);
      } else {
        console.warn(
          `can't Remove Unit (id: ${action.payload} as it is not in the Stack)`
        );
      }
    },
    resetData: () => initialState,
  },
});

export const { addCurrentData, removeData, resetData } = dataSlice.actions;

export default dataSlice.reducer;
