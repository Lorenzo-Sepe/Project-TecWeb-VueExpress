# Project-TecWeb-VueExpress

## Organizazione Progetto 

La web app è separata in due cartelle, distinguendo Backend e Frontend.
L'app deve essere avviata a partire da le due cartelle usando gli script definiti dai file package.json.

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

``` 
bun run dev
```

8. Il client è in esecuzione su http://localhost:5173