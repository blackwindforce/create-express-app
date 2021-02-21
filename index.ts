import fs from "fs/promises";

import * as E from "fp-ts/Either";
import * as RTE from "fp-ts/ReaderTaskEither";
import * as TE from "fp-ts/TaskEither";
import { pipe } from "fp-ts/function";

interface Env {
  fs: typeof fs;
}

interface PackageJson extends E.JsonRecord {
  name: string;
}

const getPackageName = pipe(
  RTE.asks((env: Env) => env.fs),
  RTE.chainTaskEitherK((fs) =>
    TE.tryCatch(
      async () => await fs.readFile("package.json", "utf8"),
      E.toError
    )
  ),
  RTE.chainEitherK((a) => E.parseJSON(a, E.toError)),
  RTE.map((a) => (a as PackageJson).name)
);

RTE.run(getPackageName, { fs })
  .then(E.fold(console.error, console.log))
  .catch(console.error);
