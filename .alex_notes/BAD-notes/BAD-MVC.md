# MVC

MVC is the a common architecture embraced by different frameworks.

There are 3 tiered architecture:

Model(Service): Model manages the data-accessing and business logic for our application.
View: View present the data provided by Model to the client.
Controller: Controller takes the input, validates input and passes the data to Model.

總的來說，由以往一條 route 負責 res.body, sql.query, 運算, 再回應到 sql or FE，拆細成 3 部份：分別是 service, Controller, and view.

Service 主要負責所有涉及 database 的 accessing query；Controller 主要負責以往所有 route 的接收、運算、回應。而原有的 routes.ts 則類似於總掣的存在。

以下為例子：

原版：

```ts
// this is pokemonRoutes.ts
import express from "express";
import { pokemonController } from "../server";
export const pokemonRoutes = express.Router();
pokemonRoutes.get("/", getAllPokemon);

async function getAllPokemon(req: Request, res: Response) {
  try {
    const pokemonArr = (
      await dbClient.query<Pokemon>(
        /*sql */ `SELECT id, code, name FROM pokemon`
      )
    ).rows;
    console.log(pokemonArr[0]);
    res.json(pokemonArr);
  } catch (err) {
    console.error(err.message);
    res.json(500).json({ message: "internal server error" });
  }
}
```

MVC 版：

```ts
// this is pokemonRoutes.ts
import express from "express";
import { pokemonController } from "../server";
export const pokemonRoutes = express.Router();
pokemonRoutes.get("/", pokemonController.getAllPokemon);
```

```ts
// this is pokemonController.ts
import type { Request, Response } from "express";
import { PokemonService } from "../services/PokemonService";
import { logger } from "../utils/logger";

export class PokemonController {
  constructor(private service: PokemonService) {}
  // 類似於oop

  getAllPokemon = async (req: Request, res: Response) => {
    const data = await this.service.getAllPokemon();
    res.json(data);
  };

  searchPokemonByCode = async (req: Request, res: Response) => {
    // get code from params
    // validation on code. If fail, error resp
    // call service searchPokemonByCode
    // res.json(result)

    try {
      const code = parseInt(req.params.code, 10);
      if (isNaN(code)) {
        res.status(400).json({ message: "invalid pokemon code" });
        return;
      }

      const pokemon = await this.service.searchPokemonByCode(code);
      res.json({ pokemon });
    } catch (err) {
      logger.error(err.message);
      res.status(500).json({ message: "interval server error" });
    }
  };
}
```

```ts
// this is pokemonService.ts
import type { Client } from "pg";
import { Pokemon } from "./models";

export class PokemonService {
  constructor(private client: Client) {}
  // 類似於oop

  async getAllPokemon() {
    return (
      await this.client.query<Pokemon>(
        /*sql */ `SELECT id, code, name FROM pokemon`
      )
    ).rows;
  }

  async searchPokemonByCode(code: number) {
    return {} as Pokemon;
  }
}
```

```ts
// this is main.ts
...
import { PokemonService } from "./services/PokemonService";
import { PokemonController } from "./controllers/PokemonController";

const pokemonService = new PokemonService(dbClient);
export const pokemonController = new PokemonController(pokemonService);

import { pokemonRoutes } from "./routers/pokemonRoutes";
app.use("/pokemon", pokemonRoutes);
...
```

---

## Why MVC

就以上例子，會見到 non-mvc 非常簡單直接，一個 routes.ts 對應一個 router 功能。如果 routes 小巧還好，但如果具有複雜性的功能同時，又有超長的 query，將會對於 maintain 一大挑戰。將需要從長長 code 海中找出哪句屬於此 route 的 query／運算…

其次，有效地分割所有功課，從而 isolate，有助於 testing。

因此將 routes.ts 寫成 MVC 格式會有助於 maintain。而且很接近 oop 格式，建議經常寫成 MVC 格式，培養習慣。
