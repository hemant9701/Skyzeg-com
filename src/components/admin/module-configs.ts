import type { AdminModuleConfig } from './AdminContentManager';

const seoFields = [
  { name: 'metaTitle', label: 'Meta Title', type: 'text' as const },
  { name: 'metaDescription', label: 'Meta Description', type: 'textarea' as const },
  { name: 'canonicalUrl', label: 'Canonical URL', type: 'text' as const }
];

export const pageConfig: AdminModuleConfig = {
  collection: 'pages',
  title: 'Pages',
  description: 'CMS pages with dynamic content blocks, hero images and SEO translations.',
  defaultItem: { slug: '', heroImage: '', sortOrder: 0, isVisible: true, showInNavigation: false, blocks: [] },
  fields: [
    { name: 'slug', label: 'Slug', type: 'text' },
    { name: 'heroImage', label: 'Hero Image', type: 'image', folder: 'pages' },
    { name: 'sortOrder', label: 'Sort Order', type: 'number' },
    { name: 'isVisible', label: 'Published', type: 'checkbox' },
    { name: 'showInNavigation', label: 'Show In Navigation', type: 'checkbox' },
    { name: 'blocks', label: 'Page Builder Blocks', type: 'pageBlocks' }
  ],
  translationFields: [
    { name: 'title', label: 'Title', type: 'text' },
    { name: 'summary', label: 'Summary', type: 'textarea' },
    { name: 'body', label: 'Body Content', type: 'richtext' },
    ...seoFields
  ]
};

export const blogConfig: AdminModuleConfig = {
  collection: 'blogs',
  title: 'Blogs',
  description: 'Blog posts with categories, tags, featured image, author, SEO and rich editor content.',
  defaultItem: { slug: '', categories: [], tags: [], featuredImage: '', author: '', publishDate: new Date().toISOString().slice(0, 10), status: 'published', relatedBlogs: [], commentsEnabled: true },
  fields: [
    { name: 'slug', label: 'Slug', type: 'text' },
    { name: 'featuredImage', label: 'Featured Image', type: 'image', folder: 'blogs' },
    { name: 'author', label: 'Author', type: 'text' },
    { name: 'publishDate', label: 'Publish Date', type: 'date' },
    { name: 'status', label: 'Status', type: 'select', options: [
      { label: 'Published', value: 'published' },
      { label: 'Draft', value: 'draft' },
      { label: 'Archived', value: 'archived' }
    ] },
    { name: 'tags', label: 'Tags', type: 'array' },
    {
      name: 'categories',
      label: 'Categories',
      type: 'multiselect',
      optionSource: {
        collection: 'categories'
      }
    },
    { name: 'relatedBlogs', label: 'Related Blog Slugs', type: 'array', placeholder: 'e.g. travel-tips-for-beginners' },
    { name: 'commentsEnabled', label: 'Comments Enabled', type: 'checkbox' }
  ],
  translationFields: [
    { name: 'title', label: 'Title', type: 'text' },
    { name: 'summary', label: 'Summary', type: 'textarea' },
    { name: 'body', label: 'Body Content', type: 'richtext' },
    ...seoFields
  ]
};

export const destinationConfig: AdminModuleConfig = {
  collection: 'destinations',
  title: 'Destinations',
  description: 'Country/city pages with gallery, highlights, tips, weather, coordinates and SEO.',
  defaultItem: { slug: '', country: '', city: '', heroImage: '', gallery: [], coordinates: {}, mapEmbedUrl: '', sortOrder: 0, isFeatured: false, isVisible: true },
  fields: [
    { name: 'slug', label: 'Slug', type: 'text' },
    { name: 'country', label: 'Country', type: 'text' },
    { name: 'city', label: 'City', type: 'text' },
    { name: 'heroImage', label: 'Hero Image', type: 'image', folder: 'destinations' },
    { name: 'gallery', label: 'Gallery', type: 'gallery', folder: 'destinations' },
    { name: 'coordinates', label: 'Coordinates', type: 'coordinates' },
    { name: 'mapEmbedUrl', label: 'Map Embed URL', type: 'text' },
    { name: 'sortOrder', label: 'Sort Order', type: 'number' },
    { name: 'isFeatured', label: 'Featured', type: 'checkbox' },
    { name: 'isVisible', label: 'Published', type: 'checkbox' }
  ],
  translationFields: [
    { name: 'title', label: 'Title', type: 'text' },
    { name: 'overview', label: 'Overview', type: 'richtext' },
    { name: 'highlights', label: 'Highlights', type: 'richtext' },
    { name: 'thingsToDo', label: 'Things To Do', type: 'richtext' },
    { name: 'travelTips', label: 'Travel Tips', type: 'richtext' },
    { name: 'weather', label: 'Weather', type: 'richtext' },
    ...seoFields
  ]
};

