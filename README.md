# TranYu UI Kit

Enterprise-grade design system and component library with monday.com-inspired UI constraints.

## Project Positioning

A comprehensive Vue 3 component library with:
- Design token system (colors, spacing, radius, shadows, motion)
- Arco Design Vue wrapper components enforcing design consistency
- ESLint & Stylelint enforcement for strict UI constraints
- Centralized style management via CSS Variables

## Tech Stack

- **Vue**: 3.5+
- **Vite**: 5.4+ (dev server & build)
- **Arco Design Vue**: 2.53+ (wrapped components)
- **TypeScript**: 5.4+
- **Sass**: 1.77+ (component styles)
- **ESLint**: 8.57+ (code linting)
- **Stylelint**: 16.26+ (style linting)
- **pnpm**: workspaces (monorepo management)

## Directory Structure

```
tranyu-ui-kit/
├── packages/
│   ├── theme/                    # Design token system
│   │   ├── src/tokens.ts         # Token definitions
│   │   ├── scripts/build.js      # CSS Variables generator
│   │   ├── dist/                 # Generated outputs
│   │   │   ├── theme.css         # 56 CSS Variables
│   │   │   ├── tokens.js
│   │   │   └── index.js
│   │   └── package.json
│   └── ui/                       # Wrapped components
│       ├── src/
│       │   ├── components/       # 6 wrapped Arco components
│       │   │   ├── TrButton.vue
│       │   │   ├── TrCard.vue
│       │   │   ├── TrTag.vue
│       │   │   ├── TrTable.vue
│       │   │   ├── TrDrawer.vue
│       │   │   └── TrPageHeader.vue
│       │   └── index.ts
│       └── package.json
├── playground/                   # Demo & StyleGuide
│   ├── src/
│   │   ├── views/StyleGuide.vue  # Component showcase
│   │   ├── App.vue
│   │   ├── main.ts
│   │   └── router.ts
│   ├── index.html
│   ├── vite.config.ts
│   └── package.json
├── .eslintrc.cjs                 # ESLint configuration
├── .stylelintrc.cjs              # Stylelint configuration
├── tsconfig.json                 # TypeScript configuration
├── pnpm-workspace.yaml           # Workspace configuration
└── package.json                  # Root package.json
```

## Getting Started

### Installation

```bash
pnpm install
```

### Development

```bash
# Start playground dev server (http://localhost:5173)
pnpm dev

# ESLint check
pnpm lint

# Stylelint check
pnpm style

# Build theme tokens
pnpm build
```

## Component Usage

### Import Components

```typescript
// ✓ Correct: Import from @tranyu/ui
import {
  TrButton,
  TrCard,
  TrTag,
  TrTable,
  TrDrawer,
  TrPageHeader,
  AppLayout,
  PageContainer,
  ToolBar,
  FilterBar,
  ActionBar,
} from '@tranyu/ui';

// ✗ Wrong: Don't import from @arco-design/web-vue directly
import { Button } from '@arco-design/web-vue'; // ESLint error
```

### Layout Components (v0.2.0+)

9 layout components for building application structure:

1. **AppLayout** - Main application frame with sidebar
2. **HeaderBar** - Top navigation with logo, theme switch, user menu
3. **SideBar** - Navigation sidebar with menu items
4. **PageContainer** - Page wrapper with header and body sections
5. **ToolBar** - Action bar with left/center/right slots
6. **FilterBar** - Filter controls container
7. **ActionBar** - Bottom action buttons container
8. **ThemeSwitch** - Theme toggle button
9. **UserAvatarMenu** - User profile dropdown menu

### Component Examples

#### Basic Components

```vue
<template>
  <!-- Button -->
  <tr-button type="primary" size="large">Submit</tr-button>
  
  <!-- Card -->
  <tr-card title="Card Title" hoverable>
    <p>Card content</p>
    <template #footer>
      <tr-button type="primary">Action</tr-button>
    </template>
  </tr-card>
  
  <!-- Tag -->
  <tr-tag color="blue" closable>Label</tr-tag>
  
  <!-- Table -->
  <tr-table :columns="columns" :data="data" />
  
  <!-- Drawer -->
  <tr-drawer title="Drawer" :visible="visible" @cancel="visible = false">
    Drawer content
  </tr-drawer>
  
  <!-- PageHeader -->
  <tr-page-header title="Page Title" subtitle="Subtitle">
    <tr-button type="primary">Action</tr-button>
  </tr-page-header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { TrButton, TrCard, TrTag, TrTable, TrDrawer, TrPageHeader } from '@tranyu/ui';
import '@tranyu/theme/dist/theme.css';

const visible = ref(false);
</script>
```

