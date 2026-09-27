export interface TimelineExhibit {
  id: string;
  order: number;
  accessionNumber: string;
  eraTitle: string;
  exhibitTitle: string;
  period: string;
  yearSort: string;
  location: string;
  region: string;
  mediumAndMaterial: string;
  dimensions: string;
  artisticFeatures: string[];
  themes: string[];
  shortSummary: string;
  description: string;
  historicalContext: string;
  significance: string;
  curatorialQuote: string;
  palette: {
    primary: string;
    secondary: string;
    accent: string;
    bg: string;
  };
  // 3D placement inside the History Hall (North Wing)
  wallSide: 'left' | 'right';
  wallPos: [number, number, number];
  wallRotY: number;
  cameraStandPos: [number, number, number];
  cameraLookAt: [number, number, number];
  hasSculpturePedestal?: boolean;
  sculptureType?: 'dancing-girl' | 'nataraja';
}

export interface MapArtLocation {
  id: string;
  order: number;
  name: string;
  stateRegion: string;
  zone: 'Western India' | 'Southern India' | 'Central India' | 'Eastern India' | 'Northern India';
  coordinates: [number, number]; // [lat, lng]
  artTradition: string;
  period: string;
  shortDescription: string;
  detailedHistory: string;
  keyTechniques: string[];
  notableWorks: string[];
  culturalSignificance: string;
  linkedTimelineId?: string;
}

export interface GuidedTourStop {
  stopNumber: number;
  id: string;
  title: string;
  subtitle: string;
  section: 'history' | 'map' | 'fusion';
  exhibitId?: string;
  narration: string;
  cameraPos: [number, number, number];
  cameraLookAt: [number, number, number];
}

