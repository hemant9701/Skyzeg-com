export interface UiStrings {
  // ── Home ──────────────────────────────────────────
  homeTrustStats: { label: string; value: string }[];
  homeProcessSteps: { title: string; body: string }[];
  homeWhyCards: { title: string; body: string }[];
  homeAboutBadge: string;
  homeHowItWorksBadge: string;
  homeHowItWorksTitle: string;
  homeTailorMadePlanningBadge: string;
  homeFeaturedBadge: string;
  homeFeaturedTitle: string;
  homeFeaturedSubtitle: string;
  homeFeaturedCta: string;
  homePopularBadge: string;
  homePopularTitle: string;
  homePopularSubtitle: string;
  homePopularCta: string;
  homeWhyBadge: string;
  homeWhyFeatures: string[];
  homeBlogsBadge: string;
  homeBlogsTitle: string;
  homeReviewsBadge: string;
  homeReviewsTitle: string;
  // ── Blogs ─────────────────────────────────────────
  blogsTitle: string;
  blogsSubtitle: string;
  blogsMinRead: string;
  // ── Categories ────────────────────────────────────
  categoriesTitle: string;
  categoriesSubtitle: string;
  categoriesTripsIn: string;
  categoriesNoTrips: string;
  categoriesBlogsIn: string;
  categoriesNoBlogs: string;
  categoriesOverview: string;
  categoriesHighlights: string;
  categoriesThingsToDo: string;
  categoriesTravelTips: string;
  // ── Destinations ──────────────────────────────────
  destinationsTitle: string;
  destinationsSubtitle: string;
  destinationsOverview: string;
  destinationsHighlights: string;
  destinationsThingsToDo: string;
  destinationsTravelTips: string;
  destinationsWeather: string;
  destinationsGallery: string;
  destinationsTripsIn: string;
  destinationsLatitude: string;
  destinationsLongitude: string;
  // ── Travel Types ──────────────────────────────────
  travelTypesTitle: string;
  travelTypesSubtitle: string;
  travelTypesOverview: string;
  travelTypesHighlights: string;
  travelTypesThingsToDo: string;
  travelTypesTravelTips: string;
  travelTypesGallery: string;
  travelTypesTripsIn: string;
  // ── Trips list / filters ──────────────────────────
  tripsExplore: string;
  tripsDiscover: string;
  tripsFilters: string;
  tripsReset: string;
  tripsPriceRange: string;
  tripsDurationFilter: string;
  tripsDestinationsFilter: string;
  tripsTravelTypesFilter: string;
  tripsCategoriesFilter: string;
  tripsFeaturedOnly: string;
  tripsShowing: string;
  tripsOf: string;
  tripsNoTrips: string;
  tripsAdjustFilters: string;
  tripsResetFilters: string;
  // ── Trip detail ───────────────────────────────────
  tripsDays: string;
  tripsFrom: string;
  tripsBookThis: string;
  tripsBookNow: string;
  tripsViewDetails: string;
  tripsEnquire: string;
  tripsStartingFrom: string;
  tripsPerPerson: string;
  tripsHighlights: string;
  tripsTripInfo: string;
  tripsDuration: string;
  tripsGroupSize: string;
  tripsDifficulty: string;
  // ── Trip tabs ─────────────────────────────────────
  tripTabOverview: string;
  tripTabItinerary: string;
  tripTabIncludes: string;
  tripTabPolicies: string;
  tripWhatsIncluded: string;
  tripWhatsExcluded: string;
  // ── Trip card ─────────────────────────────────────
  tripCardDays: string;
  tripCardBook: string;
  // ── Contact page ──────────────────────────────────
  contactBadge: string;
  contactTitle: string;
  contactSubtitle: string;
  // ── Contact form ──────────────────────────────────
  contactFullName: string;
  contactEmail: string;
  contactPhone: string;
  contactSubject: string;
  contactMessage: string;
  contactSend: string;
  contactSending: string;
  contactSuccess: string;
  contactError: string;
  // ── Booking form ──────────────────────────────────
  bookingLeadName: string;
  bookingEmail: string;
  bookingPhone: string;
  bookingTravelDate: string;
  bookingTravellers: string;
  bookingSpecialRequests: string;
  bookingSubmit: string;
  bookingSubmitting: string;
  bookingSuccess: string;
  bookingError: string;
  emailDeliveryWarning: string;
  // ── Newsletter ────────────────────────────────────
  newsletterPlaceholder: string;
  newsletterNamePlaceholder: string;
  newsletterJoin: string;
  newsletterSubmit: string;
  newsletterJoining: string;
  newsletterSuccess: string;
  newsletterSectionTitle: string;
  newsletterSectionText: string;
  // ── Hero fallback ─────────────────────────────────
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  heroCta: string;
  heroCtaDefault: string;
  commonClose: string;
  contentNoContent: string;
  rangeFrom: string;
  rangeTo: string;
  carouselGoToSlide: string;
  carouselPreviousSlide: string;
  carouselNextSlide: string;
  tailorMadeTitle: string;
  tailorMadeSubtitle: string;
  tailorMadeNoTrips: string;
  tailorMadeNoTripsError: string;
  tailorMadeNoDestinations: string;
  tailorMadePreferredDestination: string;
  tailorMadeSelectDestination: string;
  tailorMadePreferredDuration: string;
  tailorMadeBudgetRange: string;
  tailorMadeAccommodationStyle: string;
  tailorMadeAccommodationChoose: string;
  tailorMadeAccommodationBudget: string;
  tailorMadeAccommodationComfort: string;
  tailorMadeAccommodationLuxury: string;
  tailorMadeAccommodationMixed: string;
  tailorMadeActivities: string;
  tailorMadeActivitiesPlaceholder: string;
  tailorMadeNotesPlaceholder: string;
  tailorMadeRequestButton: string;
  // ── Navigation / mega menu ───────────────────────
  navDestinations: string;
  navTripsTours: string;
  navTravelStyle: string;
  navCategories: string;
  navBlog: string;
  navContact: string;
  navBookNow: string;
  navToggleNavigation: string;
  megaPopularDestinations: string;
  megaMoreDestinations: string;
  megaQuickLinks: string;
  megaAllDestinations: string;
  megaBrowseToursLink: string;
  megaDestinations: string;
  megaTripCategories: string;
  megaTravelStyles: string;
  megaBrowseTours: string;
  megaAllTours: string;
  megaSevenDayTours: string;
  megaFourteenDayTours: string;
  megaFeaturedTours: string;
  megaBookATrip: string;
  megaTravelTypes: string;
  megaTravelCategories: string;
  megaExplore: string;
  megaAllTravelTypes: string;
  megaAllTravelCategories: string;
  megaAllTripsTours: string;
  megaArticles: string;
  megaAllBlogPosts: string;
  megaTravelGuides: string;
  megaTravelTips: string;
  megaDestinationReviews: string;
  megaTopics: string;
  megaAdventure: string;
  megaCulture: string;
  megaPhotography: string;
  megaFoodDining: string;
  megaFindPerfectJourney: string;
  megaExploreAll: string;
  // ── Error / 404 ───────────────────────────────────
  errorTitle: string;
  errorRetry: string;
  notFoundTitle: string;
  notFoundMessage: string;
  notFoundHome: string;
}

