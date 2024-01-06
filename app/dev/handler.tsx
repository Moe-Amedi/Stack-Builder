import { useState } from "react";
import axios from "axios";

export const useHandler = () => {
  const [levelNum, setLevelNum] = useState(1);
  const [costData, setCostData] = useState([{}]);
  const [upkeepData, setUpkeepData] = useState([{}]);
  const [attributeData, setAttributeData] = useState([{}]);
  const [unitCategory, setUnitCategory] = useState("");
  const [unitDoctrine, setUnitDoctrine] = useState("");
  const [unitName, setUnitName] = useState("");

  const handleCostInput = (event: any, resource: any, levelIndex: any) => {
    const { value } = event.target;

    setCostData((prevCostData) => {
      const updatedCostData = [...prevCostData];
      const updatedCost = {
        ...updatedCostData[levelIndex],
        [resource]: value,
      };
      updatedCostData[levelIndex] = updatedCost;
      return updatedCostData;
    });
  };

  const handleUpkeepInput = (event: any, resource: any, levelIndex: any) => {
    const { value } = event.target;

    setUpkeepData((prevUpkeepData) => {
      const updatedUpkeepData = [...prevUpkeepData];
      const updatedUpkeep = {
        ...updatedUpkeepData[levelIndex],
        [resource]: value,
      };
      updatedUpkeepData[levelIndex] = updatedUpkeep;
      return updatedUpkeepData;
    });
  };

  const handleAttributeInput = (
    event: any,
    attribute: any,
    levelIndex: any
  ) => {
    const { value } = event.target;

    setAttributeData((prevAttributeData) => {
      const updatedAttributrData = [...prevAttributeData];
      const updatedAttribute = {
        ...updatedAttributrData[levelIndex],
        [attribute]: value,
      };
      updatedAttributrData[levelIndex] = updatedAttribute;
      return updatedAttributrData;
    });
  };

  const handleCategory = (event: any) => {
    setUnitCategory(event.target.value);
  };

  const handleDoctrine = (event: any) => {
    setUnitDoctrine(event.target.value);
  };

  const handleName = (event: any) => {
    setUnitName(event.target.name);
  };

  const addLevel = () => {
    setLevelNum((prevLevelNum) => prevLevelNum + 1);
  };

  const handleSubmit = async () => {};

  return {
    levelNum,
    costData,
    upkeepData,
    attributeData,
    unitCategory,
    unitDoctrine,
    unitName,
    handleName,
    handleCostInput,
    handleUpkeepInput,
    handleAttributeInput,
    handleCategory,
    handleDoctrine,
    addLevel,
  };
};
