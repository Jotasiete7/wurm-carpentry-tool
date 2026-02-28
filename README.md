# Wurm Carpentry Tool

A web tool to calculate the carpentry skill needed to build houses in [Wurm Online](https://www.wurmonline.com/).

## Features

- **Interactive Grid**: Click or drag to select tiles for your building layout
- **Automatic Calculation**: Calculates outer walls and required carpentry skill using the official formula
- **Multi-floor Support**: Supports up to 16 floors with accurate skill requirements
- **Adjustable Grid Size**: From 8x8 to 24x24 tiles
- **Visual Feedback**: Highlights outer walls with golden borders
- **Multi-language**: Available in English, Portuguese, and Russian

## Formula

The carpentry skill required to build a house is calculated as:

```
Carpentry Skill = Tiles + Outer Walls - 5
```

For multi-story buildings, there's an additional floor requirement:

| Floor | Skill Required |
|-------|---------------|
| 1 | 0 |
| 2 | 21 |
| 3 | 30 |
| 4 | 39 |
| 5 | 47 |
| 6 | 55 |
| 7 | 63 |
| 8 | 70 |
| 9 | 77 |
| 10 | 83 |
| 11 | 88 |
| 12 | 92 |
| 13 | 95 |
| 14 | 97 |
| 15 | 98 |
| 16 | 99 |

## Tech Stack

- [React](https://react.dev/) 18
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/) (icons)

## Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Running locally

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Building for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Deployment

This project is configured for deployment on [Cloudflare Pages](https://pages.cloudflare.com/).

## Related Tools

- [Wurm Mining Tool](https://wurm-mining-tool.pages.dev/) - Mining skill optimizer

## Credits

- Formula based on [Wurmpedia](https://www.wurmpedia.com/index.php/House)
- Developed by [A Guilda](https://wurm-aguild-site.pages.dev)

## License

MIT
