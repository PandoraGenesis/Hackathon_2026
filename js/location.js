document.addEventListener('DOMContentLoaded', () => {
  const trigger = document.getElementById('departure-trigger');
  const dropdown = document.getElementById('departure-dropdown');
  const textDisplay = document.getElementById('departure-text');
  
  if (!trigger || !dropdown) return;

  // DOM Structure for the 2-level picker
  dropdown.innerHTML = `
    <div class="loc-panel">
      <div class="loc-header">
        <button type="button" class="loc-back-btn" id="loc-back-btn" hidden>
          <i data-lucide="arrow-left" style="width: 18px; height: 18px;"></i>
        </button>
        <div class="loc-search">
          <i data-lucide="search" style="width: 16px; height: 16px; color: #94a3b8;"></i>
          <input type="text" id="loc-search-input" placeholder="Search...">
        </div>
      </div>
      <div class="loc-body">
        <div class="loc-list" id="loc-list">
          <div class="loc-loading">Loading data...</div>
        </div>
        <div class="loc-az" id="loc-az">
          <!-- A-Z sidebar -->
        </div>
      </div>
    </div>
  `;

  // Initialize icons inside dropdown
  if (window.lucide) {
    window.lucide.createIcons({ root: dropdown });
  }

  const listEl = document.getElementById('loc-list');
  const azEl = document.getElementById('loc-az');
  const searchInput = document.getElementById('loc-search-input');
  const backBtn = document.getElementById('loc-back-btn');

  let countriesData = [];
  let currentLevel = 1; // 1: Countries, 2: States
  let selectedCountry = null; // Object
  let isDataLoaded = false;

  // Render A-Z sidebar
  function renderAZ() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    let html = letters.map(l => `<button type="button" class="az-btn" data-letter="${l}">${l}</button>`).join('');
    html += `<div id="loc-az-bubble" class="loc-az-bubble"></div>`;
    azEl.innerHTML = html;
  }

  // Swipe to scroll A-Z logic
  let isDraggingAZ = false;

  function handleAZMove(e) {
    if (e.type === 'touchmove' && e.cancelable) e.preventDefault(); // prevent native scroll

    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const target = document.elementFromPoint(clientX, clientY);
    
    if (target && target.classList.contains('az-btn')) {
      const letter = target.getAttribute('data-letter');
      
      // Update Bubble
      const bubble = document.getElementById('loc-az-bubble');
      if (bubble) {
        bubble.textContent = letter;
        // Position relative to azEl
        const targetRect = target.getBoundingClientRect();
        const azRect = azEl.getBoundingClientRect();
        const topPos = targetRect.top - azRect.top + targetRect.height / 2;
        bubble.style.top = `${topPos}px`;
        bubble.classList.add('show');
      }

      if (isDraggingAZ || e.type === 'touchmove' || e.type === 'pointerdown') {
        const groupTarget = listEl.querySelector(`[data-group="${letter}"]`);
        if (groupTarget) {
          listEl.scrollTo({ top: groupTarget.offsetTop, behavior: 'instant' });
        }
      }
    }
  }

  azEl.addEventListener('pointerdown', (e) => {
    isDraggingAZ = true;
    handleAZMove(e);
  });
  
  window.addEventListener('pointerup', () => {
    isDraggingAZ = false;
    const bubble = document.getElementById('loc-az-bubble');
    if (bubble) bubble.classList.remove('show');
  });
  
  azEl.addEventListener('pointermove', handleAZMove);
  azEl.addEventListener('touchmove', handleAZMove, { passive: false });
  
  azEl.addEventListener('pointerleave', () => {
    const bubble = document.getElementById('loc-az-bubble');
    if (bubble) bubble.classList.remove('show');
  });

  renderAZ();

  // Load Data
  async function loadData() {
    if (isDataLoaded) return;
    try {
      const response = await fetch('https://countriesnow.space/api/v0.1/countries/states');
      const responseData = await response.json();
      const data = responseData.data;
      
      // Override Vietnam's states with 2025 merged list from VIETNAM_PROVINCES (script.js)
      const vietnam = data.find(c => c.name === 'Vietnam');
      if (vietnam && typeof VIETNAM_PROVINCES !== 'undefined') {
        const mergedStates = [];
        VIETNAM_PROVINCES.forEach(region => {
          region.options.forEach(opt => {
            let cleanName = opt;
            if (cleanName.startsWith('TP. ')) {
              cleanName = cleanName.substring(4);
            }
            mergedStates.push({ name: cleanName, state_code: opt });
          });
        });
        // Sort alphabetically to match the UI expectation
        vietnam.states = mergedStates.sort((a, b) => a.name.localeCompare(b.name, 'vi'));
      }

      // Sort countries alphabetically just in case
      countriesData = data.sort((a, b) => a.name.localeCompare(b.name, 'vi'));
      isDataLoaded = true;
      renderLevel1();
    } catch (error) {
      console.error('Error loading location data:', error);
      listEl.innerHTML = `<div class="loc-error">Failed to load data. Please try again later.</div>`;
    }
  }

  function groupData(items, nameKey = 'name') {
    const grouped = {};
    items.forEach(item => {
      let firstLetter = item[nameKey].charAt(0).toUpperCase();
      
      // Handle Vietnamese 'Đ' specifically
      if (firstLetter === 'Đ') {
        firstLetter = 'Đ';
      } else if (!/[A-Z]/.test(firstLetter)) {
        firstLetter = '#';
      }
      
      if (!grouped[firstLetter]) grouped[firstLetter] = [];
      grouped[firstLetter].push(item);
    });
    return grouped;
  }

  function renderList(groupedData, onSelect) {
    let html = '';
    const sortedKeys = Object.keys(groupedData).sort((a, b) => {
      if (a === '#') return 1;
      if (b === '#') return -1;
      return a.localeCompare(b, 'vi');
    });
    
    if (sortedKeys.length === 0) {
      html = `<div class="loc-empty">No results found.</div>`;
    } else {
      sortedKeys.forEach(key => {
        html += `<div class="loc-group" data-group="${key}">
          <div class="loc-group-title">${key}</div>`;
        groupedData[key].forEach(item => {
          const id = item.iso3 || item.name;
          const hasStates = item.states && item.states.length > 0;
          html += `<button type="button" class="loc-item" data-id="${id.replace(/"/g, '&quot;')}" data-name="${item.name.replace(/"/g, '&quot;')}" style="display: flex; align-items: center; justify-content: flex-start; gap: 8px;">
            ${hasStates ? `<i data-lucide="chevron-right" style="width: 16px; height: 16px; color: var(--slate);"></i>` : (currentLevel === 1 ? `<span style="width: 16px; display: inline-block;"></span>` : '')}
            <span>${item.name}</span>
          </button>`;
        });
        html += `</div>`;
      });
    }
    
    listEl.innerHTML = html;
    
    // Add click events to items
    const items = listEl.querySelectorAll('.loc-item');
    items.forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        onSelect(item.getAttribute('data-id'), item.getAttribute('data-name'));
      });
    });
  }

  function renderLevel1(searchTerm = '') {
    currentLevel = 1;
    backBtn.style.display = 'none';
    searchInput.placeholder = "Tìm kiếm quốc gia";
    
    let filtered = countriesData;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = countriesData.filter(c => c.name.toLowerCase().includes(term));
    }
    
    const grouped = groupData(filtered);
    renderList(grouped, (id, name) => {
      // Find country object
      selectedCountry = countriesData.find(c => (c.iso3 || c.name) === id);
      if (selectedCountry && selectedCountry.states && selectedCountry.states.length > 0) {
        // Has states, go to level 2
        searchInput.value = '';
        renderLevel2(selectedCountry);
      } else {
        // No states, finish selection
        finishSelection(name);
      }
    });
  }

  function renderLevel2(country, searchTerm = '') {
    currentLevel = 2;
    backBtn.style.display = 'flex';
    searchInput.placeholder = "Tìm kiếm tỉnh/thành";
    
    let states = country.states;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      states = states.filter(s => s.name.toLowerCase().includes(term));
    }
    
    const grouped = groupData(states);
    renderList(grouped, (id, name) => {
      finishSelection(`${name}, ${country.name}`);
    });
  }

  function finishSelection(displayText) {
    textDisplay.textContent = displayText;
    textDisplay.style.color = "var(--ink)";
    dropdown.hidden = true;
    if (typeof state !== 'undefined') {
      state.departure = displayText;
    }
  }

  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    
    // Close destination dropdown if open
    if (window.closeDestCombobox) window.closeDestCombobox();

    dropdown.hidden = !dropdown.hidden;
    if (!dropdown.hidden) {
      if (!isDataLoaded) {
        loadData();
      } else {
        // Reset to Level 1 and clear search when opened
        searchInput.value = '';
        renderLevel1();
      }
    }
  });

  backBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    searchInput.value = '';
    renderLevel1();
  });

  searchInput.addEventListener('input', (e) => {
    const term = e.target.value;
    if (currentLevel === 1) {
      renderLevel1(term);
    } else {
      renderLevel2(selectedCountry, term);
    }
  });

  // Stop propagation when clicking inside dropdown
  dropdown.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  // Close dropdown on click outside
  document.addEventListener('click', () => {
    dropdown.hidden = true;
  });
});
