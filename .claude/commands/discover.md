# BDD Discovery Phase

Conduct a BDD discovery session to transform a vague software idea into a structured specification.

## Input

The user will provide: $ARGUMENTS

If no arguments provided, ask what they want to build.

## Phase 1: Codebase Exploration

Before asking questions, explore the codebase to understand context:

1. **Read existing features** - Check TESTING.md for feature file locations, then read them to understand what behaviors already exist
2. **Check for related functionality** - Search the codebase for code related to the user's idea
3. **Identify if this already exists** - The user might want to modify/enhance an existing feature rather than create something new

After exploration, present your findings:

- "I found these related features: ..."
- "This looks like a modification to existing [feature]" OR "This appears to be a new feature"
- "Here's how it would fit with the existing codebase: ..."

## Phase 2: Three Amigos Discovery

This is a Three Amigos session with assigned roles:

- **Product Owner** = the user - defines what needs to be built and why
- **Developer + Tester** = AI assistant (you)

As Developer, ask about:

- Technical feasibility and constraints
- Integration with existing systems
- Implementation approach

As Tester, ask about:

- Edge cases and error scenarios
- Acceptance criteria
- What could go wrong

Use the `AskUserQuestion` tool to conduct the discovery conversation. Ask questions iteratively, not all at once.

With codebase context established, ask clarifying questions:

1. **What is being built?** - Get a clear, concise name and description
2. **What type of change is this?** - feature, bugfix, refactor, mvp, styling, or other
3. **What are the business rules?** - High-level behavioral requirements (NOT Given/When/Then - those come in formulate phase)
4. **What's the scope?**
   - Breadth: How many areas of the codebase are affected? (narrow/medium/wide)
   - Depth: How many stack layers are involved? (shallow/medium/deep)
5. **What's NOT included?** - Explicitly define out-of-scope items to prevent scope creep
6. **What existing systems does this depend on?** - APIs, components, services that must exist
7. **What blockers exist?** - Missing systems or decisions that must be resolved first

Ask questions conversationally. Don't ask all at once - have a dialogue to explore the idea thoroughly.

## Phase 3: Output

After discovery is complete, create `DISCOVERY.yml` in the project root with this structure:

```yaml
name: 'Short descriptive name'
description: 'One sentence describing what this changes'
type: 'feature|bugfix|refactor|mvp|styling|other'
breadth: 'narrow|medium|wide - description of scope'
depth: 'shallow|medium|deep - description of stack layers affected'

business_rules:
  - 'Specific behavioral requirement'
  - 'Another requirement'

out_of_scope:
  - "What we're NOT doing"
  - 'Excluded functionality'

integration_points:
  - 'Existing system/feature that must be modified'
  - 'Another part of codebase this touches'

blockers:
  - 'Missing system that must exist first'
```

## Guidelines

- Be thorough but conversational - this is a collaborative discovery, not an interrogation
- Push back on vague requirements - ask for concrete examples
- Help identify edge cases and potential issues early
- If blockers exist, discuss whether to proceed or address blockers first
- The goal is clarity before implementation begins
