import { addFullToStack } from "@/app/redux/stack/stackSlice";
import { RootState } from "@/app/redux/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCurrentData } from "../../redux/dataStack/dataSlice";

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

export const useHandler = () => {
  const [unit, setUnit] = useState<Unit[]>([]);
  const [FullUnit, setFullUnit] = useState();
  const dispatch = useDispatch();
  const Stack = useSelector((state: RootState) => state.stack.stack);

  const handleFetchunit = async (id: number) => {
    try {
      const response = await fetch(`/api/callofwar/addUnit?id=${id}`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const unitData = await response.json();
      // console.log("stack", Stack);
      // console.log("unit", unitData);
      handleAddToStack(id, unitData);
      setUnit(unitData);
      return unitData;
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleAddToStack = async (id: number, unitData: any) => {
    // console.log("id: ", id);
    // console.log("unitData: ", unitData);
    await dispatch(addFullToStack(unitData));
    // console.log("stack", Stack);
  };

  const handleAddToData = (level: Levels, id: number) => {
    const updatedLevel: Levels = { ...level, id: id };
    // console.log(level);
    dispatch(addCurrentData(updatedLevel));
  };

  return {
    handleFetchunit,
    handleAddToStack,
    handleAddToData,
  };
};
