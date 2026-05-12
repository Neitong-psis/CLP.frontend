import Link from "next/link";
import Logo from "@/components/common/Logo";

const navLinks = [
  { label: "Courses", href: "/courses" },
  { label: "Programs", href: "/programs" },
  { label: "About", href: "/about" },
];

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo size="sm" />

        {/* <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-slate-900">
              {link.label}
            </Link>
          ))}
        </nav> */}

        <div className="flex items-center gap-3">
          <Link
            href="/auth/login"
            className="hidden text-sm font-semibold text-slate-700 hover:text-slate-900 sm:inline-flex"
          >
            Login
          </Link>
          <Link
            href="/auth/register"
            className="inline-flex items-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
          >
            Register
          </Link>
        </div>
      </div>

      <div className="border-t border-slate-100 bg-white md:hidden">
        <div className="mx-auto flex w-full max-w-6xl items-center gap-4 px-4 py-3 text-sm text-slate-600 sm:px-6">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-slate-900">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}

// "editor.autoIndent": "full",
  // "editor.formatOnType": true,
  // "editor.formatOnPaste": true,
  // "editor.suggestOnTriggerCharacters": true,
  // "editor.detectIndentation": true,
  // "editor.inlineSuggest.enabled": false,
  // "editor.quickSuggestions": {
  //   "other": true,
  //   "comments": false,
  //   "strings": false,
  // },

  // "update.mode": "manual",

  // "chat.disableAIFeatures": true,
  // "chat.mcp.discovery.enabled": {
  //   "claude-desktop": false,
  //   "windsurf": false,
  //   "cursor-global": false,
  //   "cursor-workspace": false
  // },

  // "chat.viewTitle.enabled": false,
  // "chat.viewWelcome.enabled": false,
  // "chat.math.enabled": false,
  // "chat.sendElementsToChat.enabled": false,
  // "chat.checkpoints.enabled": false,
  // "chat.commandCenter.enabled": false,
  // "chat.agent.maxRequests": 0,
  // "chat.detectParticipant.enabled": false,
  // "chat.extensionTools.enabled": false,
  // "mermaid-chat.enabled": false,
  // "chat.extensionUnification.enabled": false,
  // "chat.mcp.access": "none",
  // "chat.mcp.autostart": "never",
  // "chat.mcp.assisted.nuget.enabled": false,
  // "chat.mcp.gallery.enabled": false,
  // "telemetry.editStats.details.enabled": false,
  // "telemetry.editStats.showDecorations": false,
  // "telemetry.feedback.enabled": false,
  // "telemetry.telemetryLevel": "off",
  // "chat.agent.enabled": false,
  // "chat.allowAnonymousAccess": false,
  // "chat.customAgentInSubagent.enabled": false,
  // "chat.edits2.enabled": false,
  // "inlineChat.enableV2": false,
  // "chat.useAgentSkills": false,

  // "github.copilot.enable": false,
  // "github.copilot.inlineSuggest.enable": false,
  // "terminal.integrated.allowedLinkSchemes": [
  //   "file",
  //   "http",
  //   "https",
  //   "mailto",
  //   "vscode",
  //   "vscode-insiders",
  //   "docker-desktop"
  // ],
  // "terminal.integrated.enableMultiLinePasteWarning": "never",