const en: UiStrings = {
  homeAboutBadge: 'About Us',
  homeHowItWorksBadge: 'How It Works',
  homeHowItWorksTitle: 'Your Journey, Planned in Three Clear Steps',
  homeTailorMadePlanningBadge: 'Tailor-Made Planning',
  homeTrustStats: [
    { label: 'Curated Routes', value: '250+' },
    { label: 'Happy Travellers', value: '12K+' },
    { label: 'Local Partners', value: '80+' },
    { label: 'Support Availability', value: '24/7' }
  ],
  homeProcessSteps: [
    {
      title: 'Tell Us Your Travel Style',
      body: 'Share your pace, budget, and dream destinations. We listen first and design around your goals.'
    },
    {
      title: 'Receive a Tailor-Made Plan',
      body: 'Our travel designers create a personalized route with stays, activities, and seasonal recommendations.'
    },
    {
      title: 'Travel With Confidence',
      body: 'From pre-trip details to in-destination support, our team stays with you every step of the journey.'
    }
  ],
  homeWhyCards: [
    {
      title: 'Destination Experts',
      body: 'Local specialists build routes with authentic stays, hidden gems, and realistic pacing.'
    },
    {
      title: 'Transparent Pricing',
      body: 'Clear inclusions and flexible options help you choose the right experience for your budget.'
    },
    {
      title: 'Safe & Reliable',
      body: 'Verified partners, quality checks, and dependable support at every stage of your trip.'
    },
    {
      title: 'Personalized Service',
      body: 'Every itinerary is customized, whether you prefer adventure, culture, wellness, or family travel.'
    }
  ],
  homeFeaturedBadge: 'Featured',
  homeFeaturedTitle: 'Featured Destinations',
  homeFeaturedSubtitle: 'Discover curated destinations with local insight, travel tips and rich galleries.',
  homeFeaturedCta: 'View all destinations',
  homePopularBadge: 'Popular',
  homePopularTitle: 'Popular Trips',
  homePopularSubtitle: 'Bookable travel packages with prices, itinerary, policies and availability.',
  homePopularCta: 'View all trips',
  homeWhyBadge: 'Why Choose Us',
  homeWhyFeatures: ['Multilingual CMS', 'Media Library', 'SEO Ready', 'Booking Flow'],
  homeBlogsBadge: 'Stories',
  homeBlogsTitle: 'Latest Blogs',
  homeReviewsBadge: 'Testimonials',
  homeReviewsTitle: 'Traveller Reviews',
  blogsTitle: 'Travel Blogs',
  blogsSubtitle: 'Ideas, stories, guides and destination inspiration.',
  blogsMinRead: 'min read',
  categoriesTitle: 'Categories',
  categoriesSubtitle: 'Browse trips and travel content by category.',
  categoriesTripsIn: 'Trips in',
  categoriesNoTrips: 'No trips available in this category yet.',
  categoriesBlogsIn: 'Blogs in',
  categoriesNoBlogs: 'No blogs available in this category yet.',
  categoriesOverview: 'Overview',
  categoriesHighlights: 'Highlights',
  categoriesThingsToDo: 'Things To Do',
  categoriesTravelTips: 'Travel Tips',
  destinationsTitle: 'Destinations',
  destinationsSubtitle: 'Explore countries, cities, highlights, maps and destination guides.',
  destinationsOverview: 'Overview',
  destinationsHighlights: 'Highlights',
  destinationsThingsToDo: 'Things To Do',
  destinationsTravelTips: 'Travel Tips',
  destinationsWeather: 'Weather',
  destinationsGallery: 'Gallery',
  destinationsTripsIn: 'Trips in',
  destinationsLatitude: 'Latitude',
  destinationsLongitude: 'Longitude',
  travelTypesTitle: 'Travel Types',
  travelTypesSubtitle: 'Find your perfect travel style.',
  travelTypesOverview: 'Overview',
  travelTypesHighlights: 'Highlights',
  travelTypesThingsToDo: 'Things To Do',
  travelTypesTravelTips: 'Travel Tips',
  travelTypesGallery: 'Gallery',
  travelTypesTripsIn: 'Trips in',
  tripsExplore: 'Explore Trips',
  tripsDiscover: 'Discover amazing destinations and book your next adventure.',
  tripsFilters: 'Filters',
  tripsReset: 'Reset',
  tripsPriceRange: 'Price Range',
  tripsDurationFilter: 'Duration (Days)',
  tripsDestinationsFilter: 'Destinations',
  tripsTravelTypesFilter: 'Travel Types',
  tripsCategoriesFilter: 'Categories',
  tripsFeaturedOnly: 'Featured only',
  tripsShowing: 'Showing',
  tripsOf: 'of',
  tripsNoTrips: 'No trips found',
  tripsAdjustFilters: 'Try adjusting your filters',
  tripsResetFilters: 'Reset Filters',
  tripsDays: 'days',
  tripsFrom: 'From',
  tripsBookThis: 'Book This Trip',
  tripsBookNow: 'Tailor-Made',
  tripsViewDetails: 'View Details',
  tripsEnquire: 'Enquire',
  tripsStartingFrom: 'Starting from',
  tripsPerPerson: 'per person',
  tripsHighlights: 'Highlights',
  tripsTripInfo: 'Trip Info',
  tripsDuration: 'Duration',
  tripsGroupSize: 'Group Size',
  tripsDifficulty: 'Difficulty',
  tripTabOverview: 'Overview',
  tripTabItinerary: 'Itinerary',
  tripTabIncludes: 'Includes & Excludes',
  tripTabPolicies: 'Policies',
  tripWhatsIncluded: "What's Included",
  tripWhatsExcluded: "What's Excluded",
  tripCardDays: 'Days',
  tripCardBook: 'Book Trip',
  contactBadge: 'Contact',
  contactTitle: 'Plan your next journey',
  contactSubtitle: 'Send an enquiry and the travel team will contact you.',
  contactFullName: 'Full name',
  contactEmail: 'Email',
  contactPhone: 'Phone',
  contactSubject: 'Subject',
  contactMessage: 'Message',
  contactSend: 'Send Message',
  contactSending: 'Sending…',
  contactSuccess: 'Your message has been sent.',
  contactError: 'Unable to send message. Please check the form.',
  bookingLeadName: 'Lead name',
  bookingEmail: 'Email',
  bookingPhone: 'Phone',
  bookingTravelDate: 'Travel date',
  bookingTravellers: 'Travellers',
  bookingSpecialRequests: 'Special requests',
  bookingSubmit: 'Send Booking Request',
  bookingSubmitting: 'Submitting…',
  bookingSuccess: 'Booking request received.',
  bookingError: 'Unable to create booking.',
  emailDeliveryWarning: 'Saved successfully, but email notification could not be delivered right now.',
  newsletterPlaceholder: 'Email address',
  newsletterNamePlaceholder: 'Enter your name',
  newsletterJoin: 'Join',
  newsletterSubmit: 'Submit',
  newsletterJoining: 'Joining…',
  newsletterSuccess: 'Thank you for subscribing.',
  newsletterSectionTitle: 'Subscribe to Newsletter',
  newsletterSectionText: 'Discover destination ideas, travel promotions and planning tips directly in your inbox.',
  heroBadge: 'Travel & Tours',
  heroTitle: 'Plan beautiful journeys',
  heroSubtitle: 'Create, manage and publish travel content from a modern CMS.',
  heroCta: 'Explore Trips',
  heroCtaDefault: 'Explore Now',
  commonClose: 'Close',
  contentNoContent: 'No content available for this section yet.',
  rangeFrom: 'From',
  rangeTo: 'To',
  carouselGoToSlide: 'Go to slide',
  carouselPreviousSlide: 'Previous slide',
  carouselNextSlide: 'Next slide',
  tailorMadeTitle: 'Tailor-Made Trip Booking',
  tailorMadeSubtitle: 'Share your travel idea and our team will personalize the route, stay options, and pace for your group.',
  tailorMadeNoTrips: 'No active trips available right now.',
  tailorMadeNoTripsError: 'No trips are available right now. Please contact us directly.',
  tailorMadeNoDestinations: 'No destinations available right now.',
  tailorMadePreferredDestination: 'Preferred destination',
  tailorMadeSelectDestination: 'Select destination',
  tailorMadePreferredDuration: 'Preferred duration (days)',
  tailorMadeBudgetRange: 'Budget range',
  tailorMadeAccommodationStyle: 'Accommodation style',
  tailorMadeAccommodationChoose: 'Choose',
  tailorMadeAccommodationBudget: 'Budget',
  tailorMadeAccommodationComfort: 'Comfort',
  tailorMadeAccommodationLuxury: 'Luxury',
  tailorMadeAccommodationMixed: 'Mixed',
  tailorMadeActivities: 'Preferred activities',
  tailorMadeActivitiesPlaceholder: 'Trekking, culture, wildlife, photography, food',
  tailorMadeNotesPlaceholder: 'Share pace, accessibility needs, group details, and must-see experiences.',
  tailorMadeRequestButton: 'Request Tailor-Made Plan',
  navDestinations: 'Destinations',
  navTripsTours: 'Trips & Tours',
  navTravelStyle: 'Travel Style',
  navCategories: 'Categories',
  navBlog: 'Blog',
  navContact: 'Contact',
  navBookNow: 'Tailor-Made',
  navToggleNavigation: 'Toggle navigation',
  megaPopularDestinations: 'Popular Destinations',
  megaMoreDestinations: 'More Destinations',
  megaQuickLinks: 'Quick Links',
  megaAllDestinations: 'All Destinations',
  megaBrowseToursLink: 'Browse Tours',
  megaDestinations: 'Destinations',
  megaTripCategories: 'Trip Categories',
  megaTravelStyles: 'Travel Styles',
  megaBrowseTours: 'Browse Tours',
  megaAllTours: 'All Tours',
  megaSevenDayTours: '7-Day Tours',
  megaFourteenDayTours: '14-Day Tours',
  megaFeaturedTours: 'Featured Tours',
  megaBookATrip: 'Book a Trip',
  megaTravelTypes: 'Travel Types',
  megaTravelCategories: 'Travel Categories',
  megaExplore: 'Explore',
  megaAllTravelTypes: 'All Travel Types',
  megaAllTravelCategories: 'All Travel Categories',
  megaAllTripsTours: 'All Trips & Tours',
  megaArticles: 'Articles',
  megaAllBlogPosts: 'All Blog Posts',
  megaTravelGuides: 'Travel Guides',
  megaTravelTips: 'Travel Tips',
  megaDestinationReviews: 'Destination Reviews',
  megaTopics: 'Topics',
  megaAdventure: 'Adventure',
  megaCulture: 'Culture',
  megaPhotography: 'Photography',
  megaFoodDining: 'Food & Dining',
  megaFindPerfectJourney: 'Find your perfect journey',
  megaExploreAll: 'Explore All',
  errorTitle: 'Something went wrong',
  errorRetry: 'Try again',
  notFoundTitle: 'Page not found',
  notFoundMessage: 'The page you requested does not exist.',
  notFoundHome: 'Go home',
};

