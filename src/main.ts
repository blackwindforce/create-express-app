import * as C from "node:crypto";

//

import * as E from "fp-ts/lib/Either.js";
import * as RTE from "fp-ts/lib/ReaderTaskEither.js";
import * as RA from "fp-ts/lib/ReadonlyArray.js";
import * as SRTE from "fp-ts/lib/StateReaderTaskEither.js";
import * as TE from "fp-ts/lib/TaskEither.js";
import { flow, identity, pipe } from "fp-ts/lib/function.js";

//

type S = Readonly<Record<string, unknown>>;
type R = Readonly<{ client: typeof client; service: typeof service }>;
type E = unknown;
type A = readonly Readonly<{ id: C.UUID; name: string }>[];

//

const client = {
  raw: () =>
    C.randomInt(2)
      ? Promise.resolve(
          RA.of({ id: C.randomUUID(), name: C.randomBytes(4).toString("hex") })
        )
      : Promise.reject(new Error()),
};

//

const service = {
  findMany: (): RTE.ReaderTaskEither<R, E, A> =>
    pipe(
      RTE.ask<R>(),
      RTE.chainTaskEitherK((r) => TE.tryCatch(() => r.client.raw(), identity))
    ),
};

//

const controller = {
  list: (): SRTE.StateReaderTaskEither<S, R, E, A> =>
    pipe(
      SRTE.ask<S, R>(),
      SRTE.chainReaderTaskEitherK((r) => r.service.findMany()),
      SRTE.chainFirst((a) => SRTE.modify((s) => ({ ...s, a })))
    ),
};

//

const program = SRTE.execute({})(controller.list())({ client, service });

//

await program().then(flow(E.toUnion, console.log));
