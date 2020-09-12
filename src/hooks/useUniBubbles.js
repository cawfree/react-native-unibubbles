import { useContext } from "react";

import { UniBubbleContext } from "../contexts";

export default function useUniBubbles() {
  return useContext(UniBubbleContext);
};
