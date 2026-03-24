<<<<<<< HEAD
# Práctica 
=======
# Adivina el País

## Descripción

Juego de trivia para adivinar un país con datos reales y preguntas generadas por IA.

- Frontend con **Next.js**.
- Estilos con **Tailwind CSS**.
- Datos de países desde la API:
  - `https://restcountries.com/v3.1/all?fields=name,capital,currencies,flags,latlng`
- Preguntas generadas por LLM en **Novita AI**.

## Requisitos del proyecto

1. Usar Next.js (`https://nextjs.org/`).
2. Usar TailwindCSS (`https://tailwindcss.com/`).
3. Consumir la API de países:
   - `https://restcountries.com/v3.1/all?fields=name,capital,currencies,flags,latlng`
4. Consumir API de Novita AI para generar preguntas.
5. Contar con archivo `.env` para claves.

## Flujo Paso a Paso

1. Carga inicial de países:
   - En `getStaticProps` o API route de Next.js se consume la API de países.
   - Se obtiene lista con campos: `name`, `capital`, `currencies`, `flags`, `latlng`.

2. Selección aleatoria de país
   - Al iniciar juego, se escoge 1 país de la lista.

3. Generación de preguntas con Novita AI
   - En `pages/api/pregunta.js` (o similar), se envía prompt a Novita AI con datos del país.
   - Ejemplo de prompt: "Genera una pregunta tipo trivia para adivinar este país: {nombre, capital, moneda, ubicación}."

4. Interacción del usuario
   - Mostrar bandera, pistas opcionales y campo para respuesta.
   - El usuario escribe el país y envía.

5. Verificación de respuesta
   - Comparar la respuesta con el nombre del país (`name.common`, `name.official`, variantes).
   - Si es correcto: mostrar mensaje y botón "Jugar otra vez".
   - Si es incorrecto: mostrar pista extra (capital, continente, moneda) y permitir nuevo intento.

6. Puntuación y rondas
   - Opcional: contar intentos, tiempo y aciertos.
   - Guardar score en estado local (React) o localStorage.

## Setup (Next.js + Tailwind)

1. Crear app Next.js:
   ```bash
   npx create-next-app@latest adivina-el-pais
   cd adivina-el-pais
   ```

2. Instalar Tailwind:
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

3. Configurar `tailwind.config.js`:
   ```js
   module.exports = {
     content: [
       './pages/**/*.{js,ts,jsx,tsx}',
       './components/**/*.{js,ts,jsx,tsx}',
     ],
     theme: { extend: {} },
     plugins: [],
   }
   ```

4. Importar Tailwind en `styles/globals.css` :
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

5. Instalar dependencia para fetch en servidor (opcional):
   ```bash
   npm install axios
   ```

## Configuración de variables de entorno

Crear `.env.local` en la raíz:

```env
NEXT_PUBLIC_COUNTRIES_API=https://restcountries.com/v3.1/all?fields=name,capital,currencies,flags,latlng
NOVITA_API_KEY=tu_api_key_de_novita
NOVITA_API_URL=https://api.novita.ai/v1/generate
```

## API Routes sugeridas

- `pages/api/paises.js`:
  - Hace proxy a `NEXT_PUBLIC_COUNTRIES_API` y limpia datos si se desea.

- `pages/api/pregunta.js`:
  - Recibe `pais` (JSON) y hace request a Novita AI.
  - Devuelve texto de pregunta.

## Ejecución

```bash
npm run dev
```

Abrir `http://localhost:3000`.

## Estructura de componentes (sugerida)

- `components/GameBoard.js`
- `components/CountryCard.js`
- `components/QuestionBox.js`
- `components/ScorePanel.js`

## Cómo jugar

1. Presiona "Iniciar juego".
2. Responde preguntas hasta adivinar el país.
3. Si fallas, usa la pista.
4. Presiona "Reiniciar" para otro país.

## Contribuciones

- Fork y PR bien descrito.
- Issues siempre bienvenidos.

## Licencia

MIT 
>>>>>>> 3281b58c5c7a19f3573d4ad360e09b65e44baf55
