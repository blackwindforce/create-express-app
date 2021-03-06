import fs from "fs/promises";

//

import * as E from "fp-ts/Either";
import { pipe } from "fp-ts/function";
import * as RTE from "fp-ts/ReaderTaskEither";
import * as TE from "fp-ts/TaskEither";

//

type FsPromises = typeof fs;

interface Context {
  fs: FsPromises;
}

//

const readFile = (path: string): RTE.ReaderTaskEither<Context, Error, string> =>
  pipe(
    RTE.asks((context: Context) => context.fs),
    RTE.chainTaskEitherK((fs) =>
      TE.tryCatch(async () => await fs.readFile(path, "utf8"), E.toError)
    )
  );

const parseJson = (a: string): E.Either<Error, E.Json> =>
  E.parseJSON(a, E.toError);

//

interface PackageJson extends E.JsonRecord {
  name: string;
}

const getPackage = pipe(readFile("package.json"), RTE.chainEitherK(parseJson));

const getPackageName = pipe(
  getPackage,
  RTE.map((a) => (a as PackageJson).name)
);

//

const context: Context = { fs };

RTE.run(getPackageName, context)
  .then(E.fold(console.error, console.log))
  .catch(console.error);
