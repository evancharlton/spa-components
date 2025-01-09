import { createContext, useContext } from "react";
import { PRNG, Seed } from "./random";

export type RandomItem = <T = unknown>(
  items: {
    [index: number]: T;
    length: number;
  },
  random: PRNG,
) => T;

export const RandomContext = createContext<
  | { random: PRNG; randomItem: RandomItem; create: (seed: Seed) => PRNG }
  | undefined
>(undefined);

export const useRandom = () => {
  const context = useContext(RandomContext);
  if (!context) {
    throw new Error("Must be used inside of <RandomContext.Provider .. />!");
  }
  return context;
};