const fr: UiStrings = {
  homeAboutBadge: 'À propos',
  homeHowItWorksBadge: 'Comment ça marche',
  homeHowItWorksTitle: 'Votre voyage, planifié en trois étapes claires',
  homeTailorMadePlanningBadge: 'Planification sur mesure',
  homeTrustStats: [
    { label: 'Itinéraires sélectionnés', value: '250+' },
    { label: 'Voyageurs satisfaits', value: '12K+' },
    { label: 'Partenaires locaux', value: '80+' },
    { label: 'Assistance disponible', value: '24/7' }
  ],
  homeProcessSteps: [
    {
      title: 'Parlez-nous de votre style de voyage',
      body: 'Partagez votre rythme, votre budget et vos destinations de rêve. Nous écoutons d’abord et concevons selon vos objectifs.'
    },
    {
      title: 'Recevez un plan sur mesure',
      body: 'Nos concepteurs de voyages créent un itinéraire personnalisé avec hébergements, activités et recommandations saisonnières.'
    },
    {
      title: 'Voyagez en toute confiance',
      body: 'Des préparatifs avant le départ au soutien sur place, notre équipe vous accompagne à chaque étape du voyage.'
    }
  ],
  homeWhyCards: [
    {
      title: 'Experts des destinations',
      body: 'Nos spécialistes locaux construisent des itinéraires avec des séjours authentiques, des trésors cachés et un rythme réaliste.'
    },
    {
      title: 'Tarifs transparents',
      body: 'Des inclusions claires et des options flexibles vous aident à choisir l’expérience adaptée à votre budget.'
    },
    {
      title: 'Fiable et sécurisé',
      body: 'Partenaires vérifiés, contrôles qualité et assistance fiable à chaque étape de votre voyage.'
    },
    {
      title: 'Service personnalisé',
      body: 'Chaque itinéraire est personnalisé, que vous préfériez l’aventure, la culture, le bien-être ou les voyages en famille.'
    }
  ],
  homeFeaturedBadge: 'À la une',
  homeFeaturedTitle: 'Destinations vedettes',
  homeFeaturedSubtitle: 'Découvrez des destinations sélectionnées avec des conseils locaux et des galeries enrichies.',
  homeFeaturedCta: 'Voir toutes les destinations',
  homePopularBadge: 'Populaires',
  homePopularTitle: 'Voyages populaires',
  homePopularSubtitle: 'Packages de voyage réservables avec prix, itinéraires et disponibilités.',
  homePopularCta: 'Voir tous les voyages',
  homeWhyBadge: 'Pourquoi nous choisir',
  homeWhyFeatures: ['CMS multilingue', 'Médiathèque', 'SEO optimisé', 'Réservation en ligne'],
  homeBlogsBadge: 'Histoires',
  homeBlogsTitle: 'Derniers articles',
  homeReviewsBadge: 'Témoignages',
  homeReviewsTitle: 'Avis des voyageurs',
  blogsTitle: 'Blog de voyage',
  blogsSubtitle: 'Idées, histoires, guides et inspirations de destinations.',
  blogsMinRead: 'min de lecture',
  categoriesTitle: 'Catégories',
  categoriesSubtitle: 'Parcourez les voyages et contenus par catégorie.',
  categoriesTripsIn: 'Voyages dans',
  categoriesNoTrips: 'Aucun voyage disponible dans cette catégorie pour le moment.',
  categoriesBlogsIn: 'Blogs dans',
  categoriesNoBlogs: 'Aucun blog disponible dans cette catégorie pour le moment.',
  categoriesOverview: 'Aperçu',
  categoriesHighlights: 'Points forts',
  categoriesThingsToDo: 'Activités',
  categoriesTravelTips: 'Conseils de voyage',
  destinationsTitle: 'Destinations',
  destinationsSubtitle: 'Explorez pays, villes, points forts et guides de destinations.',
  destinationsOverview: 'Aperçu',
  destinationsHighlights: 'Points forts',
  destinationsThingsToDo: 'Activités',
  destinationsTravelTips: 'Conseils de voyage',
  destinationsWeather: 'Météo',
  destinationsGallery: 'Galerie',
  destinationsTripsIn: 'Voyages à',
  destinationsLatitude: 'Latitude',
  destinationsLongitude: 'Longitude',
  travelTypesTitle: 'Types de voyage',
  travelTypesSubtitle: 'Trouvez votre style de voyage idéal.',
  travelTypesOverview: 'Aperçu',
  travelTypesHighlights: 'Points forts',
  travelTypesThingsToDo: 'Activités',
  travelTypesTravelTips: 'Conseils de voyage',
  travelTypesGallery: 'Galerie',
  travelTypesTripsIn: 'Voyages dans',
  tripsExplore: 'Explorer les voyages',
  tripsDiscover: 'Découvrez des destinations incroyables et réservez votre prochaine aventure.',
  tripsFilters: 'Filtres',
  tripsReset: 'Réinitialiser',
  tripsPriceRange: 'Fourchette de prix',
  tripsDurationFilter: 'Durée (jours)',
  tripsDestinationsFilter: 'Destinations',
  tripsTravelTypesFilter: 'Types de voyage',
  tripsCategoriesFilter: 'Catégories',
  tripsFeaturedOnly: 'À la une uniquement',
  tripsShowing: 'Affichage de',
  tripsOf: 'sur',
  tripsNoTrips: 'Aucun voyage trouvé',
  tripsAdjustFilters: 'Essayez d\'ajuster vos filtres',
  tripsResetFilters: 'Réinitialiser les filtres',
  tripsDays: 'jours',
  tripsFrom: 'À partir de',
  tripsBookThis: 'Réserver ce voyage',
  tripsBookNow: 'Tailor-Made',
  tripsViewDetails: 'Voir les détails',
  tripsEnquire: 'Renseignements',
  tripsStartingFrom: 'À partir de',
  tripsPerPerson: 'par personne',
  tripsHighlights: 'Points forts',
  tripsTripInfo: 'Infos voyage',
  tripsDuration: 'Durée',
  tripsGroupSize: 'Taille du groupe',
  tripsDifficulty: 'Difficulté',
  tripTabOverview: 'Aperçu',
  tripTabItinerary: 'Itinéraire',
  tripTabIncludes: 'Inclus et exclus',
  tripTabPolicies: 'Conditions',
  tripWhatsIncluded: 'Ce qui est inclus',
  tripWhatsExcluded: 'Ce qui est exclu',
  tripCardDays: 'jours',
  tripCardBook: 'Réserver',
  contactBadge: 'Contact',
  contactTitle: 'Planifiez votre prochain voyage',
  contactSubtitle: 'Envoyez une demande et notre équipe vous contactera.',
  contactFullName: 'Nom complet',
  contactEmail: 'E-mail',
  contactPhone: 'Téléphone',
  contactSubject: 'Sujet',
  contactMessage: 'Message',
  contactSend: 'Envoyer le message',
  contactSending: 'Envoi en cours…',
  contactSuccess: 'Votre message a été envoyé.',
  contactError: 'Impossible d\'envoyer le message.',
  bookingLeadName: 'Nom principal',
  bookingEmail: 'E-mail',
  bookingPhone: 'Téléphone',
  bookingTravelDate: 'Date de voyage',
  bookingTravellers: 'Voyageurs',
  bookingSpecialRequests: 'Demandes spéciales',
  bookingSubmit: 'Envoyer la demande',
  bookingSubmitting: 'Envoi en cours…',
  bookingSuccess: 'Demande de réservation reçue.',
  bookingError: 'Impossible de créer la réservation.',
  emailDeliveryWarning: 'Enregistré avec succès, mais la notification e-mail n\'a pas pu être envoyée pour le moment.',
  newsletterPlaceholder: 'Adresse e-mail',
  newsletterNamePlaceholder: 'Saisissez votre nom',
  newsletterJoin: 'S\'abonner',
  newsletterSubmit: 'Envoyer',
  newsletterJoining: 'Inscription…',
  newsletterSuccess: 'Merci pour votre abonnement.',
  newsletterSectionTitle: 'Abonnez-vous à la newsletter',
  newsletterSectionText: 'Recevez des idées de destinations, promotions voyage et conseils de planification directement dans votre boîte mail.',
  heroBadge: 'Voyages & Tours',
  heroTitle: 'Planifiez de beaux voyages',
  heroSubtitle: 'Créez, gérez et publiez du contenu de voyage depuis un CMS moderne.',
  heroCta: 'Explorer les voyages',
  heroCtaDefault: 'Explorer maintenant',
  commonClose: 'Fermer',
  contentNoContent: 'Aucun contenu disponible pour cette section pour le moment.',
  rangeFrom: 'De',
  rangeTo: 'À',
  carouselGoToSlide: 'Aller à la diapositive',
  carouselPreviousSlide: 'Diapositive précédente',
  carouselNextSlide: 'Diapositive suivante',
  tailorMadeTitle: 'Réservation de voyage sur mesure',
  tailorMadeSubtitle: 'Partagez votre idée de voyage et notre équipe personnalisera l\'itinéraire, l\'hébergement et le rythme pour votre groupe.',
  tailorMadeNoTrips: 'Aucun voyage actif disponible pour le moment.',
  tailorMadeNoTripsError: 'Aucun voyage n\'est disponible pour le moment. Veuillez nous contacter directement.',
  tailorMadeNoDestinations: 'Aucune destination disponible pour le moment.',
  tailorMadePreferredDestination: 'Destination souhaitée',
  tailorMadeSelectDestination: 'Sélectionnez une destination',
  tailorMadePreferredDuration: 'Durée souhaitée (jours)',
  tailorMadeBudgetRange: 'Budget estimé',
  tailorMadeAccommodationStyle: 'Style d\'hébergement',
  tailorMadeAccommodationChoose: 'Choisir',
  tailorMadeAccommodationBudget: 'Économique',
  tailorMadeAccommodationComfort: 'Confort',
  tailorMadeAccommodationLuxury: 'Luxe',
  tailorMadeAccommodationMixed: 'Mixte',
  tailorMadeActivities: 'Activités préférées',
  tailorMadeActivitiesPlaceholder: 'Trekking, culture, faune, photographie, gastronomie',
  tailorMadeNotesPlaceholder: 'Partagez le rythme souhaité, les besoins d\'accessibilité, les détails du groupe et les expériences incontournables.',
  tailorMadeRequestButton: 'Demander un plan sur mesure',
  navDestinations: 'Destinations',
  navTripsTours: 'Voyages & Circuits',
  navTravelStyle: 'Style de voyage',
  navCategories: 'Catégories',
  navBlog: 'Blog',
  navContact: 'Contact',
  navBookNow: 'Tailor-Made',
  navToggleNavigation: 'Basculer la navigation',
  megaPopularDestinations: 'Destinations populaires',
  megaMoreDestinations: 'Plus de destinations',
  megaQuickLinks: 'Liens rapides',
  megaAllDestinations: 'Toutes les destinations',
  megaBrowseToursLink: 'Parcourir les circuits',
  megaDestinations: 'Destinations',
  megaTripCategories: 'Catégories de voyage',
  megaTravelStyles: 'Styles de voyage',
  megaBrowseTours: 'Parcourir les circuits',
  megaAllTours: 'Tous les circuits',
  megaSevenDayTours: 'Circuits de 7 jours',
  megaFourteenDayTours: 'Circuits de 14 jours',
  megaFeaturedTours: 'Circuits à la une',
  megaBookATrip: 'Réserver un voyage',
  megaTravelTypes: 'Types de voyage',
  megaTravelCategories: 'Catégories de voyage',
  megaExplore: 'Explorer',
  megaAllTravelTypes: 'Tous les types de voyage',
  megaAllTravelCategories: 'Toutes les catégories de voyage',
  megaAllTripsTours: 'Tous les voyages & circuits',
  megaArticles: 'Articles',
  megaAllBlogPosts: 'Tous les articles du blog',
  megaTravelGuides: 'Guides de voyage',
  megaTravelTips: 'Conseils de voyage',
  megaDestinationReviews: 'Avis sur les destinations',
  megaTopics: 'Sujets',
  megaAdventure: 'Aventure',
  megaCulture: 'Culture',
  megaPhotography: 'Photographie',
  megaFoodDining: 'Gastronomie',
  megaFindPerfectJourney: 'Trouvez votre voyage idéal',
  megaExploreAll: 'Tout explorer',
  errorTitle: 'Une erreur s\'est produite',
  errorRetry: 'Réessayer',
  notFoundTitle: 'Page introuvable',
  notFoundMessage: 'La page demandée n\'existe pas.',
  notFoundHome: 'Accueil',
};

