# 📚 English Dictionary Web App

An interactive and modern **English Dictionary Web App** built using **HTML, CSS, and JavaScript** that allows users to search for **word meanings**, get **synonyms**, listen to **pronunciations**, view **auto-suggestions** (even offline!), fetch **random words**, and receive **daily word notifications** via browser alerts.

---

## 🌐 Live Preview

[Click here](https://gautam23145032.github.io/EnglishDictionary/)

---

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

### 💡 Offline Auto-Suggestions
- As you type, get **real-time word suggestions** powered by a **Trie-based data structure**.
- Trie is built from this word list, enabling offline word suggestion even after refreshing or restarting the browser.
- Suggestions update instantly and efficiently.

### 🧠 Intelligent Caching
- On first load, a local wordlist is fetched and stored in `localStorage`.
- Works even **without internet**, thanks to offline caching of the word list.

### 🎲 Random Words
- Click the **"Get Random Words"** button to load a new words and their definitions.
- Great for building vocabulary daily!

### 🔔 Daily Word Notification
- When you open the app, it fetches 2 random words once per day and shows them in a browser notification.
- Uses `localStorage` to ensure the notification is only shown **once per day**.

---

## 🛠️ Tech Stack

- **HTML5** – For page structure
- **CSS3** – For styling (clean, responsive design)
- **JavaScript (Vanilla)** – For logic, API requests, DOM manipulation, Trie logic, Caching (LRU based with localStorage)
- **APIs Used**:
  - [dictionaryapi.dev](https://dictionaryapi.dev/) – to get word definitions, phonetics, and audio
  - [Random Word API](https://random-word-api.vercel.app/) – for daily/random word generation

---

## 📁 Project Structure

```
📦 dictionary-app
│
├── index.html        # Main HTML file
├── style.css         # CSS file for styling
├── script.js         # JavaScript file with full logic (Trie, UI, API)
├── words.txt         # Local word list used for offline suggestions
└── README.md         # Project documentation (you're reading it!)
```

---

## 🧠 How It Works

### 1. Searching a Word
- User enters a word and presses `Enter`
- Calls:
  ```
  https://api.dictionaryapi.dev/api/v2/entries/en/{word}
  ```
- Parses the first result and displays:
  - Meaning
  - Example (if available)
  - Phonetics
  - Audio and Synonyms

### 2. Trie-Based Suggestions (Offline-First)
- On first load:
  - `words.txt` is fetched (once) and cached in `localStorage`
  - A **Trie** is built from these words
- On subsequent loads:
  - Words are loaded from `localStorage`
- As user types:
  - Prefix is searched in Trie
  - Suggestions (up to 5) are shown instantly
  - No internet required ✅

### 3. Synonym Click
- Synonyms are shown underlined
- Clicking a synonym triggers a new search automatically

### 4. Pronunciation
- If audio is available in the dictionary API, clicking the 🔊 icon plays it using JavaScript's `Audio()` class

### 5. Random Words
- Clicking the 🎲 button calls:
  ```
  https://random-word-api.vercel.app/api?words=2
  ```
- Each word is then searched and shown with meaning, example, audio, etc.

### 6. Daily Notification
- On page load:
  - Checks `localStorage.wordDayDate`
  - If not today's date:
    - Fetches 2 random words
    - Shows a notification
    - Stores today's date in `localStorage` to prevent repetition

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

1. Type: `sy`
2. Suggestions appear instantly from the Trie: `system`, `symbol`, `synergy`, etc.
3. Click or press **Enter** on a word
4. You'll see:
   - Definition
   - Example usage
   - Part of Speech
   - Pronunciation (🔊)
   - Synonyms (clickable)

---

## 🔐 Permissions

- Requires browser permission for **notifications**
- Prompted automatically when the app loads:

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
- Just double-click it
- Or right-click → “Open with Live Server” in VS Code (recommended)

---

## 🌐 Important Notes

- Works best on modern browsers like Chrome and Edge
- Notifications work only on:
  - `localhost`
  - Secure HTTPS websites (not `file://`)
- Offline suggestions only work **after the first load** (when Trie and wordlist are cached)
- iOS Safari may not support browser notifications

---

## 🧪 Testing Notification Feature

To **test daily word notification** again:

1. Open browser dev tools → Application tab  
2. Go to **Local Storage**  
3. Find and delete `wordDayDate`  
4. Refresh page → new notification will show again

---

## 🧰 Future Improvements (Ideas)

- 🔖 Add ability to favorite/save words
- 🕘 Add search history/log
- 🌍 Add multi-language support
- 📦 Turn into a full PWA for offline installability
- ⚙️ Use service workers to cache API results and enable full offline definitions
- 📈 Add word frequency and show most searched words
- 💬 Integrate speech-to-text for voice-based word lookup

---

## 👨‍💻 Author

**Gautam Yadav**  
Made with 💙 by [Gautam23145032](https://github.com/Gautam23145032)

> If you found this project helpful, feel free to ⭐️ the repo and share it!

---

## 📃 License

This project is open-source and available under the [MIT License](LICENSE).
