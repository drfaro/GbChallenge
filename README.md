post/collisions
(1, 2) (2, 3) (1, 4) (5, 6) (6, 7)
(1, 2) (2, 3)  (9, 6) (6, 7)
//cadastra as collisions

get/collisions
[{
	"collision": "(1, 2) (2, 3) (1, 4) (5, 6) (6, 7)",
	"network": [
		["1", "2", "3", "4"],
		["5", "6", "7"]
	]
}]
//retorna lista de collisions cadastradas com suas respectivas networks

delete/collisions
//apaga todas as collisions salvas

configuraçao
npm install

run
node server