const es: UiStrings = {
  homeAboutBadge: 'Sobre nosotros',
  homeHowItWorksBadge: 'Cómo funciona',
  homeHowItWorksTitle: 'Su viaje, planificado en tres pasos claros',
  homeTailorMadePlanningBadge: 'Planificación a medida',
  homeTrustStats: [
    { label: 'Rutas seleccionadas', value: '250+' },
    { label: 'Viajeros felices', value: '12K+' },
    { label: 'Socios locales', value: '80+' },
    { label: 'Asistencia disponible', value: '24/7' }
  ],
  homeProcessSteps: [
    {
      title: 'Cuéntenos su estilo de viaje',
      body: 'Comparta su ritmo, presupuesto y destinos soñados. Primero escuchamos y diseñamos según sus objetivos.'
    },
    {
      title: 'Reciba un plan a medida',
      body: 'Nuestros diseñadores de viajes crean una ruta personalizada con alojamientos, actividades y recomendaciones de temporada.'
    },
    {
      title: 'Viaje con confianza',
      body: 'Desde los preparativos previos hasta el apoyo en destino, nuestro equipo le acompaña en cada paso del viaje.'
    }
  ],
  homeWhyCards: [
    {
      title: 'Expertos en destinos',
      body: 'Los especialistas locales crean rutas con estancias auténticas, joyas ocultas y un ritmo realista.'
    },
    {
      title: 'Precios transparentes',
      body: 'Inclusiones claras y opciones flexibles le ayudan a elegir la experiencia adecuada para su presupuesto.'
    },
    {
      title: 'Seguro y fiable',
      body: 'Socios verificados, controles de calidad y apoyo confiable en cada etapa de su viaje.'
    },
    {
      title: 'Servicio personalizado',
      body: 'Cada itinerario se personaliza, ya prefiera aventura, cultura, bienestar o viajes en familia.'
    }
  ],
  homeFeaturedBadge: 'Destacado',
  homeFeaturedTitle: 'Destinos destacados',
  homeFeaturedSubtitle: 'Descubra destinos seleccionados con consejos locales y galerías enriquecidas.',
  homeFeaturedCta: 'Ver todos los destinos',
  homePopularBadge: 'Popular',
  homePopularTitle: 'Viajes populares',
  homePopularSubtitle: 'Paquetes de viaje reservables con precios, itinerarios y disponibilidad.',
  homePopularCta: 'Ver todos los viajes',
  homeWhyBadge: 'Por qué elegirnos',
  homeWhyFeatures: ['CMS multilingüe', 'Biblioteca multimedia', 'SEO optimizado', 'Reserva en línea'],
  homeBlogsBadge: 'Historias',
  homeBlogsTitle: 'Últimos blogs',
  homeReviewsBadge: 'Testimonios',
  homeReviewsTitle: 'Opiniones de viajeros',
  blogsTitle: 'Blog de viajes',
  blogsSubtitle: 'Ideas, historias, guías e inspiración de destinos.',
  blogsMinRead: 'min de lectura',
  categoriesTitle: 'Categorías',
  categoriesSubtitle: 'Explore viajes y contenidos por categoría.',
  categoriesTripsIn: 'Viajes en',
  categoriesNoTrips: 'No hay viajes disponibles en esta categoría todavía.',
  categoriesBlogsIn: 'Blogs en',
  categoriesNoBlogs: 'No hay blogs disponibles en esta categoría todavía.',
  categoriesOverview: 'Descripción general',
  categoriesHighlights: 'Atracciones',
  categoriesThingsToDo: 'Qué hacer',
  categoriesTravelTips: 'Consejos de viaje',
  destinationsTitle: 'Destinos',
  destinationsSubtitle: 'Explore países, ciudades, atracciones y guías de destinos.',
  destinationsOverview: 'Descripción general',
  destinationsHighlights: 'Atracciones',
  destinationsThingsToDo: 'Qué hacer',
  destinationsTravelTips: 'Consejos de viaje',
  destinationsWeather: 'Clima',
  destinationsGallery: 'Galería',
  destinationsTripsIn: 'Viajes en',
  destinationsLatitude: 'Latitud',
  destinationsLongitude: 'Longitud',
  travelTypesTitle: 'Tipos de viaje',
  travelTypesSubtitle: 'Encuentre su estilo de viaje perfecto.',
  travelTypesOverview: 'Descripción general',
  travelTypesHighlights: 'Atracciones',
  travelTypesThingsToDo: 'Qué hacer',
  travelTypesTravelTips: 'Consejos de viaje',
  travelTypesGallery: 'Galería',
  travelTypesTripsIn: 'Viajes en',
  tripsExplore: 'Explorar viajes',
  tripsDiscover: 'Descubra destinos increíbles y reserve su próxima aventura.',
  tripsFilters: 'Filtros',
  tripsReset: 'Restablecer',
  tripsPriceRange: 'Rango de precios',
  tripsDurationFilter: 'Duración (días)',
  tripsDestinationsFilter: 'Destinos',
  tripsTravelTypesFilter: 'Tipos de viaje',
  tripsCategoriesFilter: 'Categorías',
  tripsFeaturedOnly: 'Solo destacados',
  tripsShowing: 'Mostrando',
  tripsOf: 'de',
  tripsNoTrips: 'No se encontraron viajes',
  tripsAdjustFilters: 'Intente ajustar sus filtros',
  tripsResetFilters: 'Restablecer filtros',
  tripsDays: 'días',
  tripsFrom: 'Desde',
  tripsBookThis: 'Reservar este viaje',
  tripsBookNow: 'Tailor-Made',
  tripsViewDetails: 'Ver detalles',
  tripsEnquire: 'Consultar',
  tripsStartingFrom: 'Desde',
  tripsPerPerson: 'por persona',
  tripsHighlights: 'Atracciones',
  tripsTripInfo: 'Info del viaje',
  tripsDuration: 'Duración',
  tripsGroupSize: 'Tamaño del grupo',
  tripsDifficulty: 'Dificultad',
  tripTabOverview: 'Descripción',
  tripTabItinerary: 'Itinerario',
  tripTabIncludes: 'Incluido y excluido',
  tripTabPolicies: 'Políticas',
  tripWhatsIncluded: 'Qué está incluido',
  tripWhatsExcluded: 'Qué está excluido',
  tripCardDays: 'días',
  tripCardBook: 'Reservar',
  contactBadge: 'Contacto',
  contactTitle: 'Planifique su próximo viaje',
  contactSubtitle: 'Envíe una consulta y nuestro equipo se pondrá en contacto.',
  contactFullName: 'Nombre completo',
  contactEmail: 'Correo electrónico',
  contactPhone: 'Teléfono',
  contactSubject: 'Asunto',
  contactMessage: 'Mensaje',
  contactSend: 'Enviar mensaje',
  contactSending: 'Enviando…',
  contactSuccess: 'Su mensaje ha sido enviado.',
  contactError: 'No se pudo enviar el mensaje.',
  bookingLeadName: 'Nombre principal',
  bookingEmail: 'Correo electrónico',
  bookingPhone: 'Teléfono',
  bookingTravelDate: 'Fecha de viaje',
  bookingTravellers: 'Viajeros',
  bookingSpecialRequests: 'Solicitudes especiales',
  bookingSubmit: 'Enviar solicitud',
  bookingSubmitting: 'Enviando…',
  bookingSuccess: 'Solicitud de reserva recibida.',
  bookingError: 'No se pudo crear la reserva.',
  emailDeliveryWarning: 'Guardado correctamente, pero la notificación por correo no pudo enviarse por ahora.',
  newsletterPlaceholder: 'Correo electrónico',
  newsletterNamePlaceholder: 'Ingrese su nombre',
  newsletterJoin: 'Suscribirse',
  newsletterSubmit: 'Enviar',
  newsletterJoining: 'Suscribiendo…',
  newsletterSuccess: 'Gracias por suscribirse.',
  newsletterSectionTitle: 'Suscríbete al boletín',
  newsletterSectionText: 'Reciba ideas de destinos, promociones de viaje y consejos de planificación directamente en su bandeja de entrada.',
  heroBadge: 'Viajes & Tours',
  heroTitle: 'Planifique viajes hermosos',
  heroSubtitle: 'Cree, gestione y publique contenido de viaje desde un CMS moderno.',
  heroCta: 'Explorar viajes',
  heroCtaDefault: 'Explorar ahora',
  commonClose: 'Cerrar',
  contentNoContent: 'No hay contenido disponible para esta sección todavía.',
  rangeFrom: 'Desde',
  rangeTo: 'Hasta',
  carouselGoToSlide: 'Ir a la diapositiva',
  carouselPreviousSlide: 'Diapositiva anterior',
  carouselNextSlide: 'Siguiente diapositiva',
  tailorMadeTitle: 'Reserva de viaje a medida',
  tailorMadeSubtitle: 'Comparta su idea de viaje y nuestro equipo personalizará la ruta, opciones de alojamiento y ritmo para su grupo.',
  tailorMadeNoTrips: 'No hay viajes activos disponibles en este momento.',
  tailorMadeNoTripsError: 'No hay viajes disponibles en este momento. Por favor contáctenos directamente.',
  tailorMadeNoDestinations: 'No hay destinos disponibles en este momento.',
  tailorMadePreferredDestination: 'Destino preferido',
  tailorMadeSelectDestination: 'Seleccione destino',
  tailorMadePreferredDuration: 'Duración preferida (días)',
  tailorMadeBudgetRange: 'Rango de presupuesto',
  tailorMadeAccommodationStyle: 'Tipo de alojamiento',
  tailorMadeAccommodationChoose: 'Elegir',
  tailorMadeAccommodationBudget: 'Económico',
  tailorMadeAccommodationComfort: 'Confort',
  tailorMadeAccommodationLuxury: 'Lujo',
  tailorMadeAccommodationMixed: 'Mixto',
  tailorMadeActivities: 'Actividades preferidas',
  tailorMadeActivitiesPlaceholder: 'Trekking, cultura, vida silvestre, fotografía, gastronomía',
  tailorMadeNotesPlaceholder: 'Comparta ritmo, necesidades de accesibilidad, detalles del grupo y experiencias imprescindibles.',
  tailorMadeRequestButton: 'Solicitar plan a medida',
  navDestinations: 'Destinos',
  navTripsTours: 'Viajes y Tours',
  navTravelStyle: 'Estilo de viaje',
  navCategories: 'Categorías',
  navBlog: 'Blog',
  navContact: 'Contacto',
  navBookNow: 'Tailor-Made',
  navToggleNavigation: 'Alternar navegación',
  megaPopularDestinations: 'Destinos populares',
  megaMoreDestinations: 'Más destinos',
  megaQuickLinks: 'Enlaces rápidos',
  megaAllDestinations: 'Todos los destinos',
  megaBrowseToursLink: 'Ver tours',
  megaDestinations: 'Destinos',
  megaTripCategories: 'Categorías de viaje',
  megaTravelStyles: 'Estilos de viaje',
  megaBrowseTours: 'Ver tours',
  megaAllTours: 'Todos los tours',
  megaSevenDayTours: 'Tours de 7 días',
  megaFourteenDayTours: 'Tours de 14 días',
  megaFeaturedTours: 'Tours destacados',
  megaBookATrip: 'Reservar un viaje',
  megaTravelTypes: 'Tipos de viaje',
  megaTravelCategories: 'Categorías de viaje',
  megaExplore: 'Explorar',
  megaAllTravelTypes: 'Todos los tipos de viaje',
  megaAllTravelCategories: 'Todas las categorías de viaje',
  megaAllTripsTours: 'Todos los viajes y tours',
  megaArticles: 'Artículos',
  megaAllBlogPosts: 'Todas las entradas del blog',
  megaTravelGuides: 'Guías de viaje',
  megaTravelTips: 'Consejos de viaje',
  megaDestinationReviews: 'Reseñas de destinos',
  megaTopics: 'Temas',
  megaAdventure: 'Aventura',
  megaCulture: 'Cultura',
  megaPhotography: 'Fotografía',
  megaFoodDining: 'Comida y gastronomía',
  megaFindPerfectJourney: 'Encuentra tu viaje perfecto',
  megaExploreAll: 'Explorar todo',
  errorTitle: 'Algo salió mal',
  errorRetry: 'Intentar de nuevo',
  notFoundTitle: 'Página no encontrada',
  notFoundMessage: 'La página solicitada no existe.',
  notFoundHome: 'Ir al inicio',
};

