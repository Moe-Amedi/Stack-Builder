import React, { useEffect, useState } from "react";
import UnitCard from "../CallOfWar/UnitCard";
import { useHandler } from "./handler";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";

interface Unit {
  id: number;
  name: string;
  category: string;
}

const StackComponent = (props: any) => {
  const stackId = props.stackId;
  const units = props.units;

  const Stacks = useSelector((state: RootState) => state.stack.stacks);
  const dataStacks = useSelector((state: RootState) => state.data.data);
  const dispatch = useDispatch();
  const [ProductionPerHour, setProductionPerHour] = useState({
    id: 0,
    cash: 0,
    food: 0,
    goods: 0,
    manpower: 0,
    metal: 0,
    oil: 0,
    rares: 0,
  });

  const {
    handleUnitMenu,
    handleAddUnit,
    formatTime,
    handleProdTime,
    handleData,
    handleStackLength,
    length,
    attack,
    defense,
    cost,
    upkeep,
    hp,
  } = useHandler();

  const menuUnits = handleUnitMenu(units);

  useEffect(() => {
    handleProdTime(ProductionPerHour.cash, "cash");
    handleProdTime(ProductionPerHour.food, "food");
    handleProdTime(ProductionPerHour.goods, "goods");
    handleProdTime(ProductionPerHour.manpower, "manpower");
    handleProdTime(ProductionPerHour.metal, "metal");
    handleProdTime(ProductionPerHour.oil, "oil");
    handleProdTime(ProductionPerHour.rares, "rares");
  }, [cost, ProductionPerHour]);

  useEffect(() => {
    handleData(stackId);
    handleStackLength(stackId);
  }, [Stacks, dataStacks]);
  return (
    <div
      key={stackId}
      className="w-3/5 min-h-screen bg-slate-700 rounded-lg p-2 m-2 mt-4 shadow-2xl shadow-gray-900 "
    >
      <div className="flex flex-col m-2 p-2 pb-0 rounded-lg">
        <table className="w-full border border-white bg-slate-600 table-fixed mb-2 rounded-lg">
          <thead>
            <tr>
              <td className="border border-white p-1 text-center align-middle"></td>
              <td className="border border-white p-1 text-center align-middle">
                Unarmored
              </td>
              <td className="border border-white p-1 text-center align-middle">
                Light Armor
              </td>
              <td className="border border-white p-1 text-center align-middle">
                Heavy Armor
              </td>
              <td className="border border-white p-1 text-center align-middle">
                Airplane
              </td>
              <td className="border border-white p-1 text-center align-middle">
                Ship
              </td>
              <td className="border border-white p-1 text-center align-middle">
                Submarine
              </td>
              <td className="border border-white p-1 text-center align-middle">
                Buildings
              </td>
              <td className="border border-white p-1 text-center align-middle">
                Province Morale
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-white p-1 text-center align-middle">
                Attack
              </td>
              <td className="border border-white p-1 text-center align-middle">
                {attack && attack.unarmored_atk
                  ? attack.unarmored_atk.toFixed(1)
                  : 0}
              </td>
              <td className="border border-white p-1 text-center align-middle">
                {attack && attack.l_armor_atk
                  ? attack.l_armor_atk.toFixed(1)
                  : 0}
              </td>
              <td className="border border-white p-1 text-center align-middle">
                {attack && attack.h_armor_atk
                  ? attack.h_armor_atk.toFixed(1)
                  : 0}
              </td>
              <td className="border border-white p-1 text-center align-middle">
                {attack && attack.airplane_atk
                  ? attack.airplane_atk.toFixed(1)
                  : 0}
              </td>
              <td className="border border-white p-1 text-center align-middle">
                {attack && attack.ship_atk ? attack.ship_atk.toFixed(1) : 0}
              </td>
              <td className="border border-white p-1 text-center align-middle">
                {attack && attack.sub_atk ? attack.sub_atk.toFixed(1) : 0}
              </td>
              <td className="border border-white p-1 text-center align-middle">
                {attack && attack.building_atk
                  ? attack.building_atk.toFixed(1)
                  : 0}
              </td>
              <td className="border border-white p-1 text-center align-middle">
                {attack && attack.morale_atk ? attack.morale_atk.toFixed(1) : 0}
              </td>
            </tr>
            <tr>
              <td className="border border-white p-1 text-center align-middle">
                Defense
              </td>
              <td className="border border-white p-1 text-center align-middle">
                {defense && defense.unarmored_def
                  ? defense.unarmored_def.toFixed(1)
                  : 0}
              </td>
              <td className="border border-white p-1 text-center align-middle">
                {defense && defense.l_armor_def
                  ? defense.l_armor_def.toFixed(1)
                  : 0}
              </td>
              <td className="border border-white p-1 text-center align-middle">
                {defense && defense.h_armor_def
                  ? defense.h_armor_def.toFixed(1)
                  : 0}
              </td>
              <td className="border border-white p-1 text-center align-middle">
                {defense && defense.airplane_def
                  ? defense.airplane_def.toFixed(1)
                  : 0}
              </td>
              <td className="border border-white p-1 text-center align-middle">
                {defense && defense.ship_def ? defense.ship_def.toFixed(1) : 0}
              </td>
              <td className="border border-white p-1 text-center align-middle">
                {defense && defense.sub_def ? defense.sub_def.toFixed(1) : 0}
              </td>
              <td className="border border-white p-1 text-center align-middle">
                {defense && defense.building_def
                  ? defense.building_def.toFixed(1)
                  : 0}
              </td>
              <td className="border border-white p-1 text-center align-middle">
                {defense && defense.morale_def
                  ? defense.morale_def.toFixed(1)
                  : 0}
              </td>
            </tr>
          </tbody>
        </table>
        <table className="w-full border border-white bg-slate-600 table-fixed mb-2 rounded-lg">
          <thead>
            <tr>
              <td className="border border-white p-1 text-center align-middle"></td>
              <td className="border border-white p-1 text-center align-middle">
                Cash
              </td>
              <td className="border border-white p-1 text-center align-middle">
                Food
              </td>
              <td className="border border-white p-1 text-center align-middle">
                Goods
              </td>
              <td className="border border-white p-1 text-center align-middle">
                Manpower
              </td>
              <td className="border border-white p-1 text-center align-middle">
                Metal
              </td>
              <td className="border border-white p-1 text-center align-middle">
                Oil
              </td>
              <td className="border border-white p-1 text-center align-middle">
                Rares
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-white p-1 text-center align-middle">
                Cost
              </td>
              <td className="border border-white p-1 text-center align-middle">
                {cost && cost.cash ? cost.cash.toFixed(0) : 0}
              </td>
              <td className="border border-white p-1 text-center align-middle">
                {cost && cost.food ? cost.food.toFixed(0) : 0}
              </td>
              <td className="border border-white p-1 text-center align-middle">
                {cost && cost.goods ? cost.goods.toFixed(0) : 0}
              </td>
              <td className="border border-white p-1 text-center align-middle">
                {cost && cost.manpower ? cost.manpower.toFixed(0) : 0}
              </td>
              <td className="border border-white p-1 text-center align-middle">
                {cost && cost.metal ? cost.metal.toFixed(0) : 0}
              </td>
              <td className="border border-white p-1 text-center align-middle">
                {cost && cost.oil ? cost.oil.toFixed(0) : 0}
              </td>
              <td className="border border-white p-1 text-center align-middle">
                {cost && cost.rares ? cost.rares.toFixed(0) : 0}
              </td>
            </tr>
            <tr>
              <td className="border border-white p-1 text-center align-middle">
                Upkeep
              </td>
              <td className="border border-white p-1 text-center align-middle">
                {upkeep && upkeep.cash ? upkeep.cash.toFixed(0) : 0}
              </td>
              <td className="border border-white p-1 text-center align-middle">
                {upkeep && upkeep.food ? upkeep.food.toFixed(0) : 0}
              </td>
              <td className="border border-white p-1 text-center align-middle">
                {upkeep && upkeep.goods ? upkeep.goods.toFixed(0) : 0}
              </td>
              <td className="border border-white p-1 text-center align-middle">
                {upkeep && upkeep.manpower ? upkeep.manpower.toFixed(0) : 0}
              </td>
              <td className="border border-white p-1 text-center align-middle">
                {upkeep && upkeep.metal ? upkeep.metal.toFixed(0) : 0}
              </td>
              <td className="border border-white p-1 text-center align-middle">
                {upkeep && upkeep.oil ? upkeep.oil.toFixed(0) : 0}
              </td>
              <td className="border border-white p-1 text-center align-middle">
                {upkeep && upkeep.rares ? upkeep.rares.toFixed(0) : 0}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex justify-between">
        <div className="dropdown justify-start p-2 mb-2">
          <div
            tabIndex={0}
            role="button"
            className="btn m-1 text-white bg-slate-800 border-slate-800 hover:bg-slate-900 hover:border-slate-950"
          >
            Add a Unit
          </div>
          <div className="p-2 shadow menu dropdown-content z-[1] bg-slate-800 rounded-box">
            <div className="flex">
              {Object.keys(menuUnits).map((category) => (
                <ul key={category} className="w-32 px-2">
                  <li className="w-full text-center text-gray-300 p-2">
                    {category}
                  </li>
                  {menuUnits[category].map((unit: Unit) => (
                    <li
                      key={unit.id}
                      className=" rounded-lg hover:bg-slate-900"
                    >
                      <button onClick={() => handleAddUnit(stackId, unit)}>
                        {unit.name}
                      </button>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="flex bg-slate-800 rounded-lg p-4">
            <h2 className="px-1">HP:</h2>
            <h2>{hp ? hp.toFixed(0) : 0}</h2>
          </div>
        </div>
        <div className="flex justify-end items-center">
          <div className="flex p-4">
            <h2 className="px-1">Stack:</h2>
            <h2>{length.toString()}/10</h2>
          </div>
        </div>
      </div>

      <div className="justify-between mx-2 px-2 py-1 bg-slate-600 rounded-lg">
        {Stacks[stackId].length > 0 ? (
          Stacks[stackId].map((unit: any) => (
            <UnitCard key={unit.id} unit={unit} stackId={stackId} />
          ))
        ) : (
          <p className="h-screen text-center content-center text-2xl">
            No Units In the Stack
          </p>
        )}
      </div>
    </div>
  );
};

export default StackComponent;
