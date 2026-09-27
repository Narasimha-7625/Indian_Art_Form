# BHARAT KALA MUSEUM — An Interactive Journey Through Indian Art

## 1. Project Title
**BHARAT KALA MUSEUM: An Interactive Journey Through Indian Art**  
*A 3D Virtual Museum & Curatorial Web Application (College CLA-I Assignment — Course Outcomes CO1 & CO2)*

---

## 2. Objective
**Bharat Kala Museum** is an original, interactive 3D browser-based virtual museum designed to present over four millennia of Indian visual, sculptural, architectural, and folk art traditions in an academically rigorous and engaging digital environment.

Visitors can enter a three-dimensional architectural pavilion featuring Indian sandstone walls, dark teakwood floors, warm gallery spotlights, and brass-framed installations. Inside, visitors can freely navigate using keyboard and mouse controls—or follow an automated **Guided Tour**—across three interconnected wings aligned with **Course Outcome 1 (CO1)** and **Course Outcome 2 (CO2)**:
1. **History Hall (CO1):** Interactive chronological Indian art timeline spanning 2300 BCE to living contemporary folk traditions.
2. **Explore India — Art & Culture Map (CO1):** Interactive cartographic exploration of eight major regional art centers across India powered by Leaflet and OpenStreetMap.
3. **Fusion Gallery (CO2):** Original **Warli × Kalamkari** regional painting synthesis with interactive layer isolation and curatorial analysis.

---

## 3. Technologies
- **Frontend Framework:** React 19 + TypeScript
- **Build Tool & Dev Server:** Vite
- **3D Rendering Engine:** Three.js (`WebGLRenderer`, `PerspectiveCamera`, `Raycaster`, procedural `CanvasTexture` pipelines, and 3D sculptural pedestals)
- **Interactive Cartography:** Leaflet + OpenStreetMap (`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`)
- **Styling & Typography:** Tailwind CSS + Google Fonts (*Cormorant Garamond*, *Plus Jakarta Sans*, *JetBrains Mono*)
- **Icons:** Lucide React

---

## 4. Activity 1 — Interactive Indian Art Timeline (CO1)
Located in the **History Hall (North Wing)** and accessible via the **History Timeline** navigation control, Activity 1 presents six monumental chronological exhibits:

1. **Indus Valley Civilization — *Dancing Girl of Mohenjo-daro*** (`c. 2300–1750 BCE`)
   - Features a 3D bronze sculptural pedestal and high-resolution curatorial panel detailing lost-wax (*cire perdue*) metallurgy, Mohenjo-daro urban context, and Harappan iconography.
2. **Ajanta — *Ajanta Cave Murals (Padmapani & Jataka Cycles)*** (`c. 2nd Century BCE – 480 CE`)
   - Explores Satavahana and Vakataka rock-cut monastic painting in Maharashtra, mineral earth pigments, *Tribhanga* posture, and *chiaroscuro* tonal shading.
3. **Chola Period — *Shiva as Nataraja*** (`c. 9th–13th Century CE`)
   - Features a 3D *Panchaloha* bronze Nataraja sculpture encircled by the flaming *Prabhavali* aureole alongside an analysis of Imperial Chola bronze casting in the Kaveri Delta.
4. **Mughal Art — *Mughal Miniature Painting*** (`c. 16th–18th Century CE`)
   - Examines collaborative imperial *Karkhana* manuscript folios, single-hair squirrel brushwork, *Wasli* paper, and gilded *Hashiya* floral borders.
5. **Madhubani / Mithila Art — *Mithila Kohbar & Aripan Ceremonial Painting*** (`Bihar`)
   - Details double-line (*do-hari rekha*) freehand contours, *Bharni* and *Kachni* styles, natural plant dyes, and sacred fertility symbolism.
6. **Warli Art — *Chaukat & Tarpa Dance Ritual Wall Painting*** (`Maharashtra`)
   - Explores North Sahyadri indigenous geometric vocabulary (circle, triangle, square), rice-paste pigment on terracotta *geru* earth, and the communal *Tarpa* spiral dance.

