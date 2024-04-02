import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StackState {
  unit: Unit;
}

interface Unit {
  id: number;
  name: string;
  category: string;
  amount: number;
  level: Levels[];
}

interface Levels {
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

const stackSlice = createSlice({
  name: "stack",
  initialState: {
    stack: [] as StackState[],
  },
  reducers: {
    addBasicToStack: (state, action: PayloadAction<any>) => {
      state.stack.push(action.payload);
    },
    addFullToStack: (state, action) => {
      const fullUnit: Unit = action.payload;
      const index = state.stack.findIndex(
        (stackItem) => stackItem.unit.id === fullUnit.id
      );
      if (index !== -1) {
        state.stack[index].unit = action.payload;
      } else {
        state.stack.push(action.payload);
      }
    },
    removeFromStack: (state, action) => {
      const index = state.stack.findIndex(
        (stackItem) => stackItem.unit?.id === action.payload.id
      );
      if (index >= 0) {
        state.stack.splice(index, 1);
      } else {
        console.warn(
          `can't Remove Unit (id: ${action.payload.id} as it is not in the Stack)`
        );
      }
    },
  },
});

export const { addBasicToStack, addFullToStack, removeFromStack } =
  stackSlice.actions;

export default stackSlice.reducer;
