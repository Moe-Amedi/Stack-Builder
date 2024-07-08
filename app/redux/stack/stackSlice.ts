import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface StackState {
//   unit: Unit;
// }

interface StackState {
  id: number;
  name: string;
  category: string;
  amount: number;
  levels: Levels[];
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

const initialState = {
  stack: [] as StackState[],
};

const stackSlice = createSlice({
  name: "stack",
  initialState,
  reducers: {
    addBasicToStack: (state, action: PayloadAction<any>) => {
      const newStack = {
        id: action.payload.id,
        name: action.payload.name,
        category: action.payload.category,
        amount: 1,
        levels: action.payload.levels,
      };
      state.stack.push(newStack);
    },
    addFullToStack: (state, action: PayloadAction<any>) => {
      const fullUnit = action.payload;
      // console.log("fullUnit: ", fullUnit);
      fullUnit.forEach((unit: any) => {
        const i = unit.level.cow_unit_id;
        // console.log("i: ", i);
        const index = state.stack.findIndex((stackItem) => stackItem.id === i);
        // console.log("stored id: ", index);
        // console.log("index: ", index);
        // console.log("stored id: ", state.stack.id);
        if (index >= 0) {
          const levelIndex = state.stack[index].levels.findIndex(
            (level) => level.id === unit.level.cow_level_id
          );
          if (levelIndex === -1) {
            const updatedStack = {
              id: unit.level.cow_level_id,
              level: unit.level.level,
              hp: unit.level.hp,
              attack: unit.attackData,
              defense: unit.defenseData,
              cost: unit.costData,
              upkeep: unit.upkeepData,
            };
            state.stack[index].levels.push(updatedStack);
          } else {
            // state.stack.push(action.payload);
            return;
          }
        }
      });
    },
    removeFromStack: (state, action: PayloadAction<any>) => {
      const index = state.stack.findIndex(
        (stackItem) => stackItem.id === action.payload
      );
      if (index >= 0) {
        state.stack.splice(index, 1);
      } else {
        console.warn(
          `can't Remove Unit (id: ${action.payload} as it is not in the Stack)`
        );
      }
    },
    increaseAmount: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const index = state.stack.findIndex((unit) => unit.id === id);
      if (index !== -1) {
        state.stack[index].amount += 1;
        // console.log("success");
      }
    },
    decreaseAmount: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const index = state.stack.findIndex((unit) => unit.id === id);
      if (index !== -1 && state.stack[index].amount > 1) {
        state.stack[index].amount -= 1;
      }
    },
    resetStack: () => initialState,
  },
});

export const {
  addBasicToStack,
  addFullToStack,
  removeFromStack,
  increaseAmount,
  decreaseAmount,
  resetStack,
} = stackSlice.actions;

export default stackSlice.reducer;
