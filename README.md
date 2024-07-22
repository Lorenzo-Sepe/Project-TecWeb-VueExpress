# Project-TecWeb-VueExpress

## Organizazione Progetto 

La web app è separata in due cartelle, distinguendo Backend e Frontend.
L'app può essere eseguita a partire dalle cartelle in maniera indipendente o dalla dalla cartella Client.

## Dipendenze

Il progetto è stato compilato usando il package manager [bun](https://bun.sh/) per via della sua velocità. Per istallarlo occorre eseguire il comando:

```
npm install -g bun
```

La sistassi dei comandi bun è compatibile sia con npm e yarn, rendedo la migrazione estremamente semplice.


### Da cartelle separate

1. Aprire la cartella Server nel terminale,
2. Eseguire questo comando per le dipendenze,

```
bun install
```

3. Eseguire questo comando per far partire il server

```
bun start
```

4. Il server è in ascolto sulla porta 3000 di localhost.

5. Aprire la cartella Client nel terminale,
6. Eseguire questo comando per le dipendenze,

```
bun install
```

7. Eseguire il comando