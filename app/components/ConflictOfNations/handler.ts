// import { addFullToStack } from "@/app/redux/stack/stackSlice";
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
  infantry_atk: number;
  armor_atk: number;
  fixed_atk: number;
  rotary_atk: number;
  missile_atk: number;
  ship_atk: number;
  sub_atk: number;
  building_atk: number;
  pops_atk: number;
}

interface Defense {
  id: number;
  infantry_def: number;
  armor_def: number;
  fixed_def: number;
  rotary_def: number;
  missile_def: number;
  ship_def: number;
  sub_def: number;
  building_def: number;
  pops_def: number;
}

interface Cost {
  id: number;
  supplies: number;
  components: number;
  fuel: number;
  electronics: number;
  rares: number;
  manpower: number;
  cash: number;
}

interface Upkeep {
  id: number;
  supplies: number;
  components: number;
  fuel: number;
  electronics: number;
  rares: number;
  manpower: number;
  cash: number;
}

export const useHandler = () => {
  // const [unit, setUnit] = useState<Unit[]>([]);
  // const [FullUnit, setFullUnit] = useState();
  const dispatch = useDispatch();
  const Stacks = useSelector((state: RootState) => state.stack.stacks);
  const dataStacks = useSelector((state: RootState) => state.data.data);

  // const handleFetchunit = async (id: number) => {
  //   try {
  //     const response = await fetch(`/api/callofwar/addUnit?id=${id}`, {
  //       method: "GET",
  //     });
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }

  //     const unitData = await response.json();
  //     // console.log("stack", Stack);
  //     // console.log("unit", unitData);
  //     handleAddToStack(id, unitData);
  //     setUnit(unitData);
  //     return unitData;
  //   } catch (error) {
  //     console.log("Error", error);
  //   }
  // };

  const handleAddToStack = async (id: number, unitData: any) => {
    // console.log("id: ", id);
    // console.log("unitData: ", unitData);
    // await dispatch(addFullToStack(unitData));
    // console.log("stack", Stack);
  };

  const handleAddToData = (stackId: string, level: Levels, id: number) => {
    const unit: any = { ...level, id: id };
    // console.log(level);
    dispatch(addCurrentData({ stackId, unit }));
  };

  return {
    // handleFetchunit,
    handleAddToStack,
    handleAddToData,
  };
};
