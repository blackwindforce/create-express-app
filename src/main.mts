import { randomInt, randomUUID, type UUID } from "node:crypto";

import * as E from "fp-ts/lib/Either.js";
import * as RTE from "fp-ts/lib/ReaderTaskEither.js";
import * as RA from "fp-ts/lib/ReadonlyArray.js";
import * as SRTE from "fp-ts/lib/StateReaderTaskEither.js";
import * as TE from "fp-ts/lib/TaskEither.js";
import { flow, identity, pipe } from "fp-ts/lib/function.js";

type S = Readonly<Record<string, unknown>>;
type R = Readonly<{ repository: typeof repository; service: typeof service }>;
type E = unknown;
type A = readonly Readonly<{ id: UUID }>[];

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
