# TranYu UI Kit - Phase 1 Setup Complete

## ✓ 设计 Token 系统

**packages/theme/**
- `src/tokens.ts` - 定义所有设计 tokens
  - 色彩 (20+): primary, neutral(0-900), success, warning, danger, info, error
  - 圆角 (7): none, xs, sm, md, lg, xl, full
  - 间距 (16): 0-15 (2px~80px)
  - 阴影 (5): none, xs, sm, md, lg, xl
  - 动画 (7): fast, normal, slow, slowest, easeInOut, easeOut, easeIn

- `scripts/build.js` - 生成 CSS Variables
- `dist/theme.css` - 输出 CSS Variables (94 个变量)

## ✓ 组件库

**packages/ui/src/components/**
1. `TrButton.vue` - 按钮（primary/secondary，5 种尺寸）
2. `TrCard.vue` - 卡片（header/body/footer 插槽）
3. `TrTag.vue` - 标签（多色，3 种尺寸）
4. `TrTable.vue` - 表格（完全使用 CSS Variables）
5. `TrDrawer.vue` - 抽屉（4 个方向）
6. `TrPageHeader.vue` - 页面头部（返回按钮、标题、副标题）

所有组件样式**仅使用** `var(--tr-*)` CSS Variables，禁止硬编码。

## ✓ 样式指南

**playground/src/views/StyleGuide.vue**
- 按钮展示（主次，4 种尺寸，禁用，加载）
- 卡片展示（3 种变体）
- 标签展示（7 种颜色，3 种尺寸，可关闭）
- 表格展示
- 抽屉展示
- 工作台卡片示例
- 对象列表页面示例
- 色彩调色板（20 种颜色）

## ✓ ESLint 配置

**.eslintrc.js**
- 禁止业务页面直接导入 `@arco-design/web-vue`
- 允许 `packages/ui/` 内使用
- 其他 TypeScript 最佳实践

## ✓ Stylelint 配置

**.stylelintrc.js**
- 禁止直接写十六进制颜色 (`color-no-hex: true`)
- 禁止使用 rgba 颜色
- 必须使用 theme token 或 CSS Variables

## 文件结构

```
tranyu-ui-kit/
├── .eslintrc.js
├── .stylelintrc.js
├── tsconfig.json
├── package.json
├── README.md
├── SETUP_COMPLETE.md
├── packages/
│   ├── theme/
│   │   ├── src/tokens.ts
│   │   ├── scripts/build.js
│   │   ├── dist/
│   │   │   ├── theme.css (94 CSS Variables)
│   │   │   ├── tokens.js
│   │   │   └── index.js
│   │   └── package.json
│   └── ui/
│       ├── src/
│       │   ├── components/
│       │   │   ├── TrButton.vue
│       │   │   ├── TrCard.vue
│       │   │   ├── TrTag.vue
│       │   │   ├── TrTable.vue
│       │   │   ├── TrDrawer.vue
│       │   │   ├── TrPageHeader.vue
│       │   │   └── index.ts
│       │   └── index.ts
│       └── package.json
└── playground/
    ├── src/
    │   ├── views/StyleGuide.vue
    │   ├── App.vue
    │   ├── main.ts
    │   └── router.ts
    ├── index.html
    ├── vite.config.ts
    └── package.json
```

## 约束规则已确立

1. **CSS Variables Only** - 所有组件样式必须使用 `var(--tr-*)`
2. **No Arco Import** - 业务页面禁止导入 `@arco-design/web-vue`
3. **ESLint Enforcement** - 违反规则将报错
4. **Stylelint Enforcement** - 硬编码颜色将报错
