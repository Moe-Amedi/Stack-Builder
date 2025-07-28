// selectors.ts
import { RootState } from "./store";
import { createSelector } from "@reduxjs/toolkit";

const selectStack = (state: RootState) => state.stack.stacks;
const selectData = (state: RootState) => state.data.data;

export const makeSelectStack = createSelector(
  selectStack,
  (stack: any) => stack
);
export const makeSelectData = createSelector(selectData, (data: any) => data);
