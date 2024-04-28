import React from "react";
import Dropdown from "../dropdown/dropdown";
import { LocalDict, Option } from "@/app/types/commonTypes";
import classes from "./dropDowbSection.module.css";

function DropdownSection({ dictionary }: Readonly<{ dictionary: LocalDict }>) {
  const menOptions: Option[] = [
    {
      name: dictionary["shirt"],
      url: "/items?=menShirt",
    },
    {
      name: dictionary["dhothi"],
      url: "/items?=menDhothi",
    },
    {
      name: dictionary["t-shirt"],
      url: "/items?=menTShirt",
    },
    {
      name: dictionary["inners"],
      url: "/items?=menInners",
    },
  ];
  const maxiOptions:Option[] = [
    {
      name:dictionary["Half-Sleeve"],
      url:"/items?=HalfSleeve"
    },
    {
      name:dictionary["Full-Sleeve"],
      url:"/items?=FullSleeve"
    },

  ]
  return (
    <div className={classes.container}>
      <Dropdown label={dictionary["pardhas"]} directLink={"/items?=pardhas"} />
      <Dropdown
        label={dictionary["nighties"]}
        options={maxiOptions}
      />
      <Dropdown
        label={dictionary["inner-wear"]}
        directLink={"items?=innerWear"}
      />
      <Dropdown label={dictionary["men"]} options={menOptions} />
    </div>
  );
}

export default DropdownSection;
