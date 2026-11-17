/**
 * aiArtworkGenerator.ts
 * ---------------------------------------------------------------------------
 * Generates vector graphic artwork (Data URL SVG/PNG) based on user AI prompts
 * for direct application onto the 3D T-shirt model in SAKTHI GARMENTS customizer.
 */

export interface AiArtworkResult {
  title: string;
  category: string;
  svgDataUrl: string;
  recommendedGarmentColor: string;
  recommendedTextColor: string;
  headlineText: string;
}

export function generateAiArtworkGraphic(prompt: string): AiArtworkResult {
  const p = (prompt || 'STREETWEAR').trim().toLowerCase();

  // Detect style categories
  const isDragon = p.includes('dragon') || p.includes('asian') || p.includes('japan') || p.includes('samurai') || p.includes('tokyo');
  const isTiger = p.includes('tiger') || p.includes('beast') || p.includes('lion') || p.includes('animal') || p.includes('wild');
  const isGym = p.includes('gym') || p.includes('fitness') || p.includes('muscle') || p.includes('lift') || p.includes('workout') || p.includes('iron');
  const isCyber = p.includes('cyber') || p.includes('neon') || p.includes('future') || p.includes('tech') || p.includes('robot') || p.includes('skull');
  const isMinimal = p.includes('minimal') || p.includes('nature') || p.includes('flower') || p.includes('botanical') || p.includes('leaf') || p.includes('sun');
  const isHeritage = p.includes('heritage') || p.includes('crest') || p.includes('tiruppur') || p.includes('cotton') || p.includes('vintage') || p.includes('retro') || p.includes('sakthi');

  let title = 'Sakthi Custom Artwork';
  let category = 'Urban Streetwear';
  let recommendedGarmentColor = '#171717';
  let recommendedTextColor = '#FFFFFF';
  let headlineText = 'URBAN CULTURE';
  let svgContent = '';

  if (isDragon) {
    title = 'Eastern Dragon Insignia';
    category = 'Japanese Streetwear';
    recommendedGarmentColor = '#171717';
    recommendedTextColor = '#A31C1B';
    headlineText = 'DRAGON SPIRIT';
    svgContent = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500">
        <defs>
          <radialGradient id="bg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#A31C1B" stop-opacity="0.3"/>
            <stop offset="100%" stop-color="#06110C" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <circle cx="250" cy="250" r="210" fill="url(#bg)"/>
        <circle cx="250" cy="250" r="200" fill="none" stroke="#A31C1B" stroke-width="4" stroke-dasharray="8 6"/>
        <circle cx="250" cy="250" r="185" fill="none" stroke="#FFFFFF" stroke-width="2"/>
        <!-- Dragon Body Silhouette -->
        <path d="M 170 130 C 230 70, 340 90, 360 170 C 370 210, 340 260, 290 270 C 230 280, 200 330, 250 380 C 280 410, 340 400, 360 360" fill="none" stroke="#FFFFFF" stroke-width="12" stroke-linecap="round"/>
        <path d="M 170 130 C 230 70, 340 90, 360 170 C 370 210, 340 260, 290 270 C 230 280, 200 330, 250 380 C 280 410, 340 400, 360 360" fill="none" stroke="#A31C1B" stroke-width="4" stroke-linecap="round"/>
        <!-- Spine Claws & Spikes -->
        <polygon points="360,170 390,160 370,185" fill="#FFFFFF"/>
        <polygon points="340,120 375,100 350,135" fill="#A31C1B"/>
        <polygon points="280,85 305,60 295,95" fill="#FFFFFF"/>
        <polygon points="215,95 220,65 230,100" fill="#A31C1B"/>
        <!-- Dragon Head -->
        <path d="M 170 130 L 120 110 L 140 145 L 110 160 L 155 170 L 135 200 L 175 180 Z" fill="#FFFFFF" stroke="#A31C1B" stroke-width="3"/>
        <circle cx="150" cy="140" r="5" fill="#A31C1B"/>
        <!-- Clouds / Waves -->
        <path d="M 130 350 Q 170 310 210 350 T 290 350" fill="none" stroke="#E5E5E5" stroke-width="4" stroke-linecap="round"/>
        <!-- Typography Banner -->
        <text x="250" y="445" font-family="'Impact', sans-serif" font-size="32" font-weight="900" fill="#FFFFFF" text-anchor="middle" letter-spacing="6">RYU • STREETWEAR</text>
        <text x="250" y="470" font-family="'Outfit', sans-serif" font-size="14" font-weight="700" fill="#A31C1B" text-anchor="middle" letter-spacing="8">SAKTHI TOKYO DROP</text>
      </svg>
    `;
  } else if (isTiger || isGym) {
    title = 'Athletic Beast Emblem';
    category = 'Fitness & Streetwear';
    recommendedGarmentColor = '#06110C';
    recommendedTextColor = '#FFFFFF';
    headlineText = 'IRON DISCIPLINE';
    svgContent = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#A31C1B"/>
            <stop offset="100%" stop-color="#D97706"/>
          </linearGradient>
        </defs>
        <!-- Octagon Badge -->
        <polygon points="250,30 430,105 470,290 350,450 150,450 30,290 70,105" fill="#171717" stroke="#A31C1B" stroke-width="6"/>
        <polygon points="250,45 415,115 450,285 340,435 160,435 50,285 85,115" fill="none" stroke="#FFFFFF" stroke-width="2"/>
        <!-- Barbell / Weight Silhouette -->
        <rect x="110" y="240" width="280" height="20" rx="6" fill="#FFFFFF"/>
        <rect x="130" y="210" width="24" height="80" rx="4" fill="url(#grad)"/>
        <rect x="160" y="225" width="16" height="50" rx="4" fill="#FFFFFF"/>
        <rect x="346" y="210" width="24" height="80" rx="4" fill="url(#grad)"/>
        <rect x="324" y="225" width="16" height="50" rx="4" fill="#FFFFFF"/>
        <!-- Tiger / Beast Eyes -->
        <polygon points="200,180 230,170 215,195" fill="#D97706"/>
        <polygon points="300,180 270,170 285,195" fill="#D97706"/>
        <circle cx="215" cy="182" r="3" fill="#FFFFFF"/>
        <circle cx="285" cy="182" r="3" fill="#FFFFFF"/>
        <!-- Star Crest -->
        <polygon points="250,90 258,110 280,110 262,122 268,142 250,130 232,142 238,122 220,110 242,110" fill="#FFFFFF"/>
        <!-- Typography -->
        <text x="250" y="340" font-family="'Impact', sans-serif" font-size="44" font-weight="900" fill="#FFFFFF" text-anchor="middle" letter-spacing="4">HEAVYWEIGHT</text>
        <text x="250" y="375" font-family="'Outfit', sans-serif" font-size="16" font-weight="800" fill="#A31C1B" text-anchor="middle" letter-spacing="6">TIRUPPUR ATHLETIC CLUB</text>
        <text x="250" y="405" font-family="'Outfit', sans-serif" font-size="11" font-weight="600" fill="#A3A3A3" text-anchor="middle" letter-spacing="3">100% BIO-WASH COTTON • 240 GSM</text>
      </svg>
    `;
  } else if (isCyber) {
    title = 'Cyberpunk Visor Emblem';
    category = 'Futuristic Graphic';
    recommendedGarmentColor = '#171717';
    recommendedTextColor = '#38BDF8';
    headlineText = 'NEO PROTOCOL';
    svgContent = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500">
        <defs>
          <linearGradient id="neon" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#38BDF8"/>
            <stop offset="50%" stop-color="#A31C1B"/>
            <stop offset="100%" stop-color="#38BDF8"/>
          </linearGradient>
        </defs>
        <!-- Tech Shield -->
        <path d="M 250 40 L 420 100 L 400 320 L 250 450 L 100 320 L 80 100 Z" fill="#06110C" stroke="url(#neon)" stroke-width="4"/>
        <path d="M 250 60 L 400 115 L 380 305 L 250 425 L 120 305 L 100 115 Z" fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-opacity="0.5"/>
        <!-- Cyber Visor / Skull Line -->
        <rect x="150" y="210" width="200" height="28" rx="6" fill="#38BDF8"/>
        <rect x="170" y="220" width="160" height="8" rx="3" fill="#FFFFFF"/>
        <!-- Tech Nodes -->
        <circle cx="160" cy="150" r="8" fill="#A31C1B"/>
        <circle cx="340" cy="150" r="8" fill="#A31C1B"/>
        <line x1="160" y1="158" x2="210" y2="210" stroke="#38BDF8" stroke-width="3"/>
        <line x1="340" y1="158" x2="290" y2="210" stroke="#38BDF8" stroke-width="3"/>
        <!-- Circuit Lines -->
        <path d="M 170 280 L 220 330 L 250 330 L 280 330 L 330 280" fill="none" stroke="#38BDF8" stroke-width="4" stroke-linecap="round"/>
        <line x1="250" y1="330" x2="250" y2="390" stroke="#A31C1B" stroke-width="4"/>
        <!-- Typography -->
        <text x="250" y="130" font-family="'Outfit', sans-serif" font-size="18" font-weight="900" fill="#FFFFFF" text-anchor="middle" letter-spacing="8">SYSTEM ONLINE</text>
        <text x="250" y="420" font-family="'Impact', sans-serif" font-size="28" font-weight="900" fill="#38BDF8" text-anchor="middle" letter-spacing="4">SAKTHI // 2026</text>
      </svg>
    `;
  } else if (isMinimal) {
    title = 'Botanical Crescent Art';
    category = 'Minimalist Aesthetic';
    recommendedGarmentColor = '#FFFFFF';
    recommendedTextColor = '#171717';
    headlineText = 'PURE BOTANIC';
    svgContent = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500">
        <!-- Sun / Moon Circle -->
        <circle cx="250" cy="230" r="130" fill="#F7F7F5" stroke="#E5E5E5" stroke-width="2"/>
        <circle cx="270" cy="210" r="110" fill="#FFFFFF"/>
        <!-- Sun Rays -->
        <g stroke="#171717" stroke-width="2" stroke-linecap="round" opacity="0.4">
          <line x1="250" y1="60" x2="250" y2="80"/>
          <line x1="370" y1="110" x2="355" y2="125"/>
          <line x1="420" y1="230" x2="400" y2="230"/>
          <line x1="130" y1="110" x2="145" y2="125"/>
          <line x1="80" y1="230" x2="100" y2="230"/>
        </g>
        <!-- Floral Branches -->
        <path d="M 250 360 C 240 280, 210 220, 190 150" fill="none" stroke="#171717" stroke-width="3" stroke-linecap="round"/>
        <path d="M 250 360 C 260 270, 290 230, 310 160" fill="none" stroke="#A31C1B" stroke-width="3" stroke-linecap="round"/>
        <!-- Leaves -->
        <path d="M 215 220 Q 240 200 230 185 Q 210 195 215 220 Z" fill="#171717"/>
        <path d="M 285 220 Q 260 200 270 185 Q 290 195 285 220 Z" fill="#A31C1B"/>
        <path d="M 235 270 Q 200 250 215 235 Q 240 245 235 270 Z" fill="#171717"/>
        <path d="M 265 270 Q 300 250 285 235 Q 260 245 265 270 Z" fill="#A31C1B"/>
        <!-- Clean Serif Typography -->
        <text x="250" y="420" font-family="'Playfair Display', serif" font-size="28" font-weight="700" fill="#171717" text-anchor="middle" letter-spacing="4">FLEUR & COTTON</text>
        <text x="250" y="450" font-family="'Outfit', sans-serif" font-size="11" font-weight="600" fill="#A31C1B" text-anchor="middle" letter-spacing="8">TIRUPPUR ARTISAN EDITION</text>
      </svg>
    `;
  } else {
    // Heritage / Default Crest
    title = 'Tiruppur Heritage Crest';
    category = 'Heritage Heraldry';
    recommendedGarmentColor = '#171717';
    recommendedTextColor = '#FFFFFF';
    headlineText = prompt.slice(0, 18).toUpperCase() || 'SAKTHI HERITAGE';
    svgContent = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500">
        <defs>
          <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#D97706"/>
            <stop offset="50%" stop-color="#FACC15"/>
            <stop offset="100%" stop-color="#B45309"/>
          </linearGradient>
        </defs>
        <!-- Outer Heritage Medallion -->
        <circle cx="250" cy="250" r="215" fill="#06110C" stroke="#A31C1B" stroke-width="8"/>
        <circle cx="250" cy="250" r="198" fill="none" stroke="url(#gold)" stroke-width="2"/>
        <circle cx="250" cy="250" r="185" fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-dasharray="6 4"/>
        <!-- Central Shield -->
        <path d="M 250 110 L 350 160 L 330 310 Q 250 370 250 390 Q 250 370 170 310 L 150 160 Z" fill="#171717" stroke="url(#gold)" stroke-width="4"/>
        <!-- Shield Cross / Division -->
        <path d="M 250 110 L 250 390" stroke="#A31C1B" stroke-width="3"/>
        <path d="M 152 230 L 348 230" stroke="#A31C1B" stroke-width="3"/>
        <!-- Diamond Star in Center -->
        <polygon points="250,195 258,220 285,230 258,240 250,265 242,240 215,230 242,220" fill="url(#gold)"/>
        <!-- Cotton Boll & Needle Symbol -->
        <circle cx="205" cy="180" r="14" fill="#FFFFFF"/>
        <circle cx="295" cy="180" r="14" fill="#FFFFFF"/>
        <!-- Laurel Wreath Leaves (Left & Right) -->
        <path d="M 120 270 Q 110 180 170 130" fill="none" stroke="url(#gold)" stroke-width="3" stroke-linecap="round"/>
        <path d="M 380 270 Q 390 180 330 130" fill="none" stroke="url(#gold)" stroke-width="3" stroke-linecap="round"/>
        <!-- Header Arc / Text -->
        <text x="250" y="85" font-family="'Outfit', sans-serif" font-size="16" font-weight="900" fill="url(#gold)" text-anchor="middle" letter-spacing="8">SAKTHI GARMENTS</text>
        <!-- Bottom Banner -->
        <rect x="80" y="415" width="340" height="38" rx="6" fill="#A31C1B" stroke="#FFFFFF" stroke-width="2"/>
        <text x="250" y="440" font-family="'Impact', sans-serif" font-size="20" font-weight="900" fill="#FFFFFF" text-anchor="middle" letter-spacing="4">${headlineText}</text>
        <text x="250" y="475" font-family="'Outfit', sans-serif" font-size="11" font-weight="700" fill="#A3A3A3" text-anchor="middle" letter-spacing="6">TIRUPPUR TEXTILE CAPITAL • EST. 2026</text>
      </svg>
    `;
  }

  // Convert SVG to clean Data URL
  const cleanSvg = svgContent.trim();
  const svgDataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(cleanSvg)}`;

  return {
    title,
    category,
    svgDataUrl,
    recommendedGarmentColor,
    recommendedTextColor,
    headlineText,
  };
}

