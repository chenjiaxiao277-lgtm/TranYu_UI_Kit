# TranYu UI Kit

Design system and component library with monday.com-inspired UI constraints.

## Structure

```
├── packages/
│   ├── theme/          # Design tokens & CSS variables
│   │   ├── src/tokens.ts
│   │   └── scripts/build.js
│   └── ui/            # Wrapped Arco Design components
│       ├── src/
│       │   ├── components/
│       │   │   ├── TrButton.vue
│       │   │   ├── TrCard.vue
│       │   │   ├── TrTag.vue
│       │   │   ├── TrTable.vue
│       │   │   ├── TrDrawer.vue
│       │   │   └── TrPageHeader.vue
│       │   └── index.ts
│       └── package.json
└── playground/        # Demo & style guide
    ├── src/
    │   ├── views/StyleGuide.vue
    │   ├── App.vue
    │   ├── router.ts
    │   └── main.ts
    ├── index.html
    └── vite.config.ts
```

## Rules

1. **CSS Variables Only**: All components must use `var(--tr-*)` tokens
2. **No Direct Arco Imports**: Business pages import from `@tranyu/ui` only
3. **Design Tokens**: Use `@tranyu/theme` for all styling
4. **ESLint**: No restricted imports from `@arco-design/web-vue`
5. **Stylelint**: No hardcoded hex colors or rgba

## Commands

```bash
npm run dev       # Start playground
npm run build     # Build theme & ui
npm run lint      # ESLint
npm run style     # Stylelint
```
