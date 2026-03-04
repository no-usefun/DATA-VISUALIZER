export type EventType =
  | "HIGHLIGHT"
  | "COMPARE"
  | "SWAP"
  | "MARK_SORTED"
  | "MOVE"
  | "INSERT";

export type ExecutionEvent =
  | {
      type: "HIGHLIGHT" | "COMPARE" | "SWAP" | "MOVE";
      data: {
        i: number;
        j: number;
      };
      line: number;
    }
  | {
      type: "MARK_SORTED";
      data: {
        index: number;
      };
      line: number;
    }
  | {
      type: "INSERT";
      data: {
        index: number;
        value: number;
      };
      line: number;
    };

export interface ExecutionResponse {
  success: boolean;
  data: ExecutionEvent[];
  error: string | null;
}