const nl: UiStrings = {
  homeAboutBadge: 'Over ons',
  homeHowItWorksBadge: 'Hoe het werkt',
  homeHowItWorksTitle: 'Uw reis, gepland in drie duidelijke stappen',
  homeTailorMadePlanningBadge: 'Reisplanning op maat',
  homeTrustStats: [
    { label: 'Geselecteerde routes', value: '250+' },
    { label: 'Blije reizigers', value: '12K+' },
    { label: 'Lokale partners', value: '80+' },
    { label: 'Beschikbare ondersteuning', value: '24/7' }
  ],
  homeProcessSteps: [
    {
      title: 'Vertel ons uw reisstijl',
      body: 'Deel uw tempo, budget en droombestemmingen. We luisteren eerst en ontwerpen rond uw doelen.'
    },
    {
      title: 'Ontvang een reisplan op maat',
      body: 'Onze reisontwerpers maken een gepersonaliseerde route met verblijven, activiteiten en seizoensaanbevelingen.'
    },
    {
      title: 'Reis met vertrouwen',
      body: 'Van de voorbereiding tot ondersteuning op de bestemming staat ons team tijdens elke stap voor u klaar.'
    }
  ],
  homeWhyCards: [
    {
      title: 'Bestemmingsexperts',
      body: 'Lokale specialisten bouwen routes met authentieke verblijven, verborgen parels en een realistisch tempo.'
    },
    {
      title: 'Transparante prijzen',
      body: 'Duidelijke inclusies en flexibele opties helpen u de juiste ervaring voor uw budget te kiezen.'
    },
    {
      title: 'Veilig en betrouwbaar',
      body: 'Geverifieerde partners, kwaliteitscontroles en betrouwbare ondersteuning in elke fase van uw reis.'
    },
    {
      title: 'Persoonlijke service',
      body: 'Elke reis wordt aangepast, of u nu avontuur, cultuur, wellness of familievakanties wilt.'
    }
  ],
  homeFeaturedBadge: 'Uitgelicht',
  homeFeaturedTitle: 'Uitgelichte bestemmingen',
  homeFeaturedSubtitle: 'Ontdek zorgvuldig geselecteerde bestemmingen met lokale tips en rijke galerijen.',
  homeFeaturedCta: 'Alle bestemmingen bekijken',
  homePopularBadge: 'Populair',
  homePopularTitle: 'Populaire reizen',
  homePopularSubtitle: 'Boekbare reispakketten met prijzen, reisschema\'s en beschikbaarheid.',
  homePopularCta: 'Alle reizen bekijken',
  homeWhyBadge: 'Waarom ons kiezen',
  homeWhyFeatures: ['Meertalig CMS', 'Mediabibliotheek', 'SEO-klaar', 'Boekingsflow'],
  homeBlogsBadge: 'Verhalen',
  homeBlogsTitle: 'Laatste blogs',
  homeReviewsBadge: 'Getuigenissen',
  homeReviewsTitle: 'Reizigersreviews',
  blogsTitle: 'Reisblog',
  blogsSubtitle: 'Ideeën, verhalen, gidsen en bestemmingsinspiratie.',
  blogsMinRead: 'min lezen',
  categoriesTitle: 'Categorieën',
  categoriesSubtitle: 'Blader door reizen en inhoud per categorie.',
  categoriesTripsIn: 'Reizen in',
  categoriesNoTrips: 'Nog geen reizen beschikbaar in deze categorie.',
  categoriesBlogsIn: 'Blogs in',
  categoriesNoBlogs: 'Nog geen blogs beschikbaar in deze categorie.',
  categoriesOverview: 'Overzicht',
  categoriesHighlights: 'Hoogtepunten',
  categoriesThingsToDo: 'Wat te doen',
  categoriesTravelTips: 'Reistips',
  destinationsTitle: 'Bestemmingen',
  destinationsSubtitle: 'Verken landen, steden, hoogtepunten en bestemmingsgidsen.',
  destinationsOverview: 'Overzicht',
  destinationsHighlights: 'Hoogtepunten',
  destinationsThingsToDo: 'Wat te doen',
  destinationsTravelTips: 'Reistips',
  destinationsWeather: 'Weer',
  destinationsGallery: 'Galerij',
  destinationsTripsIn: 'Reizen naar',
  destinationsLatitude: 'Breedtegraad',
  destinationsLongitude: 'Lengtegraad',
  travelTypesTitle: 'Reistypes',
  travelTypesSubtitle: 'Vind uw perfecte reistijl.',
  travelTypesOverview: 'Overzicht',
  travelTypesHighlights: 'Hoogtepunten',
  travelTypesThingsToDo: 'Wat te doen',
  travelTypesTravelTips: 'Reistips',
  travelTypesGallery: 'Galerij',
  travelTypesTripsIn: 'Reizen in',
  tripsExplore: 'Reizen verkennen',
  tripsDiscover: 'Ontdek geweldige bestemmingen en boek uw volgende avontuur.',
  tripsFilters: 'Filters',
  tripsReset: 'Resetten',
  tripsPriceRange: 'Prijsklasse',
  tripsDurationFilter: 'Duur (dagen)',
  tripsDestinationsFilter: 'Bestemmingen',
  tripsTravelTypesFilter: 'Reistypes',
  tripsCategoriesFilter: 'Categorieën',
  tripsFeaturedOnly: 'Alleen uitgelicht',
  tripsShowing: 'Weergave van',
  tripsOf: 'van',
  tripsNoTrips: 'Geen reizen gevonden',
  tripsAdjustFilters: 'Probeer uw filters aan te passen',
  tripsResetFilters: 'Filters resetten',
  tripsDays: 'dagen',
  tripsFrom: 'Vanaf',
  tripsBookThis: 'Deze reis boeken',
  tripsBookNow: 'Tailor-Made',
  tripsViewDetails: 'Details bekijken',
  tripsEnquire: 'Informeren',
  tripsStartingFrom: 'Vanaf',
  tripsPerPerson: 'per persoon',
  tripsHighlights: 'Hoogtepunten',
  tripsTripInfo: 'Reisinfo',
  tripsDuration: 'Duur',
  tripsGroupSize: 'Groepsgrootte',
  tripsDifficulty: 'Moeilijkheidsgraad',
  tripTabOverview: 'Overzicht',
  tripTabItinerary: 'Reisschema',
  tripTabIncludes: 'Inbegrepen en uitgesloten',
  tripTabPolicies: 'Beleid',
  tripWhatsIncluded: 'Wat is inbegrepen',
  tripWhatsExcluded: 'Wat is uitgesloten',
  tripCardDays: 'dagen',
  tripCardBook: 'Reis boeken',
  contactBadge: 'Contact',
  contactTitle: 'Plan uw volgende reis',
  contactSubtitle: 'Stuur een aanvraag en ons team neemt contact met u op.',
  contactFullName: 'Volledige naam',
  contactEmail: 'E-mail',
  contactPhone: 'Telefoon',
  contactSubject: 'Onderwerp',
  contactMessage: 'Bericht',
  contactSend: 'Bericht versturen',
  contactSending: 'Bezig met versturen…',
  contactSuccess: 'Uw bericht is verzonden.',
  contactError: 'Bericht kon niet worden verstuurd.',
  bookingLeadName: 'Hoofdboeker',
  bookingEmail: 'E-mail',
  bookingPhone: 'Telefoon',
  bookingTravelDate: 'Reisdatum',
  bookingTravellers: 'Reizigers',
  bookingSpecialRequests: 'Speciale verzoeken',
  bookingSubmit: 'Boekingsaanvraag versturen',
  bookingSubmitting: 'Versturen…',
  bookingSuccess: 'Boekingsaanvraag ontvangen.',
  bookingError: 'Boeking kon niet worden aangemaakt.',
  emailDeliveryWarning: 'Succesvol opgeslagen, maar e-mailmelding kon nu niet worden bezorgd.',
  newsletterPlaceholder: 'E-mailadres',
  newsletterNamePlaceholder: 'Voer je naam in',
  newsletterJoin: 'Aanmelden',
  newsletterSubmit: 'Versturen',
  newsletterJoining: 'Aanmelden…',
  newsletterSuccess: 'Bedankt voor uw aanmelding.',
  newsletterSectionTitle: 'Abonneer op de nieuwsbrief',
  newsletterSectionText: 'Ontvang bestemmingsideeën, reisaanbiedingen en planningstips direct in je inbox.',
  heroBadge: 'Reizen & Tours',
  heroTitle: 'Plan prachtige reizen',
  heroSubtitle: 'Maak, beheer en publiceer reisinhoud vanuit een modern CMS.',
  heroCta: 'Reizen verkennen',
  heroCtaDefault: 'Nu verkennen',
  commonClose: 'Sluiten',
  contentNoContent: 'Nog geen inhoud beschikbaar voor deze sectie.',
  rangeFrom: 'Van',
  rangeTo: 'Tot',
  carouselGoToSlide: 'Ga naar dia',
  carouselPreviousSlide: 'Vorige dia',
  carouselNextSlide: 'Volgende dia',
  tailorMadeTitle: 'Reis op maat boeken',
  tailorMadeSubtitle: 'Deel je reisidee en ons team personaliseert de route, verblijfopties en het tempo voor je groep.',
  tailorMadeNoTrips: 'Er zijn momenteel geen actieve reizen beschikbaar.',
  tailorMadeNoTripsError: 'Er zijn momenteel geen reizen beschikbaar. Neem direct contact met ons op.',
  tailorMadeNoDestinations: 'Er zijn momenteel geen bestemmingen beschikbaar.',
  tailorMadePreferredDestination: 'Gewenste bestemming',
  tailorMadeSelectDestination: 'Selecteer bestemming',
  tailorMadePreferredDuration: 'Gewenste duur (dagen)',
  tailorMadeBudgetRange: 'Budgetbereik',
  tailorMadeAccommodationStyle: 'Accommodatiestijl',
  tailorMadeAccommodationChoose: 'Kiezen',
  tailorMadeAccommodationBudget: 'Budget',
  tailorMadeAccommodationComfort: 'Comfort',
  tailorMadeAccommodationLuxury: 'Luxe',
  tailorMadeAccommodationMixed: 'Gemengd',
  tailorMadeActivities: 'Gewenste activiteiten',
  tailorMadeActivitiesPlaceholder: 'Trekking, cultuur, wildlife, fotografie, eten',
  tailorMadeNotesPlaceholder: 'Deel tempo, toegankelijkheidswensen, groepsdetails en ervaringen die je zeker wilt zien.',
  tailorMadeRequestButton: 'Vraag een maatwerkplan aan',
  navDestinations: 'Bestemmingen',
  navTripsTours: 'Reizen & Tours',
  navTravelStyle: 'Reisstijl',
  navCategories: 'Categorieën',
  navBlog: 'Blog',
  navContact: 'Contact',
  navBookNow: 'Tailor-Made',
  navToggleNavigation: 'Navigatie wisselen',
  megaPopularDestinations: 'Populaire bestemmingen',
  megaMoreDestinations: 'Meer bestemmingen',
  megaQuickLinks: 'Snelle links',
  megaAllDestinations: 'Alle bestemmingen',
  megaBrowseToursLink: 'Tours bekijken',
  megaDestinations: 'Bestemmingen',
  megaTripCategories: 'Reiscategorieën',
  megaTravelStyles: 'Reisstijlen',
  megaBrowseTours: 'Tours bekijken',
  megaAllTours: 'Alle tours',
  megaSevenDayTours: '7-daagse tours',
  megaFourteenDayTours: '14-daagse tours',
  megaFeaturedTours: 'Uitgelichte tours',
  megaBookATrip: 'Een reis boeken',
  megaTravelTypes: 'Reistypes',
  megaTravelCategories: 'Reiscategorieën',
  megaExplore: 'Verkennen',
  megaAllTravelTypes: 'Alle reistypes',
  megaAllTravelCategories: 'Alle reiscategorieën',
  megaAllTripsTours: 'Alle reizen & tours',
  megaArticles: 'Artikelen',
  megaAllBlogPosts: 'Alle blogberichten',
  megaTravelGuides: 'Reisgidsen',
  megaTravelTips: 'Reistips',
  megaDestinationReviews: 'Bestemmingsreviews',
  megaTopics: 'Onderwerpen',
  megaAdventure: 'Avontuur',
  megaCulture: 'Cultuur',
  megaPhotography: 'Fotografie',
  megaFoodDining: 'Eten & dineren',
  megaFindPerfectJourney: 'Vind je perfecte reis',
  megaExploreAll: 'Alles verkennen',
  errorTitle: 'Er is iets misgegaan',
  errorRetry: 'Opnieuw proberen',
  notFoundTitle: 'Pagina niet gevonden',
  notFoundMessage: 'De gevraagde pagina bestaat niet.',
  notFoundHome: 'Naar huis',
};