export const travelTypeConfig: AdminModuleConfig = {
  collection: 'travelTypes',
  title: 'Travel Types',
  description: 'Country/city pages with gallery, highlights, tips, weather, coordinates and SEO.',
  defaultItem: { slug: '', travelType: '', heroImage: '', gallery: [], sortOrder: 0, isFeatured: false, isVisible: true },
  fields: [
    { name: 'slug', label: 'Slug', type: 'text' },
    { name: 'travelType', label: 'Travel Type', type: 'text' },
    { name: 'heroImage', label: 'Hero Image', type: 'image', folder: 'travelTypes' },
    { name: 'gallery', label: 'Gallery', type: 'gallery', folder: 'travelTypes' },
    { name: 'sortOrder', label: 'Sort Order', type: 'number' },
    { name: 'isFeatured', label: 'Featured', type: 'checkbox' },
    { name: 'isVisible', label: 'Published', type: 'checkbox' }
  ],
  translationFields: [
    { name: 'title', label: 'Title', type: 'text' },
    { name: 'overview', label: 'Overview', type: 'richtext' },
    { name: 'highlights', label: 'Highlights', type: 'richtext' },
    { name: 'thingsToDo', label: 'Things To Do', type: 'richtext' },
    { name: 'travelTips', label: 'Travel Tips', type: 'richtext' },
    ...seoFields
  ]
};

// export const tripConfig: AdminModuleConfig = {
//   collection: 'trips',
//   title: 'Trips',
//   description: 'Bookable travel packages with destination, pricing, gallery, itinerary, policies and availability.',
//   defaultItem: { slug: '', destination: '', categories: [], durationDays: 1, durationNights: 0, price: 0, discountPrice: 0, currency: 'USD', heroImage: '', gallery: [], highlights: [], itinerary: [], availability: [], isFeatured: false, isVisible: true },
//   fields: [
//     { name: 'slug', label: 'Slug', type: 'text' },
//     { name: 'destination', label: 'Destination ID', type: 'text' },
//     { name: 'categories', label: 'Category IDs', type: 'array' },
//     { name: 'durationDays', label: 'Duration Days', type: 'number' },
//     { name: 'durationNights', label: 'Duration Nights', type: 'number' },
//     { name: 'price', label: 'Price', type: 'number' },
//     { name: 'discountPrice', label: 'Discount Price', type: 'number' },
//     { name: 'currency', label: 'Currency', type: 'text' },
//     { name: 'heroImage', label: 'Hero Image', type: 'image', folder: 'trips' },
//     { name: 'gallery', label: 'Gallery', type: 'gallery', folder: 'trips' },
//     { name: 'highlights', label: 'Highlights', type: 'array' },
//     { name: 'itinerary', label: 'Day-by-day itinerary', type: 'itinerary' },
//     { name: 'availability', label: 'Availability', type: 'availability' },
//     { name: 'isFeatured', label: 'Featured', type: 'checkbox' },
//     { name: 'isVisible', label: 'Published', type: 'checkbox' }
//   ],
//   translationFields: [
//     { name: 'title', label: 'Title', type: 'text' },
//     { name: 'summary', label: 'Summary', type: 'textarea' },
//     { name: 'overview', label: 'Overview', type: 'richtext' },
//     { name: 'includes', label: 'Includes', type: 'richtext' },
//     { name: 'excludes', label: 'Excludes', type: 'richtext' },
//     { name: 'policies', label: 'Policies', type: 'richtext' },
//     ...seoFields
//   ]
// };

