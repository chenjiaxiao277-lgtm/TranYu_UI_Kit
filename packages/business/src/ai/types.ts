export type AiActionType = 'generate' | 'summary' | 'check' | 'analyze' | 'suggest' | 'rewrite' | 'extract';

export type AiExecutionStatus = 'pending' | 'loading' | 'success' | 'failed' | 'partial';

export type AiRiskLevel = 'low' | 'medium' | 'high' | 'critical';

export interface AiActionConfig {
  type: AiActionType;
  label: string;
  description?: string;
  icon?: string;
  disabled?: boolean;
  disabledReason?: string;
  requiresConfirm?: boolean;
}

export interface AiSuggestion {
  id: string;
  title: string;
  content: string;
  rationale: string;
  confidence: number;
  riskLevel: AiRiskLevel;
  references: KnowledgeReference[];
  modelName?: string;
  timestamp?: string;
}

export interface AiCheckItem {
  id: string;
  title: string;
  description?: string;
  passed: boolean;
  riskLevel: AiRiskLevel;
  issues?: string[];
  suggestions?: string[];
  evidence?: string;
}

export interface KnowledgeReference {
  id: string;
  title: string;
  source: string;
  relevance: number;
  url?: string;
}

export interface AiExecutionLogItem {
  id: string;
  actionName: string;
  actionType: AiActionType;
  status: AiExecutionStatus;
  modelName: string;
  duration: number;
  tokenUsage?: {
    prompt: number;
    completion: number;
    total: number;
  };
  errorMessage?: string;
  timestamp: string;
  input?: unknown;
  output?: unknown;
}

export interface AiActionButtonProps {
  actions: AiActionConfig[];
  disabled?: boolean;
  loading?: boolean;
}

export interface AiSuggestionPanelProps {
  suggestion: AiSuggestion;
  loading?: boolean;
}

export interface AiCheckResultProps {
  items: AiCheckItem[];
  summary?: string;
}

export interface AiGenerateModalProps {
  visible: boolean;
  title?: string;
  result?: string;
  loading?: boolean;
  status?: AiExecutionStatus;
  errorMessage?: string;
}

export interface AiConfirmBarProps {
  loading?: boolean;
  status?: AiExecutionStatus;
  errorMessage?: string;
}

export interface AiExecutionLogProps {
  items: AiExecutionLogItem[];
  loading?: boolean;
}

export interface AiStatusTagProps {
  status: AiExecutionStatus;
  riskLevel?: AiRiskLevel;
}

export interface KnowledgeReferenceListProps {
  references: KnowledgeReference[];
}
