import { addBasicToStack } from "@/app/redux/stack/stackSlice";
import { RootState } from "@/app/redux/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Unit {
  id: number;
  name: string;
  category: string;
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
  const [length, setLength] = useState<number>(0);
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
  const [hp, setHP] = useState<any>(0);
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
  const dispatch = useDispatch();
  const Stack = useSelector((state: RootState) => state.stack.stack);
  const dataStack = useSelector((state: RootState) => state.data.data);

  const handleData = () => {
    handleAttack();
    handleDefense();
    handleCost();
    handleUpkeep();
    handleHP();
  };

  const handleHP = () => {
    let hpSum: any;

    dataStack.forEach((unit: any) => {
      const stack = Stack.find((amount) => amount.id === unit.id);
      const amount: number = stack?.amount ?? 0;

      hpSum = (hpSum || 0) + unit.level.hp * amount;
    });
    setHP(hpSum);
    // console.log(hpSum);
  };

  const handleAttack = () => {
    const attackSum: any = {};
    // console.log(dataStack);

    dataStack.forEach((unit: any) => {
      const stack = Stack.find((amount) => amount.id === unit.id);
      const amount: number = stack?.amount ?? 0;
      unit.attackData.forEach((atk: any) => {
        Object.keys(atk).forEach((attackType) => {
          if (attackType !== "cow_level_id" && attackType !== "cow_attack_id") {
            attackSum[attackType] =
              (attackSum[attackType] || 0) + atk[attackType] * amount;
          }
        });
      });
    });
    // console.log(attackSum);
    setAttack(attackSum);
  };

  const handleDefense = () => {
    const defenseSum: any = {};

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
    setDefense(defenseSum);
  };

  const handleCost = () => {
    const costSum: any = {};

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
    setCost(costSum);
  };

  const handleUpkeep = () => {
    const upkeepSum: any = {};

    dataStack.forEach((unit: any) => {
      const stack = Stack.find((amount) => amount.id === unit.id);
      const amount: number = stack?.amount ?? 0;
      unit.upkeepData.forEach((keep: any) => {
        Object.keys(keep).forEach((upkeepType) => {
          if (upkeepType !== "cow_level_id" && upkeepType !== "cow_upkeep_id") {
            upkeepSum[upkeepType] =
              (upkeepSum[upkeepType] || 0) + keep[upkeepType] * amount;
          }
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
      const response = await fetch("/api/callofwar/asia", {
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

  const handleUnitMenu = (units: Unit[]) => {
    const unitsByCategory: { [key: string]: Unit[] } = units.reduce(
      (acc: { [key: string]: Unit[] }, unit) => {
        acc[unit.category] = [...(acc[unit.category] || []), unit];
        return acc;
      },
      {}
    );
    return unitsByCategory;
  };

  const handleAddUnit = (unit: any) => {
    const unitInStack = Stack.some((stackItem) => stackItem.id === unit.id);
    // console.log(unit);

    if (length < 100) {
      if (unitInStack) {
        console.warn(`${unit.name} is already in the stack`);
        return;
      } else {
        const basicUnit = {
          id: unit.id,
          name: unit.name,
          category: unit.category,
        };
        // console.log(unit);
        dispatch(addBasicToStack(unit));
        handleStackLength();

        const fullUnit = {
          id: unit.id,
          level: unit.levels,
        };
      }
    } else {
      console.warn("the size of the stack exceedes 10");
    }
  };

  const handleStackLength = () => {
    let counter = 0;
    Stack.forEach((s) => {
      counter += s.amount;
    });
    setLength(counter);
  };

  return {
    units,
    length,
    attack,
    defense,
    cost,
    upkeep,
    hp,
    prodTime,
    handleFetch,
    handleUnitMenu,
    handleAddUnit,
    handleStackLength,
    handleData,
    handleProdTime,
    formatTime,
  };
};
