## post/collisions
Cadastra as collisions
<br />
`(1, 2) (2, 3) (1, 4) (5, 6) (6, 7)`
<br />
`(1, 2) (2, 3)  (9, 6) (6, 7)`


## get/collisions
retorna lista de collisions cadastradas com suas respectivas networks
<br />
`[{`<br />
`	"collision": "(1, 2) (2, 3) (1, 4) (5, 6) (6, 7)",`<br />
`	"network": [`<br />
`		["1", "2", "3", "4"],`<br />
`		["5", "6", "7"]`<br />
`	]`<br />
`}]`<br />


## delete/collisions
apaga todas as collisions salvas

## configuraçao
`npm install`

## run
`node server`

