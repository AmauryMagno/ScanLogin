# 🔐 FaceAuth – Cadastro e Login com Reconhecimento Facial

Este projeto tem como finalidade implementar um processo seguro de cadastro e autenticação de usuários utilizando a face como identificador biométrico.
A aplicação realiza o cadastro inicial do usuário capturando o rosto, gerando embeddings faciais e enviando-os para validação em um backend. Posteriormente, o mesmo processo é utilizado para realizar o login, garantindo que apenas o usuário autorizado consiga acesso.

# 🚀 Tecnologias Utilizadas

## 🖥️ Frontend: React + Vite
  
- 📸 Captura da imagem do usuário via câmera.  
- 🧠 Detecção e extração dos embeddings faciais.  
- 🔗 Envio dos dados ao backend para cadastro e autenticação.  

## ⚙️ Backend: Django

- 📥 Recebe embeddings gerados no frontend.  
- 💾 Armazena embeddings no banco de dados durante o cadastro.  
- 🔎 Compara embeddings recebidos durante o login com os já cadastrados.  
- ✅ Retorna a validação (usuário autorizado ou não)

## 📌 Funcionalidades

- 📷 Cadastro de usuário via reconhecimento facial
- 🔑 Login biométrico utilizando face embeddings
- 🛡️ Autenticação segura sem necessidade de senha tradicional
- 🌐 Arquitetura frontend + backend desacoplada

## ⚙️ Estrutura do Projeto
```
faceauth/
│── frontend/   # Aplicação React + Vite
│   └── src/
│       ├── components/
│       ├── pages/
│       └── services/
│
│── backend/    # API Django
│   └── faceauth/
│       ├── models.py
│       ├── views.py
│       ├── urls.py
│       └── ...
│
└── README.md
```

## 📖 Fluxo do Sistema

### 1- Cadastro:

- O usuário abre a aplicação React.

- A câmera captura a face e gera embeddings.

- Os embeddings são enviados ao Django para armazenamento.

### 2- Login:

- O usuário tenta se autenticar novamente com a face.

- Os embeddings capturados são comparados com os já armazenados.

- Se a similaridade for válida, o acesso é concedido.
