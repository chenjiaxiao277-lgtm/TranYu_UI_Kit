<template>
  <app-layout :show-sidebar="showSidebar" @toggle-sidebar="showSidebar = !showSidebar">
    <page-container>
      <template #header>
        <tr-page-header
          title="Objects"
          subtitle="Manage and organize your objects"
        >
          <template #extra>
            <tr-button type="primary" @click="showDrawer = true">
              Create Object
            </tr-button>
          </template>
        </tr-page-header>
      </template>

      <toolbar>
        <template #left>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search objects..."
            class="search-input"
          >
        </template>
        <template #right>
          <span style="font-size: 12px; color: var(--tr-color-neutral600)">
            {{ filteredObjects.length }} / {{ objects.length }}
          </span>
        </template>
      </toolbar>

      <filter-bar>
        <div class="filter-tags">
          <span style="font-size: 12px; color: var(--tr-color-neutral600); font-weight: 500">
            Status:
          </span>
          <tr-tag
            v-for="tag in availableStatuses"
            :key="tag"
            :color="getStatusColor(tag)"
            :class="{ active: selectedTags.includes(tag) }"
            closable
            @click="toggleTag(tag)"
          >
            {{ tag }}
          </tr-tag>
        </div>
      </filter-bar>

      <tr-card class="object-list-page__table" title="All Objects">
        <tr-table
          :columns="tableColumns"
          :data="filteredObjects"
          :pagination="{ pageSize: 10 }"
        >
          <template #status="{ record }">
            <tr-tag :color="getStatusColor(record.status)">
              {{ record.status }}
            </tr-tag>
          </template>
          <template #actions="{ record }">
            <div class="action-buttons">
              <tr-button
                type="primary"
                size="small"
                @click="editObject(record)"
              >
                Edit
              </tr-button>
              <tr-button
                type="secondary"
                size="small"
                @click="deleteObject(record.id)"
              >
                Delete
              </tr-button>
            </div>
          </template>
        </tr-table>
      </tr-card>

      <action-bar>
        <tr-button type="secondary">Export</tr-button>
        <tr-button type="primary">Bulk Actions</tr-button>
      </action-bar>
    </page-container>

    <!-- Create/Edit Drawer -->
    <tr-drawer
      :title="editingId ? 'Edit Object' : 'Create New Object'"
      :visible="showDrawer"
      @cancel="closeDrawer"
    >
      <div class="drawer-form">
        <div class="form-group">
          <label>Name</label>
          <input v-model="formData.name" type="text" placeholder="Object name">
        </div>
        <div class="form-group">
          <label>Type</label>
          <select v-model="formData.type">
            <option value="Document">Document</option>
            <option value="Database">Database</option>
            <option value="Report">Report</option>
            <option value="Dashboard">Dashboard</option>
          </select>
        </div>
        <div class="form-group">
          <label>Status</label>
          <select v-model="formData.status">
            <option value="Active">Active</option>
            <option value="Archived">Archived</option>
            <option value="Draft">Draft</option>
          </select>
        </div>
        <div class="form-group">
          <label>Description</label>
          <textarea v-model="formData.description" placeholder="Add description..." />
        </div>
      </div>

      <template #footer>
        <div class="drawer-footer">
          <tr-button type="secondary" @click="closeDrawer">Cancel</tr-button>
          <tr-button type="primary" @click="saveObject">
            {{ editingId ? 'Update' : 'Create' }}
          </tr-button>
        </div>
      </template>
    </tr-drawer>
  </app-layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import {
  AppLayout,
  PageContainer,
  Toolbar,
  FilterBar,
  ActionBar,
  TrPageHeader,
  TrCard,
  TrButton,
  TrTag,
  TrTable,
  TrDrawer,
} from '@tranyu/ui';

interface ObjectItem {
  id: string;
  name: string;
  type: string;
  status: 'Active' | 'Archived' | 'Draft';
  description: string;
  createdAt: string;
  owner: string;
}

