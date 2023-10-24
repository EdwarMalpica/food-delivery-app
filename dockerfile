#Stage 1: Build the Angular app

#Utiliza una imagen de node.js 18 como base
FROM node:18 as build

#Establece el directorio de trabajo
WORKDIR /app

#Copia el package.json y el package-lock.json
COPY package*.json ./
#Instala las dependencias
RUN npm install

#Copia el resto de los archivos

COPY . .

#Compila la aplicación
RUN npm run build

#Stage 2: Run the Angular app in Nginx

#Utiliza una imagen de nginx 1.21 como base

FROM nginx:alpine

#Copia los archivos de la carpeta dist al directorio de trabajo de nginx
COPY --from=build /app/dist/food-delivery-app /usr/share/nginx/html

#expone el puerto
EXPOSE 80

#Inicia nginx
CMD ["nginx", "-g", "daemon off;"]
