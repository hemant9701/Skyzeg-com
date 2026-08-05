# TravelNextMongo

A production-oriented Travel & Tour Management System converted from the ASP.NET Core MVC + SQL Server concept into **Next.js + MongoDB**.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript with nullable/strict checks
- MongoDB with Mongoose
- Bootstrap 5.3, jQuery, DataTables, SweetAlert2, Select2, Toastr
- TinyMCE WYSIWYG HTML editor
- Custom JWT cookie authentication with role checks
- Repository + Unit of Work style data access
- Zod validation
- Pino logging
- Sharp image resize/compression/WebP processing

## Architecture

```text
src/app              Next.js pages, layouts and route handlers
src/domain           Domain constants and TypeScript entity contracts
src/application      DTOs, validators, mappers and application services
src/infrastructure   MongoDB connection, Mongoose models, repositories, logging
src/components       Public and admin UI components
src/shared           Shared utilities, responses, SEO helpers and errors
data/languages.json  Languages loaded from JSON; no Languages collection/table
scripts              Seed and admin creation scripts
```

## Run locally

```bash
npm install
cp .env.example .env.local
npm run seed
npm run dev
```

Open:

```text
http://localhost:3000
```

Admin:

```text
http://localhost:3000/admin/login
```

Default admin:

```text
admin@travel.local
Admin@12345
```

## MongoDB

The default local connection is:

```text
mongodb://127.0.0.1:27017/travel_system_db
```

You can use MongoDB Atlas by replacing `MONGODB_URI` in `.env.local`.

## Languages

Languages are loaded from:

```text
data/languages.json
```

Content documents store translations as embedded subdocuments with only `languageCode`, for example:

```json
{
  "translations": [
    { "languageCode": "en-US", "title": "About Us", "body": "..." },
    { "languageCode": "fr-FR", "title": "A propos", "body": "..." }
  ]
}
```

There is intentionally no `Languages` collection.

## Upload folders

Uploads are stored under:

```text
public/uploads/blogs
public/uploads/pages
public/uploads/destinations
public/uploads/trips
public/uploads/slider
public/uploads/gallery
public/uploads/logos
public/uploads/documents
public/uploads/media
```

## Main public routes

```text
/
/destinations
/destinations/[slug]
/trips
/trips/[slug]
/blogs
/blogs/[slug]
/pages/[slug]
/contact
/booking/[tripSlug]
```

## Main admin routes

```text
/admin
/admin/pages
/admin/blogs
/admin/destinations
/admin/trips
/admin/bookings
/admin/media
/admin/settings
/admin/testimonials
/admin/faqs
/admin/menus
/admin/hero-sliders
```

## REST APIs

```text
/api/pages
/api/pages/[slug]
/api/blogs
/api/blogs/[slug]
/api/destinations
/api/destinations/[slug]
/api/trips
/api/trips/[slug]
/api/bookings
/api/media/upload
/api/contact
/api/newsletter
/api/languages
```

Create/update/delete calls require an authenticated Admin, Editor or Content Manager role depending on the route.

## Notes

- MongoDB does not use EF migrations. Schemas and indexes are defined in Mongoose models.
- Run `npm run seed` after changing seed records.
- TinyMCE is configured for images, tables, code/source view, media, YouTube embeds and HTML editing.
