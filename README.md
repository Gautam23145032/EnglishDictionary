# 📚 English Dictionary Web App

An interactive and modern **English Dictionary Web App** built using **HTML, CSS, and JavaScript** that allows users to search for **word meanings**, get **synonyms**, listen to **pronunciations**, fetch **random words**, view **auto-suggestions**, and receive **daily word notifications** via browser alerts.

---
## 🌐 Live Preview

[click here](https://gautam23145032.github.io/EnglishDictionary/)  

## 🔥 Features

### ✅ Word Search
- Enter any English word to get:
  - Part of speech (noun, verb, etc.)
  - Definition
  - Example usage
  - Synonyms
  - Pronunciation (with audio)

### 🔊 Pronunciation
- Click the 🔊 icon to hear the correct pronunciation of the word using browser audio.

### 💡 Auto-Suggestions
- As you type, get real-time word suggestions powered by the **Datamuse API**.
- Clicking a suggestion instantly fetches its meaning.

### 🎲 Random Words
- Click the **"Get Random Words"** button to load 2 new words and their definitions.
- Great for learning new vocabulary!

### 🔔 Daily Word Notification
- When you open the app, it fetches 2 random words once per day and shows them in a browser notification.
- Uses `localStorage` to ensure the notification is only shown **once per day**.

---

## 🛠️ Tech Stack

- **HTML5** – For page structure
- **CSS3** – For styling (clean, responsive design)
- **JavaScript (Vanilla)** – For logic, API requests, DOM manipulation
- **APIs Used**:
  - [dictionaryapi.dev](https://dictionaryapi.dev/) – to get word definitions, phonetics, and audio
  - [Datamuse API](https://www.datamuse.com/api/) – for live word suggestions
  - [Random Word API](https://random-word-api.vercel.app/) – for daily/random word generation

---

## 📁 Project Structure

```
📦 dictionary-app
│
├── index.html        # Main HTML file
├── style.css         # CSS file for styling
├── script.js         # JavaScript file with full logic
└── README.md         # Project documentation (you're reading it!)
```

---

## 🧠 How It Works

### 1. Searching a Word
- User enters a word and presses `Enter`
- `https://api.dictionaryapi.dev/api/v2/entries/en/{word}` is called
- First result is parsed and displayed

### 2. Suggestions While Typing
- Every keystroke sends a request to:
  ```
  https://api.datamuse.com/sug?s={query}
  ```
- Top 5 suggestions are shown under the input

### 3. Synonyms Click
- Synonyms shown in blue/underlined
- Clicking any synonym triggers a new search

### 4. Pronunciation
- If `audio` URL is available, clicking the 🔊 icon plays it using the `Audio()` class

### 5. Random Words
- Clicking the 🎲 button calls:
  ```
  https://random-word-api.vercel.app/api?words=2
  ```
- Each word is then searched and displayed

### 6. Daily Notification
- On page load, checks `localStorage.wordDayDate`
- If not today:
  - Fetches 2 random words
  - Displays a `Notification`
  - Stores today’s date in `localStorage`

---

## 📸 User Interface
> ![image](https://github.com/user-attachments/assets/f89a0998-55aa-44d5-9f2a-03cfd341c32a)


---
## 🧼 Clear Functionality

- The ❌ button clears:
  - The input field
  - Previous search results
  - Suggestions dropdown

---
## 🧪 Example Usage

1. Type: `system`
2. Suggestions appear: `system`, `syndrome`, `systematic`, etc.
3. Press **Enter** or click `system`
4. See:
   - Definition: `A collection of organized things; a whole composed of relationships among its members.`
   - Example: `"There are eight planets in the solar system."`
   - Part of Speech: `noun`
   - Pronunciation
   - Synonyms: `arrangement`, `set up`, `structure`...

---
## 🔐 Permissions

- Requires browser permission for **notifications**
- Prompted automatically when the app loads

```js
if ("Notification" in window) {
  Notification.requestPermission().then((perm) => {
    if (perm === "granted") {
      showDailyWordsNotification();
    }
  });
}
```

---

## 🚀 How to Run Locally

1. **Clone the repo**
```bash
git clone https://github.com/your-username/dictionary-app.git
```

2. **Navigate into the folder**
```bash
cd dictionary-app
```

3. **Open `index.html`**
- You can just double-click it
- Or right-click → “Open with Live Server” in VS Code (recommended)

---

## 🌐 Important Notes

- Works best on modern browsers like Chrome and Edge
- Notifications work only on:
  - `localhost`
  - Secure HTTPS websites (not `file://` links)
- On iOS Safari, browser notifications are limited or unsupported

---

## 🧪 Testing Notification Feature

- To **test daily word notification** again, clear this key in DevTools:
  1. Open browser dev tools → Application tab
  2. Go to **Local Storage**
  3. Find and delete `wordDayDate`
  4. Refresh page → new notification will show

---

## 🧰 Future Improvements (Ideas)

- Add history/log of searched words
- Add ability to favorite/save words
- Add offline mode with local word database
- Build a PWA (Progressive Web App) for installability
- Use service workers to support background daily notifications
- Add multi-language support

---

## 👨‍💻 Author

**Gautam Yadav**
Made with 💙 by [Gautam23145032](https://github.com/Gautam23145032)

> If you found this project helpful, feel free to ⭐️ the repo and connect with me!

---

## 📃 License

This project is open-source and available under the [MIT License](LICENSE).

