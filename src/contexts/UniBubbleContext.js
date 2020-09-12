import { createContext } from "react";

export const defaultContext = Object.freeze({
  bubbles: [],
  offsets: [],
});

const UniBubbleContext = createContext(defaultContext);

export default UniBubbleContext;