const it: UiStrings = {
  homeAboutBadge: 'Chi siamo',
  homeHowItWorksBadge: 'Come funziona',
  homeHowItWorksTitle: 'Il tuo viaggio, pianificato in tre chiari passi',
  homeTailorMadePlanningBadge: 'Pianificazione su misura',
  homeTrustStats: [
    { label: 'Itinerari selezionati', value: '250+' },
    { label: 'Viaggiatori felici', value: '12K+' },
    { label: 'Partner locali', value: '80+' },
    { label: 'Assistenza disponibile', value: '24/7' }
  ],
  homeProcessSteps: [
    {
      title: 'Raccontaci il tuo stile di viaggio',
      body: 'Condividi il tuo ritmo, budget e destinazioni dei sogni. Ascoltiamo prima e progettiamo in base ai tuoi obiettivi.'
    },
    {
      title: 'Ricevi un piano su misura',
      body: 'I nostri travel designer creano un itinerario personalizzato con soggiorni, attività e consigli stagionali.'
    },
    {
      title: 'Viaggia con fiducia',
      body: 'Dai preparativi prima della partenza al supporto in loco, il nostro team ti accompagna in ogni fase del viaggio.'
    }
  ],
  homeWhyCards: [
    {
      title: 'Esperti di destinazioni',
      body: 'Gli specialisti locali costruiscono itinerari con soggiorni autentici, gemme nascoste e un ritmo realistico.'
    },
    {
      title: 'Prezzi trasparenti',
      body: 'Inclusioni chiare e opzioni flessibili ti aiutano a scegliere l’esperienza giusta per il tuo budget.'
    },
    {
      title: 'Sicuro e affidabile',
      body: 'Partner verificati, controlli di qualità e supporto affidabile in ogni fase del viaggio.'
    },
    {
      title: 'Servizio personalizzato',
      body: 'Ogni itinerario è personalizzato, che tu preferisca avventura, cultura, benessere o viaggi in famiglia.'
    }
  ],
  homeFeaturedBadge: 'In evidenza',
  homeFeaturedTitle: 'Destinazioni in evidenza',
  homeFeaturedSubtitle: 'Scopri destinazioni curate con consigli locali, suggerimenti di viaggio e gallerie ricche.',
  homeFeaturedCta: 'Vedi tutte le destinazioni',
  homePopularBadge: 'Popolare',
  homePopularTitle: 'Viaggi popolari',
  homePopularSubtitle: 'Pacchetti viaggio prenotabili con prezzi, itinerari e disponibilità.',
  homePopularCta: 'Vedi tutti i viaggi',
  homeWhyBadge: 'Perché sceglierci',
  homeWhyFeatures: ['CMS multilingue', 'Libreria media', 'SEO ottimizzato', 'Prenotazione online'],
  homeBlogsBadge: 'Storie',
  homeBlogsTitle: 'Ultimi blog',
  homeReviewsBadge: 'Testimonianze',
  homeReviewsTitle: 'Recensioni dei viaggiatori',
  blogsTitle: 'Blog di viaggio',
  blogsSubtitle: 'Idee, storie, guide e ispirazione per le destinazioni.',
  blogsMinRead: 'min di lettura',
  categoriesTitle: 'Categorie',
  categoriesSubtitle: 'Sfoglia viaggi e contenuti per categoria.',
  categoriesTripsIn: 'Viaggi in',
  categoriesNoTrips: 'Nessun viaggio disponibile in questa categoria.',
  categoriesBlogsIn: 'Blog in',
  categoriesNoBlogs: 'Nessun blog disponibile in questa categoria.',
  categoriesOverview: 'Panoramica',
  categoriesHighlights: 'Punti salienti',
  categoriesThingsToDo: 'Cosa fare',
  categoriesTravelTips: 'Consigli di viaggio',
  destinationsTitle: 'Destinazioni',
  destinationsSubtitle: 'Esplora paesi, città, punti salienti e guide alle destinazioni.',
  destinationsOverview: 'Panoramica',
  destinationsHighlights: 'Punti salienti',
  destinationsThingsToDo: 'Cosa fare',
  destinationsTravelTips: 'Consigli di viaggio',
  destinationsWeather: 'Meteo',
  destinationsGallery: 'Galleria',
  destinationsTripsIn: 'Viaggi a',
  destinationsLatitude: 'Latitudine',
  destinationsLongitude: 'Longitudine',
  travelTypesTitle: 'Tipi di viaggio',
  travelTypesSubtitle: 'Trova il tuo stile di viaggio perfetto.',
  travelTypesOverview: 'Panoramica',
  travelTypesHighlights: 'Punti salienti',
  travelTypesThingsToDo: 'Cosa fare',
  travelTypesTravelTips: 'Consigli di viaggio',
  travelTypesGallery: 'Galleria',
  travelTypesTripsIn: 'Viaggi in',
  tripsExplore: 'Esplora i viaggi',
  tripsDiscover: 'Scopri destinazioni incredibili e prenota la tua prossima avventura.',
  tripsFilters: 'Filtri',
  tripsReset: 'Reimposta',
  tripsPriceRange: 'Fascia di prezzo',
  tripsDurationFilter: 'Durata (giorni)',
  tripsDestinationsFilter: 'Destinazioni',
  tripsTravelTypesFilter: 'Tipi di viaggio',
  tripsCategoriesFilter: 'Categorie',
  tripsFeaturedOnly: 'Solo in evidenza',
  tripsShowing: 'Visualizzazione di',
  tripsOf: 'su',
  tripsNoTrips: 'Nessun viaggio trovato',
  tripsAdjustFilters: 'Prova a modificare i filtri',
  tripsResetFilters: 'Reimposta filtri',
  tripsDays: 'giorni',
  tripsFrom: 'Da',
  tripsBookThis: 'Prenota questo viaggio',
  tripsBookNow: 'Tailor-Made',
  tripsViewDetails: 'Vedi dettagli',
  tripsEnquire: 'Informazioni',
  tripsStartingFrom: 'A partire da',
  tripsPerPerson: 'per persona',
  tripsHighlights: 'Punti salienti',
  tripsTripInfo: 'Info viaggio',
  tripsDuration: 'Durata',
  tripsGroupSize: 'Dimensione del gruppo',
  tripsDifficulty: 'Difficoltà',
  tripTabOverview: 'Panoramica',
  tripTabItinerary: 'Itinerario',
  tripTabIncludes: 'Incluso ed escluso',
  tripTabPolicies: 'Politiche',
  tripWhatsIncluded: 'Cosa è incluso',
  tripWhatsExcluded: 'Cosa è escluso',
  tripCardDays: 'giorni',
  tripCardBook: 'Prenota',
  contactBadge: 'Contatto',
  contactTitle: 'Pianifica il tuo prossimo viaggio',
  contactSubtitle: 'Invia una richiesta e il nostro team ti contatterà.',
  contactFullName: 'Nome completo',
  contactEmail: 'E-mail',
  contactPhone: 'Telefono',
  contactSubject: 'Oggetto',
  contactMessage: 'Messaggio',
  contactSend: 'Invia messaggio',
  contactSending: 'Invio in corso…',
  contactSuccess: 'Il tuo messaggio è stato inviato.',
  contactError: 'Impossibile inviare il messaggio.',
  bookingLeadName: 'Nome principale',
  bookingEmail: 'E-mail',
  bookingPhone: 'Telefono',
  bookingTravelDate: 'Data di viaggio',
  bookingTravellers: 'Viaggiatori',
  bookingSpecialRequests: 'Richieste speciali',
  bookingSubmit: 'Invia richiesta di prenotazione',
  bookingSubmitting: 'Invio in corso…',
  bookingSuccess: 'Richiesta di prenotazione ricevuta.',
  bookingError: 'Impossibile creare la prenotazione.',
  emailDeliveryWarning: 'Salvato con successo, ma al momento non è stato possibile inviare la notifica e-mail.',
  newsletterPlaceholder: 'Indirizzo e-mail',
  newsletterNamePlaceholder: 'Inserisci il tuo nome',
  newsletterJoin: 'Iscriviti',
  newsletterSubmit: 'Invia',
  newsletterJoining: 'Iscrizione…',
  newsletterSuccess: 'Grazie per l\'iscrizione.',
  newsletterSectionTitle: 'Iscriviti alla newsletter',
  newsletterSectionText: 'Ricevi idee sulle destinazioni, promozioni di viaggio e consigli di pianificazione direttamente nella tua casella di posta.',
  heroBadge: 'Viaggi & Tour',
  heroTitle: 'Pianifica bellissimi viaggi',
  heroSubtitle: 'Crea, gestisci e pubblica contenuti di viaggio da un CMS moderno.',
  heroCta: 'Esplora i viaggi',
  heroCtaDefault: 'Esplora ora',
  commonClose: 'Chiudi',
  contentNoContent: 'Nessun contenuto disponibile per questa sezione al momento.',
  rangeFrom: 'Da',
  rangeTo: 'A',
  carouselGoToSlide: 'Vai alla slide',
  carouselPreviousSlide: 'Slide precedente',
  carouselNextSlide: 'Slide successiva',
  tailorMadeTitle: 'Prenotazione viaggio su misura',
  tailorMadeSubtitle: 'Condividi la tua idea di viaggio e il nostro team personalizzerà itinerario, alloggi e ritmo per il tuo gruppo.',
  tailorMadeNoTrips: 'Nessun viaggio attivo disponibile in questo momento.',
  tailorMadeNoTripsError: 'Nessun viaggio disponibile in questo momento. Contattaci direttamente.',
  tailorMadeNoDestinations: 'Nessuna destinazione disponibile in questo momento.',
  tailorMadePreferredDestination: 'Destinazione preferita',
  tailorMadeSelectDestination: 'Seleziona destinazione',
  tailorMadePreferredDuration: 'Durata preferita (giorni)',
  tailorMadeBudgetRange: 'Fascia di budget',
  tailorMadeAccommodationStyle: 'Stile di alloggio',
  tailorMadeAccommodationChoose: 'Scegli',
  tailorMadeAccommodationBudget: 'Economico',
  tailorMadeAccommodationComfort: 'Comfort',
  tailorMadeAccommodationLuxury: 'Lusso',
  tailorMadeAccommodationMixed: 'Misto',
  tailorMadeActivities: 'Attività preferite',
  tailorMadeActivitiesPlaceholder: 'Trekking, cultura, fauna, fotografia, cibo',
  tailorMadeNotesPlaceholder: 'Condividi ritmo, esigenze di accessibilità, dettagli del gruppo ed esperienze imperdibili.',
  tailorMadeRequestButton: 'Richiedi piano su misura',
  navDestinations: 'Destinazioni',
  navTripsTours: 'Viaggi e Tour',
  navTravelStyle: 'Stile di viaggio',
  navCategories: 'Categorie',
  navBlog: 'Blog',
  navContact: 'Contatto',
  navBookNow: 'Tailor-Made',
  navToggleNavigation: 'Attiva/disattiva navigazione',
  megaPopularDestinations: 'Destinazioni popolari',
  megaMoreDestinations: 'Altre destinazioni',
  megaQuickLinks: 'Link rapidi',
  megaAllDestinations: 'Tutte le destinazioni',
  megaBrowseToursLink: 'Sfoglia i tour',
  megaDestinations: 'Destinazioni',
  megaTripCategories: 'Categorie di viaggio',
  megaTravelStyles: 'Stili di viaggio',
  megaBrowseTours: 'Sfoglia i tour',
  megaAllTours: 'Tutti i tour',
  megaSevenDayTours: 'Tour di 7 giorni',
  megaFourteenDayTours: 'Tour di 14 giorni',
  megaFeaturedTours: 'Tour in evidenza',
  megaBookATrip: 'Prenota un viaggio',
  megaTravelTypes: 'Tipi di viaggio',
  megaTravelCategories: 'Categorie di viaggio',
  megaExplore: 'Esplora',
  megaAllTravelTypes: 'Tutti i tipi di viaggio',
  megaAllTravelCategories: 'Tutte le categorie di viaggio',
  megaAllTripsTours: 'Tutti i viaggi e tour',
  megaArticles: 'Articoli',
  megaAllBlogPosts: 'Tutti gli articoli del blog',
  megaTravelGuides: 'Guide di viaggio',
  megaTravelTips: 'Consigli di viaggio',
  megaDestinationReviews: 'Recensioni delle destinazioni',
  megaTopics: 'Argomenti',
  megaAdventure: 'Avventura',
  megaCulture: 'Cultura',
  megaPhotography: 'Fotografia',
  megaFoodDining: 'Cibo e ristorazione',
  megaFindPerfectJourney: 'Trova il tuo viaggio perfetto',
  megaExploreAll: 'Esplora tutto',
  errorTitle: 'Qualcosa è andato storto',
  errorRetry: 'Riprova',
  notFoundTitle: 'Pagina non trovata',
  notFoundMessage: 'La pagina richiesta non esiste.',
  notFoundHome: 'Torna alla home',
};

const map: Record<string, UiStrings> = {
  'en-US': en,
  'fr-FR': fr,
  'es-ES': es,
  'nl-NL': nl,
  'it-IT': it,
};

/** Returns translated UI strings for the given language, falling back to English. */
export function getStrings(lang: string): UiStrings {
  return map[lang] ?? en;
}