export const TIMELINE_EXHIBITS: TimelineExhibit[] = [
  {
    id: 'indus-valley',
    order: 1,
    accessionNumber: 'BKM · CO1 · ARC-001',
    eraTitle: 'INDUS VALLEY CIVILIZATION',
    exhibitTitle: 'Dancing Girl of Mohenjo-daro',
    period: 'c. 2300 – 1750 BCE (Mature Harappan Phase)',
    yearSort: '2300 BCE',
    location: 'Mohenjo-daro (HR Area, Citadel West), Indus Valley',
    region: 'North-Western Subcontinent (Indus Basin)',
    mediumAndMaterial: 'Lost-wax (Cire Perdue) solid-cast bronze statuette',
    dimensions: '10.5 cm × 5.0 cm × 2.5 cm',
    artisticFeatures: [
      'Mastery of the lost-wax (cire perdue) metallurgical casting process in the Bronze Age',
      'Confident contrapposto-like stance with right hand resting on the hip and weight shifted to the right leg',
      '24-25 stacked shell/metal bangles adorning the entire length of the left arm and 4 bangles on the right arm',
      'Expressive realism and naturalism in miniature scale, contrasting with formal monumental stone statuary'
    ],
    themes: [
      'Urban Harappan metallurgy and specialized craft guilds',
      'Sacred or courtly performative dance traditions',
      'Female bodily autonomy, ornament, and self-assured poise'
    ],
    shortSummary:
      'A 4,300-year-old solid bronze statuette cast via the lost-wax process at Mohenjo-daro, celebrated for her spirited posture, stacked arm bangles, and metallurgical sophistication.',
    description:
      'Excavated in 1926 by Ernest Mackay in the HR area of Mohenjo-daro, the "Dancing Girl" is an extraordinary miniature bronze figure standing 10.5 centimeters tall. Despite its diminutive scale, the sculpture radiates monumental vitality. The young woman stands in a relaxed, self-assured posture with her right hand cocked on her hip and her left hand resting lightly against her left thigh. Her left arm is completely encased in a spiral of bangles from wrist to shoulder, while her hair is gathered into a heavy coiled bun resting on the nape of her neck.',
    historicalContext:
      'Produced during the zenith of the Mature Harappan Civilization (2600–1900 BCE), when cities like Mohenjo-daro, Harappa, Rakhigarhi, and Dholavira featured rectilinear grid planning, Great Baths, standardized weights, and maritime trade with Mesopotamia. Harappan artisans smelted copper from Khetri mines in Rajasthan and alloyed it with tin to create high-precision bronze works.',
    significance:
      'The Dancing Girl proves that Indus Valley metallurgists had perfected the complex cire perdue (lost-wax) casting technique over four millennia ago. Beyond technical mastery, she reveals an aesthetic sensibility that valued dynamic human movement, ornamentation, and psychological presence—establishing a continuous lineage of figurative postures in Indian sculpture.',
    curatorialQuote:
      '“There is nothing like her in the ancient art of the world—a diminutive bronze that captures the living pulse of a four-thousand-year-old metropolis.”',
    palette: {
      primary: '#7C9A82',
      secondary: '#5C4328',
      accent: '#C89D54',
      bg: '#1A211C'
    },
    wallSide: 'left',
    wallPos: [-8.4, 2.8, -14],
    wallRotY: Math.PI / 2,
    cameraStandPos: [-3.2, 2.2, -14],
    cameraLookAt: [-8.4, 2.5, -14],
    hasSculpturePedestal: true,
    sculptureType: 'dancing-girl'
  },
  {
    id: 'ajanta',
    order: 2,
    accessionNumber: 'BKM · CO1 · MUR-002',
    eraTitle: 'AJANTA',
    exhibitTitle: 'Ajanta Cave Murals (Padmapani & Jataka Cycles)',
    period: 'c. 2nd Century BCE – 480 CE (Satavahana & Vakataka Periods)',
    yearSort: '450 CE',
    location: 'Ajanta Gorge, Waghora River Ravine, Aurangabad District',
    region: 'Deccan Plateau, Maharashtra',
    mediumAndMaterial: 'Fresco-secco tempera with natural mineral pigments on mud-and-rice-husk plaster over basalt rock',
    dimensions: 'Monumental Cave Wall Cycles (Cave 1, 2, 16 & 17)',
    artisticFeatures: [
      'Dry fresco (fresco-secco) layered over ferruginous mud plaster smoothed with fine lime wash',
      'Mineral earth pigments: red and yellow ochre, terra verte (glauconite green), gypsum white, lampblack, and imported Badakhshan lapis lazuli',
      'Graceful Tribhanga (three-bend) bodily flexion and half-closed meditative eyes (karuna/compassion)',
      'Masterful tonal modeling (chiaroscuro-like shading) and continuous narrative composition without rigid frame dividers'
    ],
    themes: [
      'Jataka tales of the Buddha’s compassionate previous births',
      'Bodhisattva Padmapani and Vajrapani balancing spiritual detachment with courtly grace',
      'Richly observed 5th-century Indian court life, textiles, flora, and cosmopolitan visitors'
    ],
    shortSummary:
      'Rock-cut Buddhist monastic murals in the Waghora gorge of Maharashtra that represent the classical pinnacle of ancient Indian wall painting and emotional lyricism.',
    description:
      'Carved into a horseshoe-shaped basalt cliff overlooking the Waghora River, the 30 caves of Ajanta preserve the most influential corpus of classical Indian painting. In Cave 1, the celebrated mural of Bodhisattva Padmapani depicts the compassionate being holding a blue lotus, his body gently inflected in the three-bend Tribhanga posture. Fluid calligraphic outlines (vartana) combine with subtle tonal highlights on the nose, eyelids, and shoulders to create roundness and volume.',
    historicalContext:
      'Executed in two main phases: an early Hinayana/Theravada phase under the Satavahanas (2nd–1st century BCE) and a magnificent Mahayana flourishing under Emperor Harishena of the Vakataka dynasty (c. 460–480 CE), contemporary with the Gupta Golden Age in northern India. Monks, royal ministers, and merchant guilds patronized these vihara (residential) and chaitya (prayer) halls along major Deccan trade routes.',
    significance:
      'Ajanta established the canonical grammar of classical Asian painting, directly codified in the Vishnudharmottara Purana (Chitrasutra) and radiating across Buddhist Asia—inspiring wall paintings from Sigiriya in Sri Lanka to Dunhuang in China and Horyu-ji in Japan.',
    curatorialQuote:
      '“At Ajanta, the mineral earth of the Deccan was transmuted into luminous compassion—where line alone carries both physical volume and spiritual stillness.”',
    palette: {
      primary: '#C87D4B',
      secondary: '#2D4F6C',
      accent: '#E2B659',
      bg: '#231914'
    },
    wallSide: 'right',
    wallPos: [8.4, 2.8, -19],
    wallRotY: -Math.PI / 2,
    cameraStandPos: [3.2, 2.2, -19],
    cameraLookAt: [8.4, 2.5, -19]
  },
  {
    id: 'chola-period',
    order: 3,
    accessionNumber: 'BKM · CO1 · BRZ-003',
    eraTitle: 'CHOLA PERIOD',
    exhibitTitle: 'Shiva as Nataraja (Lord of the Cosmic Dance)',
    period: 'c. 9th – 13th Century CE (Peak c. 10th–11th Century CE)',
    yearSort: '1010 CE',
    location: 'Thanjavur & Kaveri River Delta (Chola Heartland)',
    region: 'Tamil Nadu, Southern India',
    mediumAndMaterial: 'Panchaloha (five-metal alloy) solid bronze cast via cire perdue (lost-wax)',
    dimensions: '96.5 cm × 82.8 cm × 28.4 cm',
    artisticFeatures: [
      'Panchaloha sacred bronze tradition (copper, brass/zinc, tin, silver, and trace gold) cast from a single wax original',
      'Encircled by the Prabhavali (ring of cosmic fire) emerging from Makara mouths',
      'Four arms embodying Panchakritya (five cosmic actions): Damaru drum (creation), Abhaya mudra (preservation), Agni flame (dissolution), planted foot on Apasmara (concealment), and raised foot (grace/liberation)',
      'Harmonic balance of centrifugal whirling hair locks (jata) and serene, unmoved facial equipoise'
    ],
    themes: [
      'Ananda Tandava — the Blissful Cosmic Dance of creation, preservation, and cyclical renewal',
      'Triumph of enlightened wisdom over spiritual ignorance (Apasmara Purusha)',
      'Synthesis of Shaiva Siddhanta metaphysics, Shilpa Shastra proportions (talamana), and devotional processional ritual'
    ],
    shortSummary:
      'The supreme icon of Imperial Chola bronze metallurgy, uniting dynamic centrifugal motion and metaphysical stillness within a flaming circle of cosmic time.',
    description:
      'Cast during the imperial height of the Chola dynasty under monarchs such as Sembiyan Mahadevi, Rajaraja Chola I, and Rajendra Chola I, the bronze Nataraja portrays Lord Shiva performing the Ananda Tandava (Dance of Bliss). Enclosed within a flaming aureole (Prabhavali), Shiva balances effortlessly upon the dwarf of ignorance (Apasmara) while his left leg sweeps diagonally across his body in Gajahasta mudra, promising liberation to the devotee.',
    historicalContext:
      'During the 10th to 12th centuries in the fertile Kaveri delta, Chola rulers constructed monumental granite temples like the Brihadisvara Temple at Thanjavur. While stone sanctum images remained immovable (dhruva bera), master sthapati sculptors cast portable bronze utsava murtis ("festival icons") to be draped in silk, garlanded with jasmine, and carried in temple processions accompanied by Tevaram hymns.',
    significance:
      'Chola bronzes represent a watershed in world sculptural history. Each statue was cast via the lost-wax process, meaning the clay mold had to be broken to release the metal—making every Chola bronze an irreplaceable original that bridges poetry, mathematics, metallurgy, and cosmology.',
    curatorialQuote:
      '“Poetry, but nonetheless science—the clearest image of the activity of God which any art or religion can boast of.” — Ananda K. Coomaraswamy',
    palette: {
      primary: '#B8863B',
      secondary: '#6B4226',
      accent: '#E5B869',
      bg: '#221A12'
    },
    wallSide: 'left',
    wallPos: [-8.4, 2.8, -25],
    wallRotY: Math.PI / 2,
    cameraStandPos: [-3.2, 2.2, -25],
    cameraLookAt: [-8.4, 2.5, -25],
    hasSculpturePedestal: true,
    sculptureType: 'nataraja'
  },
  {
    id: 'mughal-art',
    order: 4,
    accessionNumber: 'BKM · CO1 · MIN-004',
    eraTitle: 'MUGHAL ART',
    exhibitTitle: 'Mughal Miniature Painting (Imperial Karkhana Folio)',
    period: 'c. 16th – 18th Century CE (Akbar, Jahangir & Shah Jahan Eras)',
    yearSort: '1615 CE',
    location: 'Fatehpur Sikri, Agra, Lahore & Delhi Imperial Ateliers',
    region: 'Northern India (Indo-Gangetic Heartland)',
    mediumAndMaterial: 'Opaque watercolor, crushed lapis, malachite, cinnabar, and burnished 24k gold leaf on Wasli layered paper',
    dimensions: '38.2 cm × 26.4 cm (Imperial Muraqqa Album Folio)',
    artisticFeatures: [
      'Collaborative imperial Karkhana (royal workshop) production dividing outline (tarrah), portraiture (chehra-nami), and coloring (rang-amezi)',
      'Microscopic squirrel-hair brushwork (ek-bal qalam — single-hair brush) achieving luminous jewel-toned detail',
      'Psychological realism in profile and three-quarter court portraits combined with radiant gold nimbus halos',
      'Luxurious Hashiya borders illuminated with gold floral arabesques, birds, and Pietra Dura (Parchin Kari) botanical studies'
    ],
    themes: [
      'Imperial chronicles (Akbarnama, Padshahnama) and royal court darbars',
      'Scientific and poetic natural history studies of Indian flora and fauna (Ustad Mansur tradition)',
      'Cosmopolitan synthesis of Persian Safavid line, indigenous Indian vitality, and European atmospheric perspective'
    ],
    shortSummary:
      'Jewel-like manuscript and album paintings created in the imperial Mughal ateliers, blending Persian calligraphic refinement, indigenous Indian palette, and naturalistic observation.',
    description:
      'Mughal miniature painting emerged from the royal Karkhanas (workshops) established by Emperor Humayun and dramatically expanded by Emperor Akbar, who brought Persian masters Mir Sayyid Ali and Abd al-Samad together with over a hundred Hindu and Muslim artists (such as Basawan, Daswanth, Bichitr, and Ustad Mansur). Painted on burnished Wasli paper with mineral pigments ground from lapis lazuli, cinnabar, conch-shell white, and gold leaf, these folios capture both grand imperial darbars and delicate studies of birds and blossoms.',
    historicalContext:
      'Under Akbar (r. 1556–1605), the atelier produced dynamic narrative manuscripts like the Hamzanama and Akbarnama. Under Jahangir (r. 1605–1627), focus shifted toward refined Muraqqa (bound albums), psychological portraiture, allegorical compositions, and empirical natural history studies, while Shah Jahan’s era perfected gilded symmetry and floral Hashiya borders.',
    significance:
      'Mughal painting revolutionized Indian visual culture by introducing empirical naturalism, individual artist signatures, historical documentation, and botanical precision—catalyzing regional court styles across Rajasthan, the Pahari hills, and the Deccan.',
    curatorialQuote:
      '“My liking for painting and my practice in judging it have arrived at such a point that when any work is brought before me, I can tell on the instant which master painted the brow and who painted the eyes.” — Emperor Jahangir',
    palette: {
      primary: '#1E3F66',
      secondary: '#8E2927',
      accent: '#D9A94C',
      bg: '#161C24'
    },
    wallSide: 'right',
    wallPos: [8.4, 2.8, -30],
    wallRotY: -Math.PI / 2,
    cameraStandPos: [3.2, 2.2, -30],
    cameraLookAt: [8.4, 2.5, -30]
  },
  {
    id: 'madhubani-art',
    order: 5,
    accessionNumber: 'BKM · CO1 · FLK-005',
    eraTitle: 'MADHUBANI / MITHILA ART',
    exhibitTitle: 'Mithila Kohbar & Aripan Ceremonial Painting',
    period: 'Ancient Living Tradition · Paper Transition c. 1960s – Present',
    yearSort: '1700 CE – Present',
    location: 'Jitwarpur, Ranti & Madhubani Villages, Mithila Region',
    region: 'Mithila Region (Northern Bihar)',
    mediumAndMaterial: 'Natural plant & mineral pigments applied with bamboo twigs and cotton swabs on cow-dung primed mud plaster / handmade paper',
    dimensions: '120 cm × 90 cm (Ceremonial Kohbar Panel)',
    artisticFeatures: [
      'Distinctive double-line outlines (do-hari rekha) drawn freehand without preliminary sketching',
      'Horror vacui compositional density: every millimeter of negative space is filled with floral, geometric, or avian motifs',
      'Five distinct stylistic lineages: Bharni (vibrant color-filled), Kachni (intricate monochromatic line hatching), Tantrik, Godna, and Kohbar',
      'Natural pigment extraction: turmeric (yellow), indigo (blue), kusum flower/red sandalwood (crimson), bael leaf (green), and rice paste (white)'
    ],
    themes: [
      'Kohbar Ghar nuptial chamber cosmology: Purain (lotus ring of fertility) and Bans (bamboo shaft of lineage)',
      'Episodes from the Ramayana (Sita’s birthplace in Mithila), Krishna Leela, and Ardhanarishvara',
      'Sacred ecological symbols: twin fishes (matsya), peacocks, elephants, serpents (naga), and the sun & moon'
    ],
    shortSummary:
      'A vibrant matrilineal painting tradition from Bihar’s Mithila region defined by bold double-line contours, dense symbolic patterning, and sacred ceremonial geometry.',
    description:
      'Practiced for centuries by women across the Mithila region of Bihar on freshly plastered mud walls (bhitti-chitra) and floors (aripan) during weddings and festivals, Madhubani art is a visual language of auspicious blessing and cosmic duality. Figures are rendered with striking frontal eyes in profile faces, surrounded by interlocking borders of lotus blossoms, fishes symbolizing prosperity, and peacocks representing love.',
    historicalContext:
      'Rooted in cultural memory dating back to the Ramayana era of King Janaka of Videha, Mithila painting remained a private domestic ritual art passed from mother to daughter until a severe drought struck Bihar in 1966–1968. Guided by the All India Handicrafts Board and pioneering artists like Sita Devi, Ganga Devi, Jagdamba Devi, and Baua Devi, women transferred their wall murals onto handmade paper, earning global acclaim and Geographical Indication (GI) status.',
    significance:
      'Madhubani art demonstrates how an indigenous women-led ritual tradition preserved complex philosophical iconography across centuries while empowering rural communities economically and artistically on the international stage.',
    curatorialQuote:
      '“In Mithila, no space between two living beings is ever truly empty—every gap blooms with a leaf, a lotus, or a bird binding the cosmos together.”',
    palette: {
      primary: '#C0392B',
      secondary: '#D4AC0D',
      accent: '#1F618D',
      bg: '#261515'
    },
    wallSide: 'left',
    wallPos: [-8.4, 2.8, -36],
    wallRotY: Math.PI / 2,
    cameraStandPos: [-3.2, 2.2, -36],
    cameraLookAt: [-8.4, 2.5, -36]
  },
  {
    id: 'warli-art',
    order: 6,
    accessionNumber: 'BKM · CO1 · TRB-006',
    eraTitle: 'WARLI ART',
    exhibitTitle: 'Chaukat & Tarpa Dance Ritual Wall Painting',
    period: 'Neolithic Roots (c. 2500 BCE Tradition) – Living Contemporary Practice',
    yearSort: 'Living Tradition',
    location: 'Dahanu, Talasari, Jawhar & Palghar District (North Sahyadri)',
    region: 'Northern Konkan & Sahyadri Range, Maharashtra',
    mediumAndMaterial: 'Ground white rice paste (pith) with water and gum binder applied via chewed bamboo stick on red ochre (geru) and cow-dung mud ground',
    dimensions: '150 cm × 110 cm (Ritual Lagnachaukat Panel)',
    artisticFeatures: [
      'Austere geometric vocabulary derived directly from nature: the Circle (Sun & Moon), Triangle (mountains & conical trees), and Square (Chauk — sacred human enclosure)',
      'Iconic geometric human figure: two inverted triangles joined at their apexes to represent torso and pelvis, topped by a circular head',
      'Stark visual contrast of pure chalky rice-paste white against warm terracotta-brown earth without primary colors',
      'Dynamic rhythmic movement where hundreds of miniature figures spiral and interlock in collective motion'
    ],
    themes: [
      'The Tarpa Dance: men and women clasping hands in an unbroken spiral around the Tarpa wind-instrument player, mirroring the cycle of life',
      'Lagnachauk & Devchauk: sacred wedding enclosures honoring Palaghata, the Mother Goddess of fertility and vegetation',
      'Egalitarian harmony between indigenous forest communities, wildlife, agriculture, and seasonal rains'
    ],
    shortSummary:
      'An indigenous tribal pictorial language from Maharashtra’s North Sahyadri mountains using circles, triangles, and squares in white rice paste on terracotta earth to celebrate community and nature.',
    description:
      'Created by the Warli (Varli) indigenous community of the northern Sahyadri range in Maharashtra, Warli painting rejects mythological hierarchy in favor of kinetic community life and ecological balance. Using only a chewed bamboo twig dipped in white rice paste over an earthen mud-and-geru wall, Warli artists construct entire bustling worlds—harvesting grain, climbing toddy palms, wildlife roaming forest canopies, and villagers spiraling in the hypnotic Tarpa dance.',
    historicalContext:
      'Traditionally painted exclusively by Savasini (married women) during harvest and marriage ceremonies to invoke Goddess Palaghata, the art form gained national and international prominence in the 1970s through the visionary master Jivya Soma Mashe (1934–2018). Mashe began painting continuously beyond ritual occasions, transforming Warli into a celebrated contemporary narrative medium while preserving its sacred ecological ethos.',
    significance:
      'Warli art proves that profound emotional vitality, narrative complexity, and rhythmic motion can be achieved through the purest geometric minimalism—standing as one of India’s most recognizable and ecologically conscious visual traditions.',
    curatorialQuote:
      '“There are so many human beings, so many birds and animals, and we are all moving together in one circle—if one hand lets go, the dance of nature breaks.” — Jivya Soma Mashe',
    palette: {
      primary: '#9A3B26',
      secondary: '#F5EFE6',
      accent: '#D49B35',
      bg: '#281712'
    },
    wallSide: 'right',
    wallPos: [8.4, 2.8, -41],
    wallRotY: -Math.PI / 2,
    cameraStandPos: [3.2, 2.2, -41],
    cameraLookAt: [8.4, 2.5, -41]
  }
];

