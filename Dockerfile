# Use a imagem base do Node.js
FROM node:14

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copie o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos do projeto
COPY . .

# Exponha a porta em que o aplicativo será executado (ajuste conforme necessário)
EXPOSE 5173

# Comando para iniciar o aplicativo
CMD ["npm", "start"]
