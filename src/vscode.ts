import * as vscode from "vscode";

export class RunVitestCommand implements vscode.Command {
  static ID = "vitest.runTest";
  title = "Run in terminal";
  command = RunVitestCommand.ID;
  arguments?: [string];

  constructor(text: string) {
    this.arguments = [text];
  }
}

export class DebugVitestCommand implements vscode.Command {
  static ID = "vitest.debugTest";
  title = "Debug";
  command = DebugVitestCommand.ID;
  arguments?: [string];

  constructor(text: string) {
    this.arguments = [text];
  }
}

vscode.commands.registerCommand(RunVitestCommand.ID, (text: string) => {
  let terminal = vscode.window.activeTerminal;

  if (!terminal) {
    terminal = vscode.window.createTerminal();
  }
  terminal.sendText(`npx vitest run -t "${text}"`, true);
  terminal.show();
});

vscode.commands.registerCommand(DebugVitestCommand.ID, (text: string) => {
  vscode.debug.startDebugging(undefined, {
    name: "Debug vitest case",
    request: "launch",
    runtimeArgs: ["vitest", "run", "-t", text],
    runtimeExecutable: "npx",
    skipFiles: ["<node_internals>/**"],
    type: "pwa-node",
    console: "integratedTerminal",
    internalConsoleOptions: "neverOpen",
  });
});
