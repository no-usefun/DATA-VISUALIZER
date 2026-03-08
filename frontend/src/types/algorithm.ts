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
  | "SHIFT";

interface BaseEvent {
  type: EventType;
  line: number;
}

export interface CompareEvent extends BaseEvent {
  type: "COMPARE" | "HIGHLIGHT" | "SWAP";
  data: {
    i: number;
    j: number;
  };
}

export interface MoveEvent extends BaseEvent {
  type: "MOVE";
  data: {
    from: number;
    to: number;
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
  type: "SET_PIVOT";
  data: {
    index: number;
  };
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
  line: number;
}

export interface ShiftEvent extends BaseEvent {
  type: "SHIFT";
  data: {
    from: number;
    to: number;
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
  | ShiftEvent;

export interface ExecutionResponse {
  success: boolean;
  data: ExecutionEvent[];
  error: string | null;
}
