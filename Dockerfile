FROM node:20 AS build

# directorio de trabajo
WORKDIR /app

# construir el proyecto
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Etapa de despliegue
FROM nginx:latest AS deploy

# Copiar la aplicación Angular al contenedor NGINX
COPY --from=build /app/dist/gestion-examen-frontend /usr/share/nginx/html

# Exponer el puerto
EXPOSE 80

# Configuración por defecto de NGINX
CMD ["nginx", "-g", "daemon off;"]