export const MAP_ART_LOCATIONS: MapArtLocation[] = [
  {
    id: 'ajanta',
    order: 1,
    name: 'Ajanta',
    stateRegion: 'Maharashtra (Aurangabad / Chhatrapati Sambhajinagar District)',
    zone: 'Western India',
    coordinates: [20.5519, 75.7033],
    artTradition: 'Buddhist Rock-Cut Cave Architecture & Classical Tempera Murals',
    period: 'c. 2nd Century BCE – 480 CE',
    shortDescription:
      'Thirty rock-cut Buddhist monastic caves carved into a basalt gorge, world-renowned for luminous Jataka murals and Bodhisattva paintings.',
    detailedHistory:
      'Situated along an ancient caravan route descending from the Deccan Plateau, Ajanta’s thirty caves were excavated across two distinct eras under Satavahana and Vakataka patronage. Its murals—painted on mud plaster using mineral pigments including Deccan ochre, terra verte, and Afghan lapis lazuli—represent the foundational masterpiece of classical Indian painting.',
    keyTechniques: [
      'Fresco-secco tempera over ferruginous mud plaster and lime wash',
      'Vartana (three-dimensional tonal shading and stippling)',
      'Monolithic basalt rock-cut chaitya-griha and vihara excavation'
    ],
    notableWorks: [
      'Bodhisattva Padmapani & Vajrapani (Cave 1)',
      'Mahajanaka & Vessantara Jataka Murals (Caves 1 & 17)',
      'Sculpted Parinirvana of the Buddha (Cave 26)'
    ],
    culturalSignificance:
      'Designated a UNESCO World Heritage Site in 1983, Ajanta codified the visual vocabulary of grace, mudra (gesture), and narrative flow across all of Buddhist Asia.',
    linkedTimelineId: 'ajanta'
  },
  {
    id: 'ellora',
    order: 2,
    name: 'Ellora',
    stateRegion: 'Maharashtra (Verul, Chhatrapati Sambhajinagar District)',
    zone: 'Western India',
    coordinates: [20.0258, 75.178],
    artTradition: 'Multi-Faith Monolithic Rock-Cut Architecture & Sculpture (Buddhist, Hindu & Jain)',
    period: 'c. 600 – 1000 CE (Rashtrakuta & Yadava Dynasties)',
    shortDescription:
      'A monumental complex of 34 rock-cut caves celebrating religious harmony, crowned by the Kailasa Temple (Cave 16) carved top-down from a single cliff.',
    detailedHistory:
      'Carved into the Charanandri basalt hills, Ellora features 12 Buddhist caves (1–12), 17 Hindu caves (13–29), and 5 Jain caves (30–34) standing side by side. Its crowning marvel, the Kailasanatha Temple (Cave 16), was commissioned by Rashtrakuta King Krishna I in the 8th century CE: architects excavated over 200,000 tons of volcanic rock vertically from the cliff top downward to create a multi-story freestanding monolithic temple.',
    keyTechniques: [
      'Top-down monolithic vertical trench excavation in Deccan trap basalt',
      'High-relief dramatic narrative sculpture with deep undercutting',
      'Multi-story rock-cut mandapas, free-standing dhvajastambha pillars, and life-size stone elephants'
    ],
    notableWorks: [
      'Kailasa Monolithic Temple (Cave 16)',
      'Ravana Shaking Mount Kailasa Relief',
      'Vishvakarma Carpenter’s Cave (Cave 10) & Indra Sabha Jain Cave (Cave 32)'
    ],
    culturalSignificance:
      'Ellora stands as a supreme engineering triumph of ancient lithic architecture and a physical testament to pluralism and artistic exchange among Buddhism, Hinduism, and Jainism.'
  },
  {
    id: 'thanjavur',
    order: 3,
    name: 'Thanjavur',
    stateRegion: 'Tamil Nadu (Kaveri Delta Region)',
    zone: 'Southern India',
    coordinates: [10.787, 79.1378],
    artTradition: 'Imperial Chola Bronze Casting, Dravida Granite Architecture & Tanjore Gold-Leaf Painting',
    period: 'c. 9th – 19th Century CE (Chola, Nayak & Maratha Periods)',
    shortDescription:
      'Cultural capital of the Kaveri Delta, home to the Chola Brihadisvara Temple, Panchaloha Nataraja bronzes, and gilded Tanjore panel paintings.',
    detailedHistory:
      'As the imperial seat of Rajaraja Chola I (consecrated 1010 CE), Thanjavur gave rise to the 66-meter granite Vimana of the Brihadisvara Temple, Chola frescoes, and the world-renowned lost-wax Panchaloha bronze casting guild (still practiced nearby at Swamimalai). Later under Nayak and Maratha rulers (16th–19th c.), Thanjavur developed Tanjore Painting—devotional icons rendered with gesso relief, semi-precious stones, and 22-karat gold foil.',
    keyTechniques: [
      'Cire perdue (lost-wax) solid Panchaloha bronze casting',
      'Interlocking dry-masonry monumental granite Dravida architecture',
      'Tanjore relief gesso (muck) gilded with pure gold leaf on jackfruit/teak wood panels'
    ],
    notableWorks: [
      'Brihadisvara Temple & Chola Sanctum Frescoes',
      'Chola Bronze Shiva Nataraja and Somaskanda Icons',
      'Maratha-era Gilded Navaneetha Krishna Tanjore Panels'
    ],
    culturalSignificance:
      'Thanjavur bridges a thousand years of continuous South Indian artistic excellence across architecture, bronze metallurgy, classical music, Bharatanatyam, and sacred painting.',
    linkedTimelineId: 'chola-period'
  },
  {
    id: 'khajuraho',
    order: 4,
    name: 'Khajuraho',
    stateRegion: 'Madhya Pradesh (Bundelkhand / Chhatarpur District)',
    zone: 'Central India',
    coordinates: [24.8318, 79.9199],
    artTradition: 'Chandela Nagara-Style Temple Architecture & Figurative Sandstone Sculpture',
    period: 'c. 950 – 1050 CE (Chandela Dynasty)',
    shortDescription:
      'Famous ensemble of Nagara-style sandstone temples featuring soaring Urushringa spires and intricate sculptural bands depicting all facets of human and divine life.',
    detailedHistory:
      'Built by the Chandela Rajput rulers of Jejakabhukti within a single century of creative exuberance, Khajuraho originally comprised 85 Hindu and Jain temples, of which 25 survive today. Raised on high masonry platforms (jagati) without enclosure walls, their buff-colored Ken River sandstone exteriors are encircled by three tiers of exquisitely carved sculptures portraying deities, celestial Surasundaris, musicians, dancers, scholars, and the four Purusharthas (goals of human life: Dharma, Artha, Kama, Moksha).',
    keyTechniques: [
      'Nagara-style clustered Shikhara towers (Urushringas) rising like mountain peaks',
      'Mortise-and-tenon dry sandstone joinery without mortar',
      'Deep-relief figurative carving with dramatic axial twists (dvibhanga and tribhanga)'
    ],
    notableWorks: [
      'Kandariya Mahadeva Temple (c. 1030 CE)',
      'Lakshmana & Vishvanatha Temples',
      'Parshvanatha Jain Temple & Surasundari Celestial Nymphs'
    ],
    culturalSignificance:
      'Khajuraho represents the zenith of medieval Central Indian Nagara architecture, celebrating the integration of sacred geometry with the totality of earthly and spiritual experience.'
  },
  {
    id: 'madhubani',
    order: 5,
    name: 'Madhubani',
    stateRegion: 'Bihar (Mithila Cultural Region)',
    zone: 'Eastern India',
    coordinates: [26.3483, 86.0712],
    artTradition: 'Mithila (Madhubani) Ceremonial Wall, Floor (Aripan) & Paper Painting',
    period: 'Ancient Living Tradition – Present',
    shortDescription:
      'Heartland of Mithila painting, where women transform walls and handmade paper into dense, rhythmic compositions of double-line contours and sacred symbolism.',
    detailedHistory:
      'Centered in villages such as Jitwarpur, Ranti, and Rasidpur in Madhubani district, this matrilineal art form originated as Kohbar (nuptial chamber) and Aripan (threshold floor) paintings. Characterized by bold double-line outlines drawn with bamboo twigs and vibrant natural colors, Madhubani evolved five distinct styles—Bharni, Kachni, Tantrik, Godna, and Kohbar—becoming the first Indian folk painting tradition to receive a Geographical Indication (GI) tag.',
    keyTechniques: [
      'Double-line outline (do-hari rekha) filled with cross-hatching (Kachni) or flat natural pigment (Bharni)',
      'Complete horror vacui filling of background with floral and auspicious motifs',
      'Natural pigments from turmeric, indigo, lampblack, mahua, and palash flowers'
    ],
    notableWorks: [
      'Traditional Kohbar Ghar Nuptial Cosmology Panels',
      'Ramayana & Krishna Leela Narrative Cycles by Sita Devi and Ganga Devi',
      'Godna & Tantrik Line Masterworks of Jitwarpur and Ranti'
    ],
    culturalSignificance:
      'A globally celebrated living heritage that preserves ancient Mithila visual philosophy while serving as a model of women-led cultural and economic empowerment.',
    linkedTimelineId: 'madhubani-art'
  },
  {
    id: 'warli-region',
    order: 6,
    name: 'Warli Region',
    stateRegion: 'Maharashtra (Dahanu, Jawhar & Palghar — North Sahyadri Range)',
    zone: 'Western India',
    coordinates: [19.9903, 72.7448],
    artTradition: 'Warli Indigenous Geometric Ritual & Narrative Painting',
    period: 'Neolithic Roots (c. 2500 BCE Tradition) – Present',
    shortDescription:
      'Forested hills and coastal plains of Palghar where the Warli tribe paints dynamic community and nature scenes using white rice paste on terracotta earth walls.',
    detailedHistory:
      'In the northern Sahyadri mountains bordering Maharashtra and Gujarat, the Warli Adivasi community developed an extraordinary graphic language using only white rice flour paste on red ochre (geru) and cow-dung plastered walls. Rejecting hierarchical temple iconography, Warli art uses circles, triangles, and squares to depict the Mother Goddess Palaghata, the spiral Tarpa harvest dance, and the symbiotic relationship between forest dwellers and nature.',
    keyTechniques: [
      'Geometric figure construction: two apex-joined triangles with a circle head',
      'Chewed bamboo stick brush dipping into rice-paste white over terracotta geru slip',
      'Panoramic bird’s-eye narrative composition without linear perspective'
    ],
    notableWorks: [
      'Lagnachaukat & Devchaukat Sacred Marriage Squares',
      'Tarpa Spiral Harvest Dance Compositions (Jivya Soma Mashe Lineage)',
      'Seasonal Agrarian & Forest Ecosystem Murals of Dahanu and Ganjad'
    ],
    culturalSignificance:
      'Holds a Geographical Indication (GI) tag and represents one of the world’s purest surviving continuities between prehistoric rock shelter visual language and contemporary indigenous art.',
    linkedTimelineId: 'warli-art'
  },
  {
    id: 'puri',
    order: 7,
    name: 'Puri',
    stateRegion: 'Odisha (Puri & Raghurajpur Heritage Crafts Village)',
    zone: 'Eastern India',
    coordinates: [19.8135, 85.8312],
    artTradition: 'Odisha Pattachitra Cloth Scroll Painting, Talapatrachitra & Jagannath Temple Art',
    period: 'c. 12th Century CE – Present',
    shortDescription:
      'Sacred coastal center of Odisha where Chitrakar painters create luminous Pattachitra scrolls on tamarind-treated cotton canvas and etched palm leaves.',
    detailedHistory:
      'Intimately tied to the 12th-century Shri Jagannath Temple in Puri and the nearby heritage village of Raghurajpur, Pattachitra ("patta" = cloth canvas, "chitra" = picture) is practiced by hereditary Chitrakar artist families. Cotton gauze is layered with a paste of roasted tamarind seeds and soft chalk stone, burnished with river pebbles until leathery smooth, and painted with disciplined calligraphic lines, rich mineral colors, and mandatory ornate floral borders.',
    keyTechniques: [
      'Pati preparation: layered cotton cloth stiffened with tamarind-seed gum and chalk, polished with agate stone',
      'Five traditional mineral colors (Pancharanga): Hingula (cinnabar red), Haritala (orpiment yellow), Nilam (indigo), lampblack, and calcined conch-shell white',
      'Talapatrachitra (iron-stylus incised palm-leaf manuscripts that fold like fans)'
    ],
    notableWorks: [
      'Anasara Patti (Sacred Substitute Icons of Lord Jagannath, Balabhadra & Subhadra)',
      'Kanchi Abhiyan & Gita Govinda Narrative Scrolls',
      'Dasavatara & Nabagunjara Mythological Pattachitras'
    ],
    culturalSignificance:
      'Pattachitra exemplifies the living synthesis of temple ritual, classical Odissi aesthetics, and eco-friendly mineral craftsmanship preserved across generations in Raghurajpur.'
  },
  {
    id: 'jaipur',
    order: 8,
    name: 'Jaipur',
    stateRegion: 'Rajasthan (Dhundhar Region)',
    zone: 'Northern India',
    coordinates: [26.9124, 75.7873],
    artTradition: 'Rajput (Dhundhar) Miniature Painting, Araish Fresco, Blue Pottery & Phad',
    period: 'c. 1727 CE (Foundation of Jaipur) – Present',
    shortDescription:
      'The Pink City of Rajasthan, celebrated for royal Rajput miniature ateliers (Suratkhana), Ragamala musical paintings, Araish lime frescoes, and quartz Blue Pottery.',
    detailedHistory:
      'Founded in 1727 by Maharaja Sawai Jai Singh II according to Vastu Shastra grid principles, Jaipur inherited the Amber court’s royal Suratkhana (painting workshop). Under Sawai Pratap Singh (builder of Hawa Mahal), Jaipur artists created monumental life-size cartoons and lyrical Ragamala ("Garland of Musical Modes") miniatures using crushed semi-precious gemstones, gold leaf, and vibrant mineral pigments, alongside Araish wet-lime architectural frescoes and clay-free quartz Blue Pottery.',
    keyTechniques: [
      'Gemstone mineral pigments (panna emerald, lajward lapis, hinglu vermilion) with raised pearl and gold embossing',
      'Araish (Jaipur wet-lime plaster fresco) burnished with coconut and agate to a mirror sheen',
      'Ragamala & Barahmasa visual translations of classical Indian musical ragas and twelve seasonal moods'
    ],
    notableWorks: [
      'Raslila & Ragamala Folios of the Jaipur Suratkhana',
      'Bani Thani & Sawai Pratap Singh Court Portraits',
      'Bairat & City Palace Chandra Mahal Botanical and Mythological Frescoes'
    ],
    culturalSignificance:
      'Recognized as a UNESCO World Heritage City and UNESCO Creative City of Crafts and Folk Art, Jaipur remains a vibrant nexus of Rajput court painting, architectural ornament, and artisan guilds.'
  }
];

