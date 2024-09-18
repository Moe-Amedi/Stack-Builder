import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DataState {
  data: { [key: string]: Unit[] };
}

interface Unit {
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

const initialState: DataState = {
  data: {
    stack1: [],
    stack2: [],
    stack3: [],
    stack4: [],
    stack5: [],
  },
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    addDataStack: (state, action: PayloadAction<string>) => {
      const stackId = action.payload;
      state.data[stackId] = [];
    },

    removeDataStack: (state, action: PayloadAction<string>) => {
      const stackId = action.payload;
      if (Object.keys(state.data).length > 1) {
        delete state.data[stackId];
      }
    },

    addCurrentData: (
      state,
      action: PayloadAction<{ stackId: string; unit: Unit }>
    ) => {
      const { stackId, unit } = action.payload;
      const stack = state.data[stackId];
      // console.log("unit: ", unit);

      if (stack) {
        const index = stack.findIndex((dataItem) => dataItem.id === unit.id);

        if (index >= 0) {
          stack[index] = unit;
        } else {
          stack.push(unit);
        }
      }
    },

    removeData: (
      state,
      action: PayloadAction<{ stackId: string; unitId: number }>
    ) => {
      const { stackId, unitId } = action.payload;
      const stack = state.data[stackId];

      if (stack) {
        const index = stack.findIndex((dataItem) => dataItem.id === unitId);

        if (index >= 0) {
          stack.splice(index, 1);
        } else {
          console.warn(
            `can't Remove Unit (id: ${action.payload} as it is not in the Stack)`
          );
        }
      }
    },

    resetData: () => initialState,
  },
});

export const { addCurrentData, removeData, resetData } = dataSlice.actions;

export default dataSlice.reducer;
