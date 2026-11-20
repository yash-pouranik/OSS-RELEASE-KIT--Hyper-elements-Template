import { ReleaseData } from './release';

export const defaultReleaseData: ReleaseData = {
  projectName: "Prism UI",
  version: "2.0.0",
  releaseType: "major",
  tagline: "Build better interfaces, faster.",
  summary: "Prism UI 2.0 is a ground-up reimagining of our developer component primitives. Featuring zero-dependency composite inputs, WCAG 2.1 AAA accessible keyboard navigation, a modern headless Select engine, and a 42% smaller production bundle footprint. (Note: Prism UI is a fictional demo project created for OSS Release Kit).",
  releaseDate: "November 20, 2026",
  installation: {
    npm: "npm install prism-ui@latest",
    pnpm: "pnpm add prism-ui@latest",
    yarn: "yarn add prism-ui@latest",
    bun: "bun add prism-ui@latest",
  },
  stats: [
    { label: "Bundle Size", value: "8.4 kB" },
    { label: "Performance Gain", value: "+38%" },
    { label: "A11y Score", value: "100%" },
    { label: "Test Coverage", value: "99.4%" },
  ],
  features: [
    {
      id: "feature-datepicker",
      title: "All-New Accessible DatePicker",
      description: "Fluid multi-view calendar engine with range selection, custom timezone localization, and seamless keyboard navigation (Arrow keys, Home/End, PageUp/Down).",
      tag: "New Component",
      codeSnippet: `import { DatePicker } from 'prism-ui';\n\n<DatePicker\n  mode="range"\n  defaultValue={[new Date(), nextWeek]}\n  onSelect={(range) => console.log(range)}\n/>`
    },
    {
      id: "feature-select",
      title: "Overhauled Headless Select",
      description: "Re-engineered virtualized list engine with asynchronous search filtering, multi-selection chips, and portal-aware positioning.",
      tag: "Overhauled",
      codeSnippet: `import { Select, SelectOption } from 'prism-ui';\n\n<Select placeholder="Filter environments..." isMulti>\n  <SelectOption value="prod">Production</SelectOption>\n  <SelectOption value="staging">Staging</SelectOption>\n</Select>`
    },
    {
      id: "feature-keyboard",
      title: "First-Class Keyboard Navigation",
      description: "Complete WAI-ARIA roving tabindex implementations across Dropdown, Accordion, Modal, and Tabs for keyboard-first developer workflows.",
      tag: "Accessibility",
    },
    {
      id: "feature-a11y",
      title: "WCAG 2.1 AAA Compliance",
      description: "Rigorous screen-reader audit with built-in high-contrast focus rings, automated announce utilities, and reduced-motion fallbacks.",
      tag: "Accessibility",
    }
  ],
  breakingChanges: [
    {
      id: "break-imports",
      title: "Consolidated Barrel Import Paths",
      description: "Sub-package deep imports like 'prism-ui/core' and 'prism-ui/components' have been unified into the top-level 'prism-ui' barrel export.",
      beforeCode: `// v1.x (Deprecated)\nimport { Button } from 'prism-ui/core';\nimport { Modal } from 'prism-ui/components/modal';`,
      afterCode: `// v2.x (Unified)\nimport { Button, Modal } from 'prism-ui';`,
      migrationNote: "Use `npx @prism-ui/codemod unify-imports` to automatically update all imports in your repository."
    },
    {
      id: "break-props",
      title: "Modal & Dialog 'isOpen' Renamed to 'open'",
      description: "Standardized all boolean state props across primitives to align with native HTML5 dialog conventions.",
      beforeCode: `// v1.x\n<Modal isOpen={isVisible} onRequestClose={handleClose} />`,
      afterCode: `// v2.x\n<Modal open={isVisible} onOpenChange={setIsVisible} />`,
      migrationNote: "The codemod also renames `isOpen` to `open` and maps `onRequestClose` to `onOpenChange`."
    }
  ],
  links: {
    documentation: "https://example.com/docs",
    github: "https://github.com/example/prism-ui",
    npm: "https://npmjs.com/package/prism-ui",
    changelog: "https://github.com/example/prism-ui/releases/tag/v2.0.0",
    demo: "https://example.com/demo"
  },
  contributors: [
    { name: "Elena Rostova", handle: "erostova" },
    { name: "Marcus Chen", handle: "marcuschen" },
    { name: "Sarah Jenkins", handle: "sjenkins_dev" }
  ],
  announcementAuthor: {
    name: "Alex Rivera",
    role: "Lead Maintainer",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=face"
  }
};
