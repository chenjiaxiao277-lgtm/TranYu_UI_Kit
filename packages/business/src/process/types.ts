export type ProcessStatus = 'pending' | 'processing' | 'completed' | 'rejected' | 'returned' | 'overdue' | 'draft' | 'closed';

export type ProcessActionType = 'submit' | 'approve' | 'reject' | 'return' | 'transfer' | 'addSign' | 'forcePass' | 'close' | 'reopen';

export interface ProcessNode {
  id: string;
  name: string;
  nodeName: string;
  nodeType: 'start' | 'approval' | 'end' | 'parallel' | 'sequential';
  assignee?: string;
  assigneeName?: string;
  status: ProcessStatus;
  startTime?: string;
  endTime?: string;
  dueDate?: string;
  isOverdue?: boolean;
  remark?: string;
}

export interface ProcessAction {
  id: string;
  name: string;
  label: string;
  type: ProcessActionType;
  requiresApproval?: boolean;
  requiresRemark?: boolean;
  requiresConfirm?: boolean;
  confirmMessage?: string;
  disabled?: boolean;
  disabledReason?: string;
  icon?: string;
  buttonType?: 'primary' | 'secondary' | 'danger';
}

export interface ProcessLog {
  id: string;
  action: ProcessActionType;
  actionName: string;
  actor: string;
  actorName: string;
  nodeName: string;
  remark?: string;
  attachments?: string[];
  timestamp: string;
  result?: 'success' | 'failure';
  duration?: number;
}

export interface ProcessInstance {
  id: string;
  processType: string;
  processName: string;
  objectId?: string;
  objectName?: string;
  currentNode: ProcessNode;
  allNodes: ProcessNode[];
  status: ProcessStatus;
  initiator: string;
  initiatorName: string;
  startTime: string;
  endTime?: string;
  dueDate?: string;
  priority?: 'low' | 'normal' | 'high' | 'urgent';
  logs: ProcessLog[];
  actions: ProcessAction[];
}

export interface ProcessTaskCard {
  id: string;
  processType: string;
  processName: string;
  objectId: string;
  objectName: string;
  currentNode: string;
  assignee: string;
  assigneeName: string;
  dueDate: string;
  status: ProcessStatus;
  isOverdue: boolean;
  actions: ProcessAction[];
}

export interface ApprovalActionModalProps {
  visible: boolean;
  action: ProcessAction;
  remark?: string;
}

export interface ProcessStatusTagProps {
  status: ProcessStatus;
  isOverdue?: boolean;
}

export interface ProcessTimelineProps {
  nodes: ProcessNode[];
  currentNodeId?: string;
}

export interface ProcessActionBarProps {
  actions: ProcessAction[];
  disabled?: boolean;
}

export interface ProcessTaskCardProps {
  task: ProcessTaskCard;
}

export interface ProcessLogListProps {
  logs: ProcessLog[];
  loading?: boolean;
}

export interface ProcessNodeCardProps {
  node: ProcessNode;
  isActive?: boolean;
  onNodeClick?: (nodeId: string) => void;
}

export interface ProcessAuditResultProps {
  log: ProcessLog;
}
