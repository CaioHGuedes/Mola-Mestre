# Mola Mestre: Sua Plataforma Completa de Gestão de Investimentos

O **Mola Mestre** é uma aplicação web moderna e intuitiva, projetada para auxiliar investidores a gerenciar seus portfólios de ações, acompanhar o mercado financeiro e aprimorar seus conhecimentos sobre investimentos. Com uma interface rica e funcionalidades robustas, o projeto oferece uma solução completa para o acompanhamento de ativos da B3.

## ✨ Funcionalidades Principais

O Mola Mestre oferece um conjunto de ferramentas integradas para otimizar a jornada do investidor, desde o monitoramento de cotações até a gestão de metas financeiras de longo prazo.

| Funcionalidade | Descrição |
| :--- | :--- |
| **Dashboard em Tempo Real** | Monitoramento de cotações de ações da B3 com atualizações ao vivo, viabilizado pela integração com a API da [Brapi](https://brapi.dev/). |
| **Gestão de Metas** | Definição e acompanhamento visual do progresso de objetivos financeiros, como "Comprar Carro" ou "Aposentadoria". |
| **Carteira de Ativos** | Registro detalhado de transações de compra e venda, com cálculo automático de preço médio e análise de rentabilidade. |
| **Feed de Notícias** | Agregação das últimas notícias do mercado financeiro para manter o usuário informado sobre eventos relevantes. |
| **Quiz Educacional** | Módulo interativo e gamificado para testar e aprimorar os conhecimentos sobre o universo dos investimentos. |
| **UX Premium** | Experiência de usuário aprimorada com feedbacks animados, Skeleton Loading para transições suaves e uma interface responsiva. |

## 📂 Arquitetura e Destaques Técnicos

O projeto foi desenvolvido com foco em boas práticas de desenvolvimento, como **Clean Code** e o princípio de **Single Source of Truth** para tipagens, garantindo um código limpo, manutenível e escalável.

> **DTOs & Interfaces Centralizadas:** A centralização de tipos de dados, como `Goal`, `Transaction` e `Stock`, entre o Frontend e o Backend previne inconsistências e facilita a comunicação entre as camadas da aplicação.

> **Hydration Safe:** Os componentes foram cuidadosamente otimizados para evitar erros de hidratação, um desafio comum em aplicações Next.js que utilizam renderização tanto no servidor (SSR) quanto no cliente.

> **Database Serialization:** Foi implementado um tratamento automático na camada de Schema para serializar objetos do MongoDB, convertendo o campo `_id` para `id`, o que simplifica o consumo dos dados no Frontend.

## 🚀 Como Executar o Projeto

Para executar o Mola Mestre em seu ambiente de desenvolvimento local, siga os passos detalhados abaixo.

### Pré-requisitos

Antes de iniciar, certifique-se de que os seguintes softwares estão instalados em sua máquina:

- **Node.js:** Versão 18 ou superior. [Faça o download aqui](https://nodejs.org/en/).
- **Git:** Para clonar o repositório. [Instale o Git aqui](https://git-scm.com/).

### Passo a Passo

1.  **Clonar o Repositório**

    Abra seu terminal e execute o comando abaixo para clonar o projeto. Substitua `[SEU-USUARIO]` pelo seu nome de usuário do GitHub.

    ```bash
    git clone https://github.com/[SEU-USUARIO]/mola-mestre.git
    cd mola-mestre
    ```

2.  **Instalar as Dependências**

    Utilize o `npm` para instalar todas as dependências necessárias para o projeto.

    ```bash
    npm install
    ```

3.  **Configurar as Variáveis de Ambiente**

    Crie um arquivo `.env.local` na raiz do projeto e adicione as seguintes variáveis, substituindo os valores de exemplo pelos seus próprios dados:

    ```env
    # Conexão com o MongoDB (Atlas ou Local)
    MONGO_URI="mongodb+srv://USUARIO:SENHA@cluster.mongodb.net/nome_do_banco"

    # Chave Secreta para autenticação (Gere uma string aleatória segura)
    JWT_SECRET="sua_chave_secreta_aqui"

    # Chave da API da Brapi (Obtenha gratuitamente em https://brapi.dev)
    NEXT_PUBLIC_BRAPI_API_KEY="seu_token_brapi_aqui"
    ```

4.  **Iniciar o Servidor de Desenvolvimento**

    Com as dependências instaladas e as variáveis de ambiente configuradas, inicie o servidor.

    ```bash
    npm run dev
    ```

    Após a execução do comando, a aplicação estará disponível em [http://localhost:3000](http://localhost:3000).
