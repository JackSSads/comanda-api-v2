FROM node:18-alpine

WORKDIR /usr/src/app

# Copiar apenas os arquivos de definição de dependências primeiro
COPY package*.json ./

# Instalar as dependências
RUN npm install --production

# Copiar o restante dos arquivos da aplicação
COPY . .

EXPOSE 3001

CMD ["node", "app.js"]