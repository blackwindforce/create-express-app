import { randomInt, randomUUID, type UUID } from "node:crypto";

import * as E from "fp-ts/Either";
import * as RTE from "fp-ts/es6/ReaderTaskEither.js";
import * as RA from "fp-ts/es6/ReadonlyArray.js";
import * as SRTE from "fp-ts/es6/StateReaderTaskEither.js";
import * as TE from "fp-ts/es6/TaskEither.js";
import { flow, identity, pipe } from "fp-ts/es6/function.js";

type S = Readonly<Record<string, unknown>>;
type R = Readonly<{ repository: typeof repository; service: typeof service }>;
type E = unknown;
type A = ReadonlyArray<Readonly<{ id: UUID }>>;

const repository = {
  select: () =>
    randomInt(2)
      ? Promise.resolve(RA.of({ id: randomUUID() }))
      : Promise.reject(new Error()),
};

const service = {
  query: (): RTE.ReaderTaskEither<R, E, A> =>
    pipe(
      RTE.ask<R>(),
      RTE.chainTaskEitherK((r) =>
        TE.tryCatch(() => r.repository.select(), identity),
      ),
    ),
};

const controller = {
  list: (): SRTE.StateReaderTaskEither<S, R, E, A> =>
    pipe(
      SRTE.ask<S, R>(),
      SRTE.chainReaderTaskEitherK((r) => r.service.query()),
      SRTE.chainFirst((a) => SRTE.modify((s) => ({ ...s, a }))),
    ),
};

const main = SRTE.execute({})(controller.list())({ repository, service });

await main().then(flow(E.toUnion, console.log));
