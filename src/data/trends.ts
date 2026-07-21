import type { Trend } from "@/lib/types";

// Seed snapshot of the mid-2026 AI/dev landscape. These are illustrative starters;
// the live adapters (GitHub Releases, Hugging Face, Product Hunt, Hacker News)
// refresh this feed. Metrics are kept qualitative to avoid false precision.

export const seedTrends: Trend[] = [
  {
    id: "gpt-5-6",
    kind: "model",
    title: "GPT-5.6 is now the default in ChatGPT",
    url: "https://openai.com/news/",
    source: "OpenAI",
    summary:
      "Live since 9 Jul 2026 as the new default. Stronger long-horizon agent workflows and native computer-use.",
    metric: "New default",
    tags: ["genai", "ai-agents"],
    date: "2026-07-09",
    contentAngle:
      "Run YOUR task on GPT-5.6 vs the model you used last month and post the delta.",
    buildIdea: "Swap GPT-5.6 into Radar's extractor and measure accuracy change.",
  },
  {
    id: "claude-sonnet-5",
    kind: "model",
    title: "Claude Sonnet 5 released",
    url: "https://www.anthropic.com/news",
    source: "Anthropic",
    summary:
      "Launched 30 Jun 2026. Strong coding + agentic performance at a mid-tier price point.",
    metric: "New release",
    tags: ["genai", "ai-agents", "developer-tools"],
    date: "2026-06-30",
    contentAngle: "Coding benchmark: Sonnet 5 vs your current model on a real repo task.",
    buildIdea: "Wire Sonnet 5 into a small agent and open-source the harness.",
  },
  {
    id: "llama-4",
    kind: "model",
    title: "Llama 4 — MoE, natively multimodal, 10M-token context",
    url: "https://ai.meta.com/",
    source: "Meta AI",
    summary:
      "Meta's first mixture-of-experts Llamas with very long context — self-hostable serious open weights.",
    metric: "Open weights",
    tags: ["open-source", "genai", "ai"],
    date: "2026-04-01",
    contentAngle: "Long-context demo: feed a whole codebase and ask cross-file questions.",
    buildIdea: "Local long-context RAG over your own repos with Llama 4.",
  },
  {
    id: "qwen-3-5",
    kind: "model",
    title: "Qwen 3.5 makes local AI genuinely cheap",
    url: "https://qwenlm.github.io/",
    source: "Qwen",
    summary:
      "Price/performance that makes local deployment no longer a compromise — great for offline agents.",
    metric: "Open weights",
    tags: ["open-source", "genai", "ai"],
    date: "2026-05-01",
    contentAngle: "Cost breakdown: hosted API vs self-hosted Qwen 3.5 for your workload.",
    buildIdea: "An offline-first version of a tool you already built.",
  },
  {
    id: "gemma-4",
    kind: "model",
    title: "Gemma 4 ships under Apache 2.0",
    url: "https://ai.google.dev/gemma",
    source: "Google DeepMind",
    summary:
      "Permissive licensing lowers the bar for on-device and commercial fine-tuning.",
    metric: "Apache-2.0",
    tags: ["open-source", "genai", "ai"],
    date: "2026-03-15",
    contentAngle: "Fine-tune Gemma 4 on a tiny domain dataset and share the recipe.",
    buildIdea: "On-device classifier fine-tuned from Gemma 4.",
  },
  {
    id: "mcp-ecosystem",
    kind: "tool",
    title: "Model Context Protocol (MCP) servers everywhere",
    url: "https://modelcontextprotocol.io/",
    source: "Ecosystem",
    summary:
      "MCP has become the default way to give agents tools/data. Building a good MCP server is a high-signal portfolio piece.",
    metric: "Trending",
    tags: ["ai-agents", "developer-tools", "open-source"],
    date: "2026-06-01",
    contentAngle: "'I built an MCP server for X in 50 lines' — explainer + repo.",
    buildIdea: "An MCP server that exposes Radar's opportunities to any agent.",
  },
  {
    id: "gpt-oss",
    kind: "model",
    title: "gpt-oss — OpenAI open-weight reasoning models",
    url: "https://openai.com/",
    source: "OpenAI / Hugging Face",
    summary:
      "Open reasoning weights you can run locally — the basis of the OpenAI Open Model Hackathon.",
    metric: "Open weights",
    tags: ["open-source", "genai", "ai-agents"],
    date: "2026-02-01",
    contentAngle: "Reasoning-on-a-laptop demo with a reproducible setup.",
    buildIdea: "Offline reasoning agent (ties directly to a live hackathon).",
  },
  {
    id: "computer-use-agents",
    kind: "post",
    title: "Native computer-use is now table stakes for frontier models",
    url: "https://news.ycombinator.com/",
    source: "Hacker News",
    summary:
      "Models controlling browsers, filling forms, executing workflows — a fresh app surface for builders.",
    metric: "Top of HN",
    tags: ["ai-agents", "developer-tools"],
    date: "2026-06-20",
    contentAngle: "Demo an agent doing a boring real task end-to-end.",
    buildIdea: "A computer-use agent that auto-fills hackathon registration forms.",
  },
  {
    id: "vibe-eval-tools",
    kind: "tool",
    title: "Eval/observability tooling for AI apps is hot",
    url: "https://www.producthunt.com/",
    source: "Product Hunt",
    summary:
      "As agents ship to prod, eval + tracing tools trend weekly on Product Hunt — a gap-rich space.",
    metric: "Trending PH",
    tags: ["developer-tools", "ai"],
    date: "2026-07-01",
    contentAngle: "'How I eval my agent' — practical, sharable, evergreen.",
    buildIdea: "A minimal eval harness for Radar's scoring quality.",
  },
];
