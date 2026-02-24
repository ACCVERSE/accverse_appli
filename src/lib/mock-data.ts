import { Pet, Post, Comment, VaccineRecord, TreatmentRecord, HealthObservation, PhotoAlbum, Outing, Professional, SubscriptionPlan, User } from './types';

// Current User
export const currentUser: User = {
  id: 'user-1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
  region: 'Milan, Italy',
  pets: []
};

// Sample Pets
export const samplePets: Pet[] = [
  {
    id: 'pet-1',
    name: 'Luna',
    species: 'dog',
    breed: 'Golden Retriever',
    birthdate: '2020-03-15',
    sex: 'female',
    sterilized: true,
    description: 'I\'m a gentle and playful Golden who loves belly rubs and long walks in the park. My favorite toy is my squeaky duck!',
    photo: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=400&fit=crop',
    status: 'active',
    ownerId: 'user-1',
    createdAt: '2023-01-15',
    allergies: ['chicken'],
    isReactive: false
  },
  {
    id: 'pet-2',
    name: 'Mochi',
    species: 'cat',
    breed: 'British Shorthair',
    birthdate: '2021-07-22',
    sex: 'male',
    sterilized: true,
    description: 'A dignified gentleman who enjoys napping in sunbeams and judging everyone from high places. Treats are accepted in the form of premium salmon.',
    photo: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400&h=400&fit=crop',
    status: 'active',
    ownerId: 'user-1',
    createdAt: '2023-02-20',
    allergies: [],
    isReactive: false
  },
  {
    id: 'pet-3',
    name: 'Cinnamon',
    species: 'rabbit',
    breed: 'Holland Lop',
    birthdate: '2022-11-08',
    sex: 'female',
    sterilized: true,
    description: 'Hop hop hop! I love exploring and munching on fresh veggies. My ears are soft and perfect for gentle pets.',
    photo: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&h=400&fit=crop',
    status: 'active',
    ownerId: 'user-1',
    createdAt: '2023-03-10',
    allergies: ['lettuce'],
    isReactive: false
  },
  {
    id: 'pet-4',
    name: 'Max',
    species: 'dog',
    breed: 'German Shepherd',
    birthdate: '2019-05-20',
    sex: 'male',
    sterilized: true,
    description: 'A loyal protector with a heart of gold. I love training sessions, playing fetch, and keeping my family safe.',
    photo: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=400&h=400&fit=crop',
    status: 'active',
    ownerId: 'user-2',
    createdAt: '2023-01-10',
    allergies: [],
    isReactive: true
  },
  {
    id: 'pet-5',
    name: 'Whiskers',
    species: 'cat',
    breed: 'Maine Coon',
    birthdate: '2020-09-12',
    sex: 'male',
    sterilized: true,
    description: 'A gentle giant who loves water and follows my humans around like a dog. I have a lot of floof and even more love to give.',
    photo: 'https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?w=400&h=400&fit=crop',
    status: 'active',
    ownerId: 'user-3',
    createdAt: '2023-02-15',
    allergies: [],
    isReactive: false
  }
];

