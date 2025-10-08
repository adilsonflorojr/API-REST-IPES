
## 1. Relacionamentos 

### users - cities
- N users pertence a 1 city (`city_id`)  
- 1 city tem N users (`city_id`)  

### users - trees
- N trees pertence a 1 user (`user_id`)  
- 1 user tem N trees (`user_id`)  

### trees - cities
- N trees pertence a 1 city (`city_id`)  
- 1 city tem N trees (`city_id`)  

### trees - photos
- N photos pertence a 1 tree (`tree_id`)  
- 1 tree tem N photos (`tree_id`)  

### users - photos
- N photos pertence a 1 user (`user_id`)  
- 1 user tem N photos (`user_id`)  

### moderations - users
- N moderations pertence a 1 user (`user_id`)  
- 1 user tem N moderations (`user_id`)  

### moderations - trees
- N moderations pertence a 1 tree (`tree_id`)  
- 1 tree tem N moderations (`tree_id`)  

### moderations - cities
- N moderations pertence a 1 city (`city_id`)  
- 1 city tem N moderations (`city_id`)  

### blocks - users (bloqueios feitos)
- N blocks pertence a 1 user (quem bloqueou) (`user_id`)  
- 1 user tem N blocks (feitos) (`user_id`)  

### blocks - users (bloqueios recebidos)
- N blocks pertence a 1 user (bloqueado) (`blocked_user_id`)  
- 1 user tem N blocks (recebidos) (`blocked_user_id`)  


---

## 2. Rotas da API

### 2.1 Usuários (`/usuarios`)

- `POST /usuarios/register`  
  **Body:** full_name, email, username, password, city_id  
  **Descrição:** Cadastrar um novo usuário  
  **Permissão: **qualquer usuário (não autenticado).

- `POST /usuarios/login`  
  **Body:** username, password  
  **Descrição:** Login do usuário para gerar um devido Token JWT para rotas restritas.
  **Permissão: **qualquer usuário (não autenticado).  

- `GET /usuarios/`  
  **Query:** page, limit.  (Paginação)  
  **Descrição:** Listar todos os usuários.     
  **Permissão:** Administrador.

- `GET /usuarios/:id`  
  **Path:** id  
  **Descrição:** Obter usuário pelo ID do usuário. 
  **Permissão:** Administrador.

- `PATCH /usuarios/:id`  
  **Path:** id  
  **Body:** campos para atualizar  
  **Descrição:** Atualizar usuário pelo ID do usuário. 
  **Adicionais:** Podendo administrador transformar usuários comuns em administrador.
  **Permissão:** Usuário próprio ou administrador.

- `DELETE /usuarios/:id`  
  **Path:** id  
  **Descrição:** Deletar usuário pelo ID do usuário. 
  **Permissão:** Usuário comum ou administrador. 

- `GET /usuarios/meus-bloqueios`  
  **Query:** page, limit.  (Paginação)  
  **Descrição:** Listar bloqueios do usuário autenticado  
  **Permissão:** Usuário comum

- `POST /usuarios/bloqueios/:id`  
  **Path:** id  
  **Body:** block_reason  
  **Descrição:** Bloquear usuário pelo ID do usuário  
  **Permissão:** Usuário comum.

- `GET /usuarios/bloqueios/:id`  
  **Path:** id  
  **Descrição:** Obter bloqueio pelo ID do bloqueio 
  **Permissão:** Administrador.  

- `DELETE /usuarios/bloqueios/:id`  
  **Path:** id  
  **Descrição:** Remover bloqueio pelo ID do bloqueio
  **Permissão:** Usuário comum.  

---

### 2.2 Árvores (`/ipes`)

- `GET /ipes/`  
  **Query:** page, limit.  (Paginação)  
  **Descrição:** Listar árvores acessíveis ao usuário autenticado.
  **Permissão:** Usuário comum ou administrador. 

