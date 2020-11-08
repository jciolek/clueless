export type UndoableEnhancerProps = {
  stateProp?: string;
  undoType?: string;
  redoType?: string;
  undoLevels?: number;
};

export type UndoableStateType<State> = State & {
  [stateProp: string]: {
    past: Array<State>;
    future: Array<State>;
  };
};
