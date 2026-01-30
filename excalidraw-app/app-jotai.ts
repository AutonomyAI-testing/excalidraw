// eslint-disable-next-line no-restricted-imports
import {
  atom,
  Provider,
  useAtom,
  useAtomValue,
  useSetAtom,
  createStore,
  type PrimitiveAtom,
} from "jotai";
import { useLayoutEffect } from "react";

export const appJotaiStore = createStore();

export { atom, Provider, useAtom, useAtomValue, useSetAtom };

export const useAtomWithInitialValue = <
  T extends unknown,
  A extends PrimitiveAtom<T>,
>(
  atom: A,
  initialValue: T | (() => T),
) => {
  const [value, setValue] = useAtom(atom);

  useLayoutEffect(() => {
    if (typeof initialValue === "function") {
      // @ts-ignore
      setValue(initialValue());
    } else {
      setValue(initialValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [value, setValue] as const;
};

// Auth state atoms
export const authDialogStateAtom = atom<
  { isOpen: false } | { isOpen: true; mode: "signin" | "signup" }
>({ isOpen: false });

export const currentUserAtom = atom<{
  uid: string;
  email: string;
  displayName?: string;
} | null>(null);

export const authLoadingAtom = atom<boolean>(false);
export const authErrorAtom = atom<string | null>(null);
