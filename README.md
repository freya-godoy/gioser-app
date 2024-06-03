# Título del Proyecto: OKLAHOMA 
# Tener instalado: npm. git nodejs 

# Desplegar proyecto.
Clonar el repositorio, correr :



npm ci

# Para inicializar el proyecto en ambiente de Desarrollo 
npm run dev o yarn dev 

# Para correrlo modo PRoduction
cambiar el .env a production y correr npm start

# Ejecucion de Test:
npm run test o yarn test

# Estructura del proyecto
El proyecto tiene como estructura,
## src
### core
#### state
##### Nuestras entidades con todo sus datos, sagas, reducers, actions, selectors y types
### store // Archivo nucleo de nuestro reducers y actions
### reducers Todos los reducers provienen del state / entidad
### selectros, nuestro selectores provienen del state / entidad
### actions nuestras actions nucleadas provienen del state / entidad
### components
#### Todos nuestros componentes
### views
#### Nuestras Main Components todos los containers y components conectados al store están aca
### scss
#### Nuestro estilos

Prommel Andres - Arquitecto Web