export const GUIDED_TOUR_STOPS: GuidedTourStop[] = [
  {
    stopNumber: 1,
    id: 'tour-indus',
    title: 'Stop 1 · Indus Valley Civilization',
    subtitle: 'Dancing Girl of Mohenjo-daro (c. 2300–1750 BCE)',
    section: 'history',
    exhibitId: 'indus-valley',
    narration:
      'Welcome to the History Hall (CO1). Our chronological journey begins 4,300 years ago in the Indus Valley with the bronze Dancing Girl of Mohenjo-daro—a masterpiece of lost-wax metallurgy and spirited human poise.',
    cameraPos: [-3.2, 2.2, -14],
    cameraLookAt: [-8.4, 2.5, -14]
  },
  {
    stopNumber: 2,
    id: 'tour-ajanta',
    title: 'Stop 2 · Ajanta Cave Murals',
    subtitle: 'Satavahana & Vakataka Periods (c. 2nd c. BCE – 480 CE)',
    section: 'history',
    exhibitId: 'ajanta',
    narration:
      'Crossing the gallery to the Classical Era, we encounter the Buddhist rock-cut murals of Ajanta in Maharashtra. Notice the graceful Tribhanga flexion and mineral-pigment chiaroscuro of Bodhisattva Padmapani.',
    cameraPos: [3.2, 2.2, -19],
    cameraLookAt: [8.4, 2.5, -19]
  },
  {
    stopNumber: 3,
    id: 'tour-chola',
    title: 'Stop 3 · Imperial Chola Period',
    subtitle: 'Shiva as Nataraja · Panchaloha Bronze (c. 10th–11th c. CE)',
    section: 'history',
    exhibitId: 'chola-period',
    narration:
      'In the Kaveri Delta of Tamil Nadu, Chola master sculptors cast sacred Panchaloha bronzes. Before you stands Shiva as Nataraja within the flaming Prabhavali ring, uniting cosmic creation and serene stillness.',
    cameraPos: [-3.2, 2.2, -25],
    cameraLookAt: [-8.4, 2.5, -25]
  },
  {
    stopNumber: 4,
    id: 'tour-mughal',
    title: 'Stop 4 · Mughal Imperial Art',
    subtitle: 'Karkhana Miniature Painting (c. 16th–18th c. CE)',
    section: 'history',
    exhibitId: 'mughal-art',
    narration:
      'Next, we examine the Mughal Imperial Karkhana tradition, where Persian calligraphic line met indigenous Indian vibrancy and naturalistic portraiture, painted with single-hair brushes and burnished 24k gold leaf.',
    cameraPos: [3.2, 2.2, -30],
    cameraLookAt: [8.4, 2.5, -30]
  },
  {
    stopNumber: 5,
    id: 'tour-madhubani',
    title: 'Stop 5 · Madhubani / Mithila Art',
    subtitle: 'Ceremonial Kohbar & Aripan Tradition · Bihar',
    section: 'history',
    exhibitId: 'madhubani-art',
    narration:
      'Entering India’s living regional traditions, this Madhubani exhibit from Bihar’s Mithila region showcases bold double-line contours, natural plant dyes, and sacred lotus-and-fish fertility cosmology with zero empty space.',
    cameraPos: [-3.2, 2.2, -36],
    cameraLookAt: [-8.4, 2.5, -36]
  },
  {
    stopNumber: 6,
    id: 'tour-warli',
    title: 'Stop 6 · Warli Indigenous Art',
    subtitle: 'Chaukat & Tarpa Dance Wall Painting · Maharashtra',
    section: 'history',
    exhibitId: 'warli-art',
    narration:
      'Concluding the History Hall is Warli art from the North Sahyadri mountains—where simple circles, triangles, and squares in white rice paste on terracotta earth bring entire village communities and the Tarpa dance to life.',
    cameraPos: [3.2, 2.2, -41],
    cameraLookAt: [8.4, 2.5, -41]
  },
  {
    stopNumber: 7,
    id: 'tour-map',
    title: 'Stop 7 · Explore India — Art & Culture Map',
    subtitle: 'Interactive Cartography of 8 Major Heritage Centers (CO1)',
    section: 'map',
    narration:
      'Moving into the West Wing (Art Map Pavilion), our interactive Leaflet & OpenStreetMap cartography connects 8 pivotal centers of Indian art: Ajanta, Ellora, Thanjavur, Khajuraho, Madhubani, Warli Region, Puri, and Jaipur.',
    cameraPos: [-16.5, 2.2, -2],
    cameraLookAt: [-22.4, 2.6, -2]
  },
  {
    stopNumber: 8,
    id: 'tour-fusion',
    title: 'Stop 8 · Regional Painting Fusion Gallery',
    subtitle: 'Original Warli × Kalamkari Digital Synthesis (CO2)',
    section: 'fusion',
    narration:
      'Our final stop is the East Wing Fusion Gallery (CO2), presenting an original Warli × Kalamkari digital synthesis that weaves Maharashtra’s geometric rice-paste village figures into Andhra’s botanical Tree of Life vines and ornate borders.',
    cameraPos: [16.5, 2.2, -2],
    cameraLookAt: [22.4, 2.8, -2]
  }
];