#### Layout Example

```vue
<template>
  <app-layout :show-sidebar="true">
    <page-container>
      <template #header>
        <tr-page-header title="Dashboard" />
      </template>

      <toolbar>
        <template #left>
          <tr-button type="primary">Create</tr-button>
        </template>
      </toolbar>

      <filter-bar>
        <select>
          <option>All</option>
          <option>Active</option>
        </select>
      </filter-bar>

      <tr-card>
        <tr-table :columns="columns" :data="data" />
      </tr-card>

      <action-bar>
        <tr-button type="primary">Save</tr-button>
      </action-bar>
    </page-container>
  </app-layout>
</template>

<script setup lang="ts">
import { AppLayout, PageContainer, ToolBar, FilterBar, ActionBar, TrPageHeader, TrCard, TrButton, TrTable } from '@tranyu/ui';
import '@tranyu/theme/dist/theme.css';
</script>
```

#### BusinessObject Example (v0.3.0+)

```vue
<template>
  <page-container>
    <template #header>
      <tr-page-header title="Projects" />
    </template>

    <!-- Toolbar for create, search, refresh -->
    <object-toolbar
      :object-type="'project'"
      @create="handleCreate"
      @search="handleSearch"
      @refresh="handleRefresh"
    />

    <!-- Dynamic table from field configuration -->
    <object-table
      :object-type="'project'"
      :fields="fields"
      :records="projects"
      :status-field="'status'"
      :status-options="statusOptions"
      :actions="actions"
      @row-click="selectedProject = $event"
      @action="handleAction"
    />

    <!-- Detail drawer for viewing/editing -->
    <object-detail-drawer
      :visible="drawerVisible"
      :record="selectedProject"
      :fields="fields"
      :status-field="'status'"
      :status-options="statusOptions"
      :actions="actions"
      @close="drawerVisible = false"
      @action="handleDetailAction"
    />
  </page-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ObjectToolbar, ObjectTable, ObjectDetailDrawer } from '@tranyu/business/object';
import type { ObjectField, ObjectRecord, ObjectAction, StatusOption } from '@tranyu/business/object';
import '@tranyu/theme/dist/theme.css';

const drawerVisible = ref(false);
const selectedProject = ref<ObjectRecord | undefined>();

// Configuration-driven: same components work for projects, demands, risks, etc.
const fields: ObjectField[] = [
  { id: 'name', name: 'name', label: 'Name', type: 'text', required: true },
  { id: 'status', name: 'status', label: 'Status', type: 'status' },
  { id: 'budget', name: 'budget', label: 'Budget', type: 'amount' },
  { id: 'progress', name: 'progress', label: 'Progress', type: 'percent' },
  { id: 'owner', name: 'owner', label: 'Owner', type: 'user' },
];

const statusOptions: StatusOption[] = [
  { value: 'planning', label: 'Planning', color: 'var(--tr-color-warning)' },
  { value: 'active', label: 'Active', color: 'var(--tr-color-success)' },
  { value: 'completed', label: 'Completed', color: 'var(--tr-color-info)' },
  { value: 'canceled', label: 'Canceled', color: 'var(--tr-color-neutral500)' },
];

const actions: ObjectAction[] = [
  { id: 'edit', name: 'edit', label: 'Edit', type: 'primary' },
  { id: 'delete', name: 'delete', label: 'Delete', type: 'danger', requiresConfirm: true },
];

const projects: ObjectRecord[] = [
  {
    id: '1',
    objectType: 'project',
    data: { name: 'Platform v3.0', status: 'active', budget: 50000, progress: 0.65, owner: 'Alice' },
    status: 'active',
  },
];

const handleCreate = () => console.log('Create new project');
const handleSearch = (query: string) => console.log('Search:', query);
const handleRefresh = () => console.log('Refresh projects');
const handleAction = (action: ObjectAction, record: ObjectRecord) => console.log('Action:', action.id, record.id);
const handleDetailAction = (action: ObjectAction) => console.log('Detail action:', action.id);
</script>
```

## Design System

### Available Tokens

**Colors** (20): primary, neutral (0-900), success, warning, danger, info, error  
**Radius** (7): none, xs, sm, md, lg, xl, full  
**Spacing** (16): 0-15 (2px to 80px)  
**Shadows** (5): none, xs, sm, md, lg, xl  
**Motion** (7): fast, normal, slow, slowest + easing functions

### Token Usage

All component styles use CSS Variables:

