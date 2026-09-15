<p align="center">
  <img alt="Consistem" src="https://raw.githubusercontent.com/consistem/intersystems-servermanager/master/images/logo-consistem-horizontal.png" width="280" />
</p>

# Consistem Server Manager

[![Consistem](https://img.shields.io/badge/Consistem-Website-brightgreen)](https://consistem.com.br/)
[![](https://img.shields.io/badge/InterSystems-IRIS-blue.svg)](https://www.intersystems.com/products/intersystems-iris/)
[![](https://img.shields.io/badge/InterSystems-Cach%C3%A9-blue.svg)](https://www.intersystems.com/products/cache/)
[![](https://img.shields.io/badge/InterSystems-Ensemble-blue.svg)](https://www.intersystems.com/products/ensemble/)

> **Documentação oficial:** a referência para instalar, configurar e usar o ambiente de desenvolvimento da Consistem no VS Code é o manual
> **[VS Code - Ambiente de Desenvolvimento Consistem](https://cuka.consistem.com.br/doc/vs-code-ambiente-de-desenvolvimento-consistem-6rRtIWzvzz)**.
> Consulte-o antes de seguir qualquer procedimento deste README: ele descreve a configuração suportada internamente, incluindo conexões,
> cores por ambiente, consultas SQL, Consistem Tools e resolução de erros comuns.

O Consistem Server Manager é uma extensão do Visual Studio Code para definir conexões com servidores [InterSystems](https://www.intersystems.com/). Essas definições podem ser usadas por outras extensões do VS Code no momento em que elas se conectam. Um exemplo é a [extensão Consistem ObjectScript](https://github.com/consistem/vscode-objectscript), usada para edição de código. A extensão [Launch WebTerminals](https://marketplace.visualstudio.com/items?itemName=georgejames.webterminal-vscode) é outro exemplo.

## Sobre este fork

Este projeto é um fork do repositório oficial [`intersystems-community/intersystems-servermanager`](https://github.com/intersystems-community/intersystems-servermanager).

Mantido originalmente pela [InterSystems&reg;](http://www.intersystems.com), este fork é mantido pela [Consistem&reg;](https://consistem.com.br/).

Ele preserva todos os recursos do projeto de origem e acrescenta integrações, ajustes e padrões internos adotados pela Consistem,
com foco em atender às necessidades específicas do nosso ecossistema de desenvolvimento.

Consulte o [CHANGELOG](CHANGELOG.md) para ver as mudanças de cada release.

## Documentação

| Assunto | Onde consultar |
| --- | --- |
| Ambiente de desenvolvimento Consistem (oficial) | [VS Code - Ambiente de Desenvolvimento Consistem](https://cuka.consistem.com.br/doc/vs-code-ambiente-de-desenvolvimento-consistem-6rRtIWzvzz) |
| Configuração do VS Code com a extensão InterSystems | [Configuração do Ambiente de Desenvolvimento Consistem](https://cuka.consistem.com.br/doc/configuracao-do-ambiente-de-desenvolvimento-consistem-iqzsJjpwG5) |
| Configuração server-side (`isfs`) | [Configuração Server-Side](https://cuka.consistem.com.br/doc/configuracao-server-side-H7y5eAuSgF) |
| Resolução de erros de conexão | [Resolução de Erros](https://cuka.consistem.com.br/doc/resolucao-de-erros-uFVNgLxrjz) |
| Documentação do VS Code | [Visual Studio Code documentation](https://code.visualstudio.com/docs) |
| Documentação da InterSystems | [Use VS Code as a Development Environment for InterSystems Applications](https://docs.intersystems.com/components/csp/docbook/DocBook.UI.Page.cls?KEY=GVSCO) |

# Novidades da versão 3.14 - Agosto de 2026

- Suporte a OAuth2 para autorização em servidores InterSystems.
- Ao criar uma definição de servidor pela interface, é possível informar scheme, host, porta e prefixo de caminho como uma única URL.
- Senhas gravadas em texto puro nas configurações deixaram de ser repassadas diretamente às extensões cliente.
- Antes de solicitar credenciais, é feita uma tentativa de requisição não autenticada quando nenhuma credencial está configurada.

# Novidades da versão 3.12 - Fevereiro de 2026

- Exige VS Code 1.109 ou superior.
- Abertura de páginas do Portal de Gerenciamento no navegador integrado.

# Novidades da versão 3.10 - Abril de 2025

- Exibição de conexões do tipo `objectscript.conn.docker-compose` sob o nó 'Current'.
- Suporte à execução em ambiente web.

# Novidades da versão 3.8 - Novembro de 2024

- O provedor de autenticação foi atualizado para resolver o excesso de solicitações causado por uma mudança do VS Code 1.93.
- Foi adicionada uma nova função (`getAccount`) à API, como auxiliar para extensões que utilizam o provedor de autenticação.

# Novidades da versão 3.6 - Janeiro de 2024

O contêiner de visualização foi renomeado e ganhou um novo ícone, como parte do trabalho de integração com as views da extensão ObjectScript.

# Novidades da versão 3.4 - Julho de 2023

- A sequência de prompts exibida ao criar uma nova definição de servidor passou a incluir um passo em que se pode, opcionalmente, informar o `pathPrefix` necessário quando um único servidor web fornece conectividade REST para vários servidores InterSystems.

- Uma nova árvore "Web Applications" dentro de cada nó de namespace oferece uma forma prática de criar uma pasta de workspace para editar arquivos de aplicação web.

> O suporte ao mecanismo de armazenamento de senhas da versão 2 foi removido. Se você utilizava a configuração `"intersystemsServerManager.authentication.provider": "none"`, ela não terá mais efeito e suas conexões se comportarão como se nenhuma senha estivesse armazenada. É possível migrar as senhas armazenadas fazendo downgrade para o Server Manager 3.2 e executando o comando `Migrate Passwords`.
>
> O VS Code 1.82 (agosto de 2023) descontinuou o suporte ao pacote keytar usado pelo mecanismo da v2, portanto a migração de senhas da v2 deve ser feita antes de atualizar para essa versão.

# Novidades da versão 3.2 - Outubro de 2022

A versão 3.2 desta extensão substituiu a versão 2, melhorando a segurança das senhas armazenadas por meio da integração com a [Authentication Provider API](https://code.visualstudio.com/api/references/vscode-api#AuthenticationProvider) do VS Code. A versão 3 foi criada originalmente para o [InterSystems Security Contest de novembro de 2021](https://openexchange.intersystems.com/contest/19).

Agradecimentos à [George James Software](https://georgejames.com) pelo apoio a esse desenvolvimento.

## O provedor de autenticação

O Server Manager implementa um provedor de autenticação chamado 'intersystems-server-credentials' e o utiliza ao acessar servidores a partir da sua própria [árvore de servidores](#a-árvore-de-servidores).

### Entrando na conta

Na primeira vez que você expande um servidor na árvore, o VS Code exibe uma caixa de diálogo modal pedindo sua permissão:

![Permitir uma extensão](images/README/authenticationProvider-allow.png)

Se você permitir e a definição do servidor em `intersystems.servers` não especificar um `username`, o próximo passo é:

![Informar o usuário](images/README/authenticationProvider-username.png)

Se você prosseguir, ou se esse passo tiver sido pulado porque a definição do servidor já inclui um usuário, o próximo passo é:

![Informar a senha](images/README/authenticationProvider-password.png)

Ao clicar no botão de 'chave' no canto superior direito da caixa de diálogo, depois de digitar a senha, ela é gravada com segurança no cofre de credenciais do sistema operacional da sua estação de trabalho, de onde o provedor 'InterSystems Server Credentials' poderá recuperá-la após você reiniciar o VS Code.

Se, em vez disso, você pressionar 'Enter', a senha ficará disponível apenas até você reiniciar o VS Code.

De qualquer forma, você estará autenticado na conta informada.

### Autorizando outras extensões

Quando outra extensão solicita pela primeira vez o uso de uma conta do InterSystems Server Credentials, é necessário permitir ou negar esse acesso. Por exemplo, quando a extensão InterSystems ObjectScript usa o provedor de autenticação, esta caixa de diálogo aparece depois que você clica no botão de lápis ao lado de um namespace na [árvore do Server Manager](#a-árvore-de-servidores):

![Permitir outra extensão](images/README/authenticationProvider-allowObjectScript.png)

### Gerenciando as contas autenticadas

Use o menu do ícone de Contas na barra de atividades do VS Code para gerenciar as contas nas quais você está autenticado:

![Gerenciar conta](images/README/authenticationProvider-signedIn.png)

A opção 'Manage Trusted Extensions' permite remover uma extensão da lista daquelas às quais você concedeu acesso a esta conta do InterSystems Server Credentials:

![Gerenciar lista de extensões confiáveis](images/README/authenticationProvider-manageTrusted.png)

A opção 'Sign Out' permite encerrar a sessão da conta, mediante confirmação:

![Sair da conta](images/README/authenticationProvider-signOut.png)

Ao sair de uma conta cuja senha foi gravada anteriormente, será oferecida a opção de excluir a senha, a menos que você tenha alterado a configuração `intersystemsServerManager.credentialsProvider.deletePasswordOnSignout`:

![Excluir senha](images/README/authenticationProvider-deletePassword.png)

---

# Novidades da versão 2 - Abril de 2021

Os recursos a seguir foram introduzidos originalmente na versão 2 do Server Manager.

## A árvore de servidores

O Server Manager exibe as definições de conexão como uma árvore, na view InterSystems Tools:

![Árvore do Server Manager](images/README/tree.png)

Nessa árvore você pode:

- Abrir o Portal de Gerenciamento da InterSystems, em uma aba do VS Code ou no seu navegador padrão.
- Listar namespaces.
- Adicionar namespaces ao seu workspace do VS Code para visualizar ou editar código-fonte no servidor, inclusive arquivos de aplicação web (antigos CSP), com a [extensão ObjectScript](https://github.com/consistem/vscode-objectscript).
- Marcar servidores como favoritos.
- Definir cores de ícone.
- Focar nas conexões usadas recentemente.
- Adicionar novos servidores e editar os existentes.

Assim como no restante do VS Code, o Server Manager grava as configurações de conexão em arquivos JSON. As configurações do VS Code seguem uma hierarquia, descrita [aqui](https://code.visualstudio.com/docs/getstarted/settings).

O Server Manager pode armazenar as senhas de conexão no cofre nativo do sistema operacional da sua estação de trabalho. Essa é uma alternativa mais segura do que mantê-las em texto puro nos arquivos JSON.

No Windows, o Server Manager pode criar entradas de conexão para todas as conexões que você definiu anteriormente no aplicativo Windows original chamado InterSystems Server Manager. Essa ação está disponível no menu '`...`' do canto superior direito da árvore do Server Manager.

## Definindo um novo servidor

1. Clique no botão '`+`' na barra de título do Server Manager.
2. Preencha a sequência de prompts.
3. Expanda `All Servers` para ver a nova entrada na árvore.

A definição do servidor é adicionada ao seu arquivo `settings.json` de [nível de usuário](https://code.visualstudio.com/docs/getstarted/settings) e também aparece no topo da pasta 'Recent'.

Opcionalmente, use o menu de contexto para definir a cor do ícone do servidor.

O botão de 'estrela', exibido ao passar o mouse sobre a linha, permite adicionar o servidor à lista `Favorites`, no topo da árvore.

## Visualizando e editando código-fonte

1. Expanda o servidor desejado e, em seguida, a pasta 'Namespaces'.
2. Passe o mouse sobre o namespace desejado para exibir os botões de comando.
3. Clique no ícone de 'lápis' para adicionar uma pasta `isfs://servidor:namespace/` ao seu workspace do VS Code, ou use o ícone de 'olho' para adicionar uma pasta `isfs-readonly://servidor:namespace/`.
4. Para adicionar uma pasta que dê acesso aos arquivos de aplicação web do servidor (por exemplo, arquivos CSP), mantenha a tecla <kbd>Alt</kbd> / <kbd>Option</kbd> pressionada ao clicar no botão do tipo de acesso desejado.

Saiba mais sobre pastas `isfs` e `isfs-readonly` na [documentação da Consistem](https://cuka.consistem.com.br/doc/configuracao-server-side-H7y5eAuSgF) e na [documentação da InterSystems](https://docs.intersystems.com/components/csp/docbook/DocBook.UI.Page.cls?KEY=GVSCO_ssworkflow).

> Se você já faz a edição de código no lado cliente (por exemplo, versionando com Git), certifique-se de compreender as consequências de também editar no lado servidor usando `isfs`. A [documentação](https://docs.intersystems.com/components/csp/docbook/DocBook.UI.Page.cls?KEY=GVSCO_intro) descreve as diferenças entre a edição client-side e server-side. Na dúvida, limite-se ao `isfs-readonly`, usando apenas o ícone de olho.

## A pasta 'Current'

Quando há uma pasta ou um workspace aberto no VS Code (inclusive multi-root), o Server Manager exibe um nó 'Current' no início da árvore, caso o workspace referencie algum servidor definido no Server Manager. O vínculo acontece automaticamente se as pastas do workspace foram adicionadas pelo Server Manager, conforme descrito acima. Se você trabalha no modo client-side, a configuração `objectscript.conn` precisa usar a propriedade `server`.

## Alterando e removendo servidores

Para gerenciar suas definições de servidor, inclusive o usuário com o qual a conexão é feita, [edite o arquivo JSON correspondente](https://code.visualstudio.com/docs/getstarted/settings).

1. No menu de contexto de um servidor, ou no menu '`...`' do canto superior direito do Server Manager, escolha `Edit Settings`. Isso abre o editor de configurações do VS Code já com o conteúdo filtrado.

![Editar configurações](images/README/editSettings.png)

2. Clique no link `Edit in settings.json`.

Neste exemplo, duas conexões foram definidas:

```json
"intersystems.servers": {
	"dev": {
		"webServer": {
			"scheme": "https",
			"host": "webhost.local",
			"port": 443,
			"pathPrefix": "/iris/dev"
		},
		"username": "alice",
		"description": "Servidor de desenvolvimento atendido pelo web host central via HTTPS"
	},
	"my-local": {
		"webServer": {
			"scheme": "http",
			"host": "127.0.0.1",
			"port": 52773
		},
		"description": "Minha instância local do IRIS"
	},
	"/default": "my-local"
}
```

O editor JSON oferece o [IntelliSense](https://code.visualstudio.com/docs/editor/intellisense) habitual enquanto você trabalha nessa estrutura.

Repare que é possível adicionar uma propriedade `description` a cada conexão. Ela é exibida no hover da árvore do Server Manager e ao lado da entrada quando um quickpick de servidores é usado.

Os servidores são exibidos no quickpick na ordem em que estão definidos no arquivo JSON. A exceção é o servidor cujo nome estiver no valor da propriedade `/default` (veja o exemplo acima): ele é mostrado em primeiro lugar.

### Autenticação com OAuth2

A partir da versão 3.14, uma definição de servidor pode usar OAuth2 / OpenID Connect em vez de usuário e senha. Para isso, adicione a propriedade `oauth2` à definição, informando o `authority` (URL do emissor no seu provedor de identidade) e o `clientId`. A propriedade opcional `scopes` acrescenta escopos além de `openid profile email`:

```json
"intersystems.servers": {
	"dev-oauth": {
		"webServer": {
			"scheme": "https",
			"host": "webhost.local",
			"port": 443
		},
		"oauth2": {
			"authority": "https://login.microsoftonline.com/SEU-TENANT-ID/v2.0",
			"clientId": "SEU-CLIENT-ID"
		}
	}
}
```

> Gravar a senha em texto puro na propriedade `password` está obsoleto e é fortemente desaconselhado. Prefira o botão de 'chave' no prompt de senha, que grava a credencial no cofre do sistema operacional.

---

## Notas técnicas

### Cores, favoritos e recentes

Esses recursos usam o armazenamento de estado global privado da extensão, no VS Code. Os dados não ficam no seu arquivo `settings.json`.

### A pasta 'All Servers'

A árvore `All Servers` respeita a configuração opcional `/default` no JSON de `intersystems.servers`.

Se um servidor estiver indicado em `/default`, ele é promovido ao topo da lista, que no restante é apresentada em ordem alfabética.

---

## Informações para desenvolvedores de extensões do VS Code - como utilizar o Server Manager

O pacote NPM [`@intersystems-community/intersystems-servermanager`](https://www.npmjs.com/package/@intersystems-community/intersystems-servermanager) define os tipos usados pela API exportada por esta extensão. Ele também declara algumas constantes.

Uma extensão XYZ que precise se conectar a servidores InterSystems deve incluir `"@intersystems-community/intersystems-servermanager": "^3.14.1"` no objeto `"devDependencies"` do seu `package.json`.

Ela também pode declarar o Server Manager como dependência no `package.json`, assim:

```json
  "extensionDependencies": [
    "consistem-sistemas.consistem-servermanager"
  ],
```

Como alternativa, o método `activate` da XYZ pode detectar se a extensão já está disponível e, se não estiver, oferecer sua instalação:

```ts
import * as serverManager from "@intersystems-community/intersystems-servermanager";
```

...

```ts
let extension = vscode.extensions.getExtension(serverManager.EXTENSION_ID);
if (!extension) {
	// Opcionalmente, peça permissão ao usuário
	// ...

	await vscode.commands.executeCommand(
		"workbench.extensions.installExtension",
		serverManager.EXTENSION_ID,
	);
	extension = vscode.extensions.getExtension(serverManager.EXTENSION_ID);
}
if (!extension.isActive) {
	await extension.activate();
}
```

> Neste fork, `serverManager.EXTENSION_ID` corresponde a `consistem-sistemas.consistem-servermanager`.

A XYZ pode então usar a API da extensão para obter as propriedades de uma definição de servidor:

```ts
const serverManagerApi: serverManager.ServerManagerAPI = extension.exports;
if (serverManagerApi && serverManagerApi.getServerSpec) {
	// programação defensiva
	const serverSpec: serverManager.IServerSpecWithAuth | undefined =
		await serverManagerApi.getServerSpec(serverName);
}
```

As credenciais não vêm preenchidas na especificação retornada. Elas são representadas pela propriedade `auth`, um objeto `Authorization` que abstrai tanto a autenticação básica (usuário e senha) quanto OAuth2. As propriedades `username` e `password` de `IServerSpec` estão obsoletas: use `auth.username` e obtenha as credenciais a partir de `auth`.

Para resolver as credenciais antes de fazer uma requisição, use um código como este, que também solicita o usuário caso ele esteja ausente:

```ts
if (serverSpec?.auth && !serverSpec.auth.resolved()) {
	const scopes = [serverSpec.name, serverSpec.auth.username];
	const account = serverManagerApi.getAccount(serverSpec);
	let session = await vscode.authentication.getSession(
		serverManager.AUTHENTICATION_PROVIDER,
		scopes,
		{ silent: true, account },
	);
	if (!session) {
		session = await vscode.authentication.getSession(
			serverManager.AUTHENTICATION_PROVIDER,
			scopes,
			{ createIfNone: true, account },
		);
	}
	if (session?.accessToken) {
		serverSpec.auth.resolve({
			accessToken: session.accessToken,
			username:
				session.scopes[1].toLowerCase() === "unknownuser"
					? ""
					: session.scopes[1],
		});
	}
}
```

Depois que `auth.resolved()` retornar verdadeiro, use `auth.credentials` ou `auth.httpAuthorizationHeader` para autenticar a requisição.

Para oferecer ao usuário um quickpick de servidores:

```ts
const serverName: string = await serverManagerApi.pickServer();
```

Para obter um array de nomes de servidores:

```ts
const allServerNames: serverManager.IServerName[] =
	await serverManagerApi.getServerNames();
```

Para detalhes atualizados da API, incluindo tipos de retorno e parâmetros disponíveis, consulte o código-fonte do método `commonActivate` da extensão [aqui](https://github.com/consistem/intersystems-servermanager/blob/master/src/commonActivate.ts) e as definições de tipos em [`types/index.d.ts`](types/index.d.ts).

---

<div>Ícone da barra de atividades feito por <a href="https://www.freepik.com" title="Freepik">Freepik</a>, de <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
