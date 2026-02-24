// Pet Types
export type PetSpecies = 'dog' | 'cat' | 'rabbit' | 'bird' | 'other';
export type PetSex = 'male' | 'female';
export type PetStatus = 'active' | 'lost' | 'deceased';

export interface Pet {
  id: string;
  name: string;
  species: PetSpecies;
  breed: string;
  birthdate: string;
  sex: PetSex;
  sterilized: boolean;
  description: string;
  photo: string;
  status: PetStatus;
  ownerId: string;
  createdAt: string;
  allergies: string[];
  isReactive: boolean;
}

// Post Types
export interface Post {
  id: string;
  petId: string;
  petName: string;
  petPhoto: string;
  petSpecies: PetSpecies;
  content: string; // Written from animal's perspective
  image?: string;
  likes: number;
  comments: Comment[];
  createdAt: string;
  isNational: boolean;
  region: string;
}

export interface Comment {
  id: string;
  postId: string;
  petId: string;
  petName: string;
  petPhoto: string;
  content: string;
  createdAt: string;
}

// Health & Document Types
export interface VaccineRecord {
  id: string;
  petId: string;
  name: string;
  date: string;
  nextDue?: string;
  veterinarian: string;
  notes?: string;
}

export interface TreatmentRecord {
  id: string;
  petId: string;
  type: string;
  description: string;
  date: string;
  veterinarian: string;
  medications?: string[];
}

export interface HealthObservation {
  id: string;
  petId: string;
  date: string;
  type: 'note' | 'weight' | 'symptom' | 'medication';
  content: string;
  value?: string;
}

// Gallery Types
export interface PhotoAlbum {
  id: string;
  petId: string;
  name: string;
  createdAt: string;
  photos: Photo[];
}

export interface Photo {
  id: string;
  albumId: string;
  url: string;
  caption?: string;
  createdAt: string;
  sharedUntil?: string;
}

// Outing Types
export interface Outing {
  id: string;
  title: string;
  description: string;
  hostPetId: string;
  hostPetName: string;
  hostPetPhoto: string;
  location: string;
  date: string;
  time: string;
  maxParticipants: number;
  participants: OutingParticipant[];
  compatibilityFilters: CompatibilityFilters;
  createdAt: string;
}

export interface OutingParticipant {
  petId: string;
  petName: string;
  petPhoto: string;
  status: 'going' | 'interested' | 'maybe';
}

export interface CompatibilityFilters {
  species?: PetSpecies[];
  sterilizedOnly?: boolean;
  excludeReactive?: boolean;
}

// Professional Types
export type ProfessionalType = 'vet' | 'groomer' | 'breeder' | 'rescue' | 'trainer' | 'pet_sitter';
export type SubscriptionTier = 'free' | 'starter' | 'pro' | 'premium';

export interface Professional {
  id: string;
  name: string;
  type: ProfessionalType;
  description: string;
  photo: string;
  address: string;
  lat: number;
  lng: number;
  phone: string;
  email: string;
  services: string[];
  rating: number;
  reviewCount: number;
  subscriptionTier: SubscriptionTier;
  verified: boolean;
  hours: OperatingHours;
}

export interface OperatingHours {
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
}

// Subscription Tiers
export interface SubscriptionPlan {
  tier: SubscriptionTier;
  name: string;
  price: number;
  currency: string;
  features: string[];
  highlighted?: boolean;
}

// Navigation Types
export type ViewType = 'landing' | 'feed' | 'pets' | 'pet-detail' | 'health' | 'gallery' | 'outings' | 'map' | 'profile';

export interface NavigationItem {
  id: ViewType;
  label: string;
  icon: string;
}

// User State
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  region: string;
  pets: Pet[];
}
