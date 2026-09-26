// categories.js (LIVE PREVIEW ONLY — see note below)
//
// This preview build keeps the MobileNet + keyword-mapping demo engine


const CATEGORY_INFO = {
  cardboard: { label: 'Cardboard', color: '#f59e0b', icon: '📦', guidance: 'Recyclable — flatten and place in the cardboard recycling bin.' },
  glass:     { label: 'Glass',     color: '#3b82f6', icon: '🍾', guidance: 'Recyclable — place in the glass recycling bin; handle with care.' },
  metal:     { label: 'Metal',     color: '#6366f1', icon: '🥫', guidance: 'Recyclable — rinse and place in the metal / cans recycling bin.' },
  paper:     { label: 'Paper',     color: '#ec4899', icon: '📄', guidance: 'Recyclable — keep dry and place in the paper recycling bin.' },
  plastic:   { label: 'Plastic',   color: '#10b981', icon: '♻️', guidance: 'Recyclable — rinse and place in the plastics recycling bin.' },
  trash:     { label: 'Trash',     color: '#ef4444', icon: '🗑️', guidance: 'Not recyclable — dispose of in general waste.' },
  organic:   { label: 'Organic',   color: '#8b5cf6', icon: '🍃', guidance: 'Compostable — place in the organic / compost bin.' },
};

const IMAGENET_TO_CATEGORY_RULES = [
  ['cardboard', ['carton', 'cardboard box', 'packet']],
  ['glass',     ['beer bottle', 'wine bottle', 'vase', 'goblet', 'beer glass']],
  ['plastic',   ['pop bottle', 'water bottle', 'plastic bag', 'syringe', 'shower cap', 'rubber eraser', 'ping-pong ball']],
  ['metal',     ['tin can', 'soda can', 'beer can', 'can opener', 'lighter', 'safety pin', 'nail', 'screw', 'padlock', 'hook', 'wok', 'frying pan', 'radiator', 'barbell']],
  ['paper',     ['envelope', 'paper towel', 'toilet tissue', 'menu', 'book jacket', 'comic book', 'notebook', 'binder']],
  ['organic',   ['banana', 'orange', 'lemon', 'pineapple', 'strawberry', 'granny smith', 'fig', 'pomegranate', 'mushroom', 'artichoke', 'cucumber', 'zucchini', 'broccoli', 'cauliflower', 'bell pepper', 'corn', 'custard apple', 'pizza', 'cheeseburger', 'hotdog', 'guacamole']],
];

function mapToCategory(imageNetClassName) {
  const c = imageNetClassName.toLowerCase();
  for (const [category, keywords] of IMAGENET_TO_CATEGORY_RULES) {
    if (keywords.some(k => c.includes(k))) return category;
  }
  return 'trash';
}