- `POST /ipes/`  
  **Body:** coordinates, street, reference_point, flower_color, tree_size, age, comment  
  **Descrição:** Criar nova árvore 
  **Permissão:** Usuário comum.

- `POST /ipes/filtrar`  
  **Body:** street, reference_point, flower_color, tree_size  
  **Descrição:** Filtrar árvores por critérios definidos acima
  **Permissão:** Usuário comum ou administrador.  

- `GET /ipes/:id`  
  **Path:** id  
  **Descrição:** Obter árvore pelo ID da árvore ipê
  **Permissão:** Usuário comum ou administrador.

- `PATCH /ipes/:id`  
  **Path:** id  
  **Body:** campos para atualizar  
  **Descrição:** Atualizar árvore pelo id da árvore ipê. 
  **Permissão:** Usuário comum ou administrador. 

- `DELETE /ipes/:id`  
  **Path:** id  
  **Descrição:** Deletar árvore pelo id da árvore ipê. 
  **Permissão:** Usuário comum ou administrador.  

---

### 2.3 Fotos

- `POST /ipes/foto`  
  **form-data:** tree_id, photo_description, photo(file) enviado pelo body.  
  **Descrição:** Enviar foto de uma árvore ipê específica  
  **Permissão:** Usuário comum.

- `GET /ipes/foto/:id`  
  **Path:** id   
  **Query:** page, limit.  (Paginação)    
  **Descrição:** Listar todas as fotos de uma árvore pelo id da árvore ipê.
  **Permissão:** Usuário comum ou administrador.

- `DELETE /ipes/foto/:id`  
  **Path:** id   
  **Descrição:** Deletar foto pelo id da foto. 
  **Permissão:** Usuário comum ou administrador. 

---

### 2.4 QR Code

- `GET /ipes/qrcode/:id`  
  **Path:** id 
  **Descrição:** Gerar QR Code da árvore ipê através do id e armazená-lo na pasta qrcode.
  **Permissão:** Usuário comum ou administrador.  

---

### 2.5 Moderações

- `POST /ipes/moderacao/:id`  
  **Path:** id   
  **Body:** error_comment, status_marking  
  **Descrição:** Reportar erro em árvore pelo id da árvore ipê.
  **Permissão:** Usuário comum ou administrador. 

- `GET /ipes/moderacao/:id`  
  **Path:** id  
  **Query:**  page, limit.  (Paginação)   
  **Descrição:** Listar moderações de uma árvore específica
  **Permissão:**  Administrador.  

- `GET /ipes/admin/moderacao/:id`  
  **Path:** id  
  **Query:**  page, limit.  (Paginação)    
  **Descrição:** Listar moderações de uma cidade pelo id da cidade 
  **Permissão:** Administrador. 

- `PATCH /ipes/moderacao/:id`  
  **Path:** id   
  **Body:** status_marking    
  **Descrição:** Alterar status de moderação pelo id da moderação 
  **Permissão:** Administrador. 

- `DELETE /ipes/moderacao/:id`  
  **Path:** id   
  **Descrição:** Deletar moderação pelo id da moderação 
  **Permissão:** Administrador. 

---

