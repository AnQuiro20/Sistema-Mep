import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

// Module boundaries from docs/adr/0001-modular-architecture.md.
const MODULE_DEPENDENCIES = {
  identity: [],
  academic: ["identity"],
  evaluation: ["identity", "academic"],
  reporting: ["identity", "academic", "evaluation"],
  billing: ["identity"],
};

const DEEP_IMPORT = {
  group: ["@/modules/*/*", "@/modules/*/**"],
  message: "Import another module only through its public index: '@/modules/<module>'.",
};

const restrict = (...patterns) => ({
  "no-restricted-imports": ["error", { patterns }],
});

const moduleRules = Object.entries(MODULE_DEPENDENCIES).map(([name, allowed]) => ({
  files: [`src/modules/${name}/**/*.{ts,tsx}`],
  rules: restrict(
    DEEP_IMPORT,
    {
      group: Object.keys(MODULE_DEPENDENCIES)
        .filter((other) => other !== name && !allowed.includes(other))
        .map((other) => `@/modules/${other}`),
      message: `The ${name} module must not depend on this module (ADR 0001).`,
    },
    {
      group: ["../../*"],
      message: "Do not reach outside the module with relative imports.",
    },
  ),
}));

const eslintConfig = [
  ...coreWebVitals,
  ...typescript,
  { files: ["src/**/*.{ts,tsx}"], rules: restrict(DEEP_IMPORT) },
  ...moduleRules,
  { ignores: [".next/**", "node_modules/**", "next-env.d.ts"] },
];

export default eslintConfig;
