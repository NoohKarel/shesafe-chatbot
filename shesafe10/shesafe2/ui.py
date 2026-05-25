import tkinter as tk
from tkinter import scrolledtext
from chatbot import SheSafeChatbot

# ---------- COLORS ----------
BG = "#0e0e10"
CHAT_BG = "#141417"
BOT_BUBBLE = "#1f1f23"
USER_GRADIENT_1 = "#b84cff"
USER_GRADIENT_2 = "#ff4f9a"
TEXT = "#ffffff"
SUBTEXT = "#b5b5b5"
INPUT_BG = "#1b1b1f"
BORDER = "#2a2a2e"

FONT_MAIN = ("Segoe UI", 11)
FONT_BOLD = ("Segoe UI", 12, "bold")


class SheSafeUI:
    def __init__(self, root):
        self.root = root
        self.root.title("SheSafe – Women Safety Assistant")
        self.root.geometry("1100x720")
        self.root.configure(bg=BG)
        self.root.minsize(900, 600)

        self.bot = SheSafeChatbot()

        self.build_header()
        self.build_chat_area()
        self.build_input_bar()

        self.add_bot_message(
            "Hi, I'm SheSafe.\nI'm here to support you. Ask me anything related to your safety."
        )

    # ---------- HEADER ----------
    def build_header(self):
        header = tk.Frame(self.root, bg=BG, height=60)
        header.pack(fill="x", side="top")

        title = tk.Label(
            header,
            text="SheSafe",
            fg=TEXT,
            bg=BG,
            font=("Segoe UI", 18, "bold")
        )
        title.pack(side="left", padx=25)

        subtitle = tk.Label(
            header,
            text="Women Safety Assistant",
            fg=SUBTEXT,
            bg=BG,
            font=("Segoe UI", 10)
        )
        subtitle.pack(side="left", padx=10)

    # ---------- CHAT AREA ----------
    def build_chat_area(self):
        container = tk.Frame(self.root, bg=CHAT_BG)
        container.pack(fill="both", expand=True, padx=20, pady=(10, 0))

        self.chat = scrolledtext.ScrolledText(
            container,
            wrap=tk.WORD,
            bg=CHAT_BG,
            fg=TEXT,
            font=FONT_MAIN,
            bd=0,
            padx=15,
            pady=15,
            state="disabled"
        )
        self.chat.pack(fill="both", expand=True)

        self.chat.tag_config("bot", background=BOT_BUBBLE, lmargin1=10, lmargin2=10, rmargin=200, spacing3=10)
        self.chat.tag_config("user", foreground=TEXT, lmargin1=200, lmargin2=10, rmargin=10, spacing3=10)

    # ---------- INPUT BAR ----------
    def build_input_bar(self):
        bar = tk.Frame(self.root, bg=BG)
        bar.pack(fill="x", side="bottom", pady=15)

        self.entry = tk.Entry(
            bar,
            bg=INPUT_BG,
            fg=TEXT,
            insertbackground=TEXT,
            font=FONT_MAIN,
            relief="flat"
        )
        self.entry.pack(side="left", fill="x", expand=True, padx=(25, 10), ipady=10)
        self.entry.bind("<Return>", self.send_message)

        mic = tk.Label(
            bar,
            text="🎤",
            bg=INPUT_BG,
            fg=SUBTEXT,
            font=("Segoe UI", 14),
            width=3
        )
        mic.pack(side="left", padx=5)

        send = tk.Button(
            bar,
            text="➤",
            bg=USER_GRADIENT_1,
            fg=TEXT,
            font=("Segoe UI", 14, "bold"),
            relief="flat",
            command=self.send_message,
            width=4
        )
        send.pack(side="right", padx=(10, 25))

    # ---------- CHAT FUNCTIONS ----------
    def add_bot_message(self, msg):
        self.chat.config(state="normal")
        self.chat.insert("end", f"SheSafe:\n{msg}\n\n", "bot")
        self.chat.config(state="disabled")
        self.chat.yview("end")

    def add_user_message(self, msg):
        self.chat.config(state="normal")
        self.chat.insert("end", f"You:\n{msg}\n\n", "user")
        self.chat.config(state="disabled")
        self.chat.yview("end")

    def send_message(self, event=None):
        msg = self.entry.get().strip()
        if not msg:
            return

        self.entry.delete(0, "end")
        self.add_user_message(msg)

        response = self.bot.get_response(msg)
        self.add_bot_message(response)


# ---------- RUN ----------
if __name__ == "__main__":
    root = tk.Tk()
    app = SheSafeUI(root)
    root.mainloop()
