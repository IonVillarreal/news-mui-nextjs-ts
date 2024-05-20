# Demo - Aplicación de Noticias

Una aplicación de noticias de tecnología construida con Next.js, TypeScript y Material-UI, utilizando el App Router para la renderización del lado del servidor (SSR) y la revalidación de páginas desde el backend.

## Características

- Renderización del lado del servidor (SSR) para una carga rápida y SEO optimizado.
- Actualización periódica de noticias en el cliente.
- Revalidación de páginas desde el backend.
- Uso de Material-UI para una interfaz de usuario moderna y responsiva.
- Uso de imágenes optimizadas con `next/image`.

## Estructura del Proyecto

```plaintext
my-news-app/
├── public/
├── src/
│   ├── app/
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── api/
│   │   │   └── news/
│   │   │       └── route.ts
│   │   ├── revalidate/
│   │   │   └── route.ts
│   │   └── page.tsx
│   ├── components/
│   │   └── NewsList.tsx
│   ├── styles/
│   ├── types/
│   │   └── News.ts
├── .gitignore
├── package.json
├── tsconfig.json
├── next.config.js
└── README.md
```

## Configuración del Proyecto

### Requisitos

- Node.js
- npm o yarn

### Instalación

1. Clona el repositorio:

   ```bash
   git clone git@github.com:IonVillarreal/news-mui-nextjs-ts.git
   ```

2. Instala las dependencias:

   ```bash
   cd news-mui-nextjs
   npm install
   # o
   yarn install
   ```

3. Crea un archivo `.env.local` en la raíz del proyecto y añade la siguiente variable:

   ```plaintext
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

### Ejecución en Desarrollo

```bash
npm run dev
# o
yarn dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

### Configuración de Imágenes

Asegúrate de que tu archivo `next.config.js` permite la carga de imágenes desde "picsum.photos":

```javascript
// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['picsum.photos'],
  },
}

module.exports = nextConfig
```

## API Endpoints

Disponible en [https://github.com/IonVillarreal/node-prisma-notas](https://github.com/IonVillarreal/node-prisma-notas)

### Obtener Noticias

Endpoint: `/api/news`

Método: `GET`

Descripción: Devuelve un array de objetos de noticias.

## Componentes

### Componente `NewsList`

Ubicación: `src/app/components/NewsList.tsx`

Descripción: Renderiza una lista de noticias en formato de tarjetas.

### Página Principal

Ubicación: `src/app/page.tsx`

Descripción: Renderiza la página principal con noticias de tecnología utilizando SSR y actualización periódica en el cliente.

### Página "Acerca de"

Ubicación: `src/app/about/page.tsx`

Descripción: Renderiza una página sencilla con información sobre la aplicación.
