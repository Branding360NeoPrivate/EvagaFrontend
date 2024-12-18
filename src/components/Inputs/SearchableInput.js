import React, { useEffect, useState } from "react";

function SearchableInput({ items, value, onSelect, min, def }) {
  const [searchTerm, setSearchTerm] = useState(def ? def : "");
  const [filteredItems, setFilteredItems] = useState([]);
  const [isInputFocused, setIsInputFocused] = useState(false);

  // Filter items based on search term
  const handleFilter = () => {
    const filterResult = items?.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filterResult || []);
  };

  useEffect(() => {
    if (searchTerm && items) {
      handleFilter();
    } else {
      setFilteredItems([]);
    }
  }, [searchTerm, items]);

  const handleSelect = (item) => {
    setSearchTerm(item.name);
    onSelect(item);
    setTimeout(() => {
      setFilteredItems([]);
    }, 100);
  };

  const handleDropdownScroll = (e) => {
    e.stopPropagation();
  };
  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder={"Search..."}
        value={searchTerm}
        onFocus={() => setIsInputFocused(true)}
        onBlur={() => setIsInputFocused(false)}
        min={min}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 border rounded-md bg-gray-100 focus:outline-none"
      />
      {searchTerm && filteredItems.length > 0 && isInputFocused && (
        <ul
          className="absolute z-10 bg-white border rounded-md mt-1 max-h-[200px] w-[300px] overflow-y-scroll"
          onWheel={handleDropdownScroll}
        >
          {filteredItems.map((item) => (
            <li
              key={item.id}
              onClick={() => handleSelect(item)}
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchableInput;
