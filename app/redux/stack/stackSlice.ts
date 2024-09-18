import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StackState {
  stacks: { [key: string]: Unit[] };
}

interface Unit {
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

const initialState: StackState = {
  stacks: {
    stack1: [],
    stack2: [],
    stack3: [],
    stack4: [],
    stack5: [],
  },
};

const stackSlice = createSlice({
  name: "stack",
  initialState,
  reducers: {
    addStack: (state, action: PayloadAction<string>) => {
      const stackId = action.payload;
      state.stacks[stackId] = [];
    },

    removeStack: (state, action: PayloadAction<string>) => {
      const stackId = action.payload;
      if (Object.keys(state.stacks).length > 1) {
        delete state.stacks[stackId];
      }
    },

    addBasicToStack: (
      state,
      action: PayloadAction<{ stackId: string; unit: Unit }>
    ) => {
      const stackId = action.payload.stackId;
      // console.log(action.payload);
      const newUnit = {
        id: action.payload.unit.id,
        name: action.payload.unit.name,
        category: action.payload.unit.category,
        amount: 1,
        levels: action.payload.unit.levels,
      };
      if (state.stacks[stackId]) {
        state.stacks[stackId].push(newUnit);
      }
    },

    // addFullToStack: (state, action: PayloadAction<any>) => {
    //   const fullUnit = action.payload;
    //   // console.log("fullUnit: ", fullUnit);
    //   fullUnit.forEach((unit: any) => {
    //     const i = unit.level.cow_unit_id;
    //     // console.log("i: ", i);
    //     const index = state.stack.findIndex((stackItem) => stackItem.id === i);
    //     // console.log("stored id: ", index);
    //     // console.log("index: ", index);
    //     // console.log("stored id: ", state.stack.id);
    //     if (index >= 0) {
    //       const levelIndex = state.stack[index].levels.findIndex(
    //         (level) => level.id === unit.level.cow_level_id
    //       );
    //       if (levelIndex === -1) {
    //         const updatedStack = {
    //           id: unit.level.cow_level_id,
    //           level: unit.level.level,
    //           hp: unit.level.hp,
    //           attack: unit.attackData,
    //           defense: unit.defenseData,
    //           cost: unit.costData,
    //           upkeep: unit.upkeepData,
    //         };
    //         state.stack[index].levels.push(updatedStack);
    //       } else {
    //         // state.stack.push(action.payload);
    //         return;
    //       }
    //     }
    //   });
    // },

    removeFromStack: (
      state,
      action: PayloadAction<{ stackId: string; unitId: number }>
    ) => {
      const { stackId, unitId } = action.payload;
      if (state.stacks[stackId]) {
        state.stacks[stackId] = state.stacks[stackId].filter(
          (unit) => unit.id !== unitId
        );
      }
    },
    increaseAmount: (
      state,
      action: PayloadAction<{ stackId: number; unitId: number }>
    ) => {
      const { stackId, unitId } = action.payload;
      const stack = state.stacks[stackId];
      if (stack) {
        const unit = stack.find((unit) => unit.id == unitId);
        if (unit) {
          unit.amount += 1;
        }
      }
    },
    decreaseAmount: (
      state,
      action: PayloadAction<{ stackId: number; unitId: number }>
    ) => {
      const { stackId, unitId } = action.payload;
      const stack = state.stacks[stackId];
      if (stack) {
        const unit = stack.find((unit) => unit.id == unitId);
        if (unit && unit.amount > 1) {
          unit.amount -= 1;
        }
      }
    },
    resetStack: () => initialState,
  },
});

export const {
  addBasicToStack,
  // addFullToStack,
  removeFromStack,
  increaseAmount,
  decreaseAmount,
  resetStack,
} = stackSlice.actions;

export default stackSlice.reducer;