export const tripConfig: AdminModuleConfig = {
  collection: 'trips',
  title: 'Trips',
  description: 'Bookable travel packages with destination, pricing, gallery, itinerary, policies and availability.',

  defaultItem: {
    slug: '',
    destination: '',
    travelTypes: [],
    categories: [],
    durationDays: 1,
    durationNights: 0,
    price: 0,
    discountPrice: 0,
    currency: 'USD',
    heroImage: '',
    gallery: [],
    availability: [],
    isFeatured: false,
    isVisible: true
  },

  fields: [
    { name: 'slug', label: 'Slug', type: 'text' },

    // ✅ Destination SELECT
    {
      name: 'destination',
      label: 'Destination',
      type: 'select',
      optionSource: {
        collection: 'destinations'
      }
    },

    // ✅ Travel Type MULTI-SELECT
    {
      name: 'travelTypes',
      label: 'Travel Types',
      type: 'multiselect',
      optionSource: {
        collection: 'travelTypes'
      }
    },

    // ✅ Categories MULTI-SELECT
    {
      name: 'categories',
      label: 'Categories',
      type: 'multiselect',
      optionSource: {
        collection: 'categories'
      }
    },
    { name: 'durationDays', label: 'Duration Days', type: 'number' },
    { name: 'durationNights', label: 'Duration Nights', type: 'number' },
    { name: 'price', label: 'Price', type: 'number' },
    { name: 'discountPrice', label: 'Discount Price', type: 'number' },
    { name: 'currency', label: 'Currency', type: 'text' },
    { name: 'heroImage', label: 'Hero Image', type: 'image', folder: 'trips' },
    { name: 'gallery', label: 'Gallery', type: 'gallery', folder: 'trips' },
    { name: 'availability', label: 'Availability', type: 'availability' },
    { name: 'isFeatured', label: 'Featured', type: 'checkbox' },
    { name: 'isVisible', label: 'Published', type: 'checkbox' }
  ],
  translationFields: [
    { name: 'title', label: 'Title', type: 'text' },
    { name: 'highlights', label: 'Highlights', type: 'array' },
    { name: 'itinerary', label: 'Day-by-day itinerary', type: 'itinerary' },
    { name: 'summary', label: 'Summary', type: 'textarea' },
    { name: 'overview', label: 'Overview', type: 'richtext' },
    { name: 'includes', label: 'Includes', type: 'richtext' },
    { name: 'excludes', label: 'Excludes', type: 'richtext' },
    { name: 'policies', label: 'Policies', type: 'richtext' },
    ...seoFields
  ]
};

export const categoryConfig: AdminModuleConfig = {
  collection: 'categories',
  title: 'Categories',
  defaultItem: { slug: '', type: 'general', image: '', sortOrder: 0, isVisible: true },
  fields: [
    { name: 'slug', label: 'Slug', type: 'text' },
    { name: 'image', label: 'Image', type: 'image', folder: 'gallery' },
    { name: 'sortOrder', label: 'Sort Order', type: 'number' },
    { name: 'isVisible', label: 'Published', type: 'checkbox' }
  ],
  translationFields: [
    { name: 'title', label: 'Title', type: 'text' },
    { name: 'overview', label: 'Overview', type: 'richtext' },
    { name: 'highlights', label: 'Highlights', type: 'richtext' },
    { name: 'thingsToDo', label: 'Things To Do', type: 'richtext' },
    { name: 'travelTips', label: 'Travel Tips', type: 'richtext' },
    ...seoFields
  ]
};

export const heroSliderConfig: AdminModuleConfig = {
  collection: 'hero-sliders',
  title: 'Hero Slider',
  defaultItem: { imageUrl: '', mobileImageUrl: '', altText: '', buttonUrl: '/trips', sortOrder: 0, isVisible: true },
  fields: [
    { name: 'imageUrl', label: 'Desktop Image', type: 'image', folder: 'slider' },
    { name: 'mobileImageUrl', label: 'Mobile Image', type: 'image', folder: 'slider' },
    { name: 'altText', label: 'Alt Text', type: 'text' },
    { name: 'buttonUrl', label: 'Button URL', type: 'text' },
    { name: 'sortOrder', label: 'Sort Order', type: 'number' },
    { name: 'isVisible', label: 'Published', type: 'checkbox' }
  ],
  translationFields: [
    { name: 'title', label: 'Title', type: 'text' },
    { name: 'subtitle', label: 'Subtitle', type: 'richtext' },
    { name: 'buttonText', label: 'Button Text', type: 'text' }
  ]
};

