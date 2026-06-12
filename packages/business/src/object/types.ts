export type FieldType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'date'
  | 'datetime'
  | 'select'
  | 'multiSelect'
  | 'user'
  | 'department'
  | 'status'
  | 'amount'
  | 'percent'
  | 'file'
  | 'relation'
  | 'richText'
  | 'json';

export interface FieldOption {
  label: string;
  value: string | number;
  color?: string;
}

export interface ObjectField {
  id: string;
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  readOnly?: boolean;
  placeholder?: string;
  options?: FieldOption[];
  maxLength?: number;
  minValue?: number;
  maxValue?: number;
  format?: string;
  relationObjectType?: string;
  relatedFieldId?: string;
  description?: string;
  visible?: boolean;
}

export interface StatusOption {
  value: string;
  label: string;
  color: string;
}

export interface ObjectRecord {
  id: string;
  objectType: string;
  data: Record<string, string | number | boolean | null | undefined>;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
}

export interface ObjectView {
  id: string;
  name: string;
  objectType: string;
  fields: ObjectField[];
  displayFields?: string[];
  filters?: ObjectFilter[];
  sorts?: ObjectSort[];
  pageSize?: number;
}

export interface ObjectFilter {
  fieldId: string;
  operator: 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'contains' | 'startsWith' | 'endsWith';
  value: string | number | boolean | null;
}

export interface ObjectSort {
  fieldId: string;
  order: 'asc' | 'desc';
}

export interface ObjectAction {
  id: string;
  name: string;
  label: string;
  type: 'primary' | 'secondary' | 'danger';
  icon?: string;
  requiresConfirm?: boolean;
  confirmMessage?: string;
}

export interface ObjectPermission {
  create?: boolean;
  read?: boolean;
  update?: boolean;
  delete?: boolean;
  export?: boolean;
  import?: boolean;
  fields?: Record<string, { read?: boolean; write?: boolean }>;
}

export interface ObjectConfig {
  type: string;
  label: string;
  fields: ObjectField[];
  statusField?: string;
  statusOptions?: StatusOption[];
  actions?: ObjectAction[];
  permissions?: ObjectPermission;
  defaultView?: ObjectView;
}

export interface ObjectTableProps {
  objectType: string;
  fields: ObjectField[];
  records: ObjectRecord[];
  loading?: boolean;
  statusField?: string;
  statusOptions?: StatusOption[];
  actions?: ObjectAction[];
  selectable?: boolean;
  onRowClick?: (record: ObjectRecord) => void;
  onAction?: (action: ObjectAction, record: ObjectRecord) => void;
}

export interface ObjectFieldRendererProps {
  field: ObjectField;
  value: string | number | boolean | null | Record<string, unknown> | unknown[];
  readonly?: boolean;
  statusOptions?: StatusOption[];
}

export interface ObjectDetailDrawerProps {
  visible: boolean;
  record?: ObjectRecord;
  fields: ObjectField[];
  statusField?: string;
  statusOptions?: StatusOption[];
  actions?: ObjectAction[];
  loading?: boolean;
  onClose?: () => void;
  onAction?: (action: ObjectAction) => void;
  onSave?: (data: string | number | boolean | null | Record<string, unknown>) => void;
}

export interface ObjectToolbarProps {
  objectType: string;
  onSearch?: (query: string) => void;
  onCreate?: () => void;
  onRefresh?: () => void;
  onBatchAction?: (action: string) => void;
  showCreate?: boolean;
  showSearch?: boolean;
  showRefresh?: boolean;
}

export type ObjectFormMode = 'create' | 'edit' | 'readonly' | 'approve' | 'inline';

export interface ObjectFormGroup {
  id: string;
  title: string;
  description?: string;
  fields: ObjectField[];
  collapsible?: boolean;
  defaultExpanded?: boolean;
}

export interface ObjectFormConfig {
  objectType: string;
  mode: ObjectFormMode;
  fields: ObjectField[] | ObjectFormGroup[];
  record?: ObjectRecord;
  permissions?: ObjectPermission;
  hiddenFields?: string[];
  readOnlyFields?: string[];
  requiredFields?: string[];
  fieldDefaults?: Record<string, unknown>;
  validation?: Record<string, unknown>;
  onSubmit?: (payload: ObjectFormSubmitPayload) => Promise<void>;
  onCancel?: () => void;
  onSave?: (data: Record<string, unknown>) => Promise<void>;
}

export interface ObjectFormSubmitPayload {
  objectType: string;
  mode: ObjectFormMode;
  recordId?: string;
  data: Record<string, unknown>;
  changedFields?: string[];
  timestamp: number;
}
