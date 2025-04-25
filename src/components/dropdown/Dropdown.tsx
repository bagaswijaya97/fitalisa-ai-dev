import { CheckCheck, CheckCheckIcon, CheckCircle, CheckCircle2, CheckSquare, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { list_engine } from "../../constants";

interface DropdownProps {
  engine_index: number,
  setEngine: React.Dispatch<React.SetStateAction<number>>
}

const Dropdown = ({
  engine_index,
  setEngine
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center gap-1 px-4 py-2 rounded-md hover:bg-[#f7f7f7] transition-all"
      >
        <span className="text-sm text-[#30A7DA]">{list_engine[engine_index].name}</span>
        <ChevronDown size={15} className="mt-1 text-[#30A7DA]" />
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-48 border border-[#eeeeee] bg-white rounded-xl shadow-lg z-10">
          <ul className="px-1 py-1 text-xs">
            {list_engine.map((item, i) => {
              return (
                <li
                  key={i}
                  onClick={() => {
                    setEngine(i);
                    setIsOpen(false);
                  }}
                  className={`px-4 py-3 rounded-lg text-[#30A7DA] hover:bg-[#f3f2f2] cursor-pointer flex items-center justify-between`}>
                  {item.name}
                  {engine_index == i && (
                    <CheckCircle2 size={15} />
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