// Sample Posts (written from animal's perspective)
export const samplePosts: Post[] = [
  {
    id: 'post-1',
    petId: 'pet-1',
    petName: 'Luna',
    petPhoto: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=100&h=100&fit=crop',
    petSpecies: 'dog',
    content: 'Had the most amazing day at the park today! 🐕 Met so many new friends and played fetch until my paws were tired. My human gave me extra treats for being such a good girl!',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=400&fit=crop',
    likes: 42,
    comments: [],
    createdAt: '2024-01-15T10:30:00',
    isNational: false,
    region: 'Milan, Italy'
  },
  {
    id: 'post-2',
    petId: 'pet-2',
    petName: 'Mochi',
    petPhoto: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=100&h=100&fit=crop',
    petSpecies: 'cat',
    content: 'I\'m resting today... My human bought me a new cat tree but I prefer the box it came in. The box is superior in every way. 📦😸',
    image: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=600&h=400&fit=crop',
    likes: 128,
    comments: [],
    createdAt: '2024-01-15T14:20:00',
    isNational: true,
    region: 'Milan, Italy'
  },
  {
    id: 'post-3',
    petId: 'pet-4',
    petName: 'Max',
    petPhoto: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=100&h=100&fit=crop',
    petSpecies: 'dog',
    content: 'Graduated from advanced obedience training today! 🎓 My human is so proud of me. I can now do 15 different commands. The treat rewards were excellent!',
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=400&fit=crop',
    likes: 89,
    comments: [],
    createdAt: '2024-01-14T16:45:00',
    isNational: false,
    region: 'Rome, Italy'
  },
  {
    id: 'post-4',
    petId: 'pet-5',
    petName: 'Whiskers',
    petPhoto: 'https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?w=100&h=100&fit=crop',
    petSpecies: 'cat',
    content: 'The sunbeam moved AGAIN and now I have to relocate. The struggles of being a cat are real. 😤 At least my human refilled my water fountain.',
    likes: 156,
    comments: [],
    createdAt: '2024-01-14T09:15:00',
    isNational: true,
    region: 'Florence, Italy'
  },
  {
    id: 'post-5',
    petId: 'pet-3',
    petName: 'Cinnamon',
    petPhoto: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=100&h=100&fit=crop',
    petSpecies: 'rabbit',
    content: 'Binky celebration today! 🐰✨ I did five binkies in a row because my human gave me fresh parsley. Life is good when you\'re a bunny with veggies!',
    image: 'https://images.unsplash.com/photo-1535241749838-299c4c28cb00?w=600&h=400&fit=crop',
    likes: 73,
    comments: [],
    createdAt: '2024-01-13T11:30:00',
    isNational: false,
    region: 'Milan, Italy'
  }
];

// Sample Comments
export const sampleComments: Comment[] = [
  {
    id: 'comment-1',
    postId: 'post-1',
    petId: 'pet-4',
    petName: 'Max',
    petPhoto: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=50&h=50&fit=crop',
    content: 'Woof! I wish I could have joined you at the park! 🐾',
    createdAt: '2024-01-15T11:00:00'
  },
  {
    id: 'comment-2',
    postId: 'post-1',
    petId: 'pet-5',
    petName: 'Whiskers',
    petPhoto: 'https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?w=50&h=50&fit=crop',
    content: 'Dogs and their parks... I prefer my sunbeam. 😺',
    createdAt: '2024-01-15T11:30:00'
  }
];

// Sample Vaccine Records
export const sampleVaccines: VaccineRecord[] = [
  {
    id: 'vax-1',
    petId: 'pet-1',
    name: 'Rabies',
    date: '2023-06-15',
    nextDue: '2024-06-15',
    veterinarian: 'Dr. Maria Rossi',
    notes: 'Annual booster'
  },
  {
    id: 'vax-2',
    petId: 'pet-1',
    name: 'DHPP (Distemper)',
    date: '2023-06-15',
    nextDue: '2024-06-15',
    veterinarian: 'Dr. Maria Rossi'
  },
  {
    id: 'vax-3',
    petId: 'pet-1',
    name: 'Bordetella',
    date: '2023-09-20',
    nextDue: '2024-09-20',
    veterinarian: 'Dr. Maria Rossi',
    notes: 'Required for boarding'
  },
  {
    id: 'vax-4',
    petId: 'pet-2',
    name: 'FVRCP',
    date: '2023-07-10',
    nextDue: '2024-07-10',
    veterinarian: 'Dr. Marco Bianchi'
  },
  {
    id: 'vax-5',
    petId: 'pet-2',
    name: 'Rabies',
    date: '2023-07-10',
    nextDue: '2024-07-10',
    veterinarian: 'Dr. Marco Bianchi'
  }
];

// Sample Treatment Records
export const sampleTreatments: TreatmentRecord[] = [
  {
    id: 'treat-1',
    petId: 'pet-1',
    type: 'Surgery',
    description: 'Spay surgery',
    date: '2020-09-15',
    veterinarian: 'Dr. Maria Rossi',
    medications: ['Rimadyl', 'Acepromazine']
  },
  {
    id: 'treat-2',
    petId: 'pet-1',
    type: 'Dental',
    description: 'Annual dental cleaning',
    date: '2023-03-20',
    veterinarian: 'Dr. Maria Rossi'
  },
  {
    id: 'treat-3',
    petId: 'pet-2',
    type: 'Checkup',
    description: 'Annual wellness exam',
    date: '2023-07-10',
    veterinarian: 'Dr. Marco Bianchi',
    medications: ['Flea prevention']
  }
];

