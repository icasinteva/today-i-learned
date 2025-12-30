const factsList = document.getElementById('facts');
let categoryFilter = 'all';

function renderCategoryButtons() {
  const categories = document.getElementById('categories');

  CATEGORIES.forEach((cat, ind) => {
    let allBtn = '';

    if (ind === 0) {
      allBtn = `<li>
        <button class="btn btn-all-categories">All</button
      </li>`;
    }

    categories.insertAdjacentHTML(
      'beforeEnd',
      `${allBtn}
    <li>
      <button class="btn btn-category" style="background-color: ${cat.color}">
        ${cat.name}
      </button>
    </li>`
    );
  });

  function setCategoryFilter(filter) {
    if (filter === categoryFilter) {
      return;
    }
    categoryFilter = filter;
    console.log(categoryFilter);
    factsList.innerHTML = '';
    loadFacts();
  }

  const categoryBtns = document.querySelectorAll('.btn-category');
  document
    .querySelector('.btn-all-categories')
    .addEventListener('click', () => {
      setCategoryFilter('all');
    });
  categoryBtns.forEach((btn) => {
    const txt = btn.textContent.trim();
    btn.addEventListener('click', () => {
      setCategoryFilter(txt);
    });
  });
}

let data = [];

async function loadFacts() {
  if (data.length === 0) {
    const res = await fetch(
      'https://rnoejsdhwxebghjxifew.supabase.co/rest/v1/facts',
      {
        headers: {
          apikey:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJub2Vqc2Rod3hlYmdoanhpZmV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcwNDExMzksImV4cCI6MjA4MjYxNzEzOX0.QQgOEZ90Cq4Q4ssVV4iN7KuYPsF-RfHitCPVRuCnq8Q',
          authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJub2Vqc2Rod3hlYmdoanhpZmV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcwNDExMzksImV4cCI6MjA4MjYxNzEzOX0.QQgOEZ90Cq4Q4ssVV4iN7KuYPsF-RfHitCPVRuCnq8Q',
        },
      }
    );

    data = await res.json();
  }

  const filtered =
    categoryFilter === 'all'
      ? data
      : data.filter((fact) => fact.category === categoryFilter);

  renderFacts(filtered);
}

function renderFacts(data = []) {
  let categoryToColor = {};

  CATEGORIES.forEach(({ name, color }) => {
    categoryToColor[name] = color;
  });

  data.forEach((fact) => {
    const {
      text,
      source,
      category,
      votes_interesting,
      votes_mindblowing,
      votes_false,
    } = fact;

    factsList.insertAdjacentHTML(
      'beforeEnd',
      `<li class="fact">
        <p>
          ${text}
          (<a class="source" href="${source}">Source</a>)
        </p>
        <span class="fact-tag" style="background-color: ${categoryToColor[category]};">${category}</span>
        <div class="vote-buttons">
          <button>👍 <strong>${votes_interesting}</strong></button>
          <button>🤯 <strong>${votes_mindblowing}</strong></button>
          <button>⛔️ <strong>${votes_false}</strong></button>
        </div>
    </li>`
    );
  });
}

function toggleFormVisibility() {
  const shareFactBtn = document.getElementById('share-fact-btn');
  const shareFactForm = document.getElementById('share-fact-form');

  shareFactBtn.addEventListener('click', () => {
    if (shareFactForm.classList.contains('hidden')) {
      shareFactForm.classList.remove('hidden');
      shareFactBtn.textContent = 'Close';
    } else {
      shareFactForm.classList.add('hidden');
      shareFactBtn.textContent = 'Share a fact';
    }
  });
}

function init() {
  loadFacts();
  toggleFormVisibility();
  renderCategoryButtons();
}

init();
