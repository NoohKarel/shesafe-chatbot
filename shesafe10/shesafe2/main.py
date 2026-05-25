"""
SheSafe – Women Safety Assistant
Entry point: validates dataset and launches the app.
"""
import sys
import tkinter as tk
from ui import SheSafeUI


def validate_dataset(path="dataset.json"):
    """Quick check that dataset exists and has valid entries. Returns True if OK."""
    try:
        import json
        with open(path, "r", encoding="utf-8") as f:
            data = json.load(f)
        if not data or not isinstance(data, list):
            print("Dataset is empty or invalid.")
            return False
        count = sum(
            1 for item in data
            if isinstance(item, dict) and (item.get("question") or item.get("patterns"))
        )
        if count == 0:
            print("No valid question/answer entries in dataset.")
            return False
        return True
    except FileNotFoundError:
        print(f"Dataset not found: {path}")
        return False
    except Exception as e:
        print(f"Dataset error: {e}")
        return False


if __name__ == "__main__":
    if not validate_dataset():
        sys.exit(1)
    root = tk.Tk()
    app = SheSafeUI(root)
    root.mainloop()
