export type Backend = {
  id: string;
  name: string;
  url: string;
  secret: string;
};

export type Traffic = { up: number; down: number };

export type ConnectionMetadata = {
  network?: string;
  type?: string;
  sourceIP?: string;
  destinationIP?: string;
  sourcePort?: string;
  destinationPort?: string;
  host?: string;
  dnsMode?: string;
};

export type Connection = {
  id: string;
  metadata: ConnectionMetadata;
  upload: number;
  download: number;
  start: string;
  chains: string[];
  rule: string;
  rulePayload: string;
};

export type Connections = {
  downloadTotal: number;
  uploadTotal: number;
  connections: Connection[];
};

export type LogLevel = "debug" | "info" | "warning" | "error";
export type LogEntry = { type: LogLevel; payload: string; time: string };

export type ClashProxy = {
  name: string;
  history?: Array<{ time: string; delay: number }>;
  all?: string[];
  now?: string;
  type: string;
};

export type Rule = { type: string; payload: string; proxy: string };
export type Mode = "rule" | "global" | "direct" | "script";
export type Config = { mode: Mode; [key: string]: unknown };
