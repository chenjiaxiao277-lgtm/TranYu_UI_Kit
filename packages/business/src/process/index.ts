export { default as ProcessStatusTag } from './ProcessStatusTag.vue';
export { default as ProcessTimeline } from './ProcessTimeline.vue';
export { default as ProcessActionBar } from './ProcessActionBar.vue';
export { default as ProcessTaskCard } from './ProcessTaskCard.vue';
export { default as ProcessLogList } from './ProcessLogList.vue';
export { default as ProcessNodeCard } from './ProcessNodeCard.vue';
export { default as ProcessAuditResult } from './ProcessAuditResult.vue';
export { default as ApprovalActionModal } from './ApprovalActionModal.vue';

export type {
  ProcessStatus,
  ProcessActionType,
  ProcessNode,
  ProcessAction,
  ProcessInstance,
  ProcessLog,
  ProcessTaskCard as ProcessTaskCardType,
  ApprovalActionModalProps,
  ProcessStatusTagProps,
  ProcessTimelineProps,
  ProcessActionBarProps,
  ProcessTaskCardProps,
  ProcessLogListProps,
  ProcessNodeCardProps,
  ProcessAuditResultProps,
} from './types';
