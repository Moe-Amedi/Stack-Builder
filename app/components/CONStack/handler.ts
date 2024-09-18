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
  const [units, setUnits] = useState<Unit[]>([]);
  const [length, setLength] = useState<number>(0);
  const [attack, setAttack] = useState<Attack>();
  const [defense, setDefense] = useState<Defense>();
  const [cost, setCost] = useState<Cost>({
    id: 0,
    supplies: 0,
    components: 0,
    fuel: 0,
    electronics: 0,
    rares: 0,
    manpower: 0,
    cash: 0,
  });
  const [upkeep, setUpkeep] = useState<Upkeep>();
  const [hp, setHP] = useState<any>(0);
  const [prodTime, setProdTime] = useState<Cost>({
    id: 0,
    supplies: 0,
    components: 0,
    fuel: 0,
    electronics: 0,
    rares: 0,
    manpower: 0,
    cash: 0,
  });
  const dispatch = useDispatch();
  const Stacks = useSelector((state: RootState) => state.stack.stacks);
  const dataStacks = useSelector((state: RootState) => state.data.data);

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

  const handleAddUnit = (stackId: string, unit: any) => {
    const unitInStack = Stacks[stackId].some(
      (stackItem) => stackItem.id === unit.id
    );
    // console.log(unit);

    if (length < 9) {
      if (unitInStack) {
        console.warn(`${unit.name} is already in the stack`);
        return;
      } else {
        const basicUnit = {
          id: unit.id,
          name: unit.name,
          category: unit.category,
        };
        // console.log(stackId);
        dispatch(addBasicToStack({ stackId, unit }));
        handleStackLength(stackId);
        console.log("Stack: ", Stacks);
        console.log("dataStack: ", dataStacks);

        const fullUnit = {
          id: unit.id,
          level: unit.levels,
        };
      }
    } else {
      console.warn("the size of the stack exceedes 10");
    }
  };

  const handleStackLength = (stackId: string) => {
    let counter = 0;
    Stacks[stackId].forEach((s) => {
      counter += s.amount;
    });
    setLength(counter);
  };

  const handleData = (stackId: string) => {
    handleAttack(stackId);
    handleDefense(stackId);
    handleCost(stackId);
    handleUpkeep(stackId);
    handleHP(stackId);
    // console.log("hp", hp);
    // console.log("attack", attack);
    // console.log("defense", defense);
    // console.log("cost", cost);
    // console.log("upkeep", upkeep);
  };

  const handleHP = (stackId: string) => {
    let hpSum: any;
    const dataStack = dataStacks[stackId];
    const Stack = Stacks[stackId];

    dataStack.forEach((unit: any) => {
      const stack = Stack.find((amount) => amount.id === unit.id);
      const amount: number = stack?.amount ?? 0;

      hpSum = (hpSum || 0) + unit.level.hp * amount;
    });
    setHP(hpSum);
    // console.log(hpSum);
  };

  const handleAttack = (stackId: string) => {
    const attackSum: any = {};
    // console.log(dataStack);
    const dataStack = dataStacks[stackId];
    const Stack = Stacks[stackId];

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

  const handleDefense = (stackId: string) => {
    const defenseSum: any = {};
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
    setDefense(defenseSum);
  };

  const handleCost = (stackId: string) => {
    const costSum: any = {};
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
    setCost(costSum);
  };

  const handleUpkeep = (stackId: string) => {
    const upkeepSum: any = {};
    const dataStack = dataStacks[stackId];
    const Stack = Stacks[stackId];

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

  return {
    handleUnitMenu,
    handleAddUnit,
    formatTime,
    handleProdTime,
    handleData,
    handleStackLength,
    units,
    length,
    attack,
    defense,
    cost,
    upkeep,
    hp,
    prodTime,
  };
};
