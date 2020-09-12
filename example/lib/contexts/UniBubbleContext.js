import { createContext } from "react";

export const defaultContext = Object.freeze({
  offsets: [],
});

const UniBubbleContext = createContext(defaultContext);

export default UniBubbleContext;
