local cofreAberto = false
local cofreIdAtual = nil
local cofreModeAtual = nil

-- Função para abrir o minigame do cofre
function AbrirMinigameCofre(id, mode)
	cofreIdAtual = id
	cofreModeAtual = mode
	SetNuiFocus(true, true)
	SendNUIMessage({ action = "open" })
	cofreAberto = true
end

-- Export para outros scripts chamarem
exports("AbrirMinigameCofre", AbrirMinigameCofre)

-- Evento alternativo via TriggerEvent
RegisterNetEvent("cofre:AbrirMinigame")
AddEventHandler("cofre:AbrirMinigame", function(id, mode)
	AbrirMinigameCofre(id, mode)
end)

-- Callback quando o cofre é fechado
RegisterNUICallback('fechar', function(data, cb)
	SetNuiFocus(false, false)
	cofreAberto = false
	cofreIdAtual = nil
	cofreModeAtual = nil
	cb('ok')
end)

-- Callback quando o cofre é aberto com sucesso
RegisterNUICallback('sucesso', function(data, cb)
	local id = cofreIdAtual
	local mode = cofreModeAtual
	
	SetNuiFocus(false, false)
	cofreAberto = false
	
	if id and mode then
		TriggerServerEvent("inventory:RobberySuccess", id, mode)
	end
	
	cofreIdAtual = nil
	cofreModeAtual = nil
	cb('ok')
end)

