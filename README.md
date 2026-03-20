# Sport Items

## Requisitos
- Node.js 18+
- PostgreSQL 14+

## Instalación

### 1. Clonar el repositorio
Abre tu terminal y ejecuta:
git clone https://github.com/tu-usuario/sport-items.git
cd sport-items

### 2. Instalar dependencias
npm install

### 3. Crear la base de datos
Según tu sistema operativo:

**Windows**
createdb -U postgres sport_items

**macOS**
createdb -U postgres sport_items

**Linux (Ubuntu/Debian)**
sudo -u postgres createdb sport_items

**Linux (Arch)**
sudo -u postgres createdb sport_items

### 4. Configurar variables de entorno

**Windows**
copy .env.example .env

**macOS / Linux**
cp .env.example .env

Luego abre el archivo .env y completa con tus credenciales:
DB_USER=tu_usuario
DB_HOST=127.0.0.1
DB_NAME=sport_items
DB_PASSWORD=tu_contraseña
DB_PORT=5432

### 5. Iniciar el servidor
node backend/index.js

La tabla se crea automáticamente al iniciar.

### 6. Abrir en el navegador
http://localhost:3000