// Sample Health Observations
export const sampleObservations: HealthObservation[] = [
  {
    id: 'obs-1',
    petId: 'pet-1',
    date: '2024-01-10',
    type: 'weight',
    content: 'Weight check',
    value: '28.5 kg'
  },
  {
    id: 'obs-2',
    petId: 'pet-1',
    date: '2024-01-08',
    type: 'note',
    content: 'Eating well, good energy levels. Enjoying the new food brand.'
  },
  {
    id: 'obs-3',
    petId: 'pet-2',
    date: '2024-01-05',
    type: 'weight',
    content: 'Weight check',
    value: '5.2 kg'
  },
  {
    id: 'obs-4',
    petId: 'pet-1',
    date: '2024-01-03',
    type: 'medication',
    content: 'Monthly heartworm prevention given'
  }
];

// Sample Photo Albums
export const sampleAlbums: PhotoAlbum[] = [
  {
    id: 'album-1',
    petId: 'pet-1',
    name: 'Park Adventures',
    createdAt: '2024-01-15',
    photos: [
      {
        id: 'photo-1',
        albumId: 'album-1',
        url: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
        caption: 'Playing fetch at sunset',
        createdAt: '2024-01-15'
      },
      {
        id: 'photo-2',
        albumId: 'album-1',
        url: 'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=400&h=300&fit=crop',
        caption: 'Making friends!',
        createdAt: '2024-01-15'
      },
      {
        id: 'photo-3',
        albumId: 'album-1',
        url: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop',
        caption: 'Happy pup',
        createdAt: '2024-01-14'
      }
    ]
  },
  {
    id: 'album-2',
    petId: 'pet-1',
    name: 'Puppy Days',
    createdAt: '2023-06-20',
    photos: [
      {
        id: 'photo-4',
        albumId: 'album-2',
        url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&h=300&fit=crop',
        caption: 'First day home',
        createdAt: '2020-03-20'
      },
      {
        id: 'photo-5',
        albumId: 'album-2',
        url: 'https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?w=400&h=300&fit=crop',
        caption: 'Nap time',
        createdAt: '2020-04-15'
      }
    ]
  },
  {
    id: 'album-3',
    petId: 'pet-2',
    name: 'Cat Life',
    createdAt: '2024-01-10',
    photos: [
      {
        id: 'photo-6',
        albumId: 'album-3',
        url: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400&h=300&fit=crop',
        caption: 'Judging you',
        createdAt: '2024-01-10'
      },
      {
        id: 'photo-7',
        albumId: 'album-3',
        url: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=400&h=300&fit=crop',
        caption: 'Box life',
        createdAt: '2024-01-12'
      }
    ]
  }
];