export const testimonialConfig: AdminModuleConfig = {
  collection: 'testimonials',
  title: 'Testimonials',
  defaultItem: { imageUrl: '', rating: 5, sortOrder: 0, isVisible: true },
  fields: [
    { name: 'imageUrl', label: 'Traveller Image', type: 'image', folder: 'gallery' },
    { name: 'rating', label: 'Rating', type: 'number' },
    { name: 'sortOrder', label: 'Sort Order', type: 'number' },
    { name: 'isVisible', label: 'Published', type: 'checkbox' }
  ],
  translationFields: [
    { name: 'customerName', label: 'Customer Name', type: 'text' },
    { name: 'customerLocation', label: 'Location', type: 'text' },
    { name: 'quote', label: 'Quote', type: 'richtext' }
  ]
};

export const faqConfig: AdminModuleConfig = {
  collection: 'faqs',
  title: 'FAQs',
  defaultItem: { category: 'general', sortOrder: 0, isVisible: true },
  fields: [
    { name: 'category', label: 'Category', type: 'text' },
    { name: 'sortOrder', label: 'Sort Order', type: 'number' },
    { name: 'isVisible', label: 'Published', type: 'checkbox' }
  ],
  translationFields: [
    { name: 'question', label: 'Question', type: 'text' },
    { name: 'answer', label: 'Answer', type: 'richtext' }
  ]
};

export const menuConfig: AdminModuleConfig = {
  collection: 'menus',
  title: 'Menus',
  defaultItem: { key: '', location: 'header', isVisible: true, items: [] },
  fields: [
    { name: 'key', label: 'Key', type: 'text' },
    { name: 'location', label: 'Location', type: 'select', options: [
      { label: 'Header', value: 'header' },
      { label: 'Footer', value: 'footer' },
      { label: 'Admin', value: 'admin' },
      { label: 'Mobile', value: 'mobile' }
    ] },
    { name: 'isVisible', label: 'Published', type: 'checkbox' },
    { name: 'items', label: 'Menu Items', type: 'menuItems' }
  ],
  translationFields: []
};

export const settingsConfig: AdminModuleConfig = {
  collection: 'settings',
  title: 'Settings',
  defaultItem: { key: 'main', logoUrl: '/images/logo.svg', logo2Url: '/images/logo.svg', faviconUrl: '/favicon.ico', primaryEmail: '', primaryPhone: '', address: '', defaultCurrency: 'USD', defaultLanguageCode: 'en-US', bookingEnabled: true, socialLinks: [] },
  fields: [
    { name: 'key', label: 'Key', type: 'text' },
    { name: 'logoUrl', label: 'Website Logo', type: 'image', folder: 'logos' },
    { name: 'logo2Url', label: 'White Logo', type: 'image', folder: 'logos' },
    { name: 'faviconUrl', label: 'Favicon', type: 'image', folder: 'logos' },
    { name: 'primaryEmail', label: 'Primary Email', type: 'text' },
    { name: 'primaryPhone', label: 'Primary Phone', type: 'text' },
    { name: 'address', label: 'Address', type: 'textarea' },
    { name: 'defaultCurrency', label: 'Default Currency', type: 'text' },
    { name: 'defaultLanguageCode', label: 'Default Language', type: 'text' },
    { name: 'bookingEnabled', label: 'Booking Enabled', type: 'checkbox' },
    { name: 'socialLinks', label: 'Social Links', type: 'socialLinks' }
  ],
  translationFields: [
    { name: 'siteName', label: 'Site Name', type: 'text' },
    { name: 'tagline', label: 'Tagline', type: 'textarea' },
    { name: 'footerText', label: 'Footer Text', type: 'richtext' },
    { name: 'footerColumns', label: 'Footer Columns', type: 'footerColumns' },
    { name: 'newsletterTitle', label: 'Newsletter Title', type: 'text' },
    { name: 'newsletterText', label: 'Newsletter Text', type: 'richtext' },
    { name: 'whyChooseUsTitle', label: 'Why Choose Us Title', type: 'text' },
    { name: 'whyChooseUsBody', label: 'Why Choose Us Body', type: 'richtext' }
  ]
};
