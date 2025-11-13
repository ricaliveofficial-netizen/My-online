# MyShop Design Guidelines

## Design Approach
**Reference-Based E-commerce Design** inspired by modern platforms like Shopify and Etsy, emphasizing visual product showcase, clear information hierarchy, and seamless shopping experience. The design balances browsing enjoyment with functional clarity.

## Typography
- **Primary Font**: Inter or DM Sans via Google Fonts
- **Headers**: Font weight 700, sizes: Hero (text-4xl/5xl), Section (text-3xl), Cards (text-xl)
- **Body Text**: Font weight 400-500, text-base for descriptions, text-sm for metadata
- **Price Tags**: Font weight 600-700, prominent sizing (text-lg to text-2xl)

## Layout System
**Spacing Units**: Consistently use Tailwind spacing of 4, 6, 8, 12, 16, and 24 (p-4, gap-6, mb-8, py-12, etc.)
- **Container**: max-w-7xl with px-4 md:px-6 lg:px-8
- **Section Padding**: py-12 md:py-16 lg:py-20
- **Component Gaps**: gap-6 for product grids, gap-4 for form elements

## Header Design
- **Structure**: Fixed top navigation with blue gradient background (as specified by user)
- **Height**: h-20 md:h-24 with flex items-center
- **Content**: Logo/title on left, search bar centered (hidden on mobile, visible md:flex), icon actions on right
- **Search Bar**: Rounded full (rounded-full), white/light background with subtle shadow, px-6 py-3, max-w-xl
- **Mobile**: Hamburger menu, collapsible search appears below header

## Carousel Section
- **Container**: Full-width with aspect-[16/9] md:aspect-[21/9] maintaining consistency
- **Images**: High-quality product lifestyle photos showing products in use/context
- **Controls**: Subtle prev/next arrows on sides, dot indicators at bottom
- **Transition**: Smooth fade or slide (3-4 second intervals)
- **Overlay**: Semi-transparent gradient overlay at bottom with optional promotional text

## Featured Products Section
- **Grid Layout**: 
  - Mobile: grid-cols-1 (single column)
  - Tablet: grid-cols-2 md:grid-cols-3
  - Desktop: lg:grid-cols-4
- **Product Cards**:
  - White background with rounded-lg, subtle shadow (shadow-sm hover:shadow-md)
  - Product image: aspect-square, object-cover, rounded-t-lg
  - Content padding: p-4 with gap-2
  - Product name: text-lg font-semibold, line-clamp-2
  - Price: text-xl font-bold
  - Add to cart button: Full-width, rounded-md, py-3, prominent styling
- **Empty State**: Friendly message with icon when no products exist

## Admin Panel Design
- **Layout**: Two-column desktop (lg:grid-cols-[1fr,2fr]), single column mobile
- **Left Panel**: 
  - Add Product Form with clear labels
  - Input fields: rounded-md, border, px-4 py-3, full-width
  - Image URL preview below input
  - Submit button: Prominent, full-width on mobile, w-auto on desktop
- **Right Panel**:
  - Product management table/grid
  - Each row: Product image thumbnail (w-16 h-16), name, price, action buttons (Edit/Delete)
  - Edit mode: Inline editing or modal overlay
  - Delete: Confirmation prompt before removal
- **Feedback**: Toast notifications for successful add/edit/delete actions

## Component Library
- **Buttons**: 
  - Primary: Solid fill, rounded-md, px-6 py-3, font-medium
  - Secondary: Border style, same padding
  - Icon buttons: Rounded-full, p-2
- **Forms**:
  - Labels: text-sm font-medium, mb-2
  - Inputs: border, rounded-md, px-4 py-3, focus ring
  - Consistent spacing: space-y-4
- **Cards**: rounded-lg with shadow-sm, padding p-4 to p-6

## Images
**Hero Carousel Images** (3-4 required):
- Landscape product lifestyle photos (e.g., furniture in styled room, electronics on desk, fashion on model)
- High resolution, professionally lit, showing product benefits
- Consistent aspect ratio across all carousel images
- Placement: Immediately below header, spans full viewport width

**Product Images**:
- Square format (1:1 aspect ratio) for consistency in grid
- Clean white or neutral backgrounds for product cards
- Show product clearly from primary angle

## Responsive Behavior
- **Breakpoints**: Mobile-first (base), md (768px), lg (1024px)
- **Navigation**: Hamburger menu on mobile, horizontal on desktop
- **Search**: Hidden on mobile (icon triggers expansion), always visible on desktop
- **Product Grid**: 1 column mobile → 2-3 tablet → 4 desktop
- **Admin Panel**: Stacked single column mobile → side-by-side desktop

## Interactions
- **Hover States**: Product cards lift slightly (translateY), shadow increases
- **Carousel**: Auto-advance with manual controls, pause on hover
- **Search**: Focus state with enhanced ring
- **Minimal Animation**: Smooth transitions (transition-all duration-300), no distracting effects