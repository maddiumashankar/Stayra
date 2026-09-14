export type AiAgentType =
  | 'RECOMMENDATION'
  | 'COMPLAINT'
  | 'BILLING'
  | 'OWNER_COPILOT';

export interface AiToolCallDTO {
  toolName: string;
  arguments: Record<string, unknown>;
}

export interface AiAuditLogDTO {
  id: string;
  userId: string;
  agentType: AiAgentType;
  actionType: string;
  promptTokens: number;
  completionTokens: number;
  costUsd: number;
  modelVersion: string;
  toolName?: string | null;
  toolArguments?: Record<string, unknown> | null;
  toolResult?: Record<string, unknown> | null;
  latencyMs: number;
  createdAt: string;
}
