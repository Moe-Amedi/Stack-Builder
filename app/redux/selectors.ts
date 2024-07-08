// selectors.ts
import { RootState } from "./store";
import { createSelector } from "@reduxjs/toolkit";

const selectStack = (state: RootState) => state.stack.stack;
const selectData = (state: RootState) => state.data.data;

export const selectUnitById = (state: RootState, id: number) => {
  return state.stack.stack.find((unit) => unit.id === id);
};

export const makeSelectStack = createSelector(selectStack, (stack) => stack);
export const makeSelectData = createSelector(selectData, (data) => data);
