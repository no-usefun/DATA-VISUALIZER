export type EventType =
  | "HIGHLIGHT"
  | "COMPARE"
  | "SWAP"
  | "MOVE"
  | "INSERT"
  | "MARK_SORTED"
  | "BREAK"
  | "SET_PIVOT"
  | "RANGE"
  | "MERGE"
  | "HEAPIFY"
  | "REMOVE"
  | "SHIFT"
  | "WRITE"
  | "START"
  | "CHECK"
  | "VISIT_NODE"
  | "ADD_RESULT_NODE"
  | "ADD_RESULT_VALUE"
  | "SET_TREE_VALUE";

interface BaseEvent {
  type: EventType;
  data?: {};
  line: number;
}

export interface CompareEvent extends BaseEvent {
  type: "COMPARE" | "HIGHLIGHT" | "SWAP";
  data: {
    i: number;
    j: number;
    source?: "array" | "left" | "right";
  };
}

export interface MoveEvent extends BaseEvent {
  type: "MOVE";
  data: {
    from?: number;
    to: number;
    value?: number;
  };
}

export interface InsertEvent extends BaseEvent {
  type: "INSERT";
  data: {
    index: number;
    value: number;
  };
}

export interface MarkSortedEvent extends BaseEvent {
  type: "MARK_SORTED";
  data: {
    index: number;
  };
}

export interface BreakEvent extends BaseEvent {
  type: "BREAK";
  data: {
    i: number;
    key: number;
  };
}

export interface PivotEvent extends BaseEvent {
  type: "SET_PIVOT" | "CHECK";
  data: {
    index: number;
  };
}

export interface StartEvent extends BaseEvent {
  type: "START";
}

export interface RangeEvent extends BaseEvent {
  type: "RANGE";
  data: {
    start: number;
    end: number;
  };
}

export interface MergeEvent extends BaseEvent {
  type: "MERGE";
  data: {
    left: number;
    mid: number;
    right: number;
  };
}

export interface HeapifyEvent extends BaseEvent {
  type: "HEAPIFY";
  data: {
    index: number;
    size: number;
  };
}

export interface RemoveEvent extends BaseEvent {
  type: "REMOVE";
  data: { index: number };
}

export interface ShiftEvent extends BaseEvent {
  type: "SHIFT";
  data: {
    from: number;
    to: number;
  };
}

export interface WriteEvent extends BaseEvent {
  type: "WRITE";
  data: {
    index: number;
    value: number;
  };
}

export interface TreeNodeEvent extends BaseEvent {
  type: "VISIT_NODE" | "ADD_RESULT_NODE" | "SET_TREE_VALUE";
  data: {
    nodeId: string;
    value: number;
  };
}

export interface TreeResultValueEvent extends BaseEvent {
  type: "ADD_RESULT_VALUE";
  data: {
    value: number;
  };
}

export type ExecutionEvent =
  | CompareEvent
  | MoveEvent
  | InsertEvent
  | MarkSortedEvent
  | BreakEvent
  | PivotEvent
  | RangeEvent
  | MergeEvent
  | HeapifyEvent
  | RemoveEvent
  | ShiftEvent
  | WriteEvent
  | TreeNodeEvent
  | TreeResultValueEvent
  | StartEvent;

export interface ExecutionResponse {
  success: boolean;
  data: ExecutionEvent[];
  error: string | null;
}
