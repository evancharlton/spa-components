import { ReactNode, useCallback, useMemo } from "react";
import { mulberry32, PRNG, Seed } from "./random";
import { RandomContext, RandomItem } from "./context";

type Props = {
  seed: Seed;
  children: ReactNode;
};

export const RandomProvider = ({ children, seed }: Props) => {
  const create = useCallback((seed: Seed) => mulberry32(seed), []);
  const random: PRNG = useMemo(() => mulberry32(seed), [seed]);
  const randomItem: RandomItem = useCallback(
    (items) => items[Math.floor(random() * items.length)],
    [random],
  );

  return (
    <RandomContext.Provider value={{ random, create, randomItem }}>
      {children}
    </RandomContext.Provider>
  );
};
