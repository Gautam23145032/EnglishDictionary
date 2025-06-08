const searchInput = document.getElementById("searchInput");
const resultDiv = document.getElementById("result");
const suggestionsList = document.getElementById("suggestionsList");
const clearBtn = document.getElementById("clearBtn");
const randomWordBtn = document.getElementById("randomWordBtn");

let audio = null;

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
    const synonyms = definition.synonyms || meaning.synonyms || [];

    let synonymsHtml = "No synonyms available.";
    if (synonyms.length > 0) {
      synonymsHtml = synonyms
        .map(
          (syn) =>
            `<span class="synonym" style="cursor:pointer; color:blue; text-decoration:underline; margin-right:6px;">${syn}</span>`
        )
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

    audio = new Audio(audioUrl);
    const pronounceIconEl = document.getElementById("pronounceIcon");
    if (pronounceIconEl) {
      pronounceIconEl.addEventListener("click", () => {
        if (audio) {
          audio.play();
          pronounceIconEl.style.color = "#999";
          audio.onended = () => {
            pronounceIconEl.style.color = "#4D59FB";
          };
        }
      });
    }

    const synonymElements = resultDiv.querySelectorAll('.synonym');
    synonymElements.forEach((elem) => {
      elem.addEventListener('click', () => {
        const clickedWord = elem.textContent;
        searchInput.value = clickedWord;
        search(clickedWord);
        clearSuggestions();
      });
    });
  } catch (error) {
    resultDiv.innerHTML = `<p>Error fetching the definition. Please try again later.</p>`;
  }
}

async function fetchSuggestions(query) {
  if (!query) {
    clearSuggestions();
    return;
  }

  const url = `https://api.datamuse.com/sug?s=${query}`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    suggestionsList.innerHTML = "";
    data.slice(0, 5).forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item.word;
      li.addEventListener("click", () => {
        searchInput.value = item.word;
        search(item.word);
        clearSuggestions();
      });
      suggestionsList.appendChild(li);
    });
  } catch (err) {
    console.error("Error fetching suggestions:", err);
  }
}

function clearSuggestions() {
  suggestionsList.innerHTML = "";
}

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

// Fetch 2 random advanced words
// Fetch 2 random advanced words
async function getRandomWords(count = 2) {
  try {
    const resp = await fetch(`https://random-word-api.vercel.app/api?words=${count}`);
    const words = await resp.json();
    words.forEach(word => {
      search(word);
    });
  } catch (err) {
    console.error("Failed to fetch random words", err);
    resultDiv.innerHTML = `<p>⚠️ Unable to fetch random words. Please try again later.</p>`;
  }
}


// Show 2 words per day as notification
async function showDailyWordsNotification() {
  const today = new Date().toDateString();
  const lastShown = localStorage.getItem("wordDayDate");

  console.log("Today:", today);
  console.log("Last shown:", lastShown);

  if (lastShown !== today) {
    localStorage.setItem("wordDayDate", today);
    const response = await fetch(`https://random-word-api.vercel.app/api?words=2`);
    const words = await response.json();
    if (Notification.permission === "granted") {
      console.log("Showing notification with words:", words);
      new Notification("📚 Word of the Day", {
        body: `1. ${words[0]}\n2. ${words[1]}`,
      });
    }
  } else {
    console.log("Notification already shown today.");
  }
}


if ("Notification" in window) {
  Notification.requestPermission().then((perm) => {
    if (perm === "granted") {
      showDailyWordsNotification();
    }
  });
}
