import React from "react";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DropDown({
  selected,
  list,
  isToggle,
  handleChange,
  handleToggle,
}) {
  console.log(isToggle);

  return (
    <div className="flex flex-col w-24 relative border-2">
      {selected && (
        <span
          className="flex justify-around items-center cursor-pointer p-2 text-lg font-bold"
          onClick={() => handleToggle((prev) => !prev)}
        >
          {selected}
          <FontAwesomeIcon icon={faCaretDown} />
        </span>
      )}

      {isToggle && (
        <div className="absolute top-12 -left-0.5 flex flex-col w-24 border-2">
          {list.map((item, key) => (
            <span
              key={key}
              className="p-2 text-lg cursor-pointer hover:bg-gray-300"
              onClick={() => handleChange(item)}
            >
              {item}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