const showSidebar = ref(true);
const objects = ref<ObjectItem[]>([
  {
    id: '1',
    name: 'Q1 Sales Report',
    type: 'Report',
    status: 'Active',
    description: 'Quarterly sales analysis',
    createdAt: '2024-01-15',
    owner: 'Alice',
  },
  {
    id: '2',
    name: 'Product Database',
    type: 'Database',
    status: 'Active',
    description: 'Central product catalog',
    createdAt: '2024-01-10',
    owner: 'Bob',
  },
  {
    id: '3',
    name: 'Marketing Dashboard',
    type: 'Dashboard',
    status: 'Active',
    description: 'Campaign performance tracking',
    createdAt: '2024-01-05',
    owner: 'Carol',
  },
  {
    id: '4',
    name: 'Archive 2023',
    type: 'Document',
    status: 'Archived',
    description: 'Old documents',
    createdAt: '2023-12-31',
    owner: 'David',
  },
  {
    id: '5',
    name: 'Draft Budget Plan',
    type: 'Document',
    status: 'Draft',
    description: 'Q2 budget proposal',
    createdAt: '2024-01-20',
    owner: 'Eve',
  },
]);

const searchQuery = ref('');
const selectedTags = ref<string[]>(['Active']);
const showDrawer = ref(false);
const editingId = ref<string | null>(null);

const availableStatuses = ['Active', 'Archived', 'Draft'];

const formData = ref({
  name: '',
  type: 'Document',
  status: 'Active' as const,
  description: '',
});

const tableColumns = [
  { title: 'Name', dataIndex: 'name', width: 150 },
  { title: 'Type', dataIndex: 'type', width: 100 },
  { title: 'Status', dataIndex: 'status', width: 100, slotName: 'status' },
  { title: 'Owner', dataIndex: 'owner', width: 100 },
  { title: 'Created', dataIndex: 'createdAt', width: 120 },
  { title: 'Actions', slotName: 'actions', width: 150 },
];

const filteredObjects = computed(() => {
  return objects.value.filter((obj) => {
    const matchesSearch =
      obj.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      obj.description.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesTag =
      selectedTags.value.length === 0 || selectedTags.value.includes(obj.status);
    return matchesSearch && matchesTag;
  });
});

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    Active: 'green',
    Archived: 'gray',
    Draft: 'orange',
  };
  return colors[status] || 'blue';
};

const toggleTag = (tag: string) => {
  const idx = selectedTags.value.indexOf(tag);
  if (idx > -1) {
    selectedTags.value.splice(idx, 1);
  } else {
    selectedTags.value.push(tag);
  }
};

const editObject = (obj: ObjectItem) => {
  editingId.value = obj.id;
  formData.value = { ...obj };
  showDrawer.value = true;
};

const deleteObject = (id: string) => {
  const idx = objects.value.findIndex((o) => o.id === id);
  if (idx > -1) {
    objects.value.splice(idx, 1);
  }
};

const saveObject = () => {
  if (editingId.value) {
    const idx = objects.value.findIndex((o) => o.id === editingId.value);
    if (idx > -1) {
      objects.value[idx] = {
        ...objects.value[idx],
        ...formData.value,
      };
    }
  } else {
    objects.value.push({
      id: Date.now().toString(),
      ...formData.value,
      createdAt: new Date().toISOString().split('T')[0],
      owner: 'Current User',
    });
  }
  closeDrawer();
};

const closeDrawer = () => {
  showDrawer.value = false;
  editingId.value = null;
  formData.value = {
    name: '',
    type: 'Document',
    status: 'Active',
    description: '',
  };
};
</script>

<style scoped>
.search-input {
  padding: var(--tr-spacing-3) var(--tr-spacing-4);
  border: 1px solid var(--tr-color-neutral300);
  border-radius: var(--tr-radius-md);
  font-size: 14px;
  width: 250px;
  transition: all var(--tr-motion-normal);
}

.search-input:focus {
  outline: none;
  border-color: var(--tr-color-primary);
  box-shadow: 0 0 0 2px rgba(94, 92, 230, 0.1);
}

.filter-tags {
  display: flex;
  align-items: center;
  gap: var(--tr-spacing-3);
}

.object-list-page__table {
  width: 100%;
  margin-bottom: var(--tr-spacing-6);
}

.action-buttons {
  display: flex;
  gap: var(--tr-spacing-2);
}

.drawer-form {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-6);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-2);
}

.form-group label {
  font-weight: 600;
  color: var(--tr-color-neutral900);
  font-size: 14px;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: var(--tr-spacing-3) var(--tr-spacing-4);
  border: 1px solid var(--tr-color-neutral300);
  border-radius: var(--tr-radius-md);
  font-size: 14px;
  font-family: inherit;
  transition: all var(--tr-motion-normal);
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--tr-color-primary);
  box-shadow: 0 0 0 2px rgba(94, 92, 230, 0.1);
}

.form-group textarea {
  resize: vertical;
  min-height: 100px;
}

.drawer-footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--tr-spacing-4);
}
</style>
