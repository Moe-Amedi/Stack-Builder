import { addBasicToStack } from "@/app/redux/stack/stackSlice";
import { RootState } from "@/app/redux/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Unit {
  id: number;
  name: string;
  category: string;
  level: Level[];
}

interface Level {
  id: number;
  level: number;
  hp: number;
  attack: [Attack];
  defense: [Defense];
  cost: [Cost];
  upkeep: [Upkeep];
}

interface Attack {
  id: number;
  unarmored_atk: number;
  l_armor_atk: number;
  h_armor_atk: number;
  airplane_atk: number;
  ship_atk: number;
  sub_atk: number;
  building_atk: number;
  morale_atk: number;
}

interface Defense {
  id: number;
  unarmored_def: number;
  l_armor_def: number;
  h_armor_def: number;
  airplane_def: number;
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
  const [units, setUnits] = useState<Unit[]>([]);
  const [attack, setAttack] = useState<Attack>();
  const [defense, setDefense] = useState<Defense>();
  const [cost, setCost] = useState<Cost>({
    id: 0,
    cash: 0,
    food: 0,
    goods: 0,
    manpower: 0,
    metal: 0,
    oil: 0,
    rares: 0,
  });
  const [upkeep, setUpkeep] = useState<Upkeep>();
  const [prodTime, setProdTime] = useState<Cost>({
    id: 0,
    cash: 0,
    food: 0,
    goods: 0,
    manpower: 0,
    metal: 0,
    oil: 0,
    rares: 0,
  });
  const Stacks = useSelector((state: RootState) => state.stack.stacks);
  const dataStacks = useSelector((state: RootState) => state.data.data);

  const handleData = () => {
    handleAttack();
    handleDefense();
    handleCost();
    handleUpkeep();
  };

  const handleAttack = () => {
    const attackSum: any = {};
    // console.log(dataStack);
    Object.keys(Stacks).forEach((stackId) => {
      const dataStack = dataStacks[stackId];
      const Stack = Stacks[stackId];

      dataStack.forEach((unit: any) => {
        const stack = Stack.find((amount) => amount.id === unit.id);
        const amount: number = stack?.amount ?? 0;
        unit.attackData.forEach((atk: any) => {
          Object.keys(atk).forEach((attackType) => {
            if (
              attackType !== "cow_level_id" &&
              attackType !== "cow_attack_id"
            ) {
              attackSum[attackType] =
                (attackSum[attackType] || 0) + atk[attackType] * amount;
            }
          });
        });
      });
    });
    // console.log(attackSum);
    setAttack(attackSum);
  };

  const handleDefense = () => {
    const defenseSum: any = {};

    Object.keys(Stacks).forEach((stackId) => {
      const dataStack = dataStacks[stackId];
      const Stack = Stacks[stackId];
      dataStack.forEach((unit: any) => {
        const stack = Stack.find((amount) => amount.id === unit.id);
        const amount: number = stack?.amount ?? 0;
        unit.defenseData.forEach((def: any) => {
          Object.keys(def).forEach((defenseType) => {
            if (
              defenseType !== "cow_level_id" &&
              defenseType !== "cow_defense_id"
            ) {
              defenseSum[defenseType] =
                (defenseSum[defenseType] || 0) + def[defenseType] * amount;
            }
          });
        });
      });
    });
    setDefense(defenseSum);
  };

  const handleCost = () => {
    const costSum: any = {};

    Object.keys(Stacks).forEach((stackId) => {
      const dataStack = dataStacks[stackId];
      const Stack = Stacks[stackId];

      dataStack.forEach((unit: any) => {
        const stack = Stack.find((amount) => amount.id === unit.id);
        const amount: number = stack?.amount ?? 0;
        unit.costData.forEach((cst: any) => {
          Object.keys(cst).forEach((costType) => {
            if (costType !== "cow_level_id" && costType !== "cow_cost_id") {
              costSum[costType] =
                (costSum[costType] || 0) + cst[costType] * amount;
            }
          });
        });
      });
    });
    setCost(costSum);
  };

  const handleUpkeep = () => {
    const upkeepSum: any = {};

    Object.keys(Stacks).forEach((stackId) => {
      const dataStack = dataStacks[stackId];
      const Stack = Stacks[stackId];

      dataStack.forEach((unit: any) => {
        const stack = Stack.find((amount) => amount.id === unit.id);
        const amount: number = stack?.amount ?? 0;
        unit.upkeepData.forEach((keep: any) => {
          Object.keys(keep).forEach((upkeepType) => {
            if (
              upkeepType !== "cow_level_id" &&
              upkeepType !== "cow_upkeep_id"
            ) {
              upkeepSum[upkeepType] =
                (upkeepSum[upkeepType] || 0) + keep[upkeepType] * amount;
            }
          });
        });
      });
    });
    setUpkeep(upkeepSum);
  };

  const handleProdTime = (productionPerHour: any, resource: keyof Cost) => {
    if (productionPerHour === 0) {
      return null;
    }

    const totalCost = cost[resource];
    const timeInHours = totalCost / productionPerHour;
    setProdTime((prevState) => ({ ...prevState, [resource]: timeInHours }));
  };

  const formatTime = (timeInHours: number | null) => {
    if (timeInHours === null || isNaN(timeInHours) || !isFinite(timeInHours)) {
      return "0d 0h 0m";
    }
    const days = Math.floor(timeInHours / 24);
    const hours = Math.floor(timeInHours % 24);
    const minutes = Math.floor((timeInHours % 1) * 60);
    return `${days}d ${hours}h ${minutes}m`;
  };

  const handleFetch = async () => {
    try {
      const response = await fetch("/api/callofwar/soviet", {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const unitData = await response.json();
      setUnits(unitData);
      // console.log(unitData);
      return unitData;
    } catch (error) {
      console.log("Error", error);
    }
  };

  return {
    units,
    attack,
    defense,
    cost,
    upkeep,
    prodTime,
    handleFetch,
    handleData,
    handleProdTime,
    formatTime,
  };
};