## 3. Middlewares
- `authenticate` -> Se o JWT estiver correto, extrai o id do usuário e encontra o user  
- `authorizeAdmin` -> Permite avançar apenas administradores  
- `authorizeUpdateUser`-> Permite avançar para atualizar usuário apenas se o solicitante for o próprio usuário ou um administrador.
- `authorizeDeleteUser` -> Permite avançar para deletar usuário apenas se o solicitante for o próprio usuário ou um administrador.
- `validateRegisterBody` -> Valida dados enviados ao registrar usuário e retorna erros se tiver.  
- `checkUniqueUserFields` -> Garante que email e username sejam únicos  
- `checkUniqueUserFieldsForUpdate`-> Garante que email e username sejam únicos  
- `checkUserExists` -> Verifica se usuário existe.  
- `preventUserChangingAdminStatus` -> Impede que um usuário comum altere o campo isAdmin para true.
- `preventBlockingAdmin` -> Impede que usuários bloqueiem administradores.
- `preventBlockingSelf` -> Previne que um usuário bloqueie a si próprio.
- `checkUserBlock` -> Verifica se usuário já está bloqueado  
- `resolveCity` -> Associa cidade ao usuário
- `verifyPassword` -> Confere se a senha está correta 
- `validateLoginBody` -> Valida campos no login  
- `validateUpdateUserBody` -> Valida campos na atualização do usuário  
- `checkCityUpdateFields` -> Só permite alterar o nome da cidade (city_name) se o estado (state) também for alterado.
- `pagination` -> Paginação
- `uploads` -> Middleware para configuração de upload de fotos de árvores ipês 
- `loadUserBlocks` -> Carrega bloqueios relacionados com o usuário autenticado
- `requireUserCity` -> Garante que o usuário tenha cidade definida  
- `filterBuilder` -> Cria filtro baseado nas informações que o usuário enviou. 
- `excludeBlockedUsersFromFilter` -> Exclui usuários bloqueados dos resultados  
- `blockIfUserOrOwnerBlocked` -> Impede ação se o dono da árvore estiver bloqueado  
- `blockIfTreeFromAnotherCity` -> Impede ação em árvores pertencentes a outra cidade. 
- `loadTree` -> Carrega árvore pelo params.id da árvore ipê.  
- `incrementTreeViewCount` -> Incrementa contador de visualizações  
- `validateTreeBody` -> Valida dados enviados ao criar árvore  
- `verifyTreeBelongsToUser` -> Verifica se a árvore pertence ao usuário  
- `loadPhoto` -> Carrega foto pelo params.id da foto  
- `authorizeDeletePhotoOwnerOrAdmin` -> Permite deletar uma foto apenas se o solicitante for o dono da foto ou um administrador. 
- `generateQrCodeImage` -> Gera o QR Code associado a uma árvore específica.  
- `validateModerationBody` -> Valida dados enviados na moderação  
- `validateModerationStatusMarking` -> Valida status da moderação  
- `findModeration` -> Localiza moderação pelo ID da moderação 
- `loadAccessibleTrees`-> Carrega árvores acessíveis ao usuário  
- `filterBlockedUsers` -> Filtra usuários bloqueados  
- `blockReportIfYourOwnTree` -> Previne que um usuário registre uma moderação para sua própria árvore.
- `checkAdminCityRestriction` -> Verifica restrições de cidade aplicáveis a administradores.
- `prepareTreeFilters` -> Prepara os critérios de filtragem para pesquisa de árvores.

---

## 4. Controllers

---
- `createUser` -> Cria usuário
- `loginUser` -> Autentica usuário
- `getAllUsers` -> Lista usuários
- `updateUser` -> Atualiza usuário
- `deleteUser` -> Remove usuário
- `blockUser` -> Bloqueia usuário
- `getUserBlocks` -> Lista bloqueios do usuário
- `createTree` -> Cria árvore
- `getTreesByUserCity` -> Lista árvores acessíveis
- `updateTree` -> Atualiza árvore
- `deleteTree` -> Deleta árvore
- `getTreeById` -> Detalhes da árvore
- `saveAndSendQRCode` -> Gera QR Code da árvore ipê
- `filterTrees` -> Busca árvores usando filtros já preparados
- `sendPhoto` -> Envia foto de árvore
- `getPhotosByTreeId` -> Lista fotos de árvore
- `deletePhoto` -> Deleta foto
- `reportTreeError` -> Reporta erro em árvore ipê
- `getModerationsByTreeId` -> Lista moderações da árvore ipê
- `getModerationsByCity` -> Lista moderações de cidade
- `changeModerationStatus` -> Atualiza status da moderação
- `deleteTreeModerationById` -> Remove moderação
- `getAllModerations` -> Lista todas as moderações


