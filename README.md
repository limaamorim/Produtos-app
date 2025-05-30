README - Aplicativo de Cadastro de Produtos
📱 Visão Geral
Aplicativo React Native para cadastro de produtos com fotos, desenvolvido com Expo. Permite:

📸 Capturar fotos dos produtos

✏️ Cadastrar produtos com nome e descrição

📋 Visualizar lista de produtos cadastrados

🗑️ Excluir produtos

💾 Armazenamento local dos dados

🛠️ Estrutura do Projeto
produtos-app/
├── .expo/                # Configurações locais do Expo (não commitado)
├── assets/               # Arquivos estáticos
│   ├── adaptive-icon.png # Ícone adaptativo
│   ├── favicon.png       # Ícone para navegadores
│   ├── icon.png          # Ícone do app
│   └── splash.png        # Tela de splash
├── App.js                # Componente principal
├── index.js              # Ponto de entrada
├── app.json              # Configuração do app
├── package.json          # Dependências do projeto
└── package-lock.json     # Versões exatas das dependências
🔧 Pré-requisitos
Node.js (v16 ou superior)

Expo CLI instalado globalmente (npm install -g expo-cli)

Dispositivo móvel com Expo Go ou emulador configurado

🚀 Como Executar
Instale as dependências:

bash
npm install
Inicie o servidor de desenvolvimento:

bash
expo start
Escaneie o QR code com o app Expo Go (disponível na App Store/Play Store) ou execute em um emulador.

⚙️ Configuração
Conexão com Backend
No arquivo App.js, configure a URL do seu backend:

javascript
const baseURL = 'https://seu-backend.onrender.com'; // Substitua pela sua URL
Permissões
O app requer permissões para:

Acesso à câmera

Armazenamento local

📦 Dependências Principais
expo-image-picker: Para acesso à câmera

axios: Para requisições HTTP

@react-native-async-storage/async-storage: Armazenamento local

🔍 Arquivos Ignorados (.gitignore)
O projeto já inclui:

.expo/ (configurações locais)

node_modules/ (dependências)

Arquivos temporários e de ambiente

📄 Licença
MIT License - Livre para uso e modificação

ℹ️ Observações
O diretório .expo/ contém configurações específicas da sua máquina e não deve ser commitado

As imagens em assets/ são usadas para ícones e tela inicial do app

Para produção, considere criar builds específicas para Android/iOS
