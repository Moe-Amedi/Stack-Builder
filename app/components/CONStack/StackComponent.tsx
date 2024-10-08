import React, { useEffect, useState } from "react";
import UnitCard from "../ConflictOfNations/UnitCard";
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
    supplies: 0,
    components: 0,
    fuel: 0,
    electronics: 0,
    rares: 0,
    manpower: 0,
    cash: 0,
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
    handleProdTime(ProductionPerHour.supplies, "supplies");
    handleProdTime(ProductionPerHour.components, "components");
    handleProdTime(ProductionPerHour.fuel, "fuel");
    handleProdTime(ProductionPerHour.electronics, "electronics");
    handleProdTime(ProductionPerHour.rares, "rares");
    handleProdTime(ProductionPerHour.manpower, "manpower");
    handleProdTime(ProductionPerHour.cash, "cash");
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
                Infantry
              </td>
              <td className="border border-white p-1 text-center align-middle">
                Armor
              </td>
              <td className="border border-white p-1 text-center align-middle">
                Fixed Wing
              </td>
              <td className="border border-white p-1 text-center align-middle">
                Rotary Wing
              </td>
              <td className="border border-white p-1 text-center align-middle">
                Missile
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
                Population
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-white p-1 text-center align-middle">
                Attack
              </td>
              <td className="border border-white p-1 text-center align-middle">
                {attack && attack.infantry_atk
                  ? attack.infantry_atk.toFixed(1)
                  : 0}
              </td>
              <td className="border border-white p-1 text-center align-middle">
                {attack && attack.armor_atk ? attack.armor_atk.toFixed(1) : 0}
              </td>
              <td className="border border-white p-1 text-center align-middle">
                {attack && attack.fixed_atk ? attack.fixed_atk.toFixed(1) : 0}
              </td>
              <td className="border border-white p-1 text-center align-middle">
                {attack && attack.rotary_atk ? attack.rotary_atk.toFixed(1) : 0}
              </td>
              <td className="border border-white p-1 text-center align-middle">
                {attack && attack.missile_atk
                  ? attack.missile_atk.toFixed(1)
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
                {attack && attack.pops_atk ? attack.pops_atk.toFixed(1) : 0}
              </td>
            </tr>
            <tr>
              <td className="border border-white p-1 text-center align-middle">
                Defense
              </td>
              <td className="border border-white p-1 text-center align-middle">
                {defense && defense.infantry_def
                  ? defense.infantry_def.toFixed(1)
                  : 0}
              </td>
              <td className="border border-white p-1 text-center align-middle">
                {defense && defense.armor_def
                  ? defense.armor_def.toFixed(1)
                  : 0}
              </td>
              <td className="border border-white p-1 text-center align-middle">
                {defense && defense.fixed_def
                  ? defense.fixed_def.toFixed(1)
                  : 0}
              </td>
              <td className="border border-white p-1 text-center align-middle">
                {defense && defense.rotary_def
                  ? defense.rotary_def.toFixed(1)
                  : 0}
              </td>
              <td className="border border-white p-1 text-center align-middle">
                {defense && defense.missile_def
                  ? defense.missile_def.toFixed(1)
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
                {defense && defense.pops_def ? defense.pops_def.toFixed(1) : 0}
              </td>
            </tr>
          </tbody>
        </table>
        <table className="w-full border border-white bg-slate-600 table-fixed mb-2 rounded-lg">
          <thead>
            <tr>
              <td className="border border-white p-1 text-center align-middle"></td>
              <td className="border border-white p-1 text-center align-middle">
                Supplies
              </td>
              <td className="border border-white p-1 text-center align-middle">
                Components
              </td>
              <td className="border border-white p-1 text-center align-middle">
                Fuel
              </td>
              <td className="border border-white p-1 text-center align-middle">
                Electronics
              </td>
              <td className="border border-white p-1 text-center align-middle">
                Rares
              </td>
              <td className="border border-white p-1 text-center align-middle">
                Manpower
              </td>
              <td className="border border-white p-1 text-center align-middle">
                Cash
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-white p-1 text-center align-middle">
                Cost
              </td>
              <td className="border border-white p-1 text-center align-middle">
                {cost && cost.supplies ? cost.supplies.toFixed(0) : 0}
              </td>
              <td className="border border-white p-1 text-center align-middle">
                {cost && cost.components ? cost.components.toFixed(0) : 0}
              </td>
              <td className="border border-white p-1 text-center align-middle">
                {cost && cost.fuel ? cost.fuel.toFixed(0) : 0}
              </td>
              <td className="border border-white p-1 text-center align-middle">
                {cost && cost.electronics ? cost.electronics.toFixed(0) : 0}
              </td>
              <td className="border border-white p-1 text-center align-middle">
                {cost && cost.rares ? cost.rares.toFixed(0) : 0}
              </td>
              <td className="border border-white p-1 text-center align-middle">
                {cost && cost.manpower ? cost.manpower.toFixed(0) : 0}
              </td>
              <td className="border border-white p-1 text-center align-middle">
                {cost && cost.cash ? cost.cash.toFixed(0) : 0}
              </td>
            </tr>
            <tr>
              <td className="border border-white p-1 text-center align-middle">
                Upkeep
              </td>
              <td className="border border-white p-1 text-center align-middle">
                {upkeep && upkeep.supplies ? upkeep.supplies.toFixed(0) : 0}
              </td>
              <td className="border border-white p-1 text-center align-middle">
                {upkeep && upkeep.components ? upkeep.components.toFixed(0) : 0}
              </td>
              <td className="border border-white p-1 text-center align-middle">
                {upkeep && upkeep.fuel ? upkeep.fuel.toFixed(0) : 0}
              </td>
              <td className="border border-white p-1 text-center align-middle">
                {upkeep && upkeep.electronics
                  ? upkeep.electronics.toFixed(0)
                  : 0}
              </td>
              <td className="border border-white p-1 text-center align-middle">
                {upkeep && upkeep.rares ? upkeep.rares.toFixed(0) : 0}
              </td>
              <td className="border border-white p-1 text-center align-middle">
                {upkeep && upkeep.manpower ? upkeep.manpower.toFixed(0) : 0}
              </td>
              <td className="border border-white p-1 text-center align-middle">
                {upkeep && upkeep.cash ? upkeep.cash.toFixed(0) : 0}
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
