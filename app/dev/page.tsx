"use client";
import React, { useState } from "react";
import { useHandler } from "./handler";

const page = () => {
  const {
    levelNum,
    unitCategory,
    unitDoctrine,
    handleName,
    handleCostInput,
    handleUpkeepInput,
    handleAttributeInput,
    handleCategory,
    handleDoctrine,
    addLevel,
  } = useHandler();
  return (
    <div className="flex-1 flex-col p-4 text-lg">
      <div className=" flex items-center p-2">
        <h3 className="mx-2">Unit Name:</h3>
        <input
          className="input input-bordered w-full max-w-xs"
          onChange={handleName}
        />
      </div>
      <div className=" flex items-center p-2">
        <h3 className="mx-2">Unit Category:</h3>
        <select
          className="dropdown"
          defaultValue="Select a Unit Category"
          value={unitCategory}
          onChange={handleCategory}
        >
          <option value="Infantry">Infantry</option>
          <option value="Armored">Armored</option>
          <option value="Support">Support</option>
          <option value="Helicopters">Helicopters</option>
          <option value="Fighters">Fighters</option>
          <option value="Heavies">Heavies</option>
          <option value="Naval">Naval</option>
          <option value="Submarines">Submarines</option>
        </select>
      </div>
      <div className=" flex items-center p-2">
        <h3 className="mx-2">Unit Image:</h3>
        <input
          type="file"
          accept="image/*"
          className="file-input file-input-bordered w-full max-w-xs"
        />
      </div>
      <div className=" flex items-center p-2">
        <h3 className="mx-2">Unit Doctrine:</h3>
        <select
          className="dropdown"
          value={unitDoctrine}
          onChange={handleDoctrine}
        >
          <option value="Eastern">Eastern</option>
          <option value="Western">Western</option>
          <option value="European">European</option>
        </select>
      </div>
      <div className=" items-center p-2">
        <h3>Levels:</h3>
        <button
          type="button"
          onClick={addLevel}
          className="btn btn-neutral btn-xs"
        >
          +
        </button>
        {Array.from({ length: levelNum }, (_, i) => (
          <div key={i}>
            <h1 className=" text-xl">Level {i + 1}:</h1>
            <div className="flex flex-col m-4">
              <h3 className="mb-4">Attributes:</h3>
              <div className="flex flex-row">
                <div className="flex flex-col justify-center items-center w-32 mx-2">
                  <h3 className="mb-2">Infantry</h3>
                  <div className="flex flex-row items-center mb-2">
                    <h3 className="mr-2">Atk:</h3>
                    <input
                      type="number"
                      step="0.1"
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) =>
                        handleAttributeInput(e, "InfantryAtk", i)
                      }
                    />
                  </div>
                  <div className="flex flex-row items-center">
                    <h3 className="mr-2">Def:</h3>
                    <input
                      type="number"
                      step="0.1"
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) =>
                        handleAttributeInput(e, "InfantryDef", i)
                      }
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center w-32 mx-2">
                  <h3 className="mb-2">Armor</h3>
                  <div className="flex flex-row items-center mb-2">
                    <h3 className="mr-2">Atk:</h3>
                    <input
                      type="number"
                      step="0.1"
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) => handleAttributeInput(e, "ArmorAtk", i)}
                    />
                  </div>
                  <div className="flex flex-row items-center">
                    <h3 className="mr-2">Def:</h3>
                    <input
                      type="number"
                      step="0.1"
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) => handleAttributeInput(e, "ArmorDef", i)}
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center w-32 mx-2">
                  <h3 className="mb-2">Fixed-Wing</h3>
                  <div className="flex flex-row items-center mb-2">
                    <h3 className="mr-2">Atk:</h3>
                    <input
                      type="number"
                      step="0.1"
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) => handleAttributeInput(e, "FixedAtk", i)}
                    />
                  </div>
                  <div className="flex flex-row items-center">
                    <h3 className="mr-2">Def:</h3>
                    <input
                      type="number"
                      step="0.1"
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) => handleAttributeInput(e, "FixedAtk", i)}
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center w-32 mx-2">
                  <h3 className="mb-2">Rotary-Wing</h3>
                  <div className="flex flex-row items-center mb-2">
                    <h3 className="mr-2">Atk:</h3>
                    <input
                      type="number"
                      step="0.1"
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) => handleAttributeInput(e, "RotaryAtk", i)}
                    />
                  </div>
                  <div className="flex flex-row items-center">
                    <h3 className="mr-2">Def:</h3>
                    <input
                      type="number"
                      step="0.1"
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) => handleAttributeInput(e, "RotaryDef", i)}
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center w-32 mx-2">
                  <h3 className="mb-2">Missile</h3>
                  <div className="flex flex-row items-center mb-2">
                    <h3 className="mr-2">Atk:</h3>
                    <input
                      type="number"
                      step="0.1"
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) => handleAttributeInput(e, "MissileAtk", i)}
                    />
                  </div>
                  <div className="flex flex-row items-center">
                    <h3 className="mr-2">Def:</h3>
                    <input
                      type="number"
                      step="0.1"
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) => handleAttributeInput(e, "MissileDef", i)}
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center w-32 mx-2">
                  <h3 className="mb-2">Ships</h3>
                  <div className="flex flex-row items-center mb-2">
                    <h3 className="mr-2">Atk:</h3>
                    <input
                      type="number"
                      step="0.1"
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) => handleAttributeInput(e, "ShipsAtk", i)}
                    />
                  </div>
                  <div className="flex flex-row items-center">
                    <h3 className="mr-2">Def:</h3>
                    <input
                      type="number"
                      step="0.1"
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) => handleAttributeInput(e, "ShipsDef", i)}
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center w-32 mx-2">
                  <h3 className="mb-2">Submarines</h3>
                  <div className="flex flex-row items-center mb-2">
                    <h3 className="mr-2">Atk:</h3>
                    <input
                      type="number"
                      step="0.1"
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) => handleAttributeInput(e, "SubsAtk", i)}
                    />
                  </div>
                  <div className="flex flex-row items-center">
                    <h3 className="mr-2">Def:</h3>
                    <input
                      type="number"
                      step="0.1"
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) => handleAttributeInput(e, "SubsDef", i)}
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center w-32 mx-2">
                  <h3 className="mb-2">Buildings</h3>
                  <div className="flex flex-row items-center mb-2">
                    <h3 className="mr-2">Atk:</h3>
                    <input
                      type="number"
                      step="0.1"
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) =>
                        handleAttributeInput(e, "BuildingAtk", i)
                      }
                    />
                  </div>
                  <div className="flex flex-row items-center">
                    <h3 className="mr-2">Def:</h3>
                    <input
                      type="number"
                      step="0.1"
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) =>
                        handleAttributeInput(e, "BuildingDef", i)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col m-4">
              <h3>Cost:</h3>
              <div className="flex mx-12">
                <div className=" w-28 mx-4 justify-center">
                  <h3>Supplies:</h3>
                  <input
                    type="number"
                    step="0.1"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => handleCostInput(e, "Supplies", i)}
                  />
                </div>
                <div className=" w-28 mx-4 justify-center">
                  <h3>Components:</h3>
                  <input
                    type="number"
                    step="0.1"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => handleCostInput(e, "Components", i)}
                  />
                </div>
                <div className=" w-28 mx-4 justify-center">
                  <h3>Fuel:</h3>
                  <input
                    type="number"
                    step="0.1"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => handleCostInput(e, "Fuel", i)}
                  />
                </div>
                <div className=" w-28 mx-4 justify-center">
                  <h3>Electronics:</h3>
                  <input
                    type="number"
                    step="0.1"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => handleCostInput(e, "Electronics", i)}
                  />
                </div>
                <div className=" w-28 mx-4 justify-center">
                  <h3>Rares:</h3>
                  <input
                    type="number"
                    step="0.1"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => handleCostInput(e, "Rares", i)}
                  />
                </div>
                <div className=" w-28 mx-4 justify-center">
                  <h3>Manpower:</h3>
                  <input
                    type="number"
                    step="0.1"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => handleCostInput(e, "Manpower", i)}
                  />
                </div>
                <div className=" w-28 mx-4 justify-center">
                  <h3>Cash:</h3>
                  <input
                    type="number"
                    step="0.1"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => handleCostInput(e, "Cash", i)}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col m-4">
              <h3>Upkeep:</h3>
              <div className="flex mx-12">
                <div className=" w-28 mx-4">
                  <h3>Supplies:</h3>
                  <input
                    type="number"
                    step="0.1"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => handleUpkeepInput(e, "Supplies", i)}
                  />
                </div>
                <div className=" w-28 mx-4 justify-center">
                  <h3>Components:</h3>
                  <input
                    type="number"
                    step="0.1"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => handleUpkeepInput(e, "Components", i)}
                  />
                </div>
                <div className=" w-28 mx-4 justify-center">
                  <h3>Fuel:</h3>
                  <input
                    type="number"
                    step="0.1"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => handleUpkeepInput(e, "Fuel", i)}
                  />
                </div>
                <div className=" w-28 mx-4 justify-center">
                  <h3>Electronics:</h3>
                  <input
                    type="number"
                    step="0.1"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => handleUpkeepInput(e, "Electronics", i)}
                  />
                </div>
                <div className=" w-28 mx-4 justify-center">
                  <h3>Rares:</h3>
                  <input
                    type="number"
                    step="0.1"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => handleUpkeepInput(e, "Rares", i)}
                  />
                </div>
                <div className=" w-28 mx-4 justify-center">
                  <h3>Manpower:</h3>
                  <input
                    type="number"
                    step="0.1"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => handleUpkeepInput(e, "Manpower", i)}
                  />
                </div>
                <div className=" w-28 mx-4 justify-center">
                  <h3>Cash:</h3>
                  <input
                    type="number"
                    step="0.1"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => handleUpkeepInput(e, "Cash", i)}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className=" flex items-center justify-center p-2">
        <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg">
          Submit
        </button>
      </div>
    </div>
  );
};

export default page;
