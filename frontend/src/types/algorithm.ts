export type EventType = "HIGHLIGHT" | "COMPARE" | "SWAP" | "MARK_SORTED";

export type ExecutionEvent =
  | {
      type: "HIGHLIGHT" | "COMPARE" | "SWAP";
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
    };

export interface ExecutionResponse {
  success: boolean;
  data: ExecutionEvent[];
  error: string | null;
}
