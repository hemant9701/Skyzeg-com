export interface UiStrings {
  // ── Home ──────────────────────────────────────────
  homeTrustStats: { label: string; value: string }[];
  homeProcessSteps: { title: string; body: string }[];
  homeWhyCards: { title: string; body: string }[];
  homeAboutBadge: string;
  homeAboutTitle: string;
  homeAboutBody: string;
  homeAboutImageAlt: string;
  homeSignatureLabel: string;
  homeSignatureText: string;
  homeTravelTypesBadge: string;
  homeHowItWorksBadge: string;
  homeHowItWorksTitle: string;
  homeWorkflowRunning: string;
  homeWorkflowStep: string;
  homeWorkflowOf: string;
  homeTailorMadePlanningBadge: string;
  homeTailorMadePlanningTitle: string;
  homeTailorMadePlanningBody: string;
  homeTailorMadeFeaturePersonalized: string;
  homeTailorMadeFeatureFlexible: string;
  homeTailorMadeCta: string;
  homeTailorMadeProcessTitle: string;
  homeTailorMadeProcessBody: string;
  homeTailorMadeResponseBadge: string;
  homeTailorMadeResponseTime: string;
  homeTailorMadeResponseBody: string;
  homeFeaturedBadge: string;
  homeFeaturedTitle: string;
  homeDestinationsTitle: string;
  homeDestinationsTopTen: string;
  homeFeaturedSubtitle: string;
  homeFeaturedCta: string;
  homePopularBadge: string;
  homePopularTitle: string;
  homePopularSubtitle: string;
  homePopularCta: string;
  homeWhyBadge: string;
  homeWhyDefaultTitle: string;
  homeWhyDefaultBody: string;
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
  destinationsMap: string;
  destinationsViewMap: string;
  destinationsLatitude: string;
  destinationsLongitude: string;
  destinationCardFeatured: string;
  destinationCardExplore: string;
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
  tripCardFeatured: string;
  tripsGridView: string;
  tripsListView: string;
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
  thankYouTitle: string;
  thankYouReference: string;
  thankYouBackHome: string;
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
  homeAboutTitle: 'Crafting journeys that feel personal, seamless, and unforgettable.',
  homeAboutBody: 'We design meaningful travel experiences across iconic and offbeat destinations. Every itinerary balances discovery, comfort, and local insight so your trip feels effortless from planning to return.',
  homeAboutImageAlt: 'Travelers exploring a scenic destination',
  homeSignatureLabel: 'TravelNext Signature',
  homeSignatureText: 'Handcrafted itineraries with thoughtful details.',
  homeTravelTypesBadge: 'Travel styles',
  homeHowItWorksBadge: 'How It Works',
  homeHowItWorksTitle: 'Your Journey, Planned in Three Clear Steps',
  homeWorkflowRunning: 'Planning your journey',
  homeWorkflowStep: 'Step',
  homeWorkflowOf: 'of',
  homeTailorMadePlanningBadge: 'Tailor-Made Planning',
  homeTailorMadePlanningTitle: 'Ready to design your next unforgettable journey?',
  homeTailorMadePlanningBody: 'From honeymoon escapes to multi-country adventures, our travel specialists shape a personalized itinerary around your pace, budget, and dream destinations.',
  homeTailorMadeFeaturePersonalized: 'Personalized itineraries',
  homeTailorMadeFeatureFlexible: 'Flexible route planning',
  homeTailorMadeCta: 'Start your tailor-made plan',
  homeTailorMadeProcessTitle: 'Travel design in 3 simple steps',
  homeTailorMadeProcessBody: 'Tell us your style, we build the plan, and you travel with confidence.',
  homeTailorMadeResponseBadge: 'Fast response',
  homeTailorMadeResponseTime: 'Within 24 hours',
  homeTailorMadeResponseBody: 'Our team replies with ideas, recommendations, and next steps tailored to you.',
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
  homeDestinationsTitle: 'Discover our most beautiful destinations',
  homeDestinationsTopTen: 'Top 10',
  homeFeaturedSubtitle: 'Discover curated destinations with local insight, travel tips and rich galleries.',
  homeFeaturedCta: 'View all destinations',
  homePopularBadge: 'Popular',
  homePopularTitle: 'Popular Trips',
  homePopularSubtitle: 'Bookable travel packages with prices, itinerary, policies and availability.',
  homePopularCta: 'View all trips',
  homeWhyBadge: 'Why Choose Us',
  homeWhyDefaultTitle: 'Travel designed around you',
  homeWhyDefaultBody: 'Our team brings every detail together, from planning and media to bookings, so your travel experience feels seamless.',
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
  destinationsMap: 'Map',
  destinationsViewMap: 'View larger map',
  destinationsLatitude: 'Latitude',
  destinationsLongitude: 'Longitude',
  destinationCardFeatured: 'Featured',
  destinationCardExplore: 'Explore',
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
  tripsBookNow: 'Book Trip',
  tripsViewDetails: 'View Details',
  tripsEnquire: 'Tailor Made',
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
  tripCardBook: 'Explore Trip',
  tripCardFeatured: 'Featured',
  tripsGridView: 'Grid view',
  tripsListView: 'List view',
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
  thankYouTitle: 'Thank you',
  thankYouReference: 'Reference',
  thankYouBackHome: 'Return to home',
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
  homeAboutTitle: 'Des voyages personnalisés, sans effort et inoubliables.',
  homeAboutBody: 'Nous imaginons des expériences de voyage riches de sens, entre destinations emblématiques et lieux hors des sentiers battus. Chaque itinéraire allie découverte, confort et expertise locale pour un voyage serein, de la préparation au retour.',
  homeAboutImageAlt: 'Des voyageurs découvrent une destination pittoresque',
  homeSignatureLabel: 'La signature TravelNext',
  homeSignatureText: 'Des itinéraires conçus avec soin et le souci du détail.',
  homeTravelTypesBadge: 'Styles de voyage',
  homeHowItWorksBadge: 'Comment ça marche',
  homeHowItWorksTitle: 'Votre voyage, planifié en trois étapes claires',
  homeWorkflowRunning: 'Planification de votre voyage',
  homeWorkflowStep: 'Étape',
  homeWorkflowOf: 'sur',
  homeTailorMadePlanningBadge: 'Planification sur mesure',
  homeTailorMadePlanningTitle: 'Prêt à concevoir votre prochain voyage inoubliable ?',
  homeTailorMadePlanningBody: 'Des escapades de lune de miel aux aventures dans plusieurs pays, nos spécialistes créent un itinéraire personnalisé selon votre rythme, votre budget et vos destinations de rêve.',
  homeTailorMadeFeaturePersonalized: 'Itinéraires personnalisés',
  homeTailorMadeFeatureFlexible: 'Planification flexible des itinéraires',
  homeTailorMadeCta: 'Créer mon voyage sur mesure',
  homeTailorMadeProcessTitle: 'Votre voyage en 3 étapes simples',
  homeTailorMadeProcessBody: 'Vous nous parlez de vos envies, nous préparons votre voyage et vous partez en toute confiance.',
  homeTailorMadeResponseBadge: 'Réponse rapide',
  homeTailorMadeResponseTime: 'Sous 24 heures',
  homeTailorMadeResponseBody: 'Notre équipe vous répond avec des idées, des conseils et les prochaines étapes adaptées à vos envies.',
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
  homeDestinationsTitle: 'D?couvrez nos plus belles destinations',
  homeDestinationsTopTen: 'Top 10',
  homeFeaturedSubtitle: 'Découvrez des destinations sélectionnées avec des conseils locaux et des galeries enrichies.',
  homeFeaturedCta: 'Voir toutes les destinations',
  homePopularBadge: 'Populaires',
  homePopularTitle: 'Voyages populaires',
  homePopularSubtitle: 'Packages de voyage réservables avec prix, itinéraires et disponibilités.',
  homePopularCta: 'Voir tous les voyages',
  homeWhyBadge: 'Pourquoi nous choisir',
  homeWhyDefaultTitle: 'Un voyage pensé pour vous',
  homeWhyDefaultBody: 'Notre équipe coordonne chaque détail, de la planification aux réservations, pour vous offrir une expérience de voyage fluide.',
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
  destinationsMap: 'Carte',
  destinationsViewMap: 'Voir la carte en grand',
  destinationsLatitude: 'Latitude',
  destinationsLongitude: 'Longitude',
  destinationCardFeatured: 'À la une',
  destinationCardExplore: 'Explorer la',
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
  tripsBookNow: 'Réserver le voyage',
  tripsViewDetails: 'Voir les détails',
  tripsEnquire: 'Voyage sur mesure',
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
  tripCardBook: 'Découvrir le voyage',
  tripCardFeatured: 'À la une',
  tripsGridView: 'Vue en grille',
  tripsListView: 'Vue en liste',
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
  thankYouTitle: 'Merci',
  thankYouReference: 'Référence',
  thankYouBackHome: 'Retour à l’accueil',
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
  homeAboutTitle: 'Creamos viajes personales, cómodos e inolvidables.',
  homeAboutBody: 'Diseñamos experiencias de viaje con sentido, tanto a destinos emblemáticos como a lugares menos conocidos. Cada itinerario combina descubrimiento, comodidad y conocimiento local para que disfrute de un viaje sin complicaciones desde la planificación hasta el regreso.',
  homeAboutImageAlt: 'Viajeros explorando un destino pintoresco',
  homeSignatureLabel: 'La esencia de TravelNext',
  homeSignatureText: 'Itinerarios diseñados a mano con detalles bien pensados.',
  homeTravelTypesBadge: 'Estilos de viaje',
  homeHowItWorksBadge: 'Cómo funciona',
  homeHowItWorksTitle: 'Su viaje, planificado en tres pasos claros',
  homeWorkflowRunning: 'Planificando su viaje',
  homeWorkflowStep: 'Paso',
  homeWorkflowOf: 'de',
  homeTailorMadePlanningBadge: 'Planificación a medida',
  homeTailorMadePlanningTitle: '¿Listo para diseñar su próximo viaje inolvidable?',
  homeTailorMadePlanningBody: 'Desde escapadas de luna de miel hasta aventuras por varios países, nuestros especialistas crean un itinerario personalizado según su ritmo, presupuesto y destinos soñados.',
  homeTailorMadeFeaturePersonalized: 'Itinerarios personalizados',
  homeTailorMadeFeatureFlexible: 'Planificación flexible de rutas',
  homeTailorMadeCta: 'Empiece su viaje a medida',
  homeTailorMadeProcessTitle: 'Diseñe su viaje en 3 sencillos pasos',
  homeTailorMadeProcessBody: 'Cuéntenos qué le gusta, preparamos el plan y usted viaja con confianza.',
  homeTailorMadeResponseBadge: 'Respuesta rápida',
  homeTailorMadeResponseTime: 'En menos de 24 horas',
  homeTailorMadeResponseBody: 'Nuestro equipo le responde con ideas, recomendaciones y próximos pasos adaptados a usted.',
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
  homeDestinationsTitle: 'Descubre nuestros destinos m?s hermosos',
  homeDestinationsTopTen: 'Top 10',
  homeFeaturedSubtitle: 'Descubra destinos seleccionados con consejos locales y galerías enriquecidas.',
  homeFeaturedCta: 'Ver todos los destinos',
  homePopularBadge: 'Popular',
  homePopularTitle: 'Viajes populares',
  homePopularSubtitle: 'Paquetes de viaje reservables con precios, itinerarios y disponibilidad.',
  homePopularCta: 'Ver todos los viajes',
  homeWhyBadge: 'Por qué elegirnos',
  homeWhyDefaultTitle: 'Viajes diseñados para usted',
  homeWhyDefaultBody: 'Nuestro equipo coordina cada detalle, desde la planificación hasta las reservas, para que su experiencia de viaje sea cómoda y fluida.',
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
  destinationsMap: 'Mapa',
  destinationsViewMap: 'Ver mapa ampliado',
  destinationsLatitude: 'Latitud',
  destinationsLongitude: 'Longitud',
  destinationCardFeatured: 'Destacado',
  destinationCardExplore: 'Explorar',
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
  tripsBookNow: 'Reservar viaje',
  tripsViewDetails: 'Ver detalles',
  tripsEnquire: 'Viaje a medida',
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
  tripCardBook: 'Explorar viaje',
  tripCardFeatured: 'Destacado',
  tripsGridView: 'Vista de cuadrícula',
  tripsListView: 'Vista de lista',
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
  thankYouTitle: 'Gracias',
  thankYouReference: 'Referencia',
  thankYouBackHome: 'Volver al inicio',
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
  homeAboutTitle: 'We creëren persoonlijke, zorgeloze en onvergetelijke reizen.',
  homeAboutBody: 'We ontwerpen betekenisvolle reiservaringen naar bekende bestemmingen en plekken buiten de gebaande paden. Elke reis combineert ontdekking, comfort en lokale kennis, zodat uw reis van planning tot thuiskomst soepel verloopt.',
  homeAboutImageAlt: 'Reizigers ontdekken een schilderachtige bestemming',
  homeSignatureLabel: 'TravelNext Signature',
  homeSignatureText: 'Met zorg samengestelde reizen vol doordachte details.',
  homeTravelTypesBadge: 'Reisstijlen',
  homeHowItWorksBadge: 'Hoe het werkt',
  homeHowItWorksTitle: 'Uw reis, gepland in drie duidelijke stappen',
  homeWorkflowRunning: 'Uw reis wordt gepland',
  homeWorkflowStep: 'Stap',
  homeWorkflowOf: 'van',
  homeTailorMadePlanningBadge: 'Reisplanning op maat',
  homeTailorMadePlanningTitle: 'Klaar om uw volgende onvergetelijke reis te ontwerpen?',
  homeTailorMadePlanningBody: 'Van huwelijksreizen tot avonturen door meerdere landen: onze reisspecialisten stellen een persoonlijk reisplan samen dat past bij uw tempo, budget en droombestemmingen.',
  homeTailorMadeFeaturePersonalized: 'Persoonlijke reisplannen',
  homeTailorMadeFeatureFlexible: 'Flexibele routeplanning',
  homeTailorMadeCta: 'Start uw reis op maat',
  homeTailorMadeProcessTitle: 'Uw reis in 3 eenvoudige stappen',
  homeTailorMadeProcessBody: 'Vertel ons wat u zoekt, wij maken het plan en u reist met vertrouwen.',
  homeTailorMadeResponseBadge: 'Snelle reactie',
  homeTailorMadeResponseTime: 'Binnen 24 uur',
  homeTailorMadeResponseBody: 'Ons team reageert met ideeën, aanbevelingen en vervolgstappen die bij u passen.',
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
  homeDestinationsTitle: 'Ontdek onze mooiste bestemmingen',
  homeDestinationsTopTen: 'Top 10',
  homeFeaturedSubtitle: 'Ontdek zorgvuldig geselecteerde bestemmingen met lokale tips en rijke galerijen.',
  homeFeaturedCta: 'Alle bestemmingen bekijken',
  homePopularBadge: 'Populair',
  homePopularTitle: 'Populaire reizen',
  homePopularSubtitle: 'Boekbare reispakketten met prijzen, reisschema\'s en beschikbaarheid.',
  homePopularCta: 'Alle reizen bekijken',
  homeWhyBadge: 'Waarom ons kiezen',
  homeWhyDefaultTitle: 'Reizen op uw wensen afgestemd',
  homeWhyDefaultBody: 'Ons team brengt alles samen, van planning tot boekingen, zodat uw reiservaring soepel verloopt.',
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
  destinationsMap: 'Kaart',
  destinationsViewMap: 'Grotere kaart bekijken',
  destinationsLatitude: 'Breedtegraad',
  destinationsLongitude: 'Lengtegraad',
  destinationCardFeatured: 'Uitgelicht',
  destinationCardExplore: 'Bestemming',
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
  tripsBookNow: 'Reis boeken',
  tripsViewDetails: 'Details bekijken',
  tripsEnquire: 'Reis op maat',
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
  tripCardBook: 'Reis ontdekken',
  tripCardFeatured: 'Uitgelicht',
  tripsGridView: 'Rasterweergave',
  tripsListView: 'Lijstweergave',
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
  thankYouTitle: 'Bedankt',
  thankYouReference: 'Referentie',
  thankYouBackHome: 'Terug naar home',
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
  homeAboutTitle: 'Creiamo viaggi personali, senza pensieri e indimenticabili.',
  homeAboutBody: 'Progettiamo esperienze di viaggio significative, tra destinazioni iconiche e luoghi fuori dai percorsi più battuti. Ogni itinerario unisce scoperta, comfort e conoscenza locale, per un viaggio semplice dalla pianificazione al rientro.',
  homeAboutImageAlt: 'Viaggiatori alla scoperta di una destinazione suggestiva',
  homeSignatureLabel: 'La firma TravelNext',
  homeSignatureText: 'Itinerari curati a mano, con attenzione a ogni dettaglio.',
  homeTravelTypesBadge: 'Stili di viaggio',
  homeHowItWorksBadge: 'Come funziona',
  homeHowItWorksTitle: 'Il tuo viaggio, pianificato in tre chiari passi',
  homeWorkflowRunning: 'Pianificazione del viaggio',
  homeWorkflowStep: 'Passaggio',
  homeWorkflowOf: 'di',
  homeTailorMadePlanningBadge: 'Pianificazione su misura',
  homeTailorMadePlanningTitle: 'Pronto a progettare il tuo prossimo viaggio indimenticabile?',
  homeTailorMadePlanningBody: 'Dalle lune di miele alle avventure in più paesi, i nostri specialisti creano un itinerario personalizzato secondo i tuoi ritmi, il tuo budget e le destinazioni dei tuoi sogni.',
  homeTailorMadeFeaturePersonalized: 'Itinerari personalizzati',
  homeTailorMadeFeatureFlexible: 'Pianificazione flessibile degli itinerari',
  homeTailorMadeCta: 'Inizia il tuo viaggio su misura',
  homeTailorMadeProcessTitle: 'Progetta il viaggio in 3 semplici passi',
  homeTailorMadeProcessBody: 'Raccontaci le tue preferenze, prepariamo il piano e viaggi in tutta sicurezza.',
  homeTailorMadeResponseBadge: 'Risposta rapida',
  homeTailorMadeResponseTime: 'Entro 24 ore',
  homeTailorMadeResponseBody: 'Il nostro team ti risponde con idee, consigli e prossimi passi pensati per te.',
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
  homeDestinationsTitle: 'Scopri le nostre destinazioni pi? belle',
  homeDestinationsTopTen: 'Top 10',
  homeFeaturedSubtitle: 'Scopri destinazioni curate con consigli locali, suggerimenti di viaggio e gallerie ricche.',
  homeFeaturedCta: 'Vedi tutte le destinazioni',
  homePopularBadge: 'Popolare',
  homePopularTitle: 'Viaggi popolari',
  homePopularSubtitle: 'Pacchetti viaggio prenotabili con prezzi, itinerari e disponibilità.',
  homePopularCta: 'Vedi tutti i viaggi',
  homeWhyBadge: 'Perché sceglierci',
  homeWhyDefaultTitle: 'Viaggi progettati intorno a te',
  homeWhyDefaultBody: 'Il nostro team coordina ogni dettaglio, dalla pianificazione alle prenotazioni, per offrirti un’esperienza di viaggio senza pensieri.',
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
  destinationsMap: 'Mappa',
  destinationsViewMap: 'Visualizza mappa pi? grande',
  destinationsLatitude: 'Latitudine',
  destinationsLongitude: 'Longitudine',
  destinationCardFeatured: 'In evidenza',
  destinationCardExplore: 'Esplora la',
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
  tripsBookNow: 'Prenota il viaggio',
  tripsViewDetails: 'Vedi dettagli',
  tripsEnquire: 'Viaggio su misura',
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
  tripCardBook: 'Esplora il viaggio',
  tripCardFeatured: 'In evidenza',
  tripsGridView: 'Vista a griglia',
  tripsListView: 'Vista elenco',
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
  thankYouTitle: 'Grazie',
  thankYouReference: 'Riferimento',
  thankYouBackHome: 'Torna alla home',
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

const de: UiStrings = {
  homeAboutBadge: 'Über uns',
  homeAboutTitle: 'Wir gestalten persönliche, entspannte und unvergessliche Reisen.',
  homeAboutBody: 'Wir gestalten besondere Reiseerlebnisse an bekannten Orten und abseits ausgetretener Pfade. Jede Reiseroute verbindet Entdeckungen, Komfort und lokales Wissen, damit Ihre Reise von der Planung bis zur Rückkehr entspannt verläuft.',
  homeAboutImageAlt: 'Reisende erkunden ein malerisches Reiseziel',
  homeSignatureLabel: 'TravelNext Signature',
  homeSignatureText: 'Individuell gestaltete Reiserouten mit durchdachten Details.',
  homeTravelTypesBadge: 'Reisestile',
  homeHowItWorksBadge: 'So funktioniert es',
  homeHowItWorksTitle: 'Ihre Reise, geplant in drei klaren Schritten',
  homeWorkflowRunning: 'Ihre Reise wird geplant',
  homeWorkflowStep: 'Schritt',
  homeWorkflowOf: 'von',
  homeTailorMadePlanningBadge: 'Individuelle Reiseplanung',
  homeTailorMadePlanningTitle: 'Bereit, Ihre nächste unvergessliche Reise zu gestalten?',
  homeTailorMadePlanningBody: 'Von Flitterwochen bis zu Abenteuern in mehreren Ländern gestalten unsere Reiseexperten eine individuelle Route nach Ihrem Tempo, Budget und Ihren Wunschzielen.',
  homeTailorMadeFeaturePersonalized: 'Individuelle Reiserouten',
  homeTailorMadeFeatureFlexible: 'Flexible Routenplanung',
  homeTailorMadeCta: 'Individuelle Reise planen',
  homeTailorMadeProcessTitle: 'Reiseplanung in 3 einfachen Schritten',
  homeTailorMadeProcessBody: 'Sie teilen uns Ihre Wünsche mit, wir erstellen den Plan und Sie reisen entspannt.',
  homeTailorMadeResponseBadge: 'Schnelle Antwort',
  homeTailorMadeResponseTime: 'Innerhalb von 24 Stunden',
  homeTailorMadeResponseBody: 'Unser Team antwortet mit passenden Ideen, Empfehlungen und nächsten Schritten.',
  homeTrustStats: [
    { label: 'Ausgewählte Routen', value: '250+' },
    { label: 'Zufriedene Reisende', value: '12K+' },
    { label: 'Lokale Partner', value: '80+' },
    { label: 'Erreichbarkeit', value: '24/7' },
  ],
  homeProcessSteps: [
    { title: 'Teilen Sie uns Ihren Reisestil mit', body: 'Nennen Sie uns Ihr Tempo, Budget und Ihre Wunschziele. Wir hören zu und planen nach Ihren Vorstellungen.' },
    { title: 'Erhalten Sie einen individuellen Reiseplan', body: 'Unsere Reiseexperten erstellen eine persönliche Route mit Unterkünften, Aktivitäten und saisonalen Empfehlungen.' },
    { title: 'Reisen Sie entspannt', body: 'Von den Vorbereitungen bis zur Unterstützung vor Ort begleitet Sie unser Team auf Ihrer gesamten Reise.' },
  ],
  homeWhyCards: [
    { title: 'Experten für Ihr Reiseziel', body: 'Lokale Spezialisten planen Routen mit authentischen Unterkünften, Geheimtipps und einem angenehmen Tempo.' },
    { title: 'Transparente Preise', body: 'Klare Leistungen und flexible Optionen helfen Ihnen, das passende Erlebnis für Ihr Budget zu wählen.' },
    { title: 'Sicher und zuverlässig', body: 'Geprüfte Partner, Qualitätskontrollen und verlässliche Unterstützung in jeder Phase Ihrer Reise.' },
    { title: 'Persönlicher Service', body: 'Jede Route wird individuell gestaltet, ob Abenteuer, Kultur, Wellness oder Familienreise.' },
  ],
  homeFeaturedBadge: 'Empfohlen',
  homeFeaturedTitle: 'Empfohlene Reiseziele',
  homeDestinationsTitle: 'Entdecken Sie unsere schönsten Reiseziele',
  homeDestinationsTopTen: 'Top 10',
  homeFeaturedSubtitle: 'Entdecken Sie ausgewählte Reiseziele mit lokalem Wissen, Reisetipps und vielfältigen Bildergalerien.',
  homeFeaturedCta: 'Alle Reiseziele ansehen',
  homePopularBadge: 'Beliebt',
  homePopularTitle: 'Beliebte Reisen',
  homePopularSubtitle: 'Buchbare Reisepakete mit Preisen, Reiseverlauf, Bedingungen und Verfügbarkeit.',
  homePopularCta: 'Alle Reisen ansehen',
  homeWhyBadge: 'Warum wir',
  homeWhyDefaultTitle: 'Reisen nach Ihren Wünschen',
  homeWhyDefaultBody: 'Unser Team koordiniert jedes Detail, von der Planung und den Medien bis zur Buchung, damit Ihre Reise reibungslos verläuft.',
  homeWhyFeatures: ['Mehrsprachiges CMS', 'Medienbibliothek', 'SEO optimiert', 'Buchungsablauf'],
  homeBlogsBadge: 'Geschichten',
  homeBlogsTitle: 'Neueste Blogbeiträge',
  homeReviewsBadge: 'Kundenstimmen',
  homeReviewsTitle: 'Bewertungen unserer Reisenden',
  blogsTitle: 'Reiseblog',
  blogsSubtitle: 'Ideen, Geschichten, Reiseführer und Inspiration für Ihre Reiseziele.',
  blogsMinRead: 'Min. Lesezeit',
  categoriesTitle: 'Kategorien',
  categoriesSubtitle: 'Entdecken Sie Reisen und Reiseinhalte nach Kategorie.',
  categoriesTripsIn: 'Reisen in',
  categoriesNoTrips: 'In dieser Kategorie sind noch keine Reisen verfügbar.',
  categoriesBlogsIn: 'Blogbeiträge in',
  categoriesNoBlogs: 'In dieser Kategorie sind noch keine Blogbeiträge verfügbar.',
  categoriesOverview: 'Übersicht',
  categoriesHighlights: 'Höhepunkte',
  categoriesThingsToDo: 'Aktivitäten',
  categoriesTravelTips: 'Reisetipps',
  destinationsTitle: 'Reiseziele',
  destinationsSubtitle: 'Entdecken Sie Länder, Städte, Höhepunkte, Karten und Reiseführer.',
  destinationsOverview: 'Übersicht',
  destinationsHighlights: 'Höhepunkte',
  destinationsThingsToDo: 'Aktivitäten',
  destinationsTravelTips: 'Reisetipps',
  destinationsWeather: 'Wetter',
  destinationsGallery: 'Bildergalerie',
  destinationsTripsIn: 'Reisen in',
  destinationsMap: 'Karte',
  destinationsViewMap: 'Größere Karte anzeigen',
  destinationsLatitude: 'Breitengrad',
  destinationsLongitude: 'Längengrad',
  destinationCardFeatured: 'Empfohlen',
  destinationCardExplore: 'Entdecken',
  travelTypesTitle: 'Reisearten',
  travelTypesSubtitle: 'Finden Sie Ihren perfekten Reisestil.',
  travelTypesOverview: 'Übersicht',
  travelTypesHighlights: 'Höhepunkte',
  travelTypesThingsToDo: 'Aktivitäten',
  travelTypesTravelTips: 'Reisetipps',
  travelTypesGallery: 'Bildergalerie',
  travelTypesTripsIn: 'Reisen in',
  tripsExplore: 'Reisen entdecken',
  tripsDiscover: 'Entdecken Sie faszinierende Reiseziele und buchen Sie Ihr nächstes Abenteuer.',
  tripsFilters: 'Filter',
  tripsReset: 'Zurücksetzen',
  tripsPriceRange: 'Preisspanne',
  tripsDurationFilter: 'Dauer (Tage)',
  tripsDestinationsFilter: 'Reiseziele',
  tripsTravelTypesFilter: 'Reisearten',
  tripsCategoriesFilter: 'Kategorien',
  tripsFeaturedOnly: 'Nur empfohlene Reisen',
  tripsShowing: 'Angezeigt',
  tripsOf: 'von',
  tripsNoTrips: 'Keine Reisen gefunden',
  tripsAdjustFilters: 'Versuchen Sie, Ihre Filter anzupassen',
  tripsResetFilters: 'Filter zurücksetzen',
  tripsDays: 'Tage',
  tripsFrom: 'Ab',
  tripsBookThis: 'Diese Reise buchen',
  tripsBookNow: 'Reise buchen',
  tripsViewDetails: 'Details ansehen',
  tripsEnquire: 'Reise nach Maß',
  tripsStartingFrom: 'Ab',
  tripsPerPerson: 'pro Person',
  tripsHighlights: 'Höhepunkte',
  tripsTripInfo: 'Reiseinformationen',
  tripsDuration: 'Dauer',
  tripsGroupSize: 'Gruppengröße',
  tripsDifficulty: 'Schwierigkeitsgrad',
  tripTabOverview: 'Übersicht',
  tripTabItinerary: 'Reiseverlauf',
  tripTabIncludes: 'Enthaltene und ausgeschlossene Leistungen',
  tripTabPolicies: 'Bedingungen',
  tripWhatsIncluded: 'Enthaltene Leistungen',
  tripWhatsExcluded: 'Nicht enthaltene Leistungen',
  tripCardDays: 'Tage',
  tripCardBook: 'Reise entdecken',
  tripCardFeatured: 'Empfohlen',
  tripsGridView: 'Rasteransicht',
  tripsListView: 'Listenansicht',
  contactBadge: 'Kontakt',
  contactTitle: 'Planen Sie Ihre nächste Reise',
  contactSubtitle: 'Senden Sie uns eine Anfrage und unser Team meldet sich bei Ihnen.',
  contactFullName: 'Vollständiger Name',
  contactEmail: 'E-Mail',
  contactPhone: 'Telefon',
  contactSubject: 'Betreff',
  contactMessage: 'Nachricht',
  contactSend: 'Nachricht senden',
  contactSending: 'Wird gesendet…',
  contactSuccess: 'Ihre Nachricht wurde gesendet.',
  contactError: 'Die Nachricht konnte nicht gesendet werden.',
  bookingLeadName: 'Name der buchenden Person',
  bookingEmail: 'E-Mail',
  bookingPhone: 'Telefon',
  bookingTravelDate: 'Reisedatum',
  bookingTravellers: 'Reisende',
  bookingSpecialRequests: 'Besondere Wünsche',
  bookingSubmit: 'Buchungsanfrage senden',
  bookingSubmitting: 'Wird gesendet…',
  bookingSuccess: 'Ihre Buchungsanfrage ist eingegangen.',
  bookingError: 'Die Buchung konnte nicht erstellt werden.',
  emailDeliveryWarning: 'Erfolgreich gespeichert, aber die E-Mail-Benachrichtigung konnte derzeit nicht zugestellt werden.',
  thankYouTitle: 'Vielen Dank',
  thankYouReference: 'Referenz',
  thankYouBackHome: 'Zurück zur Startseite',
  newsletterPlaceholder: 'E-Mail-Adresse',
  newsletterNamePlaceholder: 'Geben Sie Ihren Namen ein',
  newsletterJoin: 'Anmelden',
  newsletterSubmit: 'Absenden',
  newsletterJoining: 'Anmeldung läuft…',
  newsletterSuccess: 'Vielen Dank für Ihre Anmeldung.',
  newsletterSectionTitle: 'Newsletter abonnieren',
  newsletterSectionText: 'Erhalten Sie Ideen für Reiseziele, Reiseangebote und Planungstipps direkt in Ihrem Posteingang.',
  heroBadge: 'Reisen und Touren',
  heroTitle: 'Planen Sie wunderschöne Reisen',
  heroSubtitle: 'Erstellen, verwalten und veröffentlichen Sie Reiseinhalte mit einem modernen CMS.',
  heroCta: 'Reisen entdecken',
  heroCtaDefault: 'Jetzt entdecken',
  commonClose: 'Schließen',
  contentNoContent: 'Für diesen Abschnitt sind noch keine Inhalte verfügbar.',
  rangeFrom: 'Von',
  rangeTo: 'Bis',
  carouselGoToSlide: 'Zur Folie',
  carouselPreviousSlide: 'Vorherige Folie',
  carouselNextSlide: 'Nächste Folie',
  tailorMadeTitle: 'Individuelle Reise buchen',
  tailorMadeSubtitle: 'Teilen Sie uns Ihre Reiseidee mit. Unser Team passt Route, Unterkünfte und Tempo an Ihre Gruppe an.',
  tailorMadeNoTrips: 'Derzeit sind keine aktiven Reisen verfügbar.',
  tailorMadeNoTripsError: 'Derzeit sind keine Reisen verfügbar. Bitte kontaktieren Sie uns direkt.',
  tailorMadeNoDestinations: 'Derzeit sind keine Reiseziele verfügbar.',
  tailorMadePreferredDestination: 'Gewünschtes Reiseziel',
  tailorMadeSelectDestination: 'Reiseziel auswählen',
  tailorMadePreferredDuration: 'Gewünschte Dauer (Tage)',
  tailorMadeBudgetRange: 'Budgetrahmen',
  tailorMadeAccommodationStyle: 'Unterkunftsart',
  tailorMadeAccommodationChoose: 'Auswählen',
  tailorMadeAccommodationBudget: 'Preiswert',
  tailorMadeAccommodationComfort: 'Komfort',
  tailorMadeAccommodationLuxury: 'Luxus',
  tailorMadeAccommodationMixed: 'Gemischt',
  tailorMadeActivities: 'Gewünschte Aktivitäten',
  tailorMadeActivitiesPlaceholder: 'Trekking, Kultur, Tierwelt, Fotografie, Kulinarik',
  tailorMadeNotesPlaceholder: 'Teilen Sie uns Ihr Tempo, Anforderungen an Barrierefreiheit, Gruppendetails und gewünschte Erlebnisse mit.',
  tailorMadeRequestButton: 'Individuellen Reiseplan anfragen',
  navDestinations: 'Reiseziele',
  navTripsTours: 'Reisen und Touren',
  navTravelStyle: 'Reisestil',
  navCategories: 'Kategorien',
  navBlog: 'Blog',
  navContact: 'Kontakt',
  navBookNow: 'Reise nach Maß',
  navToggleNavigation: 'Navigation ein-/ausblenden',
  megaPopularDestinations: 'Beliebte Reiseziele',
  megaMoreDestinations: 'Weitere Reiseziele',
  megaQuickLinks: 'Direktlinks',
  megaAllDestinations: 'Alle Reiseziele',
  megaBrowseToursLink: 'Touren ansehen',
  megaDestinations: 'Reiseziele',
  megaTripCategories: 'Reisekategorien',
  megaTravelStyles: 'Reisestile',
  megaBrowseTours: 'Touren ansehen',
  megaAllTours: 'Alle Touren',
  megaSevenDayTours: '7-tägige Touren',
  megaFourteenDayTours: '14-tägige Touren',
  megaFeaturedTours: 'Empfohlene Touren',
  megaBookATrip: 'Eine Reise buchen',
  megaTravelTypes: 'Reisearten',
  megaTravelCategories: 'Reisekategorien',
  megaExplore: 'Entdecken',
  megaAllTravelTypes: 'Alle Reisearten',
  megaAllTravelCategories: 'Alle Reisekategorien',
  megaAllTripsTours: 'Alle Reisen und Touren',
  megaArticles: 'Artikel',
  megaAllBlogPosts: 'Alle Blogbeiträge',
  megaTravelGuides: 'Reiseführer',
  megaTravelTips: 'Reisetipps',
  megaDestinationReviews: 'Bewertungen von Reisezielen',
  megaTopics: 'Themen',
  megaAdventure: 'Abenteuer',
  megaCulture: 'Kultur',
  megaPhotography: 'Fotografie',
  megaFoodDining: 'Essen und Genuss',
  megaFindPerfectJourney: 'Finden Sie Ihre perfekte Reise',
  megaExploreAll: 'Alles entdecken',
  errorTitle: 'Etwas ist schiefgelaufen',
  errorRetry: 'Erneut versuchen',
  notFoundTitle: 'Seite nicht gefunden',
  notFoundMessage: 'Die angeforderte Seite existiert nicht.',
  notFoundHome: 'Zur Startseite',
};

const map: Record<string, UiStrings> = {
  'en-US': en,
  'fr-FR': fr,
  'es-ES': es,
  'nl-NL': nl,
  'it-IT': it,
  'de-DE': de,
};

/** Returns translated UI strings for the given language, falling back to English. */
export function getStrings(lang: string): UiStrings {
  return map[lang] ?? en;
}
