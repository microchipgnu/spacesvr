import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { WorldSate } from "../types/world";
import { useKeyCode } from "..";

export const WorldContext = createContext<WorldSate>({} as WorldSate);

export function useWorld() {
  return useContext(WorldContext);
}

export default function World(props: { children: ReactNode | ReactNode[] }) {
  const { children } = props;

  const [level, setLevel] = useState(0);

  useKeyCode(
    "g",
    () => {
      setLevel(level + 1);
      console.log("level: ", level + 1);
    },
    [level]
  );
  useKeyCode(
    "v",
    () => {
      setLevel(level - 1);
      console.log("level: ", level - 1);
    },
    [level]
  );

  return (
    <WorldContext.Provider value={{ level, setLevel }}>
      {children}
    </WorldContext.Provider>
  );
}
