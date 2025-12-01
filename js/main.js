const featuredData = {
  latest: [
    {
      title: 'Meet the Billion-Dollar Crypto Founder Who Started Trading at 14',
      category: 'Profiles',
      summary: 'FalconX prodigy expands liquidity pools for Asia-based institutions.',
      image: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=900&q=60',
    },
    {
      title: 'Why Gold Is Winning Over Bitcoin in Liquidity, Trade, and Trust',
      category: 'Markets',
      summary: 'Treasurers hedge with metals while ETFs soak up BTC supply.',
      image: 'https://images.unsplash.com/photo-1450101215322-bf5cd27642fc?auto=format&fit=crop&w=900&q=60',
    },
    {
      title: 'State of Crypto: Kahala and Prediction Markets Face a Softbank',
      category: 'Investing',
      summary: 'Prediction platforms eye compliance pathways to enter the U.S.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=60',
    },
  ],
  bitcoin: [
    {
      title: 'Bitcoin Pricing Hits Most Bearish Growth Outlook Since Covid',
      category: 'Bitcoin',
      summary: 'Options skew shows traders hedging halving downside.',
      image: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=900&q=60',
    },
    {
      title: 'Genius Group: How a BTC Treasury Can Help Solve Treasury Exams',
      category: 'Corporate',
      summary: 'Singapore ed-tech leader copies MicroStrategy playbook.',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=60',
    },
    {
      title: 'Texas Buys $50M in BTC ETF as States Hedge Against Fed',
      category: 'Policy',
      summary: 'Public pensions look to diversify beyond bonds.',
      image: 'https://images.unsplash.com/photo-1518545975283-6c4380f8461c?auto=format&fit=crop&w=900&q=60',
    },
  ],
  eth: [
    {
      title: 'Ethereum Developers Prep for Fusaka, Second Upgrade of 2025',
      category: 'Ethereum',
      summary: 'Multi-client rehearsals show sync improvements.',
      image: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&w=900&q=60',
    },
    {
      title: 'What mNAV Tells You About Ethereum Treasury Companies',
      category: 'Research',
      summary: 'Token balance sheet modeling enters CFO toolkits.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=60',
    },
    {
      title: 'Ethereum Developers Prep for Fusaka Second Upgrade of 2025',
      category: 'Dev Diary',
      summary: 'Node operators rehearse final stage rollouts.',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=60',
    },
  ],
  xrp: [
    {
      title: 'XRP Surges 7% in Strongest Breakout in Weeks',
      category: 'Markets',
      summary: 'Ripple hints at new APAC pilots for banks.',
      image: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=60',
    },
    {
      title: 'Strategy: Why Institutions Embrace XRP Liquidity Hubs',
      category: 'Strategy',
      summary: 'Fiat ramps add new liquidity corridors.',
      image: 'https://images.unsplash.com/photo-1474631245212-32dc3c8310c6?auto=format&fit=crop&w=900&q=60',
    },
    {
      title: 'Privacy Is the Immune System of Freedom, Crypto Advocate Says',
      category: 'Opinion',
      summary: 'Brazil speakers urge progressive regulation.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=60',
    },
  ],
};

const newsItems = [
  {
    title: 'Bitcoin Pricing Hits Most Bearish Growth Outlook Since Covid',
    category: 'Research',
    time: '6 minutes ago',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=300&q=60',
  },
  {
    title: 'Privacy Is the Immune System of Freedom, Crypto Advocate Says',
    category: 'Policy',
    time: '18 minutes ago',
    image: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=300&q=60',
  },
  {
    title: 'UK Government to Start Cracking Down on Crypto Tax Avoidance',
    category: 'Policy',
    time: '32 minutes ago',
    image: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=300&q=60',
  },
  {
    title: 'Brazil Stablecoin Market Cap Unlocked for First Weekly Double in 10 Months',
    category: 'Markets',
    time: '47 minutes ago',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=300&q=60',
  },
  {
    title: 'Ethereum Developers Prep for Fusaka, Second Upgrade of 2025',
    category: 'Tech',
    time: '1 hour ago',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=300&q=60',
  },
];

function renderFeatured(category = 'latest') {
  const grid = document.getElementById('featuredGrid');
  if (!grid) return;
  const items = featuredData[category] || featuredData.latest;
  grid.innerHTML = items
    .map(
      (item, index) => `
        <article class="hero-card ${index === 0 ? 'col-span-2 lg:col-span-2' : ''}">
          <img src="${item.image}" alt="${item.title}" loading="lazy" />
          <div class="card-body space-y-3">
            <span class="badge">${item.category}</span>
            <h3 class="text-2xl font-semibold">${item.title}</h3>
            <p class="text-sm text-white/80">${item.summary}</p>
          </div>
        </article>
      `
    )
    .join('');
}

function attachTabHandlers() {
  const tabButtons = document.querySelectorAll('.hero-tabs button');
  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      tabButtons.forEach((b) => b.classList.remove('active', 'bg-brand-yellow', 'text-gray-900'));
      btn.classList.add('active', 'bg-brand-yellow', 'text-gray-900');
      renderFeatured(btn.dataset.tab);
    });
  });
}

function renderNewsStream() {
  const stream = document.getElementById('newsStream');
  if (!stream) return;
  stream.innerHTML = newsItems
    .map(
      (item) => `
        <article class="news-item">
          <div>
            <span class="text-xs font-semibold uppercase tracking-wide text-gray-500">${item.category}</span>
            <h3 class="text-lg font-semibold leading-tight mt-1">${item.title}</h3>
            <p class="text-xs text-gray-500 mt-1">${item.time}</p>
          </div>
          <img src="${item.image}" alt="${item.title}" loading="lazy" />
        </article>
      `
    )
    .join('');
}

function duplicateTicker() {
  const track = document.getElementById('tickerTrack');
  if (!track) return;
  const clone = track.cloneNode(true);
  track.parentElement.appendChild(clone);
}

function init() {
  renderFeatured();
  attachTabHandlers();
  renderNewsStream();
  duplicateTicker();
}

document.addEventListener('DOMContentLoaded', init);
