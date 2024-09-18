"use client";
import React, { useEffect, useState } from "react";
import { useHandler } from "./handler";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { resetStack } from "@/app/redux/stack/stackSlice";
import { resetData } from "@/app/redux/dataStack/dataSlice";
import Link from "next/link";
import Image from "next/image";
import StackComponent from "@/app/components/CONStack/StackComponent";

const Page = () => {
  const {
    handleFetch,
    handleData,
    handleProdTime,
    formatTime,
    units,
    attack,
    defense,
    cost,
    upkeep,
    prodTime,
  } = useHandler();
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

  const handleInputChange = (e: any, resource: string) => {
    const { value } = e.target;
    setProductionPerHour((prevState) => ({ ...prevState, [resource]: value }));
    console.log(ProductionPerHour);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await handleFetch();
      } catch (error) {
        console.log("error fetching unit data", error);
      }
    };
    fetchData();
    dispatch(resetStack());
    dispatch(resetData());
  }, []);

  useEffect(() => {
    handleData();
  }, [dataStacks]);

  useEffect(() => {
    handleProdTime(ProductionPerHour.supplies, "supplies");
    handleProdTime(ProductionPerHour.components, "components");
    handleProdTime(ProductionPerHour.fuel, "fuel");
    handleProdTime(ProductionPerHour.electronics, "electronics");
    handleProdTime(ProductionPerHour.rares, "rares");
    handleProdTime(ProductionPerHour.manpower, "manpower");
    handleProdTime(ProductionPerHour.cash, "cash");
  }, [cost, ProductionPerHour]);
  return (
    <div
      className="flex flex-col h-full bg-fixed bg-origin-border bg-top bg-no-repeat bg-cover"
      style={{
        backgroundImage: 'url("/images/rus.jpg")',
      }}
    >
      <div className="navbar bg-slate-700 fixed top-0 z-10 shadow-xl">
        <div className="flex-1">
          <Link
            className="btn btn-ghost bg-slate-800"
            href="/ConflictOfNations"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          </Link>
        </div>
      </div>
      <div className="grid w-full h-full justify-items-center">
        <div className=" w-3/5 bg-slate-700 rounded-lg p-2 m-2 text-xs shadow-2xl shadow-gray-900 mt-20">
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
                  {attack && attack.rotary_atk
                    ? attack.rotary_atk.toFixed(1)
                    : 0}
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
                  {defense && defense.ship_def
                    ? defense.ship_def.toFixed(1)
                    : 0}
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
                  {defense && defense.pops_def
                    ? defense.pops_def.toFixed(1)
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
                  {upkeep && upkeep.components
                    ? upkeep.components.toFixed(0)
                    : 0}
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
          <h1 className="text-sm">
            Insert your resource production per hour to calculate how long it
            will take to gather the required resources for the below stacks
          </h1>
          <table className="w-full border border-white bg-slate-600 table-fixed mb-2 rounded-lg my-2">
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
                  Prod. / Hour
                </td>
                <td className="border border-white p-1 text-center align-middle">
                  <input
                    type="text"
                    inputMode="numeric"
                    step="0.1"
                    className="input input-bordered w-full h-8 max-w-xs bg-slate-900"
                    onChange={(e) => handleInputChange(e, "supplies")}
                  />
                </td>
                <td className="border border-white p-1 text-center align-middle">
                  <input
                    type="text"
                    inputMode="numeric"
                    step="0.1"
                    className="input input-bordered w-full h-8 max-w-xs bg-slate-900"
                    onChange={(e) => handleInputChange(e, "components")}
                  />
                </td>
                <td className="border border-white p-1 text-center align-middle">
                  <input
                    type="text"
                    inputMode="numeric"
                    step="0.1"
                    className="input input-bordered w-full h-8 max-w-xs bg-slate-900"
                    onChange={(e) => handleInputChange(e, "fuel")}
                  />
                </td>
                <td className="border border-white p-1 text-center align-middle">
                  <input
                    type="text"
                    inputMode="numeric"
                    step="0.1"
                    className="input input-bordered w-full h-8 max-w-xs bg-slate-900"
                    onChange={(e) => handleInputChange(e, "electronics")}
                  />
                </td>
                <td className="border border-white p-1 text-center align-middle">
                  <input
                    type="text"
                    inputMode="numeric"
                    step="0.1"
                    className="input input-bordered w-full h-8 max-w-xs bg-slate-900"
                    onChange={(e) => handleInputChange(e, "rares")}
                  />
                </td>
                <td className="border border-white p-1 text-center align-middle">
                  <input
                    type="text"
                    inputMode="numeric"
                    step="0.1"
                    className="input input-bordered w-full h-8 max-w-xs bg-slate-900"
                    onChange={(e) => handleInputChange(e, "manpower")}
                  />
                </td>
                <td className="border border-white p-1 text-center align-middle">
                  <input
                    type="text"
                    inputMode="numeric"
                    step="0.1"
                    className="input input-bordered w-full h-8 max-w-xs bg-slate-900"
                    onChange={(e) => handleInputChange(e, "cash")}
                  />
                </td>
              </tr>
              <tr>
                <td className="border border-white p-1 text-center align-middle">
                  Time to Gather
                </td>
                <td className="border border-white p-1 text-center align-middle">
                  {formatTime(prodTime.supplies) || 0}
                </td>
                <td className="border border-white p-1 text-center align-middle">
                  {formatTime(prodTime.components) || 0}
                </td>
                <td className="border border-white p-1 text-center align-middle">
                  {formatTime(prodTime.fuel) || 0}
                </td>
                <td className="border border-white p-1 text-center align-middle">
                  {formatTime(prodTime.electronics) || 0}
                </td>
                <td className="border border-white p-1 text-center align-middle">
                  {formatTime(prodTime.rares) || 0}
                </td>
                <td className="border border-white p-1 text-center align-middle">
                  {formatTime(prodTime.manpower) || 0}
                </td>
                <td className="border border-white p-1 text-center align-middle">
                  {formatTime(prodTime.cash) || 0}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <>
          {Object.keys(Stacks).map((stackId) => (
            <StackComponent key={stackId} units={units} stackId={stackId} />
          ))}
        </>
      </div>
      <div className="fixed bottom-4 right-4">
        <Link href="https://discord.gg/a2EHSsfP">
          <Image
            src="/images/discord.png"
            width={100}
            height={100}
            alt="Discord"
            className="w-12 h-12 cursor-pointer"
          />
        </Link>
      </div>
    </div>
  );
};

export default Page;
