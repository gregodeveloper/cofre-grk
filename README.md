# 🔐 Cofre Task — Minigame de Assalto (Multi-Framework)

O **Cofre Task** é um sistema de minigame de alta performance e imersão para servidores FiveM. O desafio exige que o jogador resolva uma equação matemática dinâmica para obter o PIN e, em seguida, utilize habilidade mecânica para girar o volante do cofre.

## ✨ Funcionalidades

* **Sistema de Duas Etapas**: O jogador deve primeiro decifrar a senha no teclado numérico e depois girar o volante para abrir.
* **Variedade de Desafios**: Conta com mais de 50 equações matemáticas integradas no código (script.js), garantindo que os roubos nunca sejam repetitivos.
* **Mecânica de Giro Realista**: Requer 2.5 voltas completas (900°) usando as teclas **A** e **D** para destravar o mecanismo.
* **Totalmente Otimizado**: Construído com foco em baixo consumo (resmon) e interface NUI moderna.
* **Multi-Framework**: Compatível com vRP, ESX, QBCore ou bases Standalone, pois utiliza exports independentes.

## 🚀 Instalação

1.  Crie uma pasta chamada `cofre_task` no seu diretório de resources.
2.  Insira os arquivos `client.lua`, `fxmanifest.lua` e a pasta `html` dentro dela.
3.  Adicione `ensure cofre_task` ao seu arquivo `server.cfg`.

## 🛠️ Como Utilizar (Integração)

Você pode chamar o minigame de qualquer script de roubo ou sistema de interação utilizando o export registrado.

### Exemplo via Export (LUA)
```lua
-- Parâmetros: id (identificador do cofre), mode (tipo/dificuldade)
exports['cofre_task']:AbrirMinigameCofre("banco_central", "dificil")
Exemplo via TriggerEvent (LUA)
Lua
TriggerEvent("cofre:AbrirMinigame", "cofre_01", "normal")
🔗 Resposta de Sucesso
Após o jogador completar o desafio com sucesso, o script dispara um evento para o servidor para que você possa recompensá-lo:

Evento: inventory:RobberySuccess

Parâmetros recebidos: id, mode

🎮 Controles
Teclas 0-9: Digitar a senha no teclado.

Enter: Confirmar o PIN inserido.

Teclas A / D: Girar o volante (após o PIN ser aceito).

ESC: Fechar o minigame.

🛠️ Desenvolvido por GrK Development • Inovação para o seu Servidor
