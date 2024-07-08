import React, { useEffect, useState } from "react";
import {
  decreaseAmount,
  increaseAmount,
  removeFromStack,
} from "../../redux/stack/stackSlice";
import { removeData } from "../../redux/dataStack/dataSlice";
import { useDispatch, useSelector } from "react-redux";
import { useHandler } from "./handler";
import { RootState } from "../../redux/store";

const UnitCard = (props: any) => {
  const { handleAddToStack, handleAddToData } = useHandler();
  const unit = props.unit;
  const id = unit.id;
  const name = unit.name;
  const category = unit.category;
  const dispatch = useDispatch();
  // const [unit, setUnit] = useState({});
  const [levelNum, setlevelNum] = useState(1);
  const Stack = useSelector((state: RootState) => state.stack.stack);
  const Unit: any = Stack.find((stack) => stack.id === id);
  const level = Unit.levels.find((lvl: any) => lvl.level.level === levelNum);
  const attack: any = level?.attackData;
  const defense: any = level?.defenseData;
  const maxLevel = Unit.levels.reduce(
    (max: any, level: any) => Math.max(max, level.level.level),
    0
  );

  const removeUnit = (id: number) => {
    dispatch(removeFromStack(id));
    dispatch(removeData(id));
  };

  const handleLevelChange = (direction: any) => {
    switch (direction) {
      case "increase":
        if (levelNum < maxLevel) {
          const incLevelNum = levelNum + 1;
          setlevelNum(incLevelNum);
        }
        break;

      case "decrease":
        if (levelNum > 1) {
          const decLevelNum = levelNum - 1;
          setlevelNum(decLevelNum);
        }
        break;

      default:
        console.error("Invalid direction provided.");
    }
  };

  const handleAmountChange = (direction: any) => {
    let counter = 0;
    Stack.forEach((s) => {
      counter += s.amount;
    });
    switch (direction) {
      case "increase":
        if (counter < 100) {
          dispatch(increaseAmount(id));
        }
        break;

      case "decrease":
        if (counter > 1) {
          dispatch(decreaseAmount(id));
        }
        break;

      default:
        console.error("Invalid direction provided.");
    }
  };

  useEffect(() => {
    // handleFetchunit(id);
  }, []);

  useEffect(() => {
    // setUnit(Unit);
    // console.log(Stack);
    if (level) {
      handleAddToData(level, id);
    }
  }, [Stack, levelNum]);
  return (
    <div className="relative flex w-full bg-slate-800 shadow-xl my-3 rounded-xl text-xs items-center">
      <div className="p-4 w-52">
        <h2>{name}</h2>
      </div>
      <div className="flex p-4 items-center">
        <h2>Amount</h2>
        <button
          onClick={() => handleAmountChange("decrease")}
          type="button"
          className="btn btn-neutral btn-xs mx-2 w-6 h-6"
        >
          -
        </button>
        <h2>{Unit?.amount}</h2>
        <button
          onClick={() => handleAmountChange("increase")}
          type="button"
          className="btn btn-neutral btn-xs mx-2 w-6 h-6"
        >
          +
        </button>
      </div>
      <div className="flex items-center p-4">
        <h2>Level</h2>
        <button
          onClick={() => handleLevelChange("decrease")}
          type="button"
          className="btn btn-neutral btn-xs mx-2 w-6 h-6"
        >
          -
        </button>
        <h2>{level?.level.level || 0}</h2>
        <button
          onClick={() => handleLevelChange("increase")}
          type="button"
          className="btn btn-neutral btn-xs mx-2 w-6 h-6"
        >
          +
        </button>
      </div>
      <div className="flex p-4 items-center">
        <h2 className="px-1">HP:</h2>
        <h2>{level?.level.hp}</h2>
      </div>
      <div className="flex justify-end w-fit bg-slate-700 text-xs rounded-lg p-1 m-1">
        <table className="w-full border border-white bg-slate-600 table-fixed rounded-lg">
          <tbody>
            <tr>
              <td className="border border-white p-1 text-center align-middle">
                ATK
              </td>
              <td className="border border-white p-1 text-center align-middle">
                {attack ? attack[0]?.infantry_atk : "0"}
              </td>
              <td className="border border-white p-1 text-center align-middle">
                {attack ? attack[0]?.armor_atk : "0"}
              </td>
              <td className="border border-white p-1 text-center align-middle">
                {attack ? attack[0]?.fixed_atk : "0"}
              </td>
              <td className="border border-white p-1 text-center align-middle">
                {attack ? attack[0]?.rotary_atk : "0"}
              </td>
              <td className="border border-white p-1 text-center align-middle">
                {attack ? attack[0]?.missile_atk : "0"}
              </td>
              <td className="border border-white p-1 text-center align-middle">
                {attack ? attack[0]?.ship_atk : "0"}
              </td>
              <td className="border border-white p-1 text-center align-middle">
                {attack ? attack[0]?.sub_atk : "0"}
              </td>
              <td className="border border-white p-1 text-center align-middle">
                {attack ? attack[0]?.building_atk : "0"}
              </td>
              <td className="border border-white p-1 text-center align-middle">
                {attack ? attack[0]?.pops_atk : "0"}
              </td>
            </tr>
            <tr>
              <td className="border border-white p-1 text-center align-middle">
                DEF
              </td>
              <td className="border border-white p-1 text-center align-middle">
                {defense ? defense[0]?.infantry_def : "0"}
              </td>
              <td className="border border-white p-1 text-center align-middle">
                {defense ? defense[0]?.armor_def : "0"}
              </td>
              <td className="border border-white p-1 text-center align-middle">
                {defense ? defense[0]?.fixed_def : "0"}
              </td>
              <td className="border border-white p-1 text-center align-middle">
                {defense ? defense[0]?.rotary_def : "0"}
              </td>
              <td className="border border-white p-1 text-center align-middle">
                {defense ? defense[0]?.missile_def : "0"}
              </td>
              <td className="border border-white p-1 text-center align-middle">
                {defense ? defense[0]?.ship_def : "0"}
              </td>
              <td className="border border-white p-1 text-center align-middle">
                {defense ? defense[0]?.sub_def : "0"}
              </td>
              <td className="border border-white p-1 text-center align-middle">
                {defense ? defense[0]?.building_def : "0"}
              </td>
              <td className="border border-white p-1 text-center align-middle">
                {defense ? defense[0]?.pops_def : "0"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className=" h-16">
        <button
          className="btn btn-neutral bg-slate-700 btn-xs mx-2 w-6 mt-1 h-6"
          onClick={() => removeUnit(id)}
        >
          -
        </button>
      </div>
    </div>
  );
};

export default UnitCard;
