//
// 
import { DocumentChunk } from "../Document/types"

export interface Message {
    role: "user" | "system";
    content: string;
    cached?: boolean;
    distance?: string;
}

export type QueryPayload = {
    chunks: DocumentChunk[];
    context: string;
    error: string;
    took: number;
}

export type Segment =
  | { role: "text"; content: string }
  | { type: "code"; language: string; content: string };