Clicking any exhibit opens a full curatorial modal with working **Previous Exhibit**, **Next Exhibit**, and **Close (`ESC`)** controls.

---

## 5. Activity 2 — Interactive Indian Art Map (CO1)
Located in the **West Wing (`EXPLORE INDIA — ART & CULTURE MAP`)**, Activity 2 uses **Leaflet** and **OpenStreetMap** with real geographic coordinates for eight pivotal Indian art heritage centers:

1. **Ajanta** (`20.5519° N, 75.7033° E`) — Maharashtra — Buddhist Rock-Cut Cave Murals
2. **Ellora** (`20.0258° N, 75.1780° E`) — Maharashtra — Multi-Faith Monolithic Rock-Cut Architecture (Kailasa Temple)
3. **Thanjavur** (`10.7870° N, 79.1378° E`) — Tamil Nadu — Chola Bronze Casting & Tanjore Gold-Leaf Painting
4. **Khajuraho** (`24.8318° N, 79.9199° E`) — Madhya Pradesh — Chandela Nagara Temple Architecture & Sculpture
5. **Madhubani** (`26.3483° N, 86.0712° E`) — Bihar — Mithila Ceremonial Folk Painting
6. **Warli Region** (`19.9903° N, 72.7448° E`) — Maharashtra — North Sahyadri Indigenous Geometric Art
7. **Puri** (`19.8135° N, 85.8312° E`) — Odisha — Pattachitra Cloth Scroll & Palm-Leaf Painting
8. **Jaipur** (`26.9124° N, 75.7873° E`) — Rajasthan — Rajput Miniature Painting, Araish Fresco & Blue Pottery

Includes interactive marker popups, **View Details** dossiers, **Zoom In / Zoom Out** controls, **Reset Map**, **Search & Regional Zone Filters**, and **Back to Museum**.

---

## 6. Activity 3 — Regional Painting Fusion (CO2)
Located in the **East Wing (`FUSION GALLERY`)**, Activity 3 presents an original digital artwork titled ***Sangamam: The Sacred Grove & The Village Circle (Warli × Kalamkari)***:

- **Warli Elements (Maharashtra):** Geometric human figures with circular heads and inverse triangular bodies, the unbroken *Tarpa* harvest dance circle, thatched village huts, radiating forest trees, and geometric wildlife rendered in chalky rice-paste white.
- **Kalamkari-Inspired Elements (Andhra Pradesh / Telangana):** Winding *Kalpavriksha* (Tree of Life) scrolling vines, multi-petaled blooming lotuses, serrated botanical leaves with fine *kalam* veins, and repeating *Hashiya* borders in natural indigo, madder crimson, mustard yellow, and pomegranate green.
- **Interactive Controls:**
  - **TOGGLE FUSION ELEMENTS:** Sequentially highlights Warli elements first, Kalamkari-inspired elements second, and dual annotated synthesis third.
  - **RESET ARTWORK:** Restores the balanced museum view.

---

## 7. How to Install
Ensure you have **Node.js** (v18+ recommended) and **npm** installed.

```bash
git clone <your-repository-url>
cd bharat-kala-museum
npm install
```

---

## 8. How to Run Locally
Start the Vite development server:

```bash
npm run dev
```

Open `http://localhost:3000` (or the URL shown in your terminal) in any modern desktop or mobile browser.

---

## 9. How to Build for Production
Create an optimized production bundle in the `dist/` directory:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## 10. How to Deploy to GitHub Pages
The project is pre-configured with relative asset paths (`base: './'` in `vite.config.ts`), making it directly deployable to GitHub Pages:

### Option A: Using `gh-pages` CLI
1. Install `gh-pages` as a dev dependency:
   ```bash
   npm install -D gh-pages
   ```
2. Add a `deploy` script in `package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
3. Run:
   ```bash
   npm run deploy
   ```

### Option B: Using GitHub Actions
1. Push your repository to GitHub.
2. Go to **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions** (or deploy from the `dist` folder on the `gh-pages` branch).