```css
.tr-button {
  background-color: var(--tr-color-primary);
  border-radius: var(--tr-radius-md);
  padding: var(--tr-spacing-4);
  transition: all var(--tr-motion-normal) var(--tr-motion-easeInOut);
  box-shadow: var(--tr-shadow-sm);
}
```

### Custom Component Example

```vue
<template>
  <div class="my-component">
    <h2>Custom Component</h2>
    <p>Using theme tokens</p>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.my-component {
  /* ✓ Correct: Use CSS Variables */
  background-color: var(--tr-color-neutral50);
  color: var(--tr-color-neutral900);
  padding: var(--tr-spacing-6);
  border-radius: var(--tr-radius-lg);
  border: 1px solid var(--tr-color-neutral200);
  
  /* ✗ Wrong: Don't hardcode colors */
  /* background-color: #f8f8fa; */  /* Stylelint error */
}
</style>
```

## Constraints & Rules

### 1. CSS Variables Only
- **Rule**: All component styles MUST use `var(--tr-*)`
- **Enforcement**: Stylelint `color-no-hex: true`
- **Violation**: Build fails

### 2. No Direct Arco Imports
- **Rule**: Business pages import from `@tranyu/ui` only
- **Enforcement**: ESLint `no-restricted-imports`
- **Violation**: Lint fails
- **Exception**: `packages/ui/*` and `playground/*` allowed

### 3. Use Design Tokens
- **Colors**: `var(--tr-color-*)`
- **Spacing**: `var(--tr-spacing-*)`
- **Radius**: `var(--tr-radius-*)`
- **Shadows**: `var(--tr-shadow-*)`
- **Motion**: `var(--tr-motion-*)`

### 4. Component Props
All wrapped components use TypeScript interfaces with default values for optional props.

## Version History

### v0.3.0 (Current)
BusinessObject-driven configuration system enabling reusable components for any object type:

**Core Components**:
- ✓ ObjectTable - Dynamic table from ObjectField[] configuration
- ✓ ObjectDetailDrawer - Modal detail view with field-by-field display
- ✓ ObjectToolbar - Multi-slot action bar (create, search, refresh)
- ✓ ObjectStatusTag - Unified status badge with configurable colors
- ✓ ObjectFieldRenderer - Type-aware field rendering (16+ types)
- ✓ ObjectForm - Dynamic form building (P1 - basic implementation)
- ✓ ObjectFilterBar - Dynamic filter UI (P1 - placeholder)
- ✓ ObjectRelationPanel - Related object display (P1 - placeholder)

**Field Types Supported** (16):
text, textarea, number, date, datetime, select, multiSelect, user, department, status, amount, percent, file, relation, richText, json

**Data Model** (`types.ts`):
- FieldType: 16 configurable field types
- ObjectField: Field definition with type, options, validation
- ObjectRecord: Data container with id, objectType, data, status, timestamps
- ObjectAction: Action definition with type, confirm options
- StatusOption: Color-mapped status values
- ObjectConfig: Complete object type configuration

**Demo Pages** (3 concrete implementations):
- ProjectObjectDemo - Projects with budget, progress, owner, dates
- DemandObjectDemo - Requirements with priority, assignee, effort
- RiskObjectDemo - Risks with level, probability, impact, mitigation

**Verification**:
- ✓ `pnpm lint` - ESLint passes with TypeScript strict rules
- ✓ `pnpm style` - Stylelint passes with no hardcoded colors
- ✓ `pnpm build` - Theme build succeeds

### v0.2.0
- ✓ Layout Components (AppLayout, HeaderBar, SideBar, PageContainer, ToolBar, FilterBar, ActionBar, ThemeSwitch, UserAvatarMenu)
- ✓ Layout Demo Pages (LayoutDemo, WorkbenchLayoutDemo)
- ✓ Refactored ObjectListPage with layout components
- ✓ All layout components use CSS Variables

### v0.1.0
- ✓ Design Token System (56 CSS Variables)
- ✓ 6 Wrapped Components (TrButton, TrCard, TrTag, TrTable, TrDrawer, TrPageHeader)
- ✓ StyleGuide Showcase Page
- ✓ ESLint no-restricted-imports enforcement
- ✓ Stylelint color-no-hex enforcement

## Contributing

1. Create components in `packages/ui/src/components/`
2. All styles must use `var(--tr-*)`
3. Update `packages/ui/src/components/index.ts`
4. Run `pnpm lint && pnpm style`
5. Test in `playground/src/views/StyleGuide.vue`

## License

MIT
