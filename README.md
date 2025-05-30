# 📱 Produtos App

Aplicativo mobile desenvolvido com **React Native** e **Expo** que permite o cadastro de produtos com foto, nome e descrição. Os dados são armazenados localmente com `AsyncStorage` e sincronizados com uma API remota.

## 🚀 Funcionalidades

- Tirar foto do produto com a câmera.
- Preencher nome e descrição.
- Enviar o produto com imagem para o backend (API REST).
- Persistência local dos dados com `@react-native-async-storage/async-storage`.
- Listagem dos produtos.
- Exclusão de produtos.
- Requisições HTTP com `axios`.

## 🧪 Tecnologias utilizadas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [Axios](https://axios-http.com/)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)
- [expo-image-picker](https://docs.expo.dev/versions/latest/sdk/imagepicker/)
- [expo-camera](https://docs.expo.dev/versions/latest/sdk/camera/)

## 📷 Imagens

As imagens usadas no projeto estão no diretório `assets/`:

- `icon.png`: ícone do app.
- `splash-icon.png`: imagem de splash.
- `adaptive-icon.png`: ícone adaptativo Android.
- `favicon.png`: ícone da versão web.

## 📦 Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/produtos-app.git
   cd produtos-app
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o projeto com Expo:
   ```bash
   npm start
   ```

## ⚙️ Backend

Este app depende de um backend disponível em:  
`https://backend-produtos.onrender.com`

Certifique-se de que a API esteja funcionando antes de cadastrar ou buscar produtos.

## 📁 Estrutura de arquivos

```
.
├── App.js
├── index.js
├── assets/
│   ├── icon.png
│   ├── splash-icon.png
│   ├── adaptive-icon.png
│   └── favicon.png
├── app.json
├── package.json
└── ...
```

## 💡 Observações

- Permissões de câmera e galeria são solicitadas ao usuário.
- O projeto está pronto para rodar no Android, iOS e Web com Expo.

---

Desenvolvido com 💙 usando Expo
