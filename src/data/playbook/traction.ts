import type { TractionExample } from "./types";

// The repeatable loop that converts any signal into profile traction.
export const tractionLoop = [
  { step: "Capture", detail: "Log the trigger (release/hackathon/paper) in Radar within 24h." },
  { step: "Evaluate", detail: "Spend 30–60 min forming a real opinion — what's new, what breaks." },
  { step: "Build", detail: "Ship the smallest honest thing: one script, one demo, one benchmark." },
  { step: "Publish code", detail: "Public repo, clean README, demo GIF, MIT license." },
  { step: "Write", detail: "One LinkedIn post + optional blog: problem → what you built → what you learned." },
  { step: "Connect", detail: "Tie it to a bigger project / your startup thesis, and to the next opportunity." },
];

// The explicit 6-step version for a major AI model launch (as requested).
export const modelLaunchPlaybook = [
  "Evaluate: read the model card + run 5 prompts from your own domain; note 3 concrete wins/losses.",
  "Benchmark: pick one measurable task (e.g. deadline extraction) and compare vs your current model on 20 items.",
  "Build: a tiny project that only makes sense with the new capability (long context, cheaper, offline, tool-use).",
  "Publish the code: repo + README + reproducible eval script + demo GIF.",
  "Write the LinkedIn post: 'New model X dropped. I tested it on <real task>. Here's the chart + repo.'",
  "Connect: fold the winner into Radar's extractor and mention the upgrade in your next update post.",
];

// 20 concrete, repeatable examples (trigger → what to do end-to-end).
export const tractionExamples: TractionExample[] = [
  { trigger: "GPT-5.6 becomes default", play: "Benchmark it on your extraction task vs last month's model; post the chart + repo." },
  { trigger: "Claude Sonnet 5 launches", play: "Rebuild one existing tool with it; write 'what changed in my code' + open the diff." },
  { trigger: "Llama 4 (10M context)", play: "Feed a whole repo, ask cross-file questions; ship a 'codebase Q&A' demo." },
  { trigger: "Qwen 3.5 open weights", play: "Self-host it; publish a cost breakdown vs hosted APIs for your workload." },
  { trigger: "Gemma 4 Apache-2.0", play: "Fine-tune on a tiny dataset; release the training recipe as a repo." },
  { trigger: "New MCP server trends", play: "Build your own MCP server (expose Radar); write a 50-line explainer." },
  { trigger: "A hackathon you enter", play: "Open-source the submission with a demo GIF; post the build log win or lose." },
  { trigger: "A hackathon you skip", play: "Still build the idea solo over a weekend; the artifact matters more than the event." },
  { trigger: "gpt-oss local reasoning", play: "Ship an offline agent; record a 'runs on my laptop' demo video." },
  { trigger: "Computer-use goes mainstream", play: "Automate one boring real task end-to-end; post the screen recording." },
  { trigger: "A new dev tool on Product Hunt", play: "Use it for a micro-project the same day; write an honest first-impressions post." },
  { trigger: "A trending GitHub repo", play: "Submit a small, real PR; screenshot the merge; it's instant credibility." },
  { trigger: "A research paper you like", play: "Reproduce one figure/result in a notebook; publish 'paper → code' repo." },
  { trigger: "Next.js/React major release", play: "Migrate a project; write a 'gotchas I hit upgrading' post — very shareable." },
  { trigger: "You attend DevFest/a meetup", play: "Post a top-3-talks thread + the one tool you'll try; tag speakers." },
  { trigger: "Swift/iOS feature drops", play: "Prototype it in a Playground; build toward your Swift Student Challenge entry." },
  { trigger: "An API gets a free tier", play: "Wrap it into a tiny useful app; publish repo + live demo link." },
  { trigger: "A new agent framework", play: "Port one agent across two frameworks; write the comparison." },
  { trigger: "A grant/fellowship opens", play: "Write the application in public as a blog; the essay doubles as content." },
  { trigger: "Your own tool hits a milestone", play: "Post the metric + lesson; milestones are the most reliable content." },
];
