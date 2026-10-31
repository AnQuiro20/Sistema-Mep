# Agent skills

AulaGestión keeps task-scoped agent guidance in:

```text
agent-skills/<skill-name>/SKILL.md
```

The root `AGENTS.md` file is the project contract and the only skill router. Agents read it and the three authoritative product documents first, then load every catalog entry that matches the active AG-XXX story.

## Adding or changing a skill

1. Use a lowercase kebab-case directory name.
2. Add a `SKILL.md` whose frontmatter `name` exactly matches that directory.
3. Give the frontmatter a precise activation description.
4. Keep detailed rules in the skill instead of duplicating `AGENTS.md` or another skill.
5. Register the skill in the root catalog.
6. Run the available skill validator without installing dependencies.

Add technology- or provider-specific guidance only when supported by a manifest, configuration, approved ADR, or established source pattern.