export const FUSION_CURATORIAL_DATA = {
  title: 'SANGAMAM: THE SACRED GROVE & THE VILLAGE CIRCLE',
  subtitle: 'WARLI × KALAMKARI — Original Digital Regional Painting Fusion',
  courseOutcome: 'CO2 — Regional Painting Fusion',
  medium: 'Original Multi-Layer Vector & Procedural Pigment Digital Canvas',
  dimensions: '240 cm × 160 cm (Central Gallery Installation)',
  whatIsWarli: {
    heading: 'What is Warli Art?',
    region: 'North Sahyadri Range (Palghar, Dahanu, Jawhar), Maharashtra',
    summary:
      'Warli is an indigenous tribal painting tradition dating back to Neolithic rock-shelter aesthetics (c. 2500 BCE). Traditionally painted by Warli women on mud-and-cow-dung walls coated with red ochre (geru), it employs a pure, stark white pigment made from ground rice paste and natural gum applied with a chewed bamboo stick.',
    visualGrammar: [
      'Geometric Human Figures: Constructed from two inverted triangles joined at their apex (representing torso and pelvis), topped with a floating circle head and rhythmic stick limbs.',
      'Sacred Primitives: The Circle represents the Sun and Moon (cosmic observers); the Triangle derives from conical mountain peaks and trees; the Square (Chauk) denotes a sacred ritual enclosure.',
      'Community & Ecology: The Tarpa spiral harvest dance, agrarian labor, thatched village dwellings, radiating trees, and forest animals moving in egalitarian collective rhythm.'
    ]
  },
  whatIsKalamkari: {
    heading: 'What is Kalamkari?',
    region: 'Srikalahasti & Machilipatnam, Andhra Pradesh / Telangana',
    summary:
      'Kalamkari (literally "pen-craft" from kalam = bamboo pen and kari = craftsmanship) is a classical hand-painted and block-printed cotton textile art. Treated in buffalo milk and myrobalan (harda) astringent solution, the fabric is drawn with a pointed bamboo reed soaked in fermented jaggery-and-iron-rust black ink (kasimi) and dyed exclusively with natural vegetable and mineral mordants.',
    visualGrammar: [
      'Botanical Ornamentation: The Kalpavriksha (wish-fulfilling Tree of Life) with sinuous scrolling vines, curling tendrils, and lush foliage.',
      'Floral & Avian Motifs: Stylized multi-petaled lotuses, marigold rosettes, mango/paisley (Manga) buds, and ornate peacocks.',
      'Decorative Borders (Hashiya): Repeating geometric-floral bands, scalloped arches (Mihrab/Torana), and dense cross-hatched petal fills in indigo, madder red, mustard yellow, and pomegranate green.'
    ]
  },
  combinedElements: {
    heading: 'What Elements Were Combined?',
    points: [
      {
        title: '1. Kalamkari Kalpavriksha Vines Cradling the Warli Village',
        detail:
          'A monumental Kalamkari Tree of Life with scrolling indigo, madder crimson, and mustard floral vines rises from the earth, forming sheltering botanical canopies around the Warli village huts and harvesting figures.'
      },
      {
        title: '2. Warli Tarpa Spiral Inside a Kalamkari Lotus Mandala',
        detail:
          'At the heart of the canvas, a circle of geometric Warli dancers and musicians performing the Tarpa harvest dance revolves within an ornate Kalamkari multi-petaled lotus medallion and sacred Chaukat frame.'
      },
      {
        title: '3. Dual-Tradition Fauna & Flora Dialogue',
        detail:
          'Austere rice-paste Warli geometric deer, horses, and birds share branches with richly patterned Kalamkari peacocks, blooming lotuses, and serrated leaves.'
      },
      {
        title: '4. Multi-Tiered Ornamental Borders',
        detail:
          'The outer frame combines Kalamkari’s repeating Manga (paisley) and floral vine borders with Warli’s crisp triangular mountain-and-chevron friezes.'
      }
    ]
  },
  whyFusionRepresentsDiversity: {
    heading: 'Why This Fusion Represents Regional Artistic Diversity',
    essay:
      'Indian visual culture is often studied through the binary of Margi (classical/courtly/temple traditions) and Desi (indigenous/folk/tribal traditions). By bringing Maharashtra’s Warli art and Andhra Pradesh’s Kalamkari into a single harmonious composition, this artwork bridges two distinct ecological, linguistic, and aesthetic worlds. Warli achieves kinetic narrative power through radical geometric reduction and monochromatic contrast (white rice paste on red earth), whereas Kalamkari celebrates botanical abundance through curvilinear calligraphy and a complex five-stage natural dye alchemy. Yet beneath their contrasting visual vocabularies lies a shared civilizational ethos: both traditions extract every pigment sustainably from the living earth, revere the Tree of Life as a cosmic axis, and celebrate the sacred interdependence of human community, flora, and fauna.'
  }
};
