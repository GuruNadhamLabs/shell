const output = document.getElementById("output");
const form = document.getElementById("command-form");
const input = document.getElementById("command-input");

const history = [];
let historyIndex = 0;

const commands = {
  help: () => [
    "Available commands:",
    "",
    "  help       Show available commands",
    "  about      About CyberShell",
    "  whoami     Display user information",
    "  ls         List virtual directories",
    "  skills     Show cybersecurity skills",
    "  projects   Show projects",
    "  date       Show current date",
    "  clear      Clear the terminal"
  ].join("\n"),

  about: () => "CyberShell is a browser-based terminal simulator built with HTML, CSS and JavaScript.",

  whoami: () => "Guru Nadham\nB.Tech ECE • Cybersecurity enthusiast",

  ls: () => "labs/    projects/    notes/    tools/",

  skills: () => "Cybersecurity\nLinux & Bash\nNetworking\nPython\nWeb Security\nCTF / Labs",

  projects: () => "01  CyberShell\n02  Cybersecurity Labs\n03  Network Security Projects",

  date: () => new Date().toString(),

  clear: () => {
    output.innerHTML = "";
    return null;
  }
};

function printCommand(command) {
  const block = document.createElement("div");
  block.className = "command-line";
  block.innerHTML = `<div><span class="prompt">guru@cybershell:~$</span> <span class="command"></span></div>`;
  block.querySelector(".command").textContent = command;
  output.appendChild(block);
  return block;
}

function printResult(text, isError = false) {
  if (text === null) return;
  const result = document.createElement("div");
  result.className = isError ? "result error" : "result";
  result.textContent = text;
  output.appendChild(result);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const raw = input.value.trim();
  if (!raw) return;

  history.push(raw);
  historyIndex = history.length;
  printCommand(raw);

  const command = raw.toLowerCase();
  if (command === "clear") {
    output.innerHTML = "";
  } else if (commands[command]) {
    printResult(commands[command]());
  } else {
    printResult(`Command not found: ${raw}. Type "help" for available commands.`, true);
  }

  input.value = "";
  output.scrollTop = output.scrollHeight;
});

input.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp") {
    event.preventDefault();
    if (historyIndex > 0) {
      historyIndex--;
      input.value = history[historyIndex];
    }
  }

  if (event.key === "ArrowDown") {
    event.preventDefault();
    if (historyIndex < history.length - 1) {
      historyIndex++;
      input.value = history[historyIndex];
    } else {
      historyIndex = history.length;
      input.value = "";
    }
  }
});

document.addEventListener("click", () => input.focus());