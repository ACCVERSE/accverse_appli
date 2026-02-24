'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Progress } from '@/components/ui/progress'
import { useToast } from '@/hooks/use-toast'
import { 
  Home, PawPrint, Heart, MapPin, User, Plus, Search, Bell, Settings,
  MessageCircle, Share2, Camera, CalendarDays, Clock, ChevronRight,
  ChevronLeft, X, Check, AlertTriangle, Star, Phone, Mail, ExternalLink,
  Shield, Activity, FileText, Image, Users, Map, Filter, MoreVertical,
  Eye, EyeOff, Edit, Trash2, QrCode, Award, Sparkles, Stethoscope,
  Scissors, HeartHandshake, GraduationCap, Home as HomeIcon, Menu,
  Send, ThumbsUp, Flag, Info, CheckCircle, AlertCircle, CalendarCheck
} from 'lucide-react'
import { format } from 'date-fns'
import { 
  ViewType, Pet, Post, PetSpecies, PetStatus, VaccineRecord,
  TreatmentRecord, HealthObservation, PhotoAlbum, Outing, Professional,
  SubscriptionPlan
} from '@/lib/types'
import {
  samplePets, samplePosts, sampleVaccines, sampleTreatments,
  sampleObservations, sampleAlbums, sampleOutings, sampleProfessionals,
  subscriptionPlans, getSpeciesEmoji, getProTypeLabel, getTierBadgeColor,
  currentUser
} from '@/lib/mock-data'

// State Management
interface AppState {
  currentView: ViewType
  selectedPetId: string | null
  pets: Pet[]
  posts: Post[]
  isCreatePostOpen: boolean
  isCreatePetOpen: boolean
  isCreateOutingOpen: boolean
  searchQuery: string
}

export function AccverseApp() {
  const { toast } = useToast()
  const [state, setState] = useState<AppState>({
    currentView: 'landing',
    selectedPetId: null,
    pets: samplePets,
    posts: samplePosts,
    isCreatePostOpen: false,
    isCreatePetOpen: false,
    isCreateOutingOpen: false,
    searchQuery: ''
  })

  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set())
  const [date, setDate] = useState<Date | undefined>(new Date())

  const updateState = (updates: Partial<AppState>) => {
    setState(prev => ({ ...prev, ...updates }))
  }

  const navigateTo = (view: ViewType, petId?: string) => {
    updateState({ currentView: view, selectedPetId: petId || null })
  }

  const handleLikePost = (postId: string) => {
    setLikedPosts(prev => {
      const next = new Set(prev)
      if (next.has(postId)) {
        next.delete(postId)
      } else {
        next.add(postId)
      }
      return next
    })
  }

  const handleCreatePost = (content: string, image?: string) => {
    const myPet = state.pets[0]
    const newPost: Post = {
      id: `post-${Date.now()}`,
      petId: myPet.id,
      petName: myPet.name,
      petPhoto: myPet.photo,
      petSpecies: myPet.species,
      content,
      image,
      likes: 0,
      comments: [],
      createdAt: new Date().toISOString(),
      isNational: false,
      region: 'Milan, Italy'
    }
    updateState({ 
      posts: [newPost, ...state.posts],
      isCreatePostOpen: false 
    })
    toast({
      title: "Post created! 🐾",
      description: "Your post has been shared with the community.",
    })
  }

  const handleCreatePet = (pet: Partial<Pet>) => {
    const newPet: Pet = {
      id: `pet-${Date.now()}`,
      name: pet.name || 'New Pet',
      species: pet.species || 'dog',
      breed: pet.breed || 'Mixed',
      birthdate: pet.birthdate || new Date().toISOString().split('T')[0],
      sex: pet.sex || 'male',
      sterilized: pet.sterilized || false,
      description: pet.description || '',
      photo: pet.photo || 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop',
      status: 'active',
      ownerId: currentUser.id,
      createdAt: new Date().toISOString(),
      allergies: pet.allergies || [],
      isReactive: pet.isReactive || false
    }
    updateState({ 
      pets: [...state.pets, newPet],
      isCreatePetOpen: false 
    })
    toast({
      title: "Pet profile created! 🎉",
      description: `${newPet.name}'s profile has been added.`,
    })
  }

  const handleMarkAsLost = (petId: string) => {
    updateState({
      pets: state.pets.map(p => 
        p.id === petId ? { ...p, status: p.status === 'lost' ? 'active' : 'lost' as PetStatus } : p
      )
    })
    const pet = state.pets.find(p => p.id === petId)
    toast({
      title: pet?.status === 'lost' ? "Lost status activated" : "Pet marked as safe",
      description: pet?.status === 'lost' 
        ? `${pet?.name}'s QR code is now in emergency mode.`
        : `${pet?.name} has been marked as safe.`,
      variant: pet?.status === 'lost' ? 'destructive' : 'default'
    })
  }

  const myPets = state.pets.filter(p => p.ownerId === currentUser.id)
  const selectedPet = state.selectedPetId ? state.pets.find(p => p.id === state.selectedPetId) : null

  // Render based on current view
  const renderContent = () => {
    switch (state.currentView) {
      case 'landing':
        return <LandingView onEnter={() => navigateTo('feed')} />
      case 'feed':
        return <FeedView 
          posts={state.posts} 
          likedPosts={likedPosts}
          onLike={handleLikePost}
          onCreatePost={() => updateState({ isCreatePostOpen: true })}
        />
      case 'pets':
        return <PetsView 
          pets={myPets} 
          onSelectPet={(id) => navigateTo('pet-detail', id)}
          onCreatePet={() => updateState({ isCreatePetOpen: true })}
        />
      case 'pet-detail':
        return selectedPet ? (
          <PetDetailView 
            pet={selectedPet} 
            onBack={() => navigateTo('pets')}
            onMarkAsLost={handleMarkAsLost}
          />
        ) : null
      case 'health':
        return <HealthView 
          pets={myPets}
          vaccines={sampleVaccines}
          treatments={sampleTreatments}
          observations={sampleObservations}
        />
      case 'gallery':
        return <GalleryView albums={sampleAlbums} pets={myPets} />
      case 'outings':
        return <OutingsView 
          outings={sampleOutings}
          onCreateOuting={() => updateState({ isCreateOutingOpen: true })}
        />
      case 'map':
        return <MapView professionals={sampleProfessionals} plans={subscriptionPlans} />
      case 'profile':
        return <ProfileView user={currentUser} pets={myPets} />
      default:
        return <LandingView onEnter={() => navigateTo('feed')} />
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Main Content */}
      <main className="pb-20 md:pb-0 md:pl-20">
        {renderContent()}
      </main>

      {/* Bottom Navigation (Mobile) / Side Navigation (Desktop) */}
      <BottomNavigation 
        currentView={state.currentView} 
        onNavigate={navigateTo}
      />

      {/* Modals */}
      <CreatePostModal 
        open={state.isCreatePostOpen}
        onOpenChange={(open) => updateState({ isCreatePostOpen: open })}
        onSubmit={handleCreatePost}
        pets={myPets}
      />
      
      <CreatePetModal 
        open={state.isCreatePetOpen}
        onOpenChange={(open) => updateState({ isCreatePetOpen: open })}
        onSubmit={handleCreatePet}
      />

      <CreateOutingModal 
        open={state.isCreateOutingOpen}
        onOpenChange={(open) => updateState({ isCreateOutingOpen: open })}
        pets={myPets}
      />
    </div>
  )
}

// ==================== LANDING VIEW ====================
function LandingView({ onEnter }: { onEnter: () => void }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="relative flex-1 flex items-center justify-center p-6 paw-pattern">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />
        
        <div className="relative z-10 text-center max-w-2xl mx-auto space-y-8 animate-slide-up">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-500/20 to-purple-500/20 p-1 animate-pulse-glow">
              <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                <PawPrint className="w-12 h-12 text-amber-500" />
              </div>
            </div>
          </div>

          {/* Brand */}
          <div>
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              <span className="gradient-text">Accverse</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Where animals take center stage
            </p>
          </div>

          {/* Tagline */}
          <div className="space-y-4">
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              A calm, animal-focused social network. Content written from the pet&apos;s perspective. 
              No human selfies, just pure animal love. 🐾
            </p>
            
            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="secondary" className="text-sm">
                <Heart className="w-3 h-3 mr-1" /> 100% Animal-Focused
              </Badge>
              <Badge variant="secondary" className="text-sm">
                <Shield className="w-3 h-3 mr-1" /> Privacy First
              </Badge>
              <Badge variant="secondary" className="text-sm">
                <Sparkles className="w-3 h-3 mr-1" /> Calm Experience
              </Badge>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="text-lg px-8 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
              onClick={onEnter}
            >
              <PawPrint className="w-5 h-5 mr-2" />
              Enter Accverse
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-card/50 border-t border-border">
        <div className="max-w-6xl mx-auto p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Everything for your furry friends
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: MessageCircle, title: 'Calm Feed', desc: 'Posts from pets, not people' },
              { icon: Heart, title: 'Pet Profiles', desc: 'Create & share profiles' },
              { icon: Activity, title: 'Health Tracking', desc: 'Vaccines & medical records' },
              { icon: Camera, title: 'Photo Albums', desc: 'Private pet galleries' },
              { icon: Users, title: 'Meetups', desc: 'Animal-led outings' },
              { icon: Map, title: 'Find Pros', desc: 'Vets, groomers & more' },
              { icon: QrCode, title: 'QR Codes', desc: 'Instant pet identification' },
              { icon: Shield, title: 'Lost Mode', desc: 'Emergency notifications' },
            ].map((feature, i) => (
              <Card key={i} className="bg-card/50 border-border/50 hover:border-amber-500/50 transition-all hover:scale-105">
                <CardContent className="p-4 text-center">
                  <feature.icon className="w-8 h-8 mx-auto mb-2 text-amber-500" />
                  <h3 className="font-semibold text-sm">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="border-t border-border bg-gradient-to-r from-purple-900/20 to-amber-900/20">
        <div className="max-w-4xl mx-auto p-8 md:p-12">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-3xl md:text-4xl font-bold text-amber-500">50K+</p>
              <p className="text-sm text-muted-foreground">Happy Pets</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-purple-400">2K+</p>
              <p className="text-sm text-muted-foreground">Professionals</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-green-400">10K+</p>
              <p className="text-sm text-muted-foreground">Meetups</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ==================== FEED VIEW ====================
function FeedView({ 
  posts, 
  likedPosts,
  onLike,
  onCreatePost 
}: { 
  posts: Post[]
  likedPosts: Set<string>
  onLike: (postId: string) => void
  onCreatePost: () => void
}) {
  const [filter, setFilter] = useState<'all' | 'national'>('all')
  
  const filteredPosts = filter === 'national' 
    ? posts.filter(p => p.isNational)
    : posts

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Calm Feed</h1>
          <p className="text-muted-foreground text-sm">Posts from our animal friends</p>
        </div>
        <Button onClick={onCreate} className="bg-amber-500 hover:bg-amber-600">
          <Plus className="w-4 h-4 mr-2" />
          New Post
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6">
        <Button 
          variant={filter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('all')}
        >
          All Posts
        </Button>
        <Button 
          variant={filter === 'national' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('national')}
        >
          <Flag className="w-3 h-3 mr-1" />
          National
        </Button>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <PostCard 
            key={post.id} 
            post={post} 
            isLiked={likedPosts.has(post.id)}
            onLike={() => onLike(post.id)}
          />
        ))}
      </div>
    </div>
  )
}

function PostCard({ 
  post, 
  isLiked,
  onLike 
}: { 
  post: Post
  isLiked: boolean
  onLike: () => void
}) {
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState('')

  return (
    <Card className="bg-card/50 border-border/50 overflow-hidden">
      {/* Header */}
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={post.petPhoto} alt={post.petName} />
            <AvatarFallback>{post.petName[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold">{post.petName}</span>
              <span className="text-lg">{getSpeciesEmoji(post.petSpecies)}</span>
              {post.isNational && (
                <Badge variant="outline" className="text-xs">National</Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {format(new Date(post.createdAt), 'MMM d, yyyy • h:mm a')}
            </p>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      {/* Content */}
      <CardContent className="pb-3">
        <p className="text-foreground/90 leading-relaxed">{post.content}</p>
        {post.image && (
          <div className="mt-3 rounded-lg overflow-hidden">
            <img 
              src={post.image} 
              alt="Post image" 
              className="w-full h-auto object-cover max-h-96"
            />
          </div>
        )}
      </CardContent>

      {/* Actions */}
      <CardFooter className="pt-0 flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="sm" 
          className={`gap-1 ${isLiked ? 'text-red-500' : ''}`}
          onClick={onLike}
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          <span>{post.likes + (isLiked ? 1 : 0)}</span>
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="gap-1"
          onClick={() => setShowComments(!showComments)}
        >
          <MessageCircle className="w-4 h-4" />
          <span>{post.comments.length}</span>
        </Button>
        <Button variant="ghost" size="sm" className="gap-1">
          <Share2 className="w-4 h-4" />
        </Button>
      </CardFooter>

      {/* Comments */}
      {showComments && (
        <div className="border-t border-border/50 p-4">
          <div className="flex gap-2 mb-3">
            <Input 
              placeholder="Add a comment..." 
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1"
            />
            <Button size="icon" variant="ghost">
              <Send className="w-4 h-4" />
            </Button>
          </div>
          {post.comments.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-2">
              No comments yet. Be the first!
            </p>
          )}
        </div>
      )}
    </Card>
  )
}

// ==================== PETS VIEW ====================
function PetsView({ 
  pets, 
  onSelectPet,
  onCreatePet 
}: { 
  pets: Pet[]
  onSelectPet: (id: string) => void
  onCreatePet: () => void
}) {
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">My Pets</h1>
          <p className="text-muted-foreground text-sm">Manage your pet profiles</p>
        </div>
        <Button onClick={onCreatePet} className="bg-amber-500 hover:bg-amber-600">
          <Plus className="w-4 h-4 mr-2" />
          Add Pet
        </Button>
      </div>

      {/* Pets Grid */}
      {pets.length === 0 ? (
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-8 text-center">
            <PawPrint className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No pets yet</h3>
            <p className="text-muted-foreground mb-4">
              Add your first pet to start their journey on Accverse
            </p>
            <Button onClick={onCreatePet} className="bg-amber-500 hover:bg-amber-600">
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Pet
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pets.map((pet) => (
            <Card 
              key={pet.id} 
              className="bg-card/50 border-border/50 overflow-hidden hover:border-amber-500/50 transition-all cursor-pointer"
              onClick={() => onSelectPet(pet.id)}
            >
              <div className="relative">
                <img 
                  src={pet.photo} 
                  alt={pet.name}
                  className="w-full h-48 object-cover"
                />
                {pet.status !== 'active' && (
                  <div className="absolute top-2 right-2">
                    <Badge 
                      variant={pet.status === 'lost' ? 'destructive' : 'secondary'}
                    >
                      {pet.status === 'lost' ? '🔍 Lost' : 'In Memory'}
                    </Badge>
                  </div>
                )}
                <div className="absolute bottom-2 left-2">
                  <Badge className="bg-black/50 text-white border-0">
                    {getSpeciesEmoji(pet.species)} {pet.species}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold">{pet.name}</h3>
                  <span className="text-sm text-muted-foreground">{pet.breed}</span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {pet.description}
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{pet.sex === 'male' ? '♂' : '♀'}</span>
                  <span>•</span>
                  <span>{format(new Date(pet.birthdate), 'MMM yyyy')}</span>
                  {pet.sterilized && (
                    <>
                      <span>•</span>
                      <Badge variant="outline" className="text-xs">Sterilized</Badge>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

// ==================== PET DETAIL VIEW ====================
function PetDetailView({ 
  pet, 
  onBack,
  onMarkAsLost 
}: { 
  pet: Pet
  onBack: () => void
  onMarkAsLost: (petId: string) => void
}) {
  const [showQR, setShowQR] = useState(false)
  const [activeTab, setActiveTab] = useState<'about' | 'health' | 'gallery'>('about')

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      {/* Back Button */}
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ChevronLeft className="w-4 h-4 mr-2" />
        Back to Pets
      </Button>

      {/* Header Card */}
      <Card className="bg-card/50 border-border/50 mb-6 overflow-hidden">
        <div className="relative h-48 md:h-64">
          <img 
            src={pet.photo} 
            alt={pet.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-end justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-3xl font-bold text-white">{pet.name}</h1>
                  <span className="text-2xl">{getSpeciesEmoji(pet.species)}</span>
                </div>
                <p className="text-white/80">{pet.breed} • {pet.sex === 'male' ? 'Male' : 'Female'}</p>
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="secondary"
                  onClick={() => setShowQR(true)}
                >
                  <QrCode className="w-4 h-4 mr-1" />
                  QR Code
                </Button>
                <Button 
                  size="sm" 
                  variant={pet.status === 'lost' ? 'destructive' : 'secondary'}
                  onClick={() => onMarkAsLost(pet.id)}
                >
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  {pet.status === 'lost' ? 'Mark Safe' : 'Mark Lost'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Status Banner */}
      {pet.status === 'lost' && (
        <Card className="bg-red-500/10 border-red-500/50 mb-6">
          <CardContent className="p-4 flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-red-500" />
            <div>
              <p className="font-semibold text-red-400">Lost Pet Alert Active</p>
              <p className="text-sm text-muted-foreground">
                QR code is in emergency mode. Share to help find {pet.name}.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="health">Health</TabsTrigger>
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
        </TabsList>

        <TabsContent value="about" className="mt-4">
          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="text-sm text-muted-foreground mb-1">About Me</h3>
                <p>{pet.description}</p>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm text-muted-foreground">Birthday</h3>
                  <p className="font-medium">{format(new Date(pet.birthdate), 'MMMM d, yyyy')}</p>
                </div>
                <div>
                  <h3 className="text-sm text-muted-foreground">Sterilized</h3>
                  <p className="font-medium">{pet.sterilized ? 'Yes' : 'No'}</p>
                </div>
                <div>
                  <h3 className="text-sm text-muted-foreground">Allergies</h3>
                  <p className="font-medium">{pet.allergies.length > 0 ? pet.allergies.join(', ') : 'None known'}</p>
                </div>
                <div>
                  <h3 className="text-sm text-muted-foreground">Reactive</h3>
                  <p className="font-medium">{pet.isReactive ? 'Yes' : 'No'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="health" className="mt-4">
          <HealthRecordsView petId={pet.id} />
        </TabsContent>

        <TabsContent value="gallery" className="mt-4">
          <GalleryView albums={sampleAlbums.filter(a => a.petId === pet.id)} pets={[pet]} />
        </TabsContent>
      </Tabs>

      {/* QR Code Modal */}
      <Dialog open={showQR} onOpenChange={setShowQR}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{pet.name}'s QR Code</DialogTitle>
            <DialogDescription>
              Scan this code to view {pet.name}'s profile
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center p-4">
            <div className="w-64 h-64 bg-white rounded-lg flex items-center justify-center">
              <div className="text-center p-4">
                <QrCode className="w-32 h-32 mx-auto text-black mb-2" />
                <p className="text-black text-sm font-mono">{pet.id}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4 text-center">
              Share this QR code to let others see {pet.name}'s public profile
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowQR(false)}>Close</Button>
            <Button className="bg-amber-500 hover:bg-amber-600">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function HealthRecordsView({ petId }: { petId: string }) {
  const vaccines = sampleVaccines.filter(v => v.petId === petId)
  const treatments = sampleTreatments.filter(t => t.petId === petId)
  const observations = sampleObservations.filter(o => o.petId === petId)

  return (
    <div className="space-y-4">
      {/* Vaccines */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-400" />
              Vaccinations
            </CardTitle>
            <Button size="sm" variant="outline">
              <Plus className="w-4 h-4 mr-1" />
              Add
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {vaccines.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No vaccination records</p>
          ) : (
            <div className="space-y-3">
              {vaccines.map((vax) => (
                <div key={vax.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                  <div>
                    <p className="font-medium">{vax.name}</p>
                    <p className="text-sm text-muted-foreground">By {vax.veterinarian}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">{format(new Date(vax.date), 'MMM d, yyyy')}</p>
                    {vax.nextDue && (
                      <p className="text-xs text-muted-foreground">
                        Next: {format(new Date(vax.nextDue), 'MMM d, yyyy')}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Treatments */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-blue-400" />
              Treatments
            </CardTitle>
            <Button size="sm" variant="outline">
              <Plus className="w-4 h-4 mr-1" />
              Add
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {treatments.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No treatment records</p>
          ) : (
            <div className="space-y-3">
              {treatments.map((treat) => (
                <div key={treat.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                  <div>
                    <p className="font-medium">{treat.type}</p>
                    <p className="text-sm text-muted-foreground">{treat.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">{format(new Date(treat.date), 'MMM d, yyyy')}</p>
                    <p className="text-xs text-muted-foreground">{treat.veterinarian}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Observations */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-400" />
              Observations
            </CardTitle>
            <Button size="sm" variant="outline">
              <Plus className="w-4 h-4 mr-1" />
              Add
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {observations.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No observations recorded</p>
          ) : (
            <div className="space-y-2">
              {observations.map((obs) => (
                <div key={obs.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/30">
                  <div className={`w-2 h-2 rounded-full ${
                    obs.type === 'weight' ? 'bg-blue-400' :
                    obs.type === 'medication' ? 'bg-green-400' :
                    obs.type === 'symptom' ? 'bg-red-400' :
                    'bg-gray-400'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm">{obs.content} {obs.value && `(${obs.value})`}</p>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(obs.date), 'MMM d, yyyy')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// ==================== HEALTH VIEW ====================
function HealthView({ 
  pets,
  vaccines,
  treatments,
  observations 
}: { 
  pets: Pet[]
  vaccines: VaccineRecord[]
  treatments: TreatmentRecord[]
  observations: HealthObservation[]
}) {
  const [selectedPetId, setSelectedPetId] = useState<string>(pets[0]?.id || '')

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Health & Documents</h1>
          <p className="text-muted-foreground text-sm">Track your pet's health records</p>
        </div>
        <Button className="bg-amber-500 hover:bg-amber-600">
          <Plus className="w-4 h-4 mr-2" />
          Add Record
        </Button>
      </div>

      {/* Pet Selector */}
      {pets.length > 0 && (
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {pets.map((pet) => (
            <Button
              key={pet.id}
              variant={selectedPetId === pet.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedPetId(pet.id)}
              className="flex items-center gap-2 shrink-0"
            >
              <Avatar className="w-6 h-6">
                <AvatarImage src={pet.photo} />
                <AvatarFallback>{pet.name[0]}</AvatarFallback>
              </Avatar>
              {pet.name}
            </Button>
          ))}
        </div>
      )}

      {/* Calendar & Reminders */}
      <Card className="bg-card/50 border-border/50 mb-6">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <CalendarCheck className="w-5 h-5 text-amber-400" />
            Upcoming Reminders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Calendar mode="single" className="rounded-md border border-border" />
            </div>
            <div className="flex-1 space-y-2">
              {vaccines.filter(v => v.nextDue).slice(0, 3).map((vax) => (
                <div key={vax.id} className="flex items-center gap-3 p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                  <div>
                    <p className="text-sm font-medium">{vax.name} vaccine due</p>
                    <p className="text-xs text-muted-foreground">
                      {vax.nextDue && format(new Date(vax.nextDue), 'MMMM d, yyyy')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Health Records for Selected Pet */}
      {selectedPetId && (
        <HealthRecordsView petId={selectedPetId} />
      )}
    </div>
  )
}

// ==================== GALLERY VIEW ====================
function GalleryView({ 
  albums,
  pets 
}: { 
  albums: PhotoAlbum[]
  pets: Pet[]
}) {
  const [selectedAlbum, setSelectedAlbum] = useState<PhotoAlbum | null>(null)

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Photo Gallery</h1>
          <p className="text-muted-foreground text-sm">Private albums for your pets</p>
        </div>
        <Button className="bg-amber-500 hover:bg-amber-600">
          <Camera className="w-4 h-4 mr-2" />
          Add Photos
        </Button>
      </div>

      {/* Albums Grid */}
      {selectedAlbum ? (
        <div>
          <Button 
            variant="ghost" 
            onClick={() => setSelectedAlbum(null)}
            className="mb-4"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Albums
          </Button>
          <h2 className="text-xl font-bold mb-4">{selectedAlbum.name}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {selectedAlbum.photos.map((photo) => (
              <Card key={photo.id} className="overflow-hidden">
                <img src={photo.url} alt={photo.caption} className="w-full h-40 object-cover" />
                {photo.caption && (
                  <CardContent className="p-2">
                    <p className="text-sm text-center">{photo.caption}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {albums.length === 0 ? (
            <Card className="bg-card/50 border-border/50 col-span-full">
              <CardContent className="p-8 text-center">
                <Camera className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No albums yet</h3>
                <p className="text-muted-foreground">
                  Create your first photo album to store memories
                </p>
              </CardContent>
            </Card>
          ) : (
            albums.map((album) => {
              const pet = pets.find(p => p.id === album.petId)
              return (
                <Card 
                  key={album.id}
                  className="bg-card/50 border-border/50 overflow-hidden cursor-pointer hover:border-amber-500/50 transition-all"
                  onClick={() => setSelectedAlbum(album)}
                >
                  <div className="grid grid-cols-2 gap-0.5">
                    {album.photos.slice(0, 4).map((photo, i) => (
                      <img 
                        key={photo.id}
                        src={photo.url} 
                        alt=""
                        className={`w-full h-20 object-cover ${i === 0 ? 'col-span-2 h-32' : ''}`}
                      />
                    ))}
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{album.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {album.photos.length} photos
                        </p>
                      </div>
                      {pet && (
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={pet.photo} />
                          <AvatarFallback>{pet.name[0]}</AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })
          )}
        </div>
      )}
    </div>
  )
}

// ==================== OUTINGS VIEW ====================
function OutingsView({ 
  outings,
  onCreateOuting 
}: { 
  outings: Outing[]
  onCreateOuting: () => void
}) {
  const [filter, setFilter] = useState<'all' | 'dogs' | 'cats' | 'rabbits'>('all')

  const filteredOutings = filter === 'all' 
    ? outings
    : outings.filter(o => {
        const hostPet = samplePets.find(p => p.id === o.hostPetId)
        return hostPet?.species === filter.slice(0, -1)
      })

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Outings & Meetups</h1>
          <p className="text-muted-foreground text-sm">Animal-led events near you</p>
        </div>
        <Button onClick={onCreateOuting} className="bg-amber-500 hover:bg-amber-600">
          <Plus className="w-4 h-4 mr-2" />
          Create Outing
        </Button>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {[
          { value: 'all', label: 'All' },
          { value: 'dogs', label: '🐕 Dogs' },
          { value: 'cats', label: '🐱 Cats' },
          { value: 'rabbits', label: '🐰 Rabbits' },
        ].map((f) => (
          <Button
            key={f.value}
            variant={filter === f.value ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter(f.value as typeof filter)}
            className="shrink-0"
          >
            {f.label}
          </Button>
        ))}
      </div>

      {/* Outings List */}
      <div className="space-y-4">
        {filteredOutings.map((outing) => (
          <Card key={outing.id} className="bg-card/50 border-border/50 overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="flex-1 p-4">
                <div className="flex items-start gap-3 mb-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={outing.hostPetPhoto} />
                    <AvatarFallback>{outing.hostPetName[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{outing.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      Hosted by {outing.hostPetName}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {outing.description}
                </p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    {outing.location}
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <CalendarDays className="w-4 h-4" />
                    {format(new Date(outing.date), 'MMM d, yyyy')}
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {outing.time}
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    {outing.participants.length}/{outing.maxParticipants}
                  </div>
                </div>
              </div>
              <div className="flex md:flex-col gap-2 p-4 border-t md:border-t-0 md:border-l border-border/50">
                <Button className="flex-1 md:flex-none bg-green-600 hover:bg-green-700">
                  <Check className="w-4 h-4 mr-1" />
                  Going
                </Button>
                <Button variant="outline" className="flex-1 md:flex-none">
                  Maybe
                </Button>
              </div>
            </div>
            {outing.compatibilityFilters && (
              <div className="px-4 pb-4">
                <Separator className="mb-3" />
                <div className="flex flex-wrap gap-2">
                  {outing.compatibilityFilters.species && (
                    <Badge variant="outline">
                      Species: {outing.compatibilityFilters.species.map(s => getSpeciesEmoji(s)).join(' ')}
                    </Badge>
                  )}
                  {outing.compatibilityFilters.sterilizedOnly && (
                    <Badge variant="outline">Sterilized only</Badge>
                  )}
                  {outing.compatibilityFilters.excludeReactive && (
                    <Badge variant="outline">No reactive pets</Badge>
                  )}
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}

// ==================== MAP VIEW ====================
function MapView({ 
  professionals,
  plans 
}: { 
  professionals: Professional[]
  plans: SubscriptionPlan[]
}) {
  const [selectedPro, setSelectedPro] = useState<Professional | null>(null)
  const [filter, setFilter] = useState<string>('all')

  const filteredPros = filter === 'all' 
    ? professionals
    : professionals.filter(p => p.type === filter)

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Find Professionals</h1>
          <p className="text-muted-foreground text-sm">Vets, groomers, and more near you</p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {[
          { value: 'all', label: 'All', icon: MapPin },
          { value: 'vet', label: 'Vets', icon: Stethoscope },
          { value: 'groomer', label: 'Groomers', icon: Scissors },
          { value: 'trainer', label: 'Trainers', icon: GraduationCap },
          { value: 'rescue', label: 'Rescues', icon: HeartHandshake },
          { value: 'pet_sitter', label: 'Pet Sitters', icon: HomeIcon },
        ].map((f) => (
          <Button
            key={f.value}
            variant={filter === f.value ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter(f.value)}
            className="shrink-0"
          >
            <f.icon className="w-4 h-4 mr-1" />
            {f.label}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Map Placeholder */}
        <Card className="bg-card/50 border-border/50 h-[500px] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-blue-900/30 flex items-center justify-center">
            <div className="text-center">
              <Map className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">Interactive map coming soon</p>
              <p className="text-sm text-muted-foreground mt-1">
                {filteredPros.length} professionals in your area
              </p>
            </div>
          </div>
          {/* Pro markers preview */}
          <div className="absolute inset-0 overflow-hidden">
            {filteredPros.slice(0, 5).map((pro, i) => (
              <div
                key={pro.id}
                className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform"
                style={{ 
                  left: `${20 + (i * 15)}%`, 
                  top: `${30 + (i * 10)}%` 
                }}
                onClick={() => setSelectedPro(pro)}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  pro.type === 'vet' ? 'bg-blue-500' :
                  pro.type === 'groomer' ? 'bg-pink-500' :
                  pro.type === 'trainer' ? 'bg-green-500' :
                  pro.type === 'rescue' ? 'bg-purple-500' :
                  'bg-amber-500'
                } shadow-lg`}>
                  {pro.type === 'vet' ? <Stethoscope className="w-5 h-5 text-white" /> :
                   pro.type === 'groomer' ? <Scissors className="w-5 h-5 text-white" /> :
                   pro.type === 'trainer' ? <GraduationCap className="w-5 h-5 text-white" /> :
                   pro.type === 'rescue' ? <HeartHandshake className="w-5 h-5 text-white" /> :
                   <HomeIcon className="w-5 h-5 text-white" />}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Professionals List */}
        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
          {filteredPros.map((pro) => (
            <Card 
              key={pro.id}
              className={`bg-card/50 border-border/50 cursor-pointer transition-all ${
                selectedPro?.id === pro.id ? 'border-amber-500/50' : ''
              }`}
              onClick={() => setSelectedPro(pro)}
            >
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <Avatar className="w-16 h-16 rounded-lg">
                    <AvatarImage src={pro.photo} className="object-cover" />
                    <AvatarFallback>{pro.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{pro.name}</h3>
                          {pro.verified && (
                            <Badge className="bg-blue-500/20 text-blue-400">
                              <Check className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{getProTypeLabel(pro.type)}</p>
                      </div>
                      <Badge className={getTierBadgeColor(pro.subscriptionTier)}>
                        {pro.subscriptionTier.charAt(0).toUpperCase() + pro.subscriptionTier.slice(1)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span>{pro.rating}</span>
                        <span className="text-muted-foreground">({pro.reviewCount})</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span className="text-xs">{pro.address.split(',')[0]}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {pro.services.slice(0, 3).map((service, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                      {pro.services.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{pro.services.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Subscription Tiers */}
      <Card className="bg-card/50 border-border/50 mt-6">
        <CardHeader>
          <CardTitle className="text-lg">Professional Subscription Plans</CardTitle>
          <CardDescription>
            Upgrade your listing to reach more pet owners
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {plans.map((plan) => (
              <Card 
                key={plan.tier}
                className={`relative ${
                  plan.highlighted 
                    ? 'border-amber-500/50 bg-amber-500/5' 
                    : 'border-border/50 bg-secondary/30'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-amber-500 text-black">Most Popular</Badge>
                  </div>
                )}
                <CardContent className="p-4 text-center">
                  <h3 className="font-bold">{plan.name}</h3>
                  <div className="text-3xl font-bold my-2">
                    {plan.currency}{plan.price}
                    <span className="text-sm font-normal text-muted-foreground">/mo</span>
                  </div>
                  <Separator className="my-3" />
                  <ul className="space-y-2 text-sm text-left">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full mt-4 ${
                      plan.highlighted 
                        ? 'bg-amber-500 hover:bg-amber-600' 
                        : ''
                    }`}
                    variant={plan.highlighted ? 'default' : 'outline'}
                  >
                    {plan.price === 0 ? 'Current Plan' : 'Upgrade'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Professional Detail Modal */}
      <Dialog open={!!selectedPro} onOpenChange={() => setSelectedPro(null)}>
        {selectedPro && (
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16 rounded-lg">
                  <AvatarImage src={selectedPro.photo} className="object-cover" />
                  <AvatarFallback>{selectedPro.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <DialogTitle className="flex items-center gap-2">
                    {selectedPro.name}
                    {selectedPro.verified && (
                      <Badge className="bg-blue-500/20 text-blue-400">
                        <Check className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </DialogTitle>
                  <DialogDescription>
                    {getProTypeLabel(selectedPro.type)} • {selectedPro.address}
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm">{selectedPro.description}</p>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                  <span className="font-bold">{selectedPro.rating}</span>
                  <span className="text-muted-foreground">({selectedPro.reviewCount} reviews)</span>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold mb-2">Services</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedPro.services.map((service, i) => (
                    <Badge key={i} variant="secondary">{service}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Hours</h4>
                <div className="grid grid-cols-2 gap-1 text-sm">
                  {Object.entries(selectedPro.hours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between">
                      <span className="capitalize">{day.slice(0, 3)}</span>
                      <span className="text-muted-foreground">{hours || 'Closed'}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="flex gap-2">
                <Button className="flex-1 bg-amber-500 hover:bg-amber-600">
                  <Phone className="w-4 h-4 mr-2" />
                  Call
                </Button>
                <Button variant="outline" className="flex-1">
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Button>
                <Button variant="outline" size="icon">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}

// ==================== PROFILE VIEW ====================
function ProfileView({ 
  user,
  pets 
}: { 
  user: typeof currentUser
  pets: Pet[]
}) {
  return (
    <div className="max-w-2xl mx-auto p-4 md:p-6">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>

      {/* Profile Card */}
      <Card className="bg-card/50 border-border/50 mb-6">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-muted-foreground">{user.email}</p>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                <MapPin className="w-4 h-4" />
                {user.region}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1">
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
            <Button variant="outline" size="icon">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <Card className="bg-card/50 border-border/50 mb-6">
        <CardContent className="p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold">{pets.length}</p>
              <p className="text-sm text-muted-foreground">Pets</p>
            </div>
            <div>
              <p className="text-2xl font-bold">12</p>
              <p className="text-sm text-muted-foreground">Posts</p>
            </div>
            <div>
              <p className="text-2xl font-bold">89</p>
              <p className="text-sm text-muted-foreground">Likes</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Settings */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Notifications</p>
              <p className="text-sm text-muted-foreground">Receive push notifications</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Private Profile</p>
              <p className="text-sm text-muted-foreground">Only show profile to friends</p>
            </div>
            <Switch />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Dark Mode</p>
              <p className="text-sm text-muted-foreground">Use dark theme</p>
            </div>
            <Switch defaultChecked disabled />
          </div>
          <Separator />
          <Button variant="destructive" className="w-full">
            Log Out
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

// ==================== BOTTOM NAVIGATION ====================
function BottomNavigation({ 
  currentView, 
  onNavigate 
}: { 
  currentView: ViewType
  onNavigate: (view: ViewType) => void
}) {
  const navItems = [
    { id: 'feed' as ViewType, label: 'Feed', icon: Home },
    { id: 'pets' as ViewType, label: 'My Pets', icon: PawPrint },
    { id: 'health' as ViewType, label: 'Health', icon: Activity },
    { id: 'outings' as ViewType, label: 'Outings', icon: Users },
    { id: 'map' as ViewType, label: 'Find', icon: MapPin },
  ]

  const hideNav = currentView === 'landing'

  return (
    <>
      {/* Mobile Bottom Nav */}
      <nav className={`fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur border-t border-border md:hidden z-50 transition-transform ${hideNav ? 'translate-y-full' : ''}`}>
        <div className="flex justify-around items-center h-16 px-2">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              className={`flex flex-col items-center gap-1 h-auto py-2 px-3 ${
                currentView === item.id ? 'text-amber-500' : 'text-muted-foreground'
              }`}
              onClick={() => onNavigate(item.id)}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs">{item.label}</span>
            </Button>
          ))}
          <Button
            variant="ghost"
            size="sm"
            className={`flex flex-col items-center gap-1 h-auto py-2 px-3 ${
              currentView === 'profile' ? 'text-amber-500' : 'text-muted-foreground'
            }`}
            onClick={() => onNavigate('profile')}
          >
            <User className="w-5 h-5" />
            <span className="text-xs">Profile</span>
          </Button>
        </div>
      </nav>

      {/* Desktop Side Nav */}
      <nav className={`fixed left-0 top-0 bottom-0 w-20 bg-card/95 backdrop-blur border-r border-border hidden md:flex flex-col items-center py-6 z-50 transition-transform ${hideNav ? '-translate-x-full' : ''}`}>
        <div className="mb-8">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-purple-500 flex items-center justify-center">
            <PawPrint className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-2">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              size="icon"
              className={`w-12 h-12 rounded-xl ${
                currentView === item.id 
                  ? 'bg-amber-500/20 text-amber-500' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => onNavigate(item.id)}
              title={item.label}
            >
              <item.icon className="w-5 h-5" />
            </Button>
          ))}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className={`w-12 h-12 rounded-xl ${
            currentView === 'profile' 
              ? 'bg-amber-500/20 text-amber-500' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
          onClick={() => onNavigate('profile')}
          title="Profile"
        >
          <User className="w-5 h-5" />
        </Button>
      </nav>
    </>
  )
}

// ==================== CREATE POST MODAL ====================
function CreatePostModal({
  open,
  onOpenChange,
  onSubmit,
  pets
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (content: string, image?: string) => void
  pets: Pet[]
}) {
  const [content, setContent] = useState('')
  const [selectedPet, setSelectedPet] = useState(pets[0]?.id || '')

  const handleSubmit = () => {
    if (content.trim()) {
      onSubmit(content.trim())
      setContent('')
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Post</DialogTitle>
          <DialogDescription>
            Write from your pet&apos;s perspective 🐾
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Posting as</Label>
            <Select value={selectedPet} onValueChange={setSelectedPet}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {pets.map((pet) => (
                  <SelectItem key={pet.id} value={pet.id}>
                    <div className="flex items-center gap-2">
                      <span>{getSpeciesEmoji(pet.species)}</span>
                      {pet.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>What&apos;s on your mind?</Label>
            <Textarea
              placeholder="I'm having a great day! My human gave me extra treats..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              className="mt-2"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Camera className="w-4 h-4 mr-1" />
              Add Photo
            </Button>
            <Button variant="outline" size="sm">
              <MapPin className="w-4 h-4 mr-1" />
              Location
            </Button>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            className="bg-amber-500 hover:bg-amber-600"
            onClick={handleSubmit}
            disabled={!content.trim()}
          >
            Post
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// ==================== CREATE PET MODAL ====================
function CreatePetModal({
  open,
  onOpenChange,
  onSubmit
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (pet: Partial<Pet>) => void
}) {
  const [formData, setFormData] = useState({
    name: '',
    species: 'dog' as PetSpecies,
    breed: '',
    birthdate: '',
    sex: 'male' as 'male' | 'female',
    sterilized: false,
    description: '',
    isReactive: false
  })

  const handleSubmit = () => {
    onSubmit(formData)
    setFormData({
      name: '',
      species: 'dog',
      breed: '',
      birthdate: '',
      sex: 'male',
      sterilized: false,
      description: '',
      isReactive: false
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Pet</DialogTitle>
          <DialogDescription>
            Create a profile for your furry friend
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Your pet's name"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Species</Label>
              <Select 
                value={formData.species} 
                onValueChange={(v) => setFormData({ ...formData, species: v as PetSpecies })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dog">🐕 Dog</SelectItem>
                  <SelectItem value="cat">🐱 Cat</SelectItem>
                  <SelectItem value="rabbit">🐰 Rabbit</SelectItem>
                  <SelectItem value="bird">🐦 Bird</SelectItem>
                  <SelectItem value="other">🐾 Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Sex</Label>
              <Select 
                value={formData.sex} 
                onValueChange={(v) => setFormData({ ...formData, sex: v as 'male' | 'female' })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male ♂</SelectItem>
                  <SelectItem value="female">Female ♀</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="breed">Breed</Label>
            <Input
              id="breed"
              value={formData.breed}
              onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
              placeholder="e.g., Golden Retriever"
            />
          </div>
          <div>
            <Label htmlFor="birthdate">Birthdate</Label>
            <Input
              id="birthdate"
              type="date"
              value={formData.birthdate}
              onChange={(e) => setFormData({ ...formData, birthdate: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="description">About Me</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Write from your pet's perspective..."
              rows={3}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="sterilized">Sterilized</Label>
            <Switch
              id="sterilized"
              checked={formData.sterilized}
              onCheckedChange={(checked) => setFormData({ ...formData, sterilized: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="reactive">Reactive to other animals</Label>
            <Switch
              id="reactive"
              checked={formData.isReactive}
              onCheckedChange={(checked) => setFormData({ ...formData, isReactive: checked })}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            className="bg-amber-500 hover:bg-amber-600"
            onClick={handleSubmit}
            disabled={!formData.name.trim()}
          >
            Create Profile
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// ==================== CREATE OUTING MODAL ====================
function CreateOutingModal({
  open,
  onOpenChange,
  pets
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  pets: Pet[]
}) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    petId: pets[0]?.id || '',
    location: '',
    date: '',
    time: '',
    maxParticipants: 10,
    sterilizedOnly: false,
    excludeReactive: false
  })

  const handleSubmit = () => {
    onOpenChange(false)
    setFormData({
      title: '',
      description: '',
      petId: pets[0]?.id || '',
      location: '',
      date: '',
      time: '',
      maxParticipants: 10,
      sterilizedOnly: false,
      excludeReactive: false
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create an Outing</DialogTitle>
          <DialogDescription>
            Organize a meetup for animal friends
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Event Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Morning Playgroup"
            />
          </div>
          <div>
            <Label>Host Pet</Label>
            <Select 
              value={formData.petId} 
              onValueChange={(v) => setFormData({ ...formData, petId: v })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {pets.map((pet) => (
                  <SelectItem key={pet.id} value={pet.id}>
                    <div className="flex items-center gap-2">
                      <span>{getSpeciesEmoji(pet.species)}</span>
                      {pet.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Tell others about this outing..."
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="e.g., Central Park, Milan"
            />
          </div>
          <div>
            <Label htmlFor="maxParticipants">Max Participants</Label>
            <Input
              id="maxParticipants"
              type="number"
              value={formData.maxParticipants}
              onChange={(e) => setFormData({ ...formData, maxParticipants: parseInt(e.target.value) })}
              min={2}
              max={50}
            />
          </div>
          <Separator />
          <div>
            <Label>Compatibility Filters</Label>
            <div className="space-y-2 mt-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="sterilized" className="font-normal">Sterilized pets only</Label>
                <Switch
                  id="sterilized"
                  checked={formData.sterilizedOnly}
                  onCheckedChange={(checked) => setFormData({ ...formData, sterilizedOnly: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="exreactive" className="font-normal">Exclude reactive pets</Label>
                <Switch
                  id="exreactive"
                  checked={formData.excludeReactive}
                  onCheckedChange={(checked) => setFormData({ ...formData, excludeReactive: checked })}
                />
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            className="bg-amber-500 hover:bg-amber-600"
            onClick={handleSubmit}
            disabled={!formData.title.trim() || !formData.date || !formData.time}
          >
            Create Outing
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
