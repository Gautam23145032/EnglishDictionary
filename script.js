// ========= TRIE DATA STRUCTURE =========
class TrieNode {
  constructor() {
    this.children = {};
    this.isEnd = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (let ch of word) {
      if (!node.children[ch]) node.children[ch] = new TrieNode();
      node = node.children[ch];
    }
    node.isEnd = true;
  }

  searchPrefix(prefix) {
    let node = this.root;
    for (let ch of prefix) {
      if (!node.children[ch]) return null;
      node = node.children[ch];
    }
    return node;
  }

  collect(node, prefix, result) {
    if (result.length >= 5) return;
    if (node.isEnd) result.push(prefix);
    for (let ch in node.children) {
      this.collect(node.children[ch], prefix + ch, result);
    }
  }

  suggest(prefix) {
    const node = this.searchPrefix(prefix);
    const result = [];
    if (node) this.collect(node, prefix, result);
    return result;
  }
}

// ========= UI ELEMENTS =========
const searchInput = document.getElementById("searchInput");
const resultDiv = document.getElementById("result");
const suggestionsList = document.getElementById("suggestionsList");
const clearBtn = document.getElementById("clearBtn");
const randomWordBtn = document.getElementById("randomWordBtn");

let audio = null;
const trie = new Trie();

// ========= LOAD WORDS INTO TRIE =========
async function loadDictionary() {
  try {
    const resp = await fetch("words.txt"); // must be hosted with your app
    const text = await resp.text();
    const words = text.split("\n").map(w => w.trim());
    words.forEach(word => {
      if (word) trie.insert(word);
    });
  } catch (err) {
    console.error("Failed to load word list", err);
  }
}
loadDictionary();

// ========= FETCH SUGGESTIONS USING TRIE =========
function fetchSuggestions(query) {
  if (!query) {
    clearSuggestions();
    return;
  }
  const suggestions = trie.suggest(query.toLowerCase());
  suggestionsList.innerHTML = "";
  suggestions.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    li.style.cursor = "pointer";
    li.addEventListener("click", () => {
      searchInput.value = item;
      search(item);
      clearSuggestions();
    });
    suggestionsList.appendChild(li);
  });
}

function clearSuggestions() {
  suggestionsList.innerHTML = "";
}

// ========= SEARCH DICTIONARY WORD =========
async function search(word) {
  clearSuggestions();
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.title) {
      resultDiv.innerHTML = `<p>No definition found for "${word}"</p>`;
      return;
    }

    const entry = data[0];
    const meaning = entry.meanings[0];
    const definition = meaning.definitions[0];
    const partOfSpeech = meaning.partOfSpeech;
    const phonetics = entry.phonetics.find(p => p.text)?.text || '';
    const audioUrl = entry.phonetics.find(p => p.audio)?.audio || '';
    const synonyms = definition.synonyms.length ? definition.synonyms : (meaning.synonyms || []);

    let synonymsHtml = "No synonyms available.";
    if (synonyms.length > 0) {
      synonymsHtml = synonyms
        .map(syn => `<span class="synonym" style="cursor:pointer; color:blue; text-decoration:underline; margin-right:6px;">${syn}</span>`)
        .join('');
    }

    const pronunciationIcon = audioUrl
      ? `<span id="pronounceIcon" title="Play Pronunciation" style="cursor:pointer; margin-left: 10px; font-size:18px; color:#4D59FB;">🔊</span>`
      : '';

    resultDiv.innerHTML = `
      <h2>
        ${word} ${phonetics ? `<small>(${phonetics})</small>` : ''}
        ${pronunciationIcon}
      </h2>
      <p><strong>Part of Speech:</strong> ${partOfSpeech}</p>
      <p><strong>Definition:</strong> ${definition.definition}</p>
      <p><strong>Example:</strong> ${definition.example || "No example available."}</p>
      <p><strong>Synonyms:</strong> ${synonymsHtml}</p>
    `;

    // Audio play
    if (audioUrl) {
      audio = new Audio(audioUrl);
      const pronounceIcon = document.getElementById("pronounceIcon");
      pronounceIcon.addEventListener("click", () => {
        if (audio) {
          audio.play();
          pronounceIcon.style.color = "#999";
          audio.onended = () => {
            pronounceIcon.style.color = "#4D59FB";
          };
        }
      });
    }

    // Synonym click
    resultDiv.querySelectorAll(".synonym").forEach(el => {
      el.addEventListener("click", () => {
        const clicked = el.textContent;
        searchInput.value = clicked;
        search(clicked);
        clearSuggestions();
      });
    });

  } catch (error) {
    resultDiv.innerHTML = `<p>Error fetching the definition. Please try again later.</p>`;
  }
}

// ========= INPUT EVENTS =========
searchInput.addEventListener("keyup", (e) => {
  const word = e.target.value.trim();
  if (e.key === "Enter" && word !== "") {
    search(word);
    clearSuggestions();
  } else {
    fetchSuggestions(word);
  }
});

clearBtn.addEventListener("click", () => {
  searchInput.value = "";
  resultDiv.innerHTML = "";
  clearSuggestions();
});

randomWordBtn.addEventListener("click", () => {
  getRandomWords(2);
});

// ========= RANDOM WORDS =========
async function getRandomWords(count = 2) {
  try {
    const resp = await fetch(`https://random-word-api.vercel.app/api?words=${count}`);
    const words = await resp.json();
    words.forEach(word => {
      search(word);
    });
  } catch (err) {
    resultDiv.innerHTML = `<p>⚠️ Unable to fetch random words. Please try again later.</p>`;
  }
}

// ========= DAILY WORD NOTIFICATIONS =========
async function showDailyWordsNotification() {
  const today = new Date().toDateString();
  const lastShown = localStorage.getItem("wordDayDate");
  if (lastShown !== today) {
    localStorage.setItem("wordDayDate", today);
    const response = await fetch(`https://random-word-api.vercel.app/api?words=2`);
    const words = await response.json();
    if (Notification.permission === "granted") {
      new Notification("📚 Word of the Day", {
        body: `1. ${words[0]}\n2. ${words[1]}`,
      });
    }
  }
}

if ("Notification" in window) {
  Notification.requestPermission().then((perm) => {
    if (perm === "granted") {
      showDailyWordsNotification();
    }
  });
}
