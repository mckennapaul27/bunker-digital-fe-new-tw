---
name: bunker-hub-sops
description: >
  Reads Bunker Digital website SOPs from a running Hub over MCP. Use when
  building, scaffolding, or reviewing a Next.js marketing website, contact
  form, navbar, GTM, JSON-LD, or other Hub website patterns.
---

# Bunker Hub SOPs

Hub is the source of website standards. Do not invent a parallel stack.

## Instructions

1. Call the MCP tool `get_website_setup_workflow` first.
2. Follow the files it links. Load each with `get_sop` and the SOP `id`.
3. Use `list_sops` if you need to discover ids (`appliesTo`: `nextjs`).
4. Implement against those documents. If a Hub SOP conflicts with a default, Hub wins.

The Hub tools talk to HTTP, not the local filesystem. If a tool fails, Hub is not running or the Bearer token is wrong.