// Sample Outings
export const sampleOutings: Outing[] = [
  {
    id: 'out-1',
    title: 'Morning Playgroup in the Park',
    description: 'Join us for a fun morning of play and socialization! I\'ll bring my favorite toys to share. All friendly pups welcome!',
    hostPetId: 'pet-1',
    hostPetName: 'Luna',
    hostPetPhoto: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=100&h=100&fit=crop',
    location: 'Parco Sempione, Milan',
    date: '2024-01-20',
    time: '10:00',
    maxParticipants: 10,
    participants: [
      { petId: 'pet-4', petName: 'Max', petPhoto: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=50&h=50&fit=crop', status: 'going' }
    ],
    compatibilityFilters: {
      species: ['dog'],
      sterilizedOnly: false,
      excludeReactive: true
    },
    createdAt: '2024-01-15'
  },
  {
    id: 'out-2',
    title: 'Cat Cafe Meetup',
    description: 'A calm afternoon at our favorite cat cafe. Plenty of treats and cozy corners for napping. Humans can enjoy coffee while we supervise.',
    hostPetId: 'pet-2',
    hostPetName: 'Mochi',
    hostPetPhoto: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=100&h=100&fit=crop',
    location: 'Cat Cafe Milano',
    date: '2024-01-22',
    time: '15:00',
    maxParticipants: 6,
    participants: [
      { petId: 'pet-5', petName: 'Whiskers', petPhoto: 'https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?w=50&h=50&fit=crop', status: 'interested' }
    ],
    compatibilityFilters: {
      species: ['cat'],
      sterilizedOnly: true
    },
    createdAt: '2024-01-14'
  },
  {
    id: 'out-3',
    title: 'Bunny Hop Party',
    description: 'Bunnies of Milan unite! We\'ll have a safe play area with tunnels and hidey holes. Fresh veggies provided!',
    hostPetId: 'pet-3',
    hostPetName: 'Cinnamon',
    hostPetPhoto: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=100&h=100&fit=crop',
    location: 'Bunny Haven, Milan',
    date: '2024-01-25',
    time: '11:00',
    maxParticipants: 8,
    participants: [],
    compatibilityFilters: {
      species: ['rabbit']
    },
    createdAt: '2024-01-13'
  }
];

// Sample Professionals
export const sampleProfessionals: Professional[] = [
  {
    id: 'pro-1',
    name: 'Dr. Maria Rossi',
    type: 'vet',
    description: 'Experienced veterinarian specializing in small animals. Over 15 years of experience with dogs, cats, and exotic pets.',
    photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face',
    address: 'Via Dante 45, Milan',
    lat: 45.4642,
    lng: 9.1900,
    phone: '+39 02 1234 5678',
    email: 'dr.rossi@petclinic.it',
    services: ['General Checkups', 'Vaccinations', 'Surgery', 'Dental Care', 'Emergency Care'],
    rating: 4.9,
    reviewCount: 234,
    subscriptionTier: 'premium',
    verified: true,
    hours: {
      monday: '9:00 - 19:00',
      tuesday: '9:00 - 19:00',
      wednesday: '9:00 - 19:00',
      thursday: '9:00 - 19:00',
      friday: '9:00 - 19:00',
      saturday: '10:00 - 16:00',
      sunday: 'Closed'
    }
  },
  {
    id: 'pro-2',
    name: 'Pawfect Grooming',
    type: 'groomer',
    description: 'Professional pet grooming with love and care. We specialize in breed-specific cuts and spa treatments.',
    photo: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=200&h=200&fit=crop',
    address: 'Corso Buenos Aires 78, Milan',
    lat: 45.4781,
    lng: 9.2050,
    phone: '+39 02 9876 5432',
    email: 'info@pawfect.it',
    services: ['Full Grooming', 'Bath & Brush', 'Nail Trimming', 'Ear Cleaning', 'De-shedding'],
    rating: 4.7,
    reviewCount: 156,
    subscriptionTier: 'pro',
    verified: true,
    hours: {
      monday: '10:00 - 18:00',
      tuesday: '10:00 - 18:00',
      wednesday: '10:00 - 18:00',
      thursday: '10:00 - 18:00',
      friday: '10:00 - 18:00',
      saturday: '10:00 - 17:00',
      sunday: 'Closed'
    }
  },
  {
    id: 'pro-3',
    name: 'Happy Tails Training',
    type: 'trainer',
    description: 'Positive reinforcement training for dogs of all ages and breeds. From puppies to seniors, we help build better relationships.',
    photo: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=200&h=200&fit=crop',
    address: 'Via Tortona 23, Milan',
    lat: 45.4512,
    lng: 9.1750,
    phone: '+39 02 5555 1234',
    email: 'train@happytails.it',
    services: ['Puppy Training', 'Obedience Classes', 'Behavioral Consultation', 'Agility Training', 'Private Sessions'],
    rating: 4.8,
    reviewCount: 89,
    subscriptionTier: 'starter',
    verified: true,
    hours: {
      monday: '9:00 - 20:00',
      tuesday: '9:00 - 20:00',
      wednesday: '9:00 - 20:00',
      thursday: '9:00 - 20:00',
      friday: '9:00 - 20:00',
      saturday: '9:00 - 17:00',
      sunday: 'Closed'
    }
  },
  {
    id: 'pro-4',
    name: 'Rescue Hearts Italy',
    type: 'rescue',
    description: 'Non-profit animal rescue dedicated to saving and rehoming abandoned pets. Every pet deserves a loving home.',
    photo: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=200&h=200&fit=crop',
    address: 'Via Bergamo 112, Milan',
    lat: 45.4890,
    lng: 9.2100,
    phone: '+39 02 7777 8888',
    email: 'adopt@rescuehearts.it',
    services: ['Pet Adoption', 'Foster Care', 'Lost & Found', 'Microchipping', 'Pet Food Bank'],
    rating: 4.9,
    reviewCount: 312,
    subscriptionTier: 'free',
    verified: true,
    hours: {
      monday: '10:00 - 17:00',
      tuesday: '10:00 - 17:00',
      wednesday: '10:00 - 17:00',
      thursday: '10:00 - 17:00',
      friday: '10:00 - 17:00',
      saturday: '10:00 - 15:00',
      sunday: '10:00 - 13:00'
    }
  },
  {
    id: 'pro-5',
    name: 'Casa Pet Sitter',
    type: 'pet_sitter',
    description: 'In-home pet sitting and dog walking services. Your pets stay comfortable in their own environment while you\'re away.',
    photo: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200&h=200&fit=crop',
    address: 'Navigli District, Milan',
    lat: 45.4510,
    lng: 9.1850,
    phone: '+39 333 444 5555',
    email: 'ciao@casapetsitter.it',
    services: ['Dog Walking', 'Pet Sitting', 'Overnight Care', 'Puppy Visits', 'Cat Care'],
    rating: 4.6,
    reviewCount: 67,
    subscriptionTier: 'starter',
    verified: false,
    hours: {
      monday: '7:00 - 21:00',
      tuesday: '7:00 - 21:00',
      wednesday: '7:00 - 21:00',
      thursday: '7:00 - 21:00',
      friday: '7:00 - 21:00',
      saturday: '8:00 - 20:00',
      sunday: '8:00 - 20:00'
    }
  }
];

// Subscription Plans
export const subscriptionPlans: SubscriptionPlan[] = [
  {
    tier: 'free',
    name: 'Free',
    price: 0,
    currency: '€',
    features: [
      'Basic profile listing',
      'Contact information display',
      'Up to 3 service categories',
      'Customer reviews'
    ]
  },
  {
    tier: 'starter',
    name: 'Starter',
    price: 9,
    currency: '€',
    features: [
      'Everything in Free',
      'Photo gallery (up to 10)',
      'Social media links',
      'Response time badge',
      'Monthly analytics'
    ]
  },
  {
    tier: 'pro',
    name: 'Pro',
    price: 19,
    currency: '€',
    highlighted: true,
    features: [
      'Everything in Starter',
      'Unlimited photos',
      'Priority in search results',
      'Booking system integration',
      'Promotional posts',
      'Weekly analytics'
    ]
  },
  {
    tier: 'premium',
    name: 'Premium',
    price: 39,
    currency: '€',
    features: [
      'Everything in Pro',
      'Featured placement',
      'Verified badge',
      'Custom promotional offers',
      'API access',
      'Dedicated support',
      'Real-time analytics'
    ]
  }
];

// Get species emoji
export function getSpeciesEmoji(species: string): string {
  const emojis: Record<string, string> = {
    dog: '🐕',
    cat: '🐱',
    rabbit: '🐰',
    bird: '🐦',
    other: '🐾'
  };
  return emojis[species] || '🐾';
}

// Get professional type label
export function getProTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    vet: 'Veterinarian',
    groomer: 'Groomer',
    breeder: 'Breeder',
    rescue: 'Rescue Center',
    trainer: 'Pet Trainer',
    pet_sitter: 'Pet Sitter'
  };
  return labels[type] || type;
}

// Get tier badge color
export function getTierBadgeColor(tier: string): string {
  const colors: Record<string, string> = {
    free: 'bg-gray-500/20 text-gray-300',
    starter: 'bg-amber-500/20 text-amber-300',
    pro: 'bg-purple-500/20 text-purple-300',
    premium: 'bg-gradient-to-r from-amber-500/20 to-purple-500/20 text-amber-200'
  };
  return colors[tier] || colors.free;
}
