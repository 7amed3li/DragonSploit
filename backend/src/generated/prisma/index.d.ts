
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Organization
 * 
 */
export type Organization = $Result.DefaultSelection<Prisma.$OrganizationPayload>
/**
 * Model Membership
 * 
 */
export type Membership = $Result.DefaultSelection<Prisma.$MembershipPayload>
/**
 * Model Invitation
 * 
 */
export type Invitation = $Result.DefaultSelection<Prisma.$InvitationPayload>
/**
 * Model Target
 * 
 */
export type Target = $Result.DefaultSelection<Prisma.$TargetPayload>
/**
 * Model Scan
 * 
 */
export type Scan = $Result.DefaultSelection<Prisma.$ScanPayload>
/**
 * Model Vulnerability
 * 
 */
export type Vulnerability = $Result.DefaultSelection<Prisma.$VulnerabilityPayload>
/**
 * Model ScanConfiguration
 * 
 */
export type ScanConfiguration = $Result.DefaultSelection<Prisma.$ScanConfigurationPayload>
/**
 * Model Report
 * 
 */
export type Report = $Result.DefaultSelection<Prisma.$ReportPayload>
/**
 * Model ApiToken
 * 
 */
export type ApiToken = $Result.DefaultSelection<Prisma.$ApiTokenPayload>
/**
 * Model AuditLog
 * 
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  ADMIN: 'ADMIN',
  MEMBER: 'MEMBER',
  BILLING_MANAGER: 'BILLING_MANAGER'
};

export type Role = (typeof Role)[keyof typeof Role]


export const InvitationStatus: {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  EXPIRED: 'EXPIRED'
};

export type InvitationStatus = (typeof InvitationStatus)[keyof typeof InvitationStatus]


export const ScanStatus: {
  PENDING: 'PENDING',
  QUEUED: 'QUEUED',
  RUNNING: 'RUNNING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  CANCELED: 'CANCELED'
};

export type ScanStatus = (typeof ScanStatus)[keyof typeof ScanStatus]


export const Severity: {
  INFO: 'INFO',
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  CRITICAL: 'CRITICAL'
};

export type Severity = (typeof Severity)[keyof typeof Severity]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type InvitationStatus = $Enums.InvitationStatus

export const InvitationStatus: typeof $Enums.InvitationStatus

export type ScanStatus = $Enums.ScanStatus

export const ScanStatus: typeof $Enums.ScanStatus

export type Severity = $Enums.Severity

export const Severity: typeof $Enums.Severity

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.organization`: Exposes CRUD operations for the **Organization** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Organizations
    * const organizations = await prisma.organization.findMany()
    * ```
    */
  get organization(): Prisma.OrganizationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.membership`: Exposes CRUD operations for the **Membership** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Memberships
    * const memberships = await prisma.membership.findMany()
    * ```
    */
  get membership(): Prisma.MembershipDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.invitation`: Exposes CRUD operations for the **Invitation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Invitations
    * const invitations = await prisma.invitation.findMany()
    * ```
    */
  get invitation(): Prisma.InvitationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.target`: Exposes CRUD operations for the **Target** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Targets
    * const targets = await prisma.target.findMany()
    * ```
    */
  get target(): Prisma.TargetDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.scan`: Exposes CRUD operations for the **Scan** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Scans
    * const scans = await prisma.scan.findMany()
    * ```
    */
  get scan(): Prisma.ScanDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.vulnerability`: Exposes CRUD operations for the **Vulnerability** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Vulnerabilities
    * const vulnerabilities = await prisma.vulnerability.findMany()
    * ```
    */
  get vulnerability(): Prisma.VulnerabilityDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.scanConfiguration`: Exposes CRUD operations for the **ScanConfiguration** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ScanConfigurations
    * const scanConfigurations = await prisma.scanConfiguration.findMany()
    * ```
    */
  get scanConfiguration(): Prisma.ScanConfigurationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.report`: Exposes CRUD operations for the **Report** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reports
    * const reports = await prisma.report.findMany()
    * ```
    */
  get report(): Prisma.ReportDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.apiToken`: Exposes CRUD operations for the **ApiToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ApiTokens
    * const apiTokens = await prisma.apiToken.findMany()
    * ```
    */
  get apiToken(): Prisma.ApiTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.16.2
   * Query Engine version: 1c57fdcd7e44b29b9313256c76699e91c3ac3c43
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Organization: 'Organization',
    Membership: 'Membership',
    Invitation: 'Invitation',
    Target: 'Target',
    Scan: 'Scan',
    Vulnerability: 'Vulnerability',
    ScanConfiguration: 'ScanConfiguration',
    Report: 'Report',
    ApiToken: 'ApiToken',
    AuditLog: 'AuditLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "organization" | "membership" | "invitation" | "target" | "scan" | "vulnerability" | "scanConfiguration" | "report" | "apiToken" | "auditLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Organization: {
        payload: Prisma.$OrganizationPayload<ExtArgs>
        fields: Prisma.OrganizationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrganizationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrganizationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          findFirst: {
            args: Prisma.OrganizationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrganizationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          findMany: {
            args: Prisma.OrganizationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>[]
          }
          create: {
            args: Prisma.OrganizationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          createMany: {
            args: Prisma.OrganizationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrganizationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>[]
          }
          delete: {
            args: Prisma.OrganizationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          update: {
            args: Prisma.OrganizationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          deleteMany: {
            args: Prisma.OrganizationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrganizationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrganizationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>[]
          }
          upsert: {
            args: Prisma.OrganizationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          aggregate: {
            args: Prisma.OrganizationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrganization>
          }
          groupBy: {
            args: Prisma.OrganizationGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrganizationGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrganizationCountArgs<ExtArgs>
            result: $Utils.Optional<OrganizationCountAggregateOutputType> | number
          }
        }
      }
      Membership: {
        payload: Prisma.$MembershipPayload<ExtArgs>
        fields: Prisma.MembershipFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MembershipFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MembershipPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MembershipFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MembershipPayload>
          }
          findFirst: {
            args: Prisma.MembershipFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MembershipPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MembershipFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MembershipPayload>
          }
          findMany: {
            args: Prisma.MembershipFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MembershipPayload>[]
          }
          create: {
            args: Prisma.MembershipCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MembershipPayload>
          }
          createMany: {
            args: Prisma.MembershipCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MembershipCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MembershipPayload>[]
          }
          delete: {
            args: Prisma.MembershipDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MembershipPayload>
          }
          update: {
            args: Prisma.MembershipUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MembershipPayload>
          }
          deleteMany: {
            args: Prisma.MembershipDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MembershipUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MembershipUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MembershipPayload>[]
          }
          upsert: {
            args: Prisma.MembershipUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MembershipPayload>
          }
          aggregate: {
            args: Prisma.MembershipAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMembership>
          }
          groupBy: {
            args: Prisma.MembershipGroupByArgs<ExtArgs>
            result: $Utils.Optional<MembershipGroupByOutputType>[]
          }
          count: {
            args: Prisma.MembershipCountArgs<ExtArgs>
            result: $Utils.Optional<MembershipCountAggregateOutputType> | number
          }
        }
      }
      Invitation: {
        payload: Prisma.$InvitationPayload<ExtArgs>
        fields: Prisma.InvitationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InvitationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InvitationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload>
          }
          findFirst: {
            args: Prisma.InvitationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InvitationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload>
          }
          findMany: {
            args: Prisma.InvitationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload>[]
          }
          create: {
            args: Prisma.InvitationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload>
          }
          createMany: {
            args: Prisma.InvitationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InvitationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload>[]
          }
          delete: {
            args: Prisma.InvitationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload>
          }
          update: {
            args: Prisma.InvitationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload>
          }
          deleteMany: {
            args: Prisma.InvitationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InvitationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.InvitationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload>[]
          }
          upsert: {
            args: Prisma.InvitationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload>
          }
          aggregate: {
            args: Prisma.InvitationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInvitation>
          }
          groupBy: {
            args: Prisma.InvitationGroupByArgs<ExtArgs>
            result: $Utils.Optional<InvitationGroupByOutputType>[]
          }
          count: {
            args: Prisma.InvitationCountArgs<ExtArgs>
            result: $Utils.Optional<InvitationCountAggregateOutputType> | number
          }
        }
      }
      Target: {
        payload: Prisma.$TargetPayload<ExtArgs>
        fields: Prisma.TargetFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TargetFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TargetPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TargetFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TargetPayload>
          }
          findFirst: {
            args: Prisma.TargetFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TargetPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TargetFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TargetPayload>
          }
          findMany: {
            args: Prisma.TargetFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TargetPayload>[]
          }
          create: {
            args: Prisma.TargetCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TargetPayload>
          }
          createMany: {
            args: Prisma.TargetCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TargetCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TargetPayload>[]
          }
          delete: {
            args: Prisma.TargetDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TargetPayload>
          }
          update: {
            args: Prisma.TargetUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TargetPayload>
          }
          deleteMany: {
            args: Prisma.TargetDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TargetUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TargetUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TargetPayload>[]
          }
          upsert: {
            args: Prisma.TargetUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TargetPayload>
          }
          aggregate: {
            args: Prisma.TargetAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTarget>
          }
          groupBy: {
            args: Prisma.TargetGroupByArgs<ExtArgs>
            result: $Utils.Optional<TargetGroupByOutputType>[]
          }
          count: {
            args: Prisma.TargetCountArgs<ExtArgs>
            result: $Utils.Optional<TargetCountAggregateOutputType> | number
          }
        }
      }
      Scan: {
        payload: Prisma.$ScanPayload<ExtArgs>
        fields: Prisma.ScanFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ScanFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ScanFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanPayload>
          }
          findFirst: {
            args: Prisma.ScanFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ScanFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanPayload>
          }
          findMany: {
            args: Prisma.ScanFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanPayload>[]
          }
          create: {
            args: Prisma.ScanCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanPayload>
          }
          createMany: {
            args: Prisma.ScanCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ScanCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanPayload>[]
          }
          delete: {
            args: Prisma.ScanDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanPayload>
          }
          update: {
            args: Prisma.ScanUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanPayload>
          }
          deleteMany: {
            args: Prisma.ScanDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ScanUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ScanUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanPayload>[]
          }
          upsert: {
            args: Prisma.ScanUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanPayload>
          }
          aggregate: {
            args: Prisma.ScanAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateScan>
          }
          groupBy: {
            args: Prisma.ScanGroupByArgs<ExtArgs>
            result: $Utils.Optional<ScanGroupByOutputType>[]
          }
          count: {
            args: Prisma.ScanCountArgs<ExtArgs>
            result: $Utils.Optional<ScanCountAggregateOutputType> | number
          }
        }
      }
      Vulnerability: {
        payload: Prisma.$VulnerabilityPayload<ExtArgs>
        fields: Prisma.VulnerabilityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VulnerabilityFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VulnerabilityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VulnerabilityFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VulnerabilityPayload>
          }
          findFirst: {
            args: Prisma.VulnerabilityFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VulnerabilityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VulnerabilityFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VulnerabilityPayload>
          }
          findMany: {
            args: Prisma.VulnerabilityFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VulnerabilityPayload>[]
          }
          create: {
            args: Prisma.VulnerabilityCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VulnerabilityPayload>
          }
          createMany: {
            args: Prisma.VulnerabilityCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VulnerabilityCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VulnerabilityPayload>[]
          }
          delete: {
            args: Prisma.VulnerabilityDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VulnerabilityPayload>
          }
          update: {
            args: Prisma.VulnerabilityUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VulnerabilityPayload>
          }
          deleteMany: {
            args: Prisma.VulnerabilityDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VulnerabilityUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VulnerabilityUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VulnerabilityPayload>[]
          }
          upsert: {
            args: Prisma.VulnerabilityUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VulnerabilityPayload>
          }
          aggregate: {
            args: Prisma.VulnerabilityAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVulnerability>
          }
          groupBy: {
            args: Prisma.VulnerabilityGroupByArgs<ExtArgs>
            result: $Utils.Optional<VulnerabilityGroupByOutputType>[]
          }
          count: {
            args: Prisma.VulnerabilityCountArgs<ExtArgs>
            result: $Utils.Optional<VulnerabilityCountAggregateOutputType> | number
          }
        }
      }
      ScanConfiguration: {
        payload: Prisma.$ScanConfigurationPayload<ExtArgs>
        fields: Prisma.ScanConfigurationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ScanConfigurationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanConfigurationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ScanConfigurationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanConfigurationPayload>
          }
          findFirst: {
            args: Prisma.ScanConfigurationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanConfigurationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ScanConfigurationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanConfigurationPayload>
          }
          findMany: {
            args: Prisma.ScanConfigurationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanConfigurationPayload>[]
          }
          create: {
            args: Prisma.ScanConfigurationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanConfigurationPayload>
          }
          createMany: {
            args: Prisma.ScanConfigurationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ScanConfigurationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanConfigurationPayload>[]
          }
          delete: {
            args: Prisma.ScanConfigurationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanConfigurationPayload>
          }
          update: {
            args: Prisma.ScanConfigurationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanConfigurationPayload>
          }
          deleteMany: {
            args: Prisma.ScanConfigurationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ScanConfigurationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ScanConfigurationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanConfigurationPayload>[]
          }
          upsert: {
            args: Prisma.ScanConfigurationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanConfigurationPayload>
          }
          aggregate: {
            args: Prisma.ScanConfigurationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateScanConfiguration>
          }
          groupBy: {
            args: Prisma.ScanConfigurationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ScanConfigurationGroupByOutputType>[]
          }
          count: {
            args: Prisma.ScanConfigurationCountArgs<ExtArgs>
            result: $Utils.Optional<ScanConfigurationCountAggregateOutputType> | number
          }
        }
      }
      Report: {
        payload: Prisma.$ReportPayload<ExtArgs>
        fields: Prisma.ReportFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReportFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReportFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          findFirst: {
            args: Prisma.ReportFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReportFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          findMany: {
            args: Prisma.ReportFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>[]
          }
          create: {
            args: Prisma.ReportCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          createMany: {
            args: Prisma.ReportCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReportCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>[]
          }
          delete: {
            args: Prisma.ReportDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          update: {
            args: Prisma.ReportUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          deleteMany: {
            args: Prisma.ReportDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReportUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ReportUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>[]
          }
          upsert: {
            args: Prisma.ReportUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          aggregate: {
            args: Prisma.ReportAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReport>
          }
          groupBy: {
            args: Prisma.ReportGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReportGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReportCountArgs<ExtArgs>
            result: $Utils.Optional<ReportCountAggregateOutputType> | number
          }
        }
      }
      ApiToken: {
        payload: Prisma.$ApiTokenPayload<ExtArgs>
        fields: Prisma.ApiTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ApiTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ApiTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiTokenPayload>
          }
          findFirst: {
            args: Prisma.ApiTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ApiTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiTokenPayload>
          }
          findMany: {
            args: Prisma.ApiTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiTokenPayload>[]
          }
          create: {
            args: Prisma.ApiTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiTokenPayload>
          }
          createMany: {
            args: Prisma.ApiTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ApiTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiTokenPayload>[]
          }
          delete: {
            args: Prisma.ApiTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiTokenPayload>
          }
          update: {
            args: Prisma.ApiTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiTokenPayload>
          }
          deleteMany: {
            args: Prisma.ApiTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ApiTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ApiTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiTokenPayload>[]
          }
          upsert: {
            args: Prisma.ApiTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiTokenPayload>
          }
          aggregate: {
            args: Prisma.ApiTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateApiToken>
          }
          groupBy: {
            args: Prisma.ApiTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<ApiTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.ApiTokenCountArgs<ExtArgs>
            result: $Utils.Optional<ApiTokenCountAggregateOutputType> | number
          }
        }
      }
      AuditLog: {
        payload: Prisma.$AuditLogPayload<ExtArgs>
        fields: Prisma.AuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AuditLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditLog>
          }
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    organization?: OrganizationOmit
    membership?: MembershipOmit
    invitation?: InvitationOmit
    target?: TargetOmit
    scan?: ScanOmit
    vulnerability?: VulnerabilityOmit
    scanConfiguration?: ScanConfigurationOmit
    report?: ReportOmit
    apiToken?: ApiTokenOmit
    auditLog?: AuditLogOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    memberships: number
    invitations: number
    auditLogs: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    memberships?: boolean | UserCountOutputTypeCountMembershipsArgs
    invitations?: boolean | UserCountOutputTypeCountInvitationsArgs
    auditLogs?: boolean | UserCountOutputTypeCountAuditLogsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMembershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MembershipWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountInvitationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvitationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAuditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
  }


  /**
   * Count Type OrganizationCountOutputType
   */

  export type OrganizationCountOutputType = {
    members: number
    invitations: number
    targets: number
    reports: number
    apiTokens: number
    auditLogs: number
  }

  export type OrganizationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    members?: boolean | OrganizationCountOutputTypeCountMembersArgs
    invitations?: boolean | OrganizationCountOutputTypeCountInvitationsArgs
    targets?: boolean | OrganizationCountOutputTypeCountTargetsArgs
    reports?: boolean | OrganizationCountOutputTypeCountReportsArgs
    apiTokens?: boolean | OrganizationCountOutputTypeCountApiTokensArgs
    auditLogs?: boolean | OrganizationCountOutputTypeCountAuditLogsArgs
  }

  // Custom InputTypes
  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationCountOutputType
     */
    select?: OrganizationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeCountMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MembershipWhereInput
  }

  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeCountInvitationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvitationWhereInput
  }

  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeCountTargetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TargetWhereInput
  }

  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeCountReportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReportWhereInput
  }

  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeCountApiTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApiTokenWhereInput
  }

  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeCountAuditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
  }


  /**
   * Count Type TargetCountOutputType
   */

  export type TargetCountOutputType = {
    scans: number
  }

  export type TargetCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    scans?: boolean | TargetCountOutputTypeCountScansArgs
  }

  // Custom InputTypes
  /**
   * TargetCountOutputType without action
   */
  export type TargetCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TargetCountOutputType
     */
    select?: TargetCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TargetCountOutputType without action
   */
  export type TargetCountOutputTypeCountScansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScanWhereInput
  }


  /**
   * Count Type ScanCountOutputType
   */

  export type ScanCountOutputType = {
    vulnerabilities: number
  }

  export type ScanCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vulnerabilities?: boolean | ScanCountOutputTypeCountVulnerabilitiesArgs
  }

  // Custom InputTypes
  /**
   * ScanCountOutputType without action
   */
  export type ScanCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanCountOutputType
     */
    select?: ScanCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ScanCountOutputType without action
   */
  export type ScanCountOutputTypeCountVulnerabilitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VulnerabilityWhereInput
  }


  /**
   * Count Type ScanConfigurationCountOutputType
   */

  export type ScanConfigurationCountOutputType = {
    scans: number
  }

  export type ScanConfigurationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    scans?: boolean | ScanConfigurationCountOutputTypeCountScansArgs
  }

  // Custom InputTypes
  /**
   * ScanConfigurationCountOutputType without action
   */
  export type ScanConfigurationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanConfigurationCountOutputType
     */
    select?: ScanConfigurationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ScanConfigurationCountOutputType without action
   */
  export type ScanConfigurationCountOutputTypeCountScansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScanWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    password: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    name: string | null
    password: string
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    memberships?: boolean | User$membershipsArgs<ExtArgs>
    invitations?: boolean | User$invitationsArgs<ExtArgs>
    auditLogs?: boolean | User$auditLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "password" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    memberships?: boolean | User$membershipsArgs<ExtArgs>
    invitations?: boolean | User$invitationsArgs<ExtArgs>
    auditLogs?: boolean | User$auditLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      memberships: Prisma.$MembershipPayload<ExtArgs>[]
      invitations: Prisma.$InvitationPayload<ExtArgs>[]
      auditLogs: Prisma.$AuditLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string | null
      password: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    memberships<T extends User$membershipsArgs<ExtArgs> = {}>(args?: Subset<T, User$membershipsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    invitations<T extends User$invitationsArgs<ExtArgs> = {}>(args?: Subset<T, User$invitationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    auditLogs<T extends User$auditLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$auditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.memberships
   */
  export type User$membershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Membership
     */
    omit?: MembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipInclude<ExtArgs> | null
    where?: MembershipWhereInput
    orderBy?: MembershipOrderByWithRelationInput | MembershipOrderByWithRelationInput[]
    cursor?: MembershipWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MembershipScalarFieldEnum | MembershipScalarFieldEnum[]
  }

  /**
   * User.invitations
   */
  export type User$invitationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    where?: InvitationWhereInput
    orderBy?: InvitationOrderByWithRelationInput | InvitationOrderByWithRelationInput[]
    cursor?: InvitationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InvitationScalarFieldEnum | InvitationScalarFieldEnum[]
  }

  /**
   * User.auditLogs
   */
  export type User$auditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    cursor?: AuditLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Organization
   */

  export type AggregateOrganization = {
    _count: OrganizationCountAggregateOutputType | null
    _min: OrganizationMinAggregateOutputType | null
    _max: OrganizationMaxAggregateOutputType | null
  }

  export type OrganizationMinAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrganizationMaxAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrganizationCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type OrganizationMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrganizationMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrganizationCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type OrganizationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Organization to aggregate.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Organizations
    **/
    _count?: true | OrganizationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrganizationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrganizationMaxAggregateInputType
  }

  export type GetOrganizationAggregateType<T extends OrganizationAggregateArgs> = {
        [P in keyof T & keyof AggregateOrganization]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrganization[P]>
      : GetScalarType<T[P], AggregateOrganization[P]>
  }




  export type OrganizationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrganizationWhereInput
    orderBy?: OrganizationOrderByWithAggregationInput | OrganizationOrderByWithAggregationInput[]
    by: OrganizationScalarFieldEnum[] | OrganizationScalarFieldEnum
    having?: OrganizationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrganizationCountAggregateInputType | true
    _min?: OrganizationMinAggregateInputType
    _max?: OrganizationMaxAggregateInputType
  }

  export type OrganizationGroupByOutputType = {
    id: string
    name: string
    slug: string
    createdAt: Date
    updatedAt: Date
    _count: OrganizationCountAggregateOutputType | null
    _min: OrganizationMinAggregateOutputType | null
    _max: OrganizationMaxAggregateOutputType | null
  }

  type GetOrganizationGroupByPayload<T extends OrganizationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrganizationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrganizationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrganizationGroupByOutputType[P]>
            : GetScalarType<T[P], OrganizationGroupByOutputType[P]>
        }
      >
    >


  export type OrganizationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    members?: boolean | Organization$membersArgs<ExtArgs>
    invitations?: boolean | Organization$invitationsArgs<ExtArgs>
    targets?: boolean | Organization$targetsArgs<ExtArgs>
    reports?: boolean | Organization$reportsArgs<ExtArgs>
    apiTokens?: boolean | Organization$apiTokensArgs<ExtArgs>
    auditLogs?: boolean | Organization$auditLogsArgs<ExtArgs>
    _count?: boolean | OrganizationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["organization"]>

  export type OrganizationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["organization"]>

  export type OrganizationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["organization"]>

  export type OrganizationSelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type OrganizationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "slug" | "createdAt" | "updatedAt", ExtArgs["result"]["organization"]>
  export type OrganizationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    members?: boolean | Organization$membersArgs<ExtArgs>
    invitations?: boolean | Organization$invitationsArgs<ExtArgs>
    targets?: boolean | Organization$targetsArgs<ExtArgs>
    reports?: boolean | Organization$reportsArgs<ExtArgs>
    apiTokens?: boolean | Organization$apiTokensArgs<ExtArgs>
    auditLogs?: boolean | Organization$auditLogsArgs<ExtArgs>
    _count?: boolean | OrganizationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type OrganizationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type OrganizationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $OrganizationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Organization"
    objects: {
      members: Prisma.$MembershipPayload<ExtArgs>[]
      invitations: Prisma.$InvitationPayload<ExtArgs>[]
      targets: Prisma.$TargetPayload<ExtArgs>[]
      reports: Prisma.$ReportPayload<ExtArgs>[]
      apiTokens: Prisma.$ApiTokenPayload<ExtArgs>[]
      auditLogs: Prisma.$AuditLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      slug: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["organization"]>
    composites: {}
  }

  type OrganizationGetPayload<S extends boolean | null | undefined | OrganizationDefaultArgs> = $Result.GetResult<Prisma.$OrganizationPayload, S>

  type OrganizationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrganizationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrganizationCountAggregateInputType | true
    }

  export interface OrganizationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Organization'], meta: { name: 'Organization' } }
    /**
     * Find zero or one Organization that matches the filter.
     * @param {OrganizationFindUniqueArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrganizationFindUniqueArgs>(args: SelectSubset<T, OrganizationFindUniqueArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Organization that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrganizationFindUniqueOrThrowArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrganizationFindUniqueOrThrowArgs>(args: SelectSubset<T, OrganizationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Organization that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFindFirstArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrganizationFindFirstArgs>(args?: SelectSubset<T, OrganizationFindFirstArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Organization that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFindFirstOrThrowArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrganizationFindFirstOrThrowArgs>(args?: SelectSubset<T, OrganizationFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Organizations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Organizations
     * const organizations = await prisma.organization.findMany()
     * 
     * // Get first 10 Organizations
     * const organizations = await prisma.organization.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const organizationWithIdOnly = await prisma.organization.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrganizationFindManyArgs>(args?: SelectSubset<T, OrganizationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Organization.
     * @param {OrganizationCreateArgs} args - Arguments to create a Organization.
     * @example
     * // Create one Organization
     * const Organization = await prisma.organization.create({
     *   data: {
     *     // ... data to create a Organization
     *   }
     * })
     * 
     */
    create<T extends OrganizationCreateArgs>(args: SelectSubset<T, OrganizationCreateArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Organizations.
     * @param {OrganizationCreateManyArgs} args - Arguments to create many Organizations.
     * @example
     * // Create many Organizations
     * const organization = await prisma.organization.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrganizationCreateManyArgs>(args?: SelectSubset<T, OrganizationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Organizations and returns the data saved in the database.
     * @param {OrganizationCreateManyAndReturnArgs} args - Arguments to create many Organizations.
     * @example
     * // Create many Organizations
     * const organization = await prisma.organization.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Organizations and only return the `id`
     * const organizationWithIdOnly = await prisma.organization.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrganizationCreateManyAndReturnArgs>(args?: SelectSubset<T, OrganizationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Organization.
     * @param {OrganizationDeleteArgs} args - Arguments to delete one Organization.
     * @example
     * // Delete one Organization
     * const Organization = await prisma.organization.delete({
     *   where: {
     *     // ... filter to delete one Organization
     *   }
     * })
     * 
     */
    delete<T extends OrganizationDeleteArgs>(args: SelectSubset<T, OrganizationDeleteArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Organization.
     * @param {OrganizationUpdateArgs} args - Arguments to update one Organization.
     * @example
     * // Update one Organization
     * const organization = await prisma.organization.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrganizationUpdateArgs>(args: SelectSubset<T, OrganizationUpdateArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Organizations.
     * @param {OrganizationDeleteManyArgs} args - Arguments to filter Organizations to delete.
     * @example
     * // Delete a few Organizations
     * const { count } = await prisma.organization.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrganizationDeleteManyArgs>(args?: SelectSubset<T, OrganizationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Organizations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Organizations
     * const organization = await prisma.organization.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrganizationUpdateManyArgs>(args: SelectSubset<T, OrganizationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Organizations and returns the data updated in the database.
     * @param {OrganizationUpdateManyAndReturnArgs} args - Arguments to update many Organizations.
     * @example
     * // Update many Organizations
     * const organization = await prisma.organization.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Organizations and only return the `id`
     * const organizationWithIdOnly = await prisma.organization.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OrganizationUpdateManyAndReturnArgs>(args: SelectSubset<T, OrganizationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Organization.
     * @param {OrganizationUpsertArgs} args - Arguments to update or create a Organization.
     * @example
     * // Update or create a Organization
     * const organization = await prisma.organization.upsert({
     *   create: {
     *     // ... data to create a Organization
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Organization we want to update
     *   }
     * })
     */
    upsert<T extends OrganizationUpsertArgs>(args: SelectSubset<T, OrganizationUpsertArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Organizations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationCountArgs} args - Arguments to filter Organizations to count.
     * @example
     * // Count the number of Organizations
     * const count = await prisma.organization.count({
     *   where: {
     *     // ... the filter for the Organizations we want to count
     *   }
     * })
    **/
    count<T extends OrganizationCountArgs>(
      args?: Subset<T, OrganizationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrganizationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Organization.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrganizationAggregateArgs>(args: Subset<T, OrganizationAggregateArgs>): Prisma.PrismaPromise<GetOrganizationAggregateType<T>>

    /**
     * Group by Organization.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrganizationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrganizationGroupByArgs['orderBy'] }
        : { orderBy?: OrganizationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrganizationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrganizationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Organization model
   */
  readonly fields: OrganizationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Organization.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrganizationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    members<T extends Organization$membersArgs<ExtArgs> = {}>(args?: Subset<T, Organization$membersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    invitations<T extends Organization$invitationsArgs<ExtArgs> = {}>(args?: Subset<T, Organization$invitationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    targets<T extends Organization$targetsArgs<ExtArgs> = {}>(args?: Subset<T, Organization$targetsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TargetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reports<T extends Organization$reportsArgs<ExtArgs> = {}>(args?: Subset<T, Organization$reportsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    apiTokens<T extends Organization$apiTokensArgs<ExtArgs> = {}>(args?: Subset<T, Organization$apiTokensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApiTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    auditLogs<T extends Organization$auditLogsArgs<ExtArgs> = {}>(args?: Subset<T, Organization$auditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Organization model
   */
  interface OrganizationFieldRefs {
    readonly id: FieldRef<"Organization", 'String'>
    readonly name: FieldRef<"Organization", 'String'>
    readonly slug: FieldRef<"Organization", 'String'>
    readonly createdAt: FieldRef<"Organization", 'DateTime'>
    readonly updatedAt: FieldRef<"Organization", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Organization findUnique
   */
  export type OrganizationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization findUniqueOrThrow
   */
  export type OrganizationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization findFirst
   */
  export type OrganizationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Organizations.
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Organizations.
     */
    distinct?: OrganizationScalarFieldEnum | OrganizationScalarFieldEnum[]
  }

  /**
   * Organization findFirstOrThrow
   */
  export type OrganizationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Organizations.
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Organizations.
     */
    distinct?: OrganizationScalarFieldEnum | OrganizationScalarFieldEnum[]
  }

  /**
   * Organization findMany
   */
  export type OrganizationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organizations to fetch.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Organizations.
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    distinct?: OrganizationScalarFieldEnum | OrganizationScalarFieldEnum[]
  }

  /**
   * Organization create
   */
  export type OrganizationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * The data needed to create a Organization.
     */
    data: XOR<OrganizationCreateInput, OrganizationUncheckedCreateInput>
  }

  /**
   * Organization createMany
   */
  export type OrganizationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Organizations.
     */
    data: OrganizationCreateManyInput | OrganizationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Organization createManyAndReturn
   */
  export type OrganizationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * The data used to create many Organizations.
     */
    data: OrganizationCreateManyInput | OrganizationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Organization update
   */
  export type OrganizationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * The data needed to update a Organization.
     */
    data: XOR<OrganizationUpdateInput, OrganizationUncheckedUpdateInput>
    /**
     * Choose, which Organization to update.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization updateMany
   */
  export type OrganizationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Organizations.
     */
    data: XOR<OrganizationUpdateManyMutationInput, OrganizationUncheckedUpdateManyInput>
    /**
     * Filter which Organizations to update
     */
    where?: OrganizationWhereInput
    /**
     * Limit how many Organizations to update.
     */
    limit?: number
  }

  /**
   * Organization updateManyAndReturn
   */
  export type OrganizationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * The data used to update Organizations.
     */
    data: XOR<OrganizationUpdateManyMutationInput, OrganizationUncheckedUpdateManyInput>
    /**
     * Filter which Organizations to update
     */
    where?: OrganizationWhereInput
    /**
     * Limit how many Organizations to update.
     */
    limit?: number
  }

  /**
   * Organization upsert
   */
  export type OrganizationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * The filter to search for the Organization to update in case it exists.
     */
    where: OrganizationWhereUniqueInput
    /**
     * In case the Organization found by the `where` argument doesn't exist, create a new Organization with this data.
     */
    create: XOR<OrganizationCreateInput, OrganizationUncheckedCreateInput>
    /**
     * In case the Organization was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrganizationUpdateInput, OrganizationUncheckedUpdateInput>
  }

  /**
   * Organization delete
   */
  export type OrganizationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter which Organization to delete.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization deleteMany
   */
  export type OrganizationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Organizations to delete
     */
    where?: OrganizationWhereInput
    /**
     * Limit how many Organizations to delete.
     */
    limit?: number
  }

  /**
   * Organization.members
   */
  export type Organization$membersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Membership
     */
    omit?: MembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipInclude<ExtArgs> | null
    where?: MembershipWhereInput
    orderBy?: MembershipOrderByWithRelationInput | MembershipOrderByWithRelationInput[]
    cursor?: MembershipWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MembershipScalarFieldEnum | MembershipScalarFieldEnum[]
  }

  /**
   * Organization.invitations
   */
  export type Organization$invitationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    where?: InvitationWhereInput
    orderBy?: InvitationOrderByWithRelationInput | InvitationOrderByWithRelationInput[]
    cursor?: InvitationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InvitationScalarFieldEnum | InvitationScalarFieldEnum[]
  }

  /**
   * Organization.targets
   */
  export type Organization$targetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Target
     */
    select?: TargetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Target
     */
    omit?: TargetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TargetInclude<ExtArgs> | null
    where?: TargetWhereInput
    orderBy?: TargetOrderByWithRelationInput | TargetOrderByWithRelationInput[]
    cursor?: TargetWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TargetScalarFieldEnum | TargetScalarFieldEnum[]
  }

  /**
   * Organization.reports
   */
  export type Organization$reportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    where?: ReportWhereInput
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    cursor?: ReportWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }

  /**
   * Organization.apiTokens
   */
  export type Organization$apiTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiToken
     */
    select?: ApiTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiToken
     */
    omit?: ApiTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiTokenInclude<ExtArgs> | null
    where?: ApiTokenWhereInput
    orderBy?: ApiTokenOrderByWithRelationInput | ApiTokenOrderByWithRelationInput[]
    cursor?: ApiTokenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ApiTokenScalarFieldEnum | ApiTokenScalarFieldEnum[]
  }

  /**
   * Organization.auditLogs
   */
  export type Organization$auditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    cursor?: AuditLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * Organization without action
   */
  export type OrganizationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
  }


  /**
   * Model Membership
   */

  export type AggregateMembership = {
    _count: MembershipCountAggregateOutputType | null
    _min: MembershipMinAggregateOutputType | null
    _max: MembershipMaxAggregateOutputType | null
  }

  export type MembershipMinAggregateOutputType = {
    id: string | null
    role: $Enums.Role | null
    createdAt: Date | null
    userId: string | null
    organizationId: string | null
  }

  export type MembershipMaxAggregateOutputType = {
    id: string | null
    role: $Enums.Role | null
    createdAt: Date | null
    userId: string | null
    organizationId: string | null
  }

  export type MembershipCountAggregateOutputType = {
    id: number
    role: number
    createdAt: number
    userId: number
    organizationId: number
    _all: number
  }


  export type MembershipMinAggregateInputType = {
    id?: true
    role?: true
    createdAt?: true
    userId?: true
    organizationId?: true
  }

  export type MembershipMaxAggregateInputType = {
    id?: true
    role?: true
    createdAt?: true
    userId?: true
    organizationId?: true
  }

  export type MembershipCountAggregateInputType = {
    id?: true
    role?: true
    createdAt?: true
    userId?: true
    organizationId?: true
    _all?: true
  }

  export type MembershipAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Membership to aggregate.
     */
    where?: MembershipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Memberships to fetch.
     */
    orderBy?: MembershipOrderByWithRelationInput | MembershipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MembershipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Memberships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Memberships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Memberships
    **/
    _count?: true | MembershipCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MembershipMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MembershipMaxAggregateInputType
  }

  export type GetMembershipAggregateType<T extends MembershipAggregateArgs> = {
        [P in keyof T & keyof AggregateMembership]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMembership[P]>
      : GetScalarType<T[P], AggregateMembership[P]>
  }




  export type MembershipGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MembershipWhereInput
    orderBy?: MembershipOrderByWithAggregationInput | MembershipOrderByWithAggregationInput[]
    by: MembershipScalarFieldEnum[] | MembershipScalarFieldEnum
    having?: MembershipScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MembershipCountAggregateInputType | true
    _min?: MembershipMinAggregateInputType
    _max?: MembershipMaxAggregateInputType
  }

  export type MembershipGroupByOutputType = {
    id: string
    role: $Enums.Role
    createdAt: Date
    userId: string
    organizationId: string
    _count: MembershipCountAggregateOutputType | null
    _min: MembershipMinAggregateOutputType | null
    _max: MembershipMaxAggregateOutputType | null
  }

  type GetMembershipGroupByPayload<T extends MembershipGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MembershipGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MembershipGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MembershipGroupByOutputType[P]>
            : GetScalarType<T[P], MembershipGroupByOutputType[P]>
        }
      >
    >


  export type MembershipSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    role?: boolean
    createdAt?: boolean
    userId?: boolean
    organizationId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["membership"]>

  export type MembershipSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    role?: boolean
    createdAt?: boolean
    userId?: boolean
    organizationId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["membership"]>

  export type MembershipSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    role?: boolean
    createdAt?: boolean
    userId?: boolean
    organizationId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["membership"]>

  export type MembershipSelectScalar = {
    id?: boolean
    role?: boolean
    createdAt?: boolean
    userId?: boolean
    organizationId?: boolean
  }

  export type MembershipOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "role" | "createdAt" | "userId" | "organizationId", ExtArgs["result"]["membership"]>
  export type MembershipInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }
  export type MembershipIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }
  export type MembershipIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }

  export type $MembershipPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Membership"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      organization: Prisma.$OrganizationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      role: $Enums.Role
      createdAt: Date
      userId: string
      organizationId: string
    }, ExtArgs["result"]["membership"]>
    composites: {}
  }

  type MembershipGetPayload<S extends boolean | null | undefined | MembershipDefaultArgs> = $Result.GetResult<Prisma.$MembershipPayload, S>

  type MembershipCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MembershipFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MembershipCountAggregateInputType | true
    }

  export interface MembershipDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Membership'], meta: { name: 'Membership' } }
    /**
     * Find zero or one Membership that matches the filter.
     * @param {MembershipFindUniqueArgs} args - Arguments to find a Membership
     * @example
     * // Get one Membership
     * const membership = await prisma.membership.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MembershipFindUniqueArgs>(args: SelectSubset<T, MembershipFindUniqueArgs<ExtArgs>>): Prisma__MembershipClient<$Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Membership that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MembershipFindUniqueOrThrowArgs} args - Arguments to find a Membership
     * @example
     * // Get one Membership
     * const membership = await prisma.membership.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MembershipFindUniqueOrThrowArgs>(args: SelectSubset<T, MembershipFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MembershipClient<$Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Membership that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MembershipFindFirstArgs} args - Arguments to find a Membership
     * @example
     * // Get one Membership
     * const membership = await prisma.membership.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MembershipFindFirstArgs>(args?: SelectSubset<T, MembershipFindFirstArgs<ExtArgs>>): Prisma__MembershipClient<$Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Membership that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MembershipFindFirstOrThrowArgs} args - Arguments to find a Membership
     * @example
     * // Get one Membership
     * const membership = await prisma.membership.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MembershipFindFirstOrThrowArgs>(args?: SelectSubset<T, MembershipFindFirstOrThrowArgs<ExtArgs>>): Prisma__MembershipClient<$Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Memberships that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MembershipFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Memberships
     * const memberships = await prisma.membership.findMany()
     * 
     * // Get first 10 Memberships
     * const memberships = await prisma.membership.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const membershipWithIdOnly = await prisma.membership.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MembershipFindManyArgs>(args?: SelectSubset<T, MembershipFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Membership.
     * @param {MembershipCreateArgs} args - Arguments to create a Membership.
     * @example
     * // Create one Membership
     * const Membership = await prisma.membership.create({
     *   data: {
     *     // ... data to create a Membership
     *   }
     * })
     * 
     */
    create<T extends MembershipCreateArgs>(args: SelectSubset<T, MembershipCreateArgs<ExtArgs>>): Prisma__MembershipClient<$Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Memberships.
     * @param {MembershipCreateManyArgs} args - Arguments to create many Memberships.
     * @example
     * // Create many Memberships
     * const membership = await prisma.membership.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MembershipCreateManyArgs>(args?: SelectSubset<T, MembershipCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Memberships and returns the data saved in the database.
     * @param {MembershipCreateManyAndReturnArgs} args - Arguments to create many Memberships.
     * @example
     * // Create many Memberships
     * const membership = await prisma.membership.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Memberships and only return the `id`
     * const membershipWithIdOnly = await prisma.membership.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MembershipCreateManyAndReturnArgs>(args?: SelectSubset<T, MembershipCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Membership.
     * @param {MembershipDeleteArgs} args - Arguments to delete one Membership.
     * @example
     * // Delete one Membership
     * const Membership = await prisma.membership.delete({
     *   where: {
     *     // ... filter to delete one Membership
     *   }
     * })
     * 
     */
    delete<T extends MembershipDeleteArgs>(args: SelectSubset<T, MembershipDeleteArgs<ExtArgs>>): Prisma__MembershipClient<$Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Membership.
     * @param {MembershipUpdateArgs} args - Arguments to update one Membership.
     * @example
     * // Update one Membership
     * const membership = await prisma.membership.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MembershipUpdateArgs>(args: SelectSubset<T, MembershipUpdateArgs<ExtArgs>>): Prisma__MembershipClient<$Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Memberships.
     * @param {MembershipDeleteManyArgs} args - Arguments to filter Memberships to delete.
     * @example
     * // Delete a few Memberships
     * const { count } = await prisma.membership.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MembershipDeleteManyArgs>(args?: SelectSubset<T, MembershipDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Memberships.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MembershipUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Memberships
     * const membership = await prisma.membership.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MembershipUpdateManyArgs>(args: SelectSubset<T, MembershipUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Memberships and returns the data updated in the database.
     * @param {MembershipUpdateManyAndReturnArgs} args - Arguments to update many Memberships.
     * @example
     * // Update many Memberships
     * const membership = await prisma.membership.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Memberships and only return the `id`
     * const membershipWithIdOnly = await prisma.membership.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MembershipUpdateManyAndReturnArgs>(args: SelectSubset<T, MembershipUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Membership.
     * @param {MembershipUpsertArgs} args - Arguments to update or create a Membership.
     * @example
     * // Update or create a Membership
     * const membership = await prisma.membership.upsert({
     *   create: {
     *     // ... data to create a Membership
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Membership we want to update
     *   }
     * })
     */
    upsert<T extends MembershipUpsertArgs>(args: SelectSubset<T, MembershipUpsertArgs<ExtArgs>>): Prisma__MembershipClient<$Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Memberships.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MembershipCountArgs} args - Arguments to filter Memberships to count.
     * @example
     * // Count the number of Memberships
     * const count = await prisma.membership.count({
     *   where: {
     *     // ... the filter for the Memberships we want to count
     *   }
     * })
    **/
    count<T extends MembershipCountArgs>(
      args?: Subset<T, MembershipCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MembershipCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Membership.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MembershipAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MembershipAggregateArgs>(args: Subset<T, MembershipAggregateArgs>): Prisma.PrismaPromise<GetMembershipAggregateType<T>>

    /**
     * Group by Membership.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MembershipGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MembershipGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MembershipGroupByArgs['orderBy'] }
        : { orderBy?: MembershipGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MembershipGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMembershipGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Membership model
   */
  readonly fields: MembershipFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Membership.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MembershipClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    organization<T extends OrganizationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrganizationDefaultArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Membership model
   */
  interface MembershipFieldRefs {
    readonly id: FieldRef<"Membership", 'String'>
    readonly role: FieldRef<"Membership", 'Role'>
    readonly createdAt: FieldRef<"Membership", 'DateTime'>
    readonly userId: FieldRef<"Membership", 'String'>
    readonly organizationId: FieldRef<"Membership", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Membership findUnique
   */
  export type MembershipFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Membership
     */
    omit?: MembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipInclude<ExtArgs> | null
    /**
     * Filter, which Membership to fetch.
     */
    where: MembershipWhereUniqueInput
  }

  /**
   * Membership findUniqueOrThrow
   */
  export type MembershipFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Membership
     */
    omit?: MembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipInclude<ExtArgs> | null
    /**
     * Filter, which Membership to fetch.
     */
    where: MembershipWhereUniqueInput
  }

  /**
   * Membership findFirst
   */
  export type MembershipFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Membership
     */
    omit?: MembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipInclude<ExtArgs> | null
    /**
     * Filter, which Membership to fetch.
     */
    where?: MembershipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Memberships to fetch.
     */
    orderBy?: MembershipOrderByWithRelationInput | MembershipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Memberships.
     */
    cursor?: MembershipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Memberships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Memberships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Memberships.
     */
    distinct?: MembershipScalarFieldEnum | MembershipScalarFieldEnum[]
  }

  /**
   * Membership findFirstOrThrow
   */
  export type MembershipFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Membership
     */
    omit?: MembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipInclude<ExtArgs> | null
    /**
     * Filter, which Membership to fetch.
     */
    where?: MembershipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Memberships to fetch.
     */
    orderBy?: MembershipOrderByWithRelationInput | MembershipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Memberships.
     */
    cursor?: MembershipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Memberships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Memberships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Memberships.
     */
    distinct?: MembershipScalarFieldEnum | MembershipScalarFieldEnum[]
  }

  /**
   * Membership findMany
   */
  export type MembershipFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Membership
     */
    omit?: MembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipInclude<ExtArgs> | null
    /**
     * Filter, which Memberships to fetch.
     */
    where?: MembershipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Memberships to fetch.
     */
    orderBy?: MembershipOrderByWithRelationInput | MembershipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Memberships.
     */
    cursor?: MembershipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Memberships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Memberships.
     */
    skip?: number
    distinct?: MembershipScalarFieldEnum | MembershipScalarFieldEnum[]
  }

  /**
   * Membership create
   */
  export type MembershipCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Membership
     */
    omit?: MembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipInclude<ExtArgs> | null
    /**
     * The data needed to create a Membership.
     */
    data: XOR<MembershipCreateInput, MembershipUncheckedCreateInput>
  }

  /**
   * Membership createMany
   */
  export type MembershipCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Memberships.
     */
    data: MembershipCreateManyInput | MembershipCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Membership createManyAndReturn
   */
  export type MembershipCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Membership
     */
    omit?: MembershipOmit<ExtArgs> | null
    /**
     * The data used to create many Memberships.
     */
    data: MembershipCreateManyInput | MembershipCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Membership update
   */
  export type MembershipUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Membership
     */
    omit?: MembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipInclude<ExtArgs> | null
    /**
     * The data needed to update a Membership.
     */
    data: XOR<MembershipUpdateInput, MembershipUncheckedUpdateInput>
    /**
     * Choose, which Membership to update.
     */
    where: MembershipWhereUniqueInput
  }

  /**
   * Membership updateMany
   */
  export type MembershipUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Memberships.
     */
    data: XOR<MembershipUpdateManyMutationInput, MembershipUncheckedUpdateManyInput>
    /**
     * Filter which Memberships to update
     */
    where?: MembershipWhereInput
    /**
     * Limit how many Memberships to update.
     */
    limit?: number
  }

  /**
   * Membership updateManyAndReturn
   */
  export type MembershipUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Membership
     */
    omit?: MembershipOmit<ExtArgs> | null
    /**
     * The data used to update Memberships.
     */
    data: XOR<MembershipUpdateManyMutationInput, MembershipUncheckedUpdateManyInput>
    /**
     * Filter which Memberships to update
     */
    where?: MembershipWhereInput
    /**
     * Limit how many Memberships to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Membership upsert
   */
  export type MembershipUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Membership
     */
    omit?: MembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipInclude<ExtArgs> | null
    /**
     * The filter to search for the Membership to update in case it exists.
     */
    where: MembershipWhereUniqueInput
    /**
     * In case the Membership found by the `where` argument doesn't exist, create a new Membership with this data.
     */
    create: XOR<MembershipCreateInput, MembershipUncheckedCreateInput>
    /**
     * In case the Membership was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MembershipUpdateInput, MembershipUncheckedUpdateInput>
  }

  /**
   * Membership delete
   */
  export type MembershipDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Membership
     */
    omit?: MembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipInclude<ExtArgs> | null
    /**
     * Filter which Membership to delete.
     */
    where: MembershipWhereUniqueInput
  }

  /**
   * Membership deleteMany
   */
  export type MembershipDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Memberships to delete
     */
    where?: MembershipWhereInput
    /**
     * Limit how many Memberships to delete.
     */
    limit?: number
  }

  /**
   * Membership without action
   */
  export type MembershipDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Membership
     */
    omit?: MembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipInclude<ExtArgs> | null
  }


  /**
   * Model Invitation
   */

  export type AggregateInvitation = {
    _count: InvitationCountAggregateOutputType | null
    _min: InvitationMinAggregateOutputType | null
    _max: InvitationMaxAggregateOutputType | null
  }

  export type InvitationMinAggregateOutputType = {
    id: string | null
    email: string | null
    role: $Enums.Role | null
    status: $Enums.InvitationStatus | null
    expiresAt: Date | null
    createdAt: Date | null
    organizationId: string | null
    invitedById: string | null
  }

  export type InvitationMaxAggregateOutputType = {
    id: string | null
    email: string | null
    role: $Enums.Role | null
    status: $Enums.InvitationStatus | null
    expiresAt: Date | null
    createdAt: Date | null
    organizationId: string | null
    invitedById: string | null
  }

  export type InvitationCountAggregateOutputType = {
    id: number
    email: number
    role: number
    status: number
    expiresAt: number
    createdAt: number
    organizationId: number
    invitedById: number
    _all: number
  }


  export type InvitationMinAggregateInputType = {
    id?: true
    email?: true
    role?: true
    status?: true
    expiresAt?: true
    createdAt?: true
    organizationId?: true
    invitedById?: true
  }

  export type InvitationMaxAggregateInputType = {
    id?: true
    email?: true
    role?: true
    status?: true
    expiresAt?: true
    createdAt?: true
    organizationId?: true
    invitedById?: true
  }

  export type InvitationCountAggregateInputType = {
    id?: true
    email?: true
    role?: true
    status?: true
    expiresAt?: true
    createdAt?: true
    organizationId?: true
    invitedById?: true
    _all?: true
  }

  export type InvitationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Invitation to aggregate.
     */
    where?: InvitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invitations to fetch.
     */
    orderBy?: InvitationOrderByWithRelationInput | InvitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InvitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invitations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Invitations
    **/
    _count?: true | InvitationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InvitationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InvitationMaxAggregateInputType
  }

  export type GetInvitationAggregateType<T extends InvitationAggregateArgs> = {
        [P in keyof T & keyof AggregateInvitation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInvitation[P]>
      : GetScalarType<T[P], AggregateInvitation[P]>
  }




  export type InvitationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvitationWhereInput
    orderBy?: InvitationOrderByWithAggregationInput | InvitationOrderByWithAggregationInput[]
    by: InvitationScalarFieldEnum[] | InvitationScalarFieldEnum
    having?: InvitationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InvitationCountAggregateInputType | true
    _min?: InvitationMinAggregateInputType
    _max?: InvitationMaxAggregateInputType
  }

  export type InvitationGroupByOutputType = {
    id: string
    email: string
    role: $Enums.Role
    status: $Enums.InvitationStatus
    expiresAt: Date
    createdAt: Date
    organizationId: string
    invitedById: string
    _count: InvitationCountAggregateOutputType | null
    _min: InvitationMinAggregateOutputType | null
    _max: InvitationMaxAggregateOutputType | null
  }

  type GetInvitationGroupByPayload<T extends InvitationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InvitationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InvitationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InvitationGroupByOutputType[P]>
            : GetScalarType<T[P], InvitationGroupByOutputType[P]>
        }
      >
    >


  export type InvitationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    role?: boolean
    status?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    organizationId?: boolean
    invitedById?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    invitedBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["invitation"]>

  export type InvitationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    role?: boolean
    status?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    organizationId?: boolean
    invitedById?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    invitedBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["invitation"]>

  export type InvitationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    role?: boolean
    status?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    organizationId?: boolean
    invitedById?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    invitedBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["invitation"]>

  export type InvitationSelectScalar = {
    id?: boolean
    email?: boolean
    role?: boolean
    status?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    organizationId?: boolean
    invitedById?: boolean
  }

  export type InvitationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "role" | "status" | "expiresAt" | "createdAt" | "organizationId" | "invitedById", ExtArgs["result"]["invitation"]>
  export type InvitationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    invitedBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type InvitationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    invitedBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type InvitationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    invitedBy?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $InvitationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Invitation"
    objects: {
      organization: Prisma.$OrganizationPayload<ExtArgs>
      invitedBy: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      role: $Enums.Role
      status: $Enums.InvitationStatus
      expiresAt: Date
      createdAt: Date
      organizationId: string
      invitedById: string
    }, ExtArgs["result"]["invitation"]>
    composites: {}
  }

  type InvitationGetPayload<S extends boolean | null | undefined | InvitationDefaultArgs> = $Result.GetResult<Prisma.$InvitationPayload, S>

  type InvitationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<InvitationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InvitationCountAggregateInputType | true
    }

  export interface InvitationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Invitation'], meta: { name: 'Invitation' } }
    /**
     * Find zero or one Invitation that matches the filter.
     * @param {InvitationFindUniqueArgs} args - Arguments to find a Invitation
     * @example
     * // Get one Invitation
     * const invitation = await prisma.invitation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InvitationFindUniqueArgs>(args: SelectSubset<T, InvitationFindUniqueArgs<ExtArgs>>): Prisma__InvitationClient<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Invitation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InvitationFindUniqueOrThrowArgs} args - Arguments to find a Invitation
     * @example
     * // Get one Invitation
     * const invitation = await prisma.invitation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InvitationFindUniqueOrThrowArgs>(args: SelectSubset<T, InvitationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InvitationClient<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Invitation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationFindFirstArgs} args - Arguments to find a Invitation
     * @example
     * // Get one Invitation
     * const invitation = await prisma.invitation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InvitationFindFirstArgs>(args?: SelectSubset<T, InvitationFindFirstArgs<ExtArgs>>): Prisma__InvitationClient<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Invitation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationFindFirstOrThrowArgs} args - Arguments to find a Invitation
     * @example
     * // Get one Invitation
     * const invitation = await prisma.invitation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InvitationFindFirstOrThrowArgs>(args?: SelectSubset<T, InvitationFindFirstOrThrowArgs<ExtArgs>>): Prisma__InvitationClient<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Invitations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Invitations
     * const invitations = await prisma.invitation.findMany()
     * 
     * // Get first 10 Invitations
     * const invitations = await prisma.invitation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const invitationWithIdOnly = await prisma.invitation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InvitationFindManyArgs>(args?: SelectSubset<T, InvitationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Invitation.
     * @param {InvitationCreateArgs} args - Arguments to create a Invitation.
     * @example
     * // Create one Invitation
     * const Invitation = await prisma.invitation.create({
     *   data: {
     *     // ... data to create a Invitation
     *   }
     * })
     * 
     */
    create<T extends InvitationCreateArgs>(args: SelectSubset<T, InvitationCreateArgs<ExtArgs>>): Prisma__InvitationClient<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Invitations.
     * @param {InvitationCreateManyArgs} args - Arguments to create many Invitations.
     * @example
     * // Create many Invitations
     * const invitation = await prisma.invitation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InvitationCreateManyArgs>(args?: SelectSubset<T, InvitationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Invitations and returns the data saved in the database.
     * @param {InvitationCreateManyAndReturnArgs} args - Arguments to create many Invitations.
     * @example
     * // Create many Invitations
     * const invitation = await prisma.invitation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Invitations and only return the `id`
     * const invitationWithIdOnly = await prisma.invitation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InvitationCreateManyAndReturnArgs>(args?: SelectSubset<T, InvitationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Invitation.
     * @param {InvitationDeleteArgs} args - Arguments to delete one Invitation.
     * @example
     * // Delete one Invitation
     * const Invitation = await prisma.invitation.delete({
     *   where: {
     *     // ... filter to delete one Invitation
     *   }
     * })
     * 
     */
    delete<T extends InvitationDeleteArgs>(args: SelectSubset<T, InvitationDeleteArgs<ExtArgs>>): Prisma__InvitationClient<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Invitation.
     * @param {InvitationUpdateArgs} args - Arguments to update one Invitation.
     * @example
     * // Update one Invitation
     * const invitation = await prisma.invitation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InvitationUpdateArgs>(args: SelectSubset<T, InvitationUpdateArgs<ExtArgs>>): Prisma__InvitationClient<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Invitations.
     * @param {InvitationDeleteManyArgs} args - Arguments to filter Invitations to delete.
     * @example
     * // Delete a few Invitations
     * const { count } = await prisma.invitation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InvitationDeleteManyArgs>(args?: SelectSubset<T, InvitationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Invitations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Invitations
     * const invitation = await prisma.invitation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InvitationUpdateManyArgs>(args: SelectSubset<T, InvitationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Invitations and returns the data updated in the database.
     * @param {InvitationUpdateManyAndReturnArgs} args - Arguments to update many Invitations.
     * @example
     * // Update many Invitations
     * const invitation = await prisma.invitation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Invitations and only return the `id`
     * const invitationWithIdOnly = await prisma.invitation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends InvitationUpdateManyAndReturnArgs>(args: SelectSubset<T, InvitationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Invitation.
     * @param {InvitationUpsertArgs} args - Arguments to update or create a Invitation.
     * @example
     * // Update or create a Invitation
     * const invitation = await prisma.invitation.upsert({
     *   create: {
     *     // ... data to create a Invitation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Invitation we want to update
     *   }
     * })
     */
    upsert<T extends InvitationUpsertArgs>(args: SelectSubset<T, InvitationUpsertArgs<ExtArgs>>): Prisma__InvitationClient<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Invitations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationCountArgs} args - Arguments to filter Invitations to count.
     * @example
     * // Count the number of Invitations
     * const count = await prisma.invitation.count({
     *   where: {
     *     // ... the filter for the Invitations we want to count
     *   }
     * })
    **/
    count<T extends InvitationCountArgs>(
      args?: Subset<T, InvitationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InvitationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Invitation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InvitationAggregateArgs>(args: Subset<T, InvitationAggregateArgs>): Prisma.PrismaPromise<GetInvitationAggregateType<T>>

    /**
     * Group by Invitation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InvitationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InvitationGroupByArgs['orderBy'] }
        : { orderBy?: InvitationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InvitationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInvitationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Invitation model
   */
  readonly fields: InvitationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Invitation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InvitationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    organization<T extends OrganizationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrganizationDefaultArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    invitedBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Invitation model
   */
  interface InvitationFieldRefs {
    readonly id: FieldRef<"Invitation", 'String'>
    readonly email: FieldRef<"Invitation", 'String'>
    readonly role: FieldRef<"Invitation", 'Role'>
    readonly status: FieldRef<"Invitation", 'InvitationStatus'>
    readonly expiresAt: FieldRef<"Invitation", 'DateTime'>
    readonly createdAt: FieldRef<"Invitation", 'DateTime'>
    readonly organizationId: FieldRef<"Invitation", 'String'>
    readonly invitedById: FieldRef<"Invitation", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Invitation findUnique
   */
  export type InvitationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    /**
     * Filter, which Invitation to fetch.
     */
    where: InvitationWhereUniqueInput
  }

  /**
   * Invitation findUniqueOrThrow
   */
  export type InvitationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    /**
     * Filter, which Invitation to fetch.
     */
    where: InvitationWhereUniqueInput
  }

  /**
   * Invitation findFirst
   */
  export type InvitationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    /**
     * Filter, which Invitation to fetch.
     */
    where?: InvitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invitations to fetch.
     */
    orderBy?: InvitationOrderByWithRelationInput | InvitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Invitations.
     */
    cursor?: InvitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invitations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Invitations.
     */
    distinct?: InvitationScalarFieldEnum | InvitationScalarFieldEnum[]
  }

  /**
   * Invitation findFirstOrThrow
   */
  export type InvitationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    /**
     * Filter, which Invitation to fetch.
     */
    where?: InvitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invitations to fetch.
     */
    orderBy?: InvitationOrderByWithRelationInput | InvitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Invitations.
     */
    cursor?: InvitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invitations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Invitations.
     */
    distinct?: InvitationScalarFieldEnum | InvitationScalarFieldEnum[]
  }

  /**
   * Invitation findMany
   */
  export type InvitationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    /**
     * Filter, which Invitations to fetch.
     */
    where?: InvitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invitations to fetch.
     */
    orderBy?: InvitationOrderByWithRelationInput | InvitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Invitations.
     */
    cursor?: InvitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invitations.
     */
    skip?: number
    distinct?: InvitationScalarFieldEnum | InvitationScalarFieldEnum[]
  }

  /**
   * Invitation create
   */
  export type InvitationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    /**
     * The data needed to create a Invitation.
     */
    data: XOR<InvitationCreateInput, InvitationUncheckedCreateInput>
  }

  /**
   * Invitation createMany
   */
  export type InvitationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Invitations.
     */
    data: InvitationCreateManyInput | InvitationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Invitation createManyAndReturn
   */
  export type InvitationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * The data used to create many Invitations.
     */
    data: InvitationCreateManyInput | InvitationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Invitation update
   */
  export type InvitationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    /**
     * The data needed to update a Invitation.
     */
    data: XOR<InvitationUpdateInput, InvitationUncheckedUpdateInput>
    /**
     * Choose, which Invitation to update.
     */
    where: InvitationWhereUniqueInput
  }

  /**
   * Invitation updateMany
   */
  export type InvitationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Invitations.
     */
    data: XOR<InvitationUpdateManyMutationInput, InvitationUncheckedUpdateManyInput>
    /**
     * Filter which Invitations to update
     */
    where?: InvitationWhereInput
    /**
     * Limit how many Invitations to update.
     */
    limit?: number
  }

  /**
   * Invitation updateManyAndReturn
   */
  export type InvitationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * The data used to update Invitations.
     */
    data: XOR<InvitationUpdateManyMutationInput, InvitationUncheckedUpdateManyInput>
    /**
     * Filter which Invitations to update
     */
    where?: InvitationWhereInput
    /**
     * Limit how many Invitations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Invitation upsert
   */
  export type InvitationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    /**
     * The filter to search for the Invitation to update in case it exists.
     */
    where: InvitationWhereUniqueInput
    /**
     * In case the Invitation found by the `where` argument doesn't exist, create a new Invitation with this data.
     */
    create: XOR<InvitationCreateInput, InvitationUncheckedCreateInput>
    /**
     * In case the Invitation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InvitationUpdateInput, InvitationUncheckedUpdateInput>
  }

  /**
   * Invitation delete
   */
  export type InvitationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    /**
     * Filter which Invitation to delete.
     */
    where: InvitationWhereUniqueInput
  }

  /**
   * Invitation deleteMany
   */
  export type InvitationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Invitations to delete
     */
    where?: InvitationWhereInput
    /**
     * Limit how many Invitations to delete.
     */
    limit?: number
  }

  /**
   * Invitation without action
   */
  export type InvitationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
  }


  /**
   * Model Target
   */

  export type AggregateTarget = {
    _count: TargetCountAggregateOutputType | null
    _min: TargetMinAggregateOutputType | null
    _max: TargetMaxAggregateOutputType | null
  }

  export type TargetMinAggregateOutputType = {
    id: string | null
    url: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
    organizationId: string | null
  }

  export type TargetMaxAggregateOutputType = {
    id: string | null
    url: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
    organizationId: string | null
  }

  export type TargetCountAggregateOutputType = {
    id: number
    url: number
    name: number
    createdAt: number
    updatedAt: number
    organizationId: number
    _all: number
  }


  export type TargetMinAggregateInputType = {
    id?: true
    url?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    organizationId?: true
  }

  export type TargetMaxAggregateInputType = {
    id?: true
    url?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    organizationId?: true
  }

  export type TargetCountAggregateInputType = {
    id?: true
    url?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    organizationId?: true
    _all?: true
  }

  export type TargetAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Target to aggregate.
     */
    where?: TargetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Targets to fetch.
     */
    orderBy?: TargetOrderByWithRelationInput | TargetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TargetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Targets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Targets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Targets
    **/
    _count?: true | TargetCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TargetMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TargetMaxAggregateInputType
  }

  export type GetTargetAggregateType<T extends TargetAggregateArgs> = {
        [P in keyof T & keyof AggregateTarget]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTarget[P]>
      : GetScalarType<T[P], AggregateTarget[P]>
  }




  export type TargetGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TargetWhereInput
    orderBy?: TargetOrderByWithAggregationInput | TargetOrderByWithAggregationInput[]
    by: TargetScalarFieldEnum[] | TargetScalarFieldEnum
    having?: TargetScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TargetCountAggregateInputType | true
    _min?: TargetMinAggregateInputType
    _max?: TargetMaxAggregateInputType
  }

  export type TargetGroupByOutputType = {
    id: string
    url: string
    name: string
    createdAt: Date
    updatedAt: Date
    organizationId: string
    _count: TargetCountAggregateOutputType | null
    _min: TargetMinAggregateOutputType | null
    _max: TargetMaxAggregateOutputType | null
  }

  type GetTargetGroupByPayload<T extends TargetGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TargetGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TargetGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TargetGroupByOutputType[P]>
            : GetScalarType<T[P], TargetGroupByOutputType[P]>
        }
      >
    >


  export type TargetSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    organizationId?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    scans?: boolean | Target$scansArgs<ExtArgs>
    _count?: boolean | TargetCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["target"]>

  export type TargetSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    organizationId?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["target"]>

  export type TargetSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    organizationId?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["target"]>

  export type TargetSelectScalar = {
    id?: boolean
    url?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    organizationId?: boolean
  }

  export type TargetOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "url" | "name" | "createdAt" | "updatedAt" | "organizationId", ExtArgs["result"]["target"]>
  export type TargetInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    scans?: boolean | Target$scansArgs<ExtArgs>
    _count?: boolean | TargetCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TargetIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }
  export type TargetIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }

  export type $TargetPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Target"
    objects: {
      organization: Prisma.$OrganizationPayload<ExtArgs>
      scans: Prisma.$ScanPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      url: string
      name: string
      createdAt: Date
      updatedAt: Date
      organizationId: string
    }, ExtArgs["result"]["target"]>
    composites: {}
  }

  type TargetGetPayload<S extends boolean | null | undefined | TargetDefaultArgs> = $Result.GetResult<Prisma.$TargetPayload, S>

  type TargetCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TargetFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TargetCountAggregateInputType | true
    }

  export interface TargetDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Target'], meta: { name: 'Target' } }
    /**
     * Find zero or one Target that matches the filter.
     * @param {TargetFindUniqueArgs} args - Arguments to find a Target
     * @example
     * // Get one Target
     * const target = await prisma.target.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TargetFindUniqueArgs>(args: SelectSubset<T, TargetFindUniqueArgs<ExtArgs>>): Prisma__TargetClient<$Result.GetResult<Prisma.$TargetPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Target that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TargetFindUniqueOrThrowArgs} args - Arguments to find a Target
     * @example
     * // Get one Target
     * const target = await prisma.target.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TargetFindUniqueOrThrowArgs>(args: SelectSubset<T, TargetFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TargetClient<$Result.GetResult<Prisma.$TargetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Target that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TargetFindFirstArgs} args - Arguments to find a Target
     * @example
     * // Get one Target
     * const target = await prisma.target.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TargetFindFirstArgs>(args?: SelectSubset<T, TargetFindFirstArgs<ExtArgs>>): Prisma__TargetClient<$Result.GetResult<Prisma.$TargetPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Target that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TargetFindFirstOrThrowArgs} args - Arguments to find a Target
     * @example
     * // Get one Target
     * const target = await prisma.target.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TargetFindFirstOrThrowArgs>(args?: SelectSubset<T, TargetFindFirstOrThrowArgs<ExtArgs>>): Prisma__TargetClient<$Result.GetResult<Prisma.$TargetPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Targets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TargetFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Targets
     * const targets = await prisma.target.findMany()
     * 
     * // Get first 10 Targets
     * const targets = await prisma.target.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const targetWithIdOnly = await prisma.target.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TargetFindManyArgs>(args?: SelectSubset<T, TargetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TargetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Target.
     * @param {TargetCreateArgs} args - Arguments to create a Target.
     * @example
     * // Create one Target
     * const Target = await prisma.target.create({
     *   data: {
     *     // ... data to create a Target
     *   }
     * })
     * 
     */
    create<T extends TargetCreateArgs>(args: SelectSubset<T, TargetCreateArgs<ExtArgs>>): Prisma__TargetClient<$Result.GetResult<Prisma.$TargetPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Targets.
     * @param {TargetCreateManyArgs} args - Arguments to create many Targets.
     * @example
     * // Create many Targets
     * const target = await prisma.target.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TargetCreateManyArgs>(args?: SelectSubset<T, TargetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Targets and returns the data saved in the database.
     * @param {TargetCreateManyAndReturnArgs} args - Arguments to create many Targets.
     * @example
     * // Create many Targets
     * const target = await prisma.target.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Targets and only return the `id`
     * const targetWithIdOnly = await prisma.target.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TargetCreateManyAndReturnArgs>(args?: SelectSubset<T, TargetCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TargetPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Target.
     * @param {TargetDeleteArgs} args - Arguments to delete one Target.
     * @example
     * // Delete one Target
     * const Target = await prisma.target.delete({
     *   where: {
     *     // ... filter to delete one Target
     *   }
     * })
     * 
     */
    delete<T extends TargetDeleteArgs>(args: SelectSubset<T, TargetDeleteArgs<ExtArgs>>): Prisma__TargetClient<$Result.GetResult<Prisma.$TargetPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Target.
     * @param {TargetUpdateArgs} args - Arguments to update one Target.
     * @example
     * // Update one Target
     * const target = await prisma.target.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TargetUpdateArgs>(args: SelectSubset<T, TargetUpdateArgs<ExtArgs>>): Prisma__TargetClient<$Result.GetResult<Prisma.$TargetPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Targets.
     * @param {TargetDeleteManyArgs} args - Arguments to filter Targets to delete.
     * @example
     * // Delete a few Targets
     * const { count } = await prisma.target.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TargetDeleteManyArgs>(args?: SelectSubset<T, TargetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Targets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TargetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Targets
     * const target = await prisma.target.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TargetUpdateManyArgs>(args: SelectSubset<T, TargetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Targets and returns the data updated in the database.
     * @param {TargetUpdateManyAndReturnArgs} args - Arguments to update many Targets.
     * @example
     * // Update many Targets
     * const target = await prisma.target.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Targets and only return the `id`
     * const targetWithIdOnly = await prisma.target.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TargetUpdateManyAndReturnArgs>(args: SelectSubset<T, TargetUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TargetPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Target.
     * @param {TargetUpsertArgs} args - Arguments to update or create a Target.
     * @example
     * // Update or create a Target
     * const target = await prisma.target.upsert({
     *   create: {
     *     // ... data to create a Target
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Target we want to update
     *   }
     * })
     */
    upsert<T extends TargetUpsertArgs>(args: SelectSubset<T, TargetUpsertArgs<ExtArgs>>): Prisma__TargetClient<$Result.GetResult<Prisma.$TargetPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Targets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TargetCountArgs} args - Arguments to filter Targets to count.
     * @example
     * // Count the number of Targets
     * const count = await prisma.target.count({
     *   where: {
     *     // ... the filter for the Targets we want to count
     *   }
     * })
    **/
    count<T extends TargetCountArgs>(
      args?: Subset<T, TargetCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TargetCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Target.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TargetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TargetAggregateArgs>(args: Subset<T, TargetAggregateArgs>): Prisma.PrismaPromise<GetTargetAggregateType<T>>

    /**
     * Group by Target.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TargetGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TargetGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TargetGroupByArgs['orderBy'] }
        : { orderBy?: TargetGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TargetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTargetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Target model
   */
  readonly fields: TargetFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Target.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TargetClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    organization<T extends OrganizationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrganizationDefaultArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    scans<T extends Target$scansArgs<ExtArgs> = {}>(args?: Subset<T, Target$scansArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Target model
   */
  interface TargetFieldRefs {
    readonly id: FieldRef<"Target", 'String'>
    readonly url: FieldRef<"Target", 'String'>
    readonly name: FieldRef<"Target", 'String'>
    readonly createdAt: FieldRef<"Target", 'DateTime'>
    readonly updatedAt: FieldRef<"Target", 'DateTime'>
    readonly organizationId: FieldRef<"Target", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Target findUnique
   */
  export type TargetFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Target
     */
    select?: TargetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Target
     */
    omit?: TargetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TargetInclude<ExtArgs> | null
    /**
     * Filter, which Target to fetch.
     */
    where: TargetWhereUniqueInput
  }

  /**
   * Target findUniqueOrThrow
   */
  export type TargetFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Target
     */
    select?: TargetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Target
     */
    omit?: TargetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TargetInclude<ExtArgs> | null
    /**
     * Filter, which Target to fetch.
     */
    where: TargetWhereUniqueInput
  }

  /**
   * Target findFirst
   */
  export type TargetFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Target
     */
    select?: TargetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Target
     */
    omit?: TargetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TargetInclude<ExtArgs> | null
    /**
     * Filter, which Target to fetch.
     */
    where?: TargetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Targets to fetch.
     */
    orderBy?: TargetOrderByWithRelationInput | TargetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Targets.
     */
    cursor?: TargetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Targets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Targets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Targets.
     */
    distinct?: TargetScalarFieldEnum | TargetScalarFieldEnum[]
  }

  /**
   * Target findFirstOrThrow
   */
  export type TargetFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Target
     */
    select?: TargetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Target
     */
    omit?: TargetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TargetInclude<ExtArgs> | null
    /**
     * Filter, which Target to fetch.
     */
    where?: TargetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Targets to fetch.
     */
    orderBy?: TargetOrderByWithRelationInput | TargetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Targets.
     */
    cursor?: TargetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Targets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Targets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Targets.
     */
    distinct?: TargetScalarFieldEnum | TargetScalarFieldEnum[]
  }

  /**
   * Target findMany
   */
  export type TargetFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Target
     */
    select?: TargetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Target
     */
    omit?: TargetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TargetInclude<ExtArgs> | null
    /**
     * Filter, which Targets to fetch.
     */
    where?: TargetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Targets to fetch.
     */
    orderBy?: TargetOrderByWithRelationInput | TargetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Targets.
     */
    cursor?: TargetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Targets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Targets.
     */
    skip?: number
    distinct?: TargetScalarFieldEnum | TargetScalarFieldEnum[]
  }

  /**
   * Target create
   */
  export type TargetCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Target
     */
    select?: TargetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Target
     */
    omit?: TargetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TargetInclude<ExtArgs> | null
    /**
     * The data needed to create a Target.
     */
    data: XOR<TargetCreateInput, TargetUncheckedCreateInput>
  }

  /**
   * Target createMany
   */
  export type TargetCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Targets.
     */
    data: TargetCreateManyInput | TargetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Target createManyAndReturn
   */
  export type TargetCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Target
     */
    select?: TargetSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Target
     */
    omit?: TargetOmit<ExtArgs> | null
    /**
     * The data used to create many Targets.
     */
    data: TargetCreateManyInput | TargetCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TargetIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Target update
   */
  export type TargetUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Target
     */
    select?: TargetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Target
     */
    omit?: TargetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TargetInclude<ExtArgs> | null
    /**
     * The data needed to update a Target.
     */
    data: XOR<TargetUpdateInput, TargetUncheckedUpdateInput>
    /**
     * Choose, which Target to update.
     */
    where: TargetWhereUniqueInput
  }

  /**
   * Target updateMany
   */
  export type TargetUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Targets.
     */
    data: XOR<TargetUpdateManyMutationInput, TargetUncheckedUpdateManyInput>
    /**
     * Filter which Targets to update
     */
    where?: TargetWhereInput
    /**
     * Limit how many Targets to update.
     */
    limit?: number
  }

  /**
   * Target updateManyAndReturn
   */
  export type TargetUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Target
     */
    select?: TargetSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Target
     */
    omit?: TargetOmit<ExtArgs> | null
    /**
     * The data used to update Targets.
     */
    data: XOR<TargetUpdateManyMutationInput, TargetUncheckedUpdateManyInput>
    /**
     * Filter which Targets to update
     */
    where?: TargetWhereInput
    /**
     * Limit how many Targets to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TargetIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Target upsert
   */
  export type TargetUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Target
     */
    select?: TargetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Target
     */
    omit?: TargetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TargetInclude<ExtArgs> | null
    /**
     * The filter to search for the Target to update in case it exists.
     */
    where: TargetWhereUniqueInput
    /**
     * In case the Target found by the `where` argument doesn't exist, create a new Target with this data.
     */
    create: XOR<TargetCreateInput, TargetUncheckedCreateInput>
    /**
     * In case the Target was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TargetUpdateInput, TargetUncheckedUpdateInput>
  }

  /**
   * Target delete
   */
  export type TargetDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Target
     */
    select?: TargetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Target
     */
    omit?: TargetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TargetInclude<ExtArgs> | null
    /**
     * Filter which Target to delete.
     */
    where: TargetWhereUniqueInput
  }

  /**
   * Target deleteMany
   */
  export type TargetDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Targets to delete
     */
    where?: TargetWhereInput
    /**
     * Limit how many Targets to delete.
     */
    limit?: number
  }

  /**
   * Target.scans
   */
  export type Target$scansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scan
     */
    select?: ScanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Scan
     */
    omit?: ScanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanInclude<ExtArgs> | null
    where?: ScanWhereInput
    orderBy?: ScanOrderByWithRelationInput | ScanOrderByWithRelationInput[]
    cursor?: ScanWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ScanScalarFieldEnum | ScanScalarFieldEnum[]
  }

  /**
   * Target without action
   */
  export type TargetDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Target
     */
    select?: TargetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Target
     */
    omit?: TargetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TargetInclude<ExtArgs> | null
  }


  /**
   * Model Scan
   */

  export type AggregateScan = {
    _count: ScanCountAggregateOutputType | null
    _min: ScanMinAggregateOutputType | null
    _max: ScanMaxAggregateOutputType | null
  }

  export type ScanMinAggregateOutputType = {
    id: string | null
    status: $Enums.ScanStatus | null
    startedAt: Date | null
    completedAt: Date | null
    createdAt: Date | null
    targetId: string | null
    configurationId: string | null
  }

  export type ScanMaxAggregateOutputType = {
    id: string | null
    status: $Enums.ScanStatus | null
    startedAt: Date | null
    completedAt: Date | null
    createdAt: Date | null
    targetId: string | null
    configurationId: string | null
  }

  export type ScanCountAggregateOutputType = {
    id: number
    status: number
    startedAt: number
    completedAt: number
    createdAt: number
    targetId: number
    configurationId: number
    _all: number
  }


  export type ScanMinAggregateInputType = {
    id?: true
    status?: true
    startedAt?: true
    completedAt?: true
    createdAt?: true
    targetId?: true
    configurationId?: true
  }

  export type ScanMaxAggregateInputType = {
    id?: true
    status?: true
    startedAt?: true
    completedAt?: true
    createdAt?: true
    targetId?: true
    configurationId?: true
  }

  export type ScanCountAggregateInputType = {
    id?: true
    status?: true
    startedAt?: true
    completedAt?: true
    createdAt?: true
    targetId?: true
    configurationId?: true
    _all?: true
  }

  export type ScanAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Scan to aggregate.
     */
    where?: ScanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Scans to fetch.
     */
    orderBy?: ScanOrderByWithRelationInput | ScanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ScanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Scans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Scans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Scans
    **/
    _count?: true | ScanCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ScanMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ScanMaxAggregateInputType
  }

  export type GetScanAggregateType<T extends ScanAggregateArgs> = {
        [P in keyof T & keyof AggregateScan]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateScan[P]>
      : GetScalarType<T[P], AggregateScan[P]>
  }




  export type ScanGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScanWhereInput
    orderBy?: ScanOrderByWithAggregationInput | ScanOrderByWithAggregationInput[]
    by: ScanScalarFieldEnum[] | ScanScalarFieldEnum
    having?: ScanScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ScanCountAggregateInputType | true
    _min?: ScanMinAggregateInputType
    _max?: ScanMaxAggregateInputType
  }

  export type ScanGroupByOutputType = {
    id: string
    status: $Enums.ScanStatus
    startedAt: Date | null
    completedAt: Date | null
    createdAt: Date
    targetId: string
    configurationId: string | null
    _count: ScanCountAggregateOutputType | null
    _min: ScanMinAggregateOutputType | null
    _max: ScanMaxAggregateOutputType | null
  }

  type GetScanGroupByPayload<T extends ScanGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ScanGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ScanGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ScanGroupByOutputType[P]>
            : GetScalarType<T[P], ScanGroupByOutputType[P]>
        }
      >
    >


  export type ScanSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    status?: boolean
    startedAt?: boolean
    completedAt?: boolean
    createdAt?: boolean
    targetId?: boolean
    configurationId?: boolean
    target?: boolean | TargetDefaultArgs<ExtArgs>
    vulnerabilities?: boolean | Scan$vulnerabilitiesArgs<ExtArgs>
    report?: boolean | Scan$reportArgs<ExtArgs>
    configuration?: boolean | Scan$configurationArgs<ExtArgs>
    _count?: boolean | ScanCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["scan"]>

  export type ScanSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    status?: boolean
    startedAt?: boolean
    completedAt?: boolean
    createdAt?: boolean
    targetId?: boolean
    configurationId?: boolean
    target?: boolean | TargetDefaultArgs<ExtArgs>
    configuration?: boolean | Scan$configurationArgs<ExtArgs>
  }, ExtArgs["result"]["scan"]>

  export type ScanSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    status?: boolean
    startedAt?: boolean
    completedAt?: boolean
    createdAt?: boolean
    targetId?: boolean
    configurationId?: boolean
    target?: boolean | TargetDefaultArgs<ExtArgs>
    configuration?: boolean | Scan$configurationArgs<ExtArgs>
  }, ExtArgs["result"]["scan"]>

  export type ScanSelectScalar = {
    id?: boolean
    status?: boolean
    startedAt?: boolean
    completedAt?: boolean
    createdAt?: boolean
    targetId?: boolean
    configurationId?: boolean
  }

  export type ScanOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "status" | "startedAt" | "completedAt" | "createdAt" | "targetId" | "configurationId", ExtArgs["result"]["scan"]>
  export type ScanInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    target?: boolean | TargetDefaultArgs<ExtArgs>
    vulnerabilities?: boolean | Scan$vulnerabilitiesArgs<ExtArgs>
    report?: boolean | Scan$reportArgs<ExtArgs>
    configuration?: boolean | Scan$configurationArgs<ExtArgs>
    _count?: boolean | ScanCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ScanIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    target?: boolean | TargetDefaultArgs<ExtArgs>
    configuration?: boolean | Scan$configurationArgs<ExtArgs>
  }
  export type ScanIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    target?: boolean | TargetDefaultArgs<ExtArgs>
    configuration?: boolean | Scan$configurationArgs<ExtArgs>
  }

  export type $ScanPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Scan"
    objects: {
      target: Prisma.$TargetPayload<ExtArgs>
      vulnerabilities: Prisma.$VulnerabilityPayload<ExtArgs>[]
      report: Prisma.$ReportPayload<ExtArgs> | null
      configuration: Prisma.$ScanConfigurationPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      status: $Enums.ScanStatus
      startedAt: Date | null
      completedAt: Date | null
      createdAt: Date
      targetId: string
      configurationId: string | null
    }, ExtArgs["result"]["scan"]>
    composites: {}
  }

  type ScanGetPayload<S extends boolean | null | undefined | ScanDefaultArgs> = $Result.GetResult<Prisma.$ScanPayload, S>

  type ScanCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ScanFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ScanCountAggregateInputType | true
    }

  export interface ScanDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Scan'], meta: { name: 'Scan' } }
    /**
     * Find zero or one Scan that matches the filter.
     * @param {ScanFindUniqueArgs} args - Arguments to find a Scan
     * @example
     * // Get one Scan
     * const scan = await prisma.scan.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ScanFindUniqueArgs>(args: SelectSubset<T, ScanFindUniqueArgs<ExtArgs>>): Prisma__ScanClient<$Result.GetResult<Prisma.$ScanPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Scan that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ScanFindUniqueOrThrowArgs} args - Arguments to find a Scan
     * @example
     * // Get one Scan
     * const scan = await prisma.scan.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ScanFindUniqueOrThrowArgs>(args: SelectSubset<T, ScanFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ScanClient<$Result.GetResult<Prisma.$ScanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Scan that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScanFindFirstArgs} args - Arguments to find a Scan
     * @example
     * // Get one Scan
     * const scan = await prisma.scan.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ScanFindFirstArgs>(args?: SelectSubset<T, ScanFindFirstArgs<ExtArgs>>): Prisma__ScanClient<$Result.GetResult<Prisma.$ScanPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Scan that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScanFindFirstOrThrowArgs} args - Arguments to find a Scan
     * @example
     * // Get one Scan
     * const scan = await prisma.scan.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ScanFindFirstOrThrowArgs>(args?: SelectSubset<T, ScanFindFirstOrThrowArgs<ExtArgs>>): Prisma__ScanClient<$Result.GetResult<Prisma.$ScanPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Scans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScanFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Scans
     * const scans = await prisma.scan.findMany()
     * 
     * // Get first 10 Scans
     * const scans = await prisma.scan.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const scanWithIdOnly = await prisma.scan.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ScanFindManyArgs>(args?: SelectSubset<T, ScanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Scan.
     * @param {ScanCreateArgs} args - Arguments to create a Scan.
     * @example
     * // Create one Scan
     * const Scan = await prisma.scan.create({
     *   data: {
     *     // ... data to create a Scan
     *   }
     * })
     * 
     */
    create<T extends ScanCreateArgs>(args: SelectSubset<T, ScanCreateArgs<ExtArgs>>): Prisma__ScanClient<$Result.GetResult<Prisma.$ScanPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Scans.
     * @param {ScanCreateManyArgs} args - Arguments to create many Scans.
     * @example
     * // Create many Scans
     * const scan = await prisma.scan.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ScanCreateManyArgs>(args?: SelectSubset<T, ScanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Scans and returns the data saved in the database.
     * @param {ScanCreateManyAndReturnArgs} args - Arguments to create many Scans.
     * @example
     * // Create many Scans
     * const scan = await prisma.scan.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Scans and only return the `id`
     * const scanWithIdOnly = await prisma.scan.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ScanCreateManyAndReturnArgs>(args?: SelectSubset<T, ScanCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScanPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Scan.
     * @param {ScanDeleteArgs} args - Arguments to delete one Scan.
     * @example
     * // Delete one Scan
     * const Scan = await prisma.scan.delete({
     *   where: {
     *     // ... filter to delete one Scan
     *   }
     * })
     * 
     */
    delete<T extends ScanDeleteArgs>(args: SelectSubset<T, ScanDeleteArgs<ExtArgs>>): Prisma__ScanClient<$Result.GetResult<Prisma.$ScanPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Scan.
     * @param {ScanUpdateArgs} args - Arguments to update one Scan.
     * @example
     * // Update one Scan
     * const scan = await prisma.scan.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ScanUpdateArgs>(args: SelectSubset<T, ScanUpdateArgs<ExtArgs>>): Prisma__ScanClient<$Result.GetResult<Prisma.$ScanPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Scans.
     * @param {ScanDeleteManyArgs} args - Arguments to filter Scans to delete.
     * @example
     * // Delete a few Scans
     * const { count } = await prisma.scan.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ScanDeleteManyArgs>(args?: SelectSubset<T, ScanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Scans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScanUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Scans
     * const scan = await prisma.scan.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ScanUpdateManyArgs>(args: SelectSubset<T, ScanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Scans and returns the data updated in the database.
     * @param {ScanUpdateManyAndReturnArgs} args - Arguments to update many Scans.
     * @example
     * // Update many Scans
     * const scan = await prisma.scan.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Scans and only return the `id`
     * const scanWithIdOnly = await prisma.scan.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ScanUpdateManyAndReturnArgs>(args: SelectSubset<T, ScanUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScanPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Scan.
     * @param {ScanUpsertArgs} args - Arguments to update or create a Scan.
     * @example
     * // Update or create a Scan
     * const scan = await prisma.scan.upsert({
     *   create: {
     *     // ... data to create a Scan
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Scan we want to update
     *   }
     * })
     */
    upsert<T extends ScanUpsertArgs>(args: SelectSubset<T, ScanUpsertArgs<ExtArgs>>): Prisma__ScanClient<$Result.GetResult<Prisma.$ScanPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Scans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScanCountArgs} args - Arguments to filter Scans to count.
     * @example
     * // Count the number of Scans
     * const count = await prisma.scan.count({
     *   where: {
     *     // ... the filter for the Scans we want to count
     *   }
     * })
    **/
    count<T extends ScanCountArgs>(
      args?: Subset<T, ScanCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ScanCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Scan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScanAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ScanAggregateArgs>(args: Subset<T, ScanAggregateArgs>): Prisma.PrismaPromise<GetScanAggregateType<T>>

    /**
     * Group by Scan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScanGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ScanGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ScanGroupByArgs['orderBy'] }
        : { orderBy?: ScanGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ScanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetScanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Scan model
   */
  readonly fields: ScanFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Scan.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ScanClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    target<T extends TargetDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TargetDefaultArgs<ExtArgs>>): Prisma__TargetClient<$Result.GetResult<Prisma.$TargetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    vulnerabilities<T extends Scan$vulnerabilitiesArgs<ExtArgs> = {}>(args?: Subset<T, Scan$vulnerabilitiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VulnerabilityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    report<T extends Scan$reportArgs<ExtArgs> = {}>(args?: Subset<T, Scan$reportArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    configuration<T extends Scan$configurationArgs<ExtArgs> = {}>(args?: Subset<T, Scan$configurationArgs<ExtArgs>>): Prisma__ScanConfigurationClient<$Result.GetResult<Prisma.$ScanConfigurationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Scan model
   */
  interface ScanFieldRefs {
    readonly id: FieldRef<"Scan", 'String'>
    readonly status: FieldRef<"Scan", 'ScanStatus'>
    readonly startedAt: FieldRef<"Scan", 'DateTime'>
    readonly completedAt: FieldRef<"Scan", 'DateTime'>
    readonly createdAt: FieldRef<"Scan", 'DateTime'>
    readonly targetId: FieldRef<"Scan", 'String'>
    readonly configurationId: FieldRef<"Scan", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Scan findUnique
   */
  export type ScanFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scan
     */
    select?: ScanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Scan
     */
    omit?: ScanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanInclude<ExtArgs> | null
    /**
     * Filter, which Scan to fetch.
     */
    where: ScanWhereUniqueInput
  }

  /**
   * Scan findUniqueOrThrow
   */
  export type ScanFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scan
     */
    select?: ScanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Scan
     */
    omit?: ScanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanInclude<ExtArgs> | null
    /**
     * Filter, which Scan to fetch.
     */
    where: ScanWhereUniqueInput
  }

  /**
   * Scan findFirst
   */
  export type ScanFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scan
     */
    select?: ScanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Scan
     */
    omit?: ScanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanInclude<ExtArgs> | null
    /**
     * Filter, which Scan to fetch.
     */
    where?: ScanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Scans to fetch.
     */
    orderBy?: ScanOrderByWithRelationInput | ScanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Scans.
     */
    cursor?: ScanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Scans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Scans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Scans.
     */
    distinct?: ScanScalarFieldEnum | ScanScalarFieldEnum[]
  }

  /**
   * Scan findFirstOrThrow
   */
  export type ScanFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scan
     */
    select?: ScanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Scan
     */
    omit?: ScanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanInclude<ExtArgs> | null
    /**
     * Filter, which Scan to fetch.
     */
    where?: ScanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Scans to fetch.
     */
    orderBy?: ScanOrderByWithRelationInput | ScanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Scans.
     */
    cursor?: ScanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Scans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Scans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Scans.
     */
    distinct?: ScanScalarFieldEnum | ScanScalarFieldEnum[]
  }

  /**
   * Scan findMany
   */
  export type ScanFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scan
     */
    select?: ScanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Scan
     */
    omit?: ScanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanInclude<ExtArgs> | null
    /**
     * Filter, which Scans to fetch.
     */
    where?: ScanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Scans to fetch.
     */
    orderBy?: ScanOrderByWithRelationInput | ScanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Scans.
     */
    cursor?: ScanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Scans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Scans.
     */
    skip?: number
    distinct?: ScanScalarFieldEnum | ScanScalarFieldEnum[]
  }

  /**
   * Scan create
   */
  export type ScanCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scan
     */
    select?: ScanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Scan
     */
    omit?: ScanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanInclude<ExtArgs> | null
    /**
     * The data needed to create a Scan.
     */
    data: XOR<ScanCreateInput, ScanUncheckedCreateInput>
  }

  /**
   * Scan createMany
   */
  export type ScanCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Scans.
     */
    data: ScanCreateManyInput | ScanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Scan createManyAndReturn
   */
  export type ScanCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scan
     */
    select?: ScanSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Scan
     */
    omit?: ScanOmit<ExtArgs> | null
    /**
     * The data used to create many Scans.
     */
    data: ScanCreateManyInput | ScanCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Scan update
   */
  export type ScanUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scan
     */
    select?: ScanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Scan
     */
    omit?: ScanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanInclude<ExtArgs> | null
    /**
     * The data needed to update a Scan.
     */
    data: XOR<ScanUpdateInput, ScanUncheckedUpdateInput>
    /**
     * Choose, which Scan to update.
     */
    where: ScanWhereUniqueInput
  }

  /**
   * Scan updateMany
   */
  export type ScanUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Scans.
     */
    data: XOR<ScanUpdateManyMutationInput, ScanUncheckedUpdateManyInput>
    /**
     * Filter which Scans to update
     */
    where?: ScanWhereInput
    /**
     * Limit how many Scans to update.
     */
    limit?: number
  }

  /**
   * Scan updateManyAndReturn
   */
  export type ScanUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scan
     */
    select?: ScanSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Scan
     */
    omit?: ScanOmit<ExtArgs> | null
    /**
     * The data used to update Scans.
     */
    data: XOR<ScanUpdateManyMutationInput, ScanUncheckedUpdateManyInput>
    /**
     * Filter which Scans to update
     */
    where?: ScanWhereInput
    /**
     * Limit how many Scans to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Scan upsert
   */
  export type ScanUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scan
     */
    select?: ScanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Scan
     */
    omit?: ScanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanInclude<ExtArgs> | null
    /**
     * The filter to search for the Scan to update in case it exists.
     */
    where: ScanWhereUniqueInput
    /**
     * In case the Scan found by the `where` argument doesn't exist, create a new Scan with this data.
     */
    create: XOR<ScanCreateInput, ScanUncheckedCreateInput>
    /**
     * In case the Scan was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ScanUpdateInput, ScanUncheckedUpdateInput>
  }

  /**
   * Scan delete
   */
  export type ScanDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scan
     */
    select?: ScanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Scan
     */
    omit?: ScanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanInclude<ExtArgs> | null
    /**
     * Filter which Scan to delete.
     */
    where: ScanWhereUniqueInput
  }

  /**
   * Scan deleteMany
   */
  export type ScanDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Scans to delete
     */
    where?: ScanWhereInput
    /**
     * Limit how many Scans to delete.
     */
    limit?: number
  }

  /**
   * Scan.vulnerabilities
   */
  export type Scan$vulnerabilitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vulnerability
     */
    select?: VulnerabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vulnerability
     */
    omit?: VulnerabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VulnerabilityInclude<ExtArgs> | null
    where?: VulnerabilityWhereInput
    orderBy?: VulnerabilityOrderByWithRelationInput | VulnerabilityOrderByWithRelationInput[]
    cursor?: VulnerabilityWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VulnerabilityScalarFieldEnum | VulnerabilityScalarFieldEnum[]
  }

  /**
   * Scan.report
   */
  export type Scan$reportArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    where?: ReportWhereInput
  }

  /**
   * Scan.configuration
   */
  export type Scan$configurationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanConfiguration
     */
    select?: ScanConfigurationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScanConfiguration
     */
    omit?: ScanConfigurationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanConfigurationInclude<ExtArgs> | null
    where?: ScanConfigurationWhereInput
  }

  /**
   * Scan without action
   */
  export type ScanDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scan
     */
    select?: ScanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Scan
     */
    omit?: ScanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanInclude<ExtArgs> | null
  }


  /**
   * Model Vulnerability
   */

  export type AggregateVulnerability = {
    _count: VulnerabilityCountAggregateOutputType | null
    _min: VulnerabilityMinAggregateOutputType | null
    _max: VulnerabilityMaxAggregateOutputType | null
  }

  export type VulnerabilityMinAggregateOutputType = {
    id: string | null
    type: string | null
    severity: $Enums.Severity | null
    description: string | null
    proof: string | null
    isResolved: boolean | null
    foundAt: Date | null
    scanId: string | null
  }

  export type VulnerabilityMaxAggregateOutputType = {
    id: string | null
    type: string | null
    severity: $Enums.Severity | null
    description: string | null
    proof: string | null
    isResolved: boolean | null
    foundAt: Date | null
    scanId: string | null
  }

  export type VulnerabilityCountAggregateOutputType = {
    id: number
    type: number
    severity: number
    description: number
    proof: number
    isResolved: number
    foundAt: number
    scanId: number
    _all: number
  }


  export type VulnerabilityMinAggregateInputType = {
    id?: true
    type?: true
    severity?: true
    description?: true
    proof?: true
    isResolved?: true
    foundAt?: true
    scanId?: true
  }

  export type VulnerabilityMaxAggregateInputType = {
    id?: true
    type?: true
    severity?: true
    description?: true
    proof?: true
    isResolved?: true
    foundAt?: true
    scanId?: true
  }

  export type VulnerabilityCountAggregateInputType = {
    id?: true
    type?: true
    severity?: true
    description?: true
    proof?: true
    isResolved?: true
    foundAt?: true
    scanId?: true
    _all?: true
  }

  export type VulnerabilityAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vulnerability to aggregate.
     */
    where?: VulnerabilityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vulnerabilities to fetch.
     */
    orderBy?: VulnerabilityOrderByWithRelationInput | VulnerabilityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VulnerabilityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vulnerabilities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vulnerabilities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Vulnerabilities
    **/
    _count?: true | VulnerabilityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VulnerabilityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VulnerabilityMaxAggregateInputType
  }

  export type GetVulnerabilityAggregateType<T extends VulnerabilityAggregateArgs> = {
        [P in keyof T & keyof AggregateVulnerability]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVulnerability[P]>
      : GetScalarType<T[P], AggregateVulnerability[P]>
  }




  export type VulnerabilityGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VulnerabilityWhereInput
    orderBy?: VulnerabilityOrderByWithAggregationInput | VulnerabilityOrderByWithAggregationInput[]
    by: VulnerabilityScalarFieldEnum[] | VulnerabilityScalarFieldEnum
    having?: VulnerabilityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VulnerabilityCountAggregateInputType | true
    _min?: VulnerabilityMinAggregateInputType
    _max?: VulnerabilityMaxAggregateInputType
  }

  export type VulnerabilityGroupByOutputType = {
    id: string
    type: string
    severity: $Enums.Severity
    description: string
    proof: string
    isResolved: boolean
    foundAt: Date
    scanId: string
    _count: VulnerabilityCountAggregateOutputType | null
    _min: VulnerabilityMinAggregateOutputType | null
    _max: VulnerabilityMaxAggregateOutputType | null
  }

  type GetVulnerabilityGroupByPayload<T extends VulnerabilityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VulnerabilityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VulnerabilityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VulnerabilityGroupByOutputType[P]>
            : GetScalarType<T[P], VulnerabilityGroupByOutputType[P]>
        }
      >
    >


  export type VulnerabilitySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    severity?: boolean
    description?: boolean
    proof?: boolean
    isResolved?: boolean
    foundAt?: boolean
    scanId?: boolean
    scan?: boolean | ScanDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vulnerability"]>

  export type VulnerabilitySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    severity?: boolean
    description?: boolean
    proof?: boolean
    isResolved?: boolean
    foundAt?: boolean
    scanId?: boolean
    scan?: boolean | ScanDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vulnerability"]>

  export type VulnerabilitySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    severity?: boolean
    description?: boolean
    proof?: boolean
    isResolved?: boolean
    foundAt?: boolean
    scanId?: boolean
    scan?: boolean | ScanDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vulnerability"]>

  export type VulnerabilitySelectScalar = {
    id?: boolean
    type?: boolean
    severity?: boolean
    description?: boolean
    proof?: boolean
    isResolved?: boolean
    foundAt?: boolean
    scanId?: boolean
  }

  export type VulnerabilityOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "type" | "severity" | "description" | "proof" | "isResolved" | "foundAt" | "scanId", ExtArgs["result"]["vulnerability"]>
  export type VulnerabilityInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    scan?: boolean | ScanDefaultArgs<ExtArgs>
  }
  export type VulnerabilityIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    scan?: boolean | ScanDefaultArgs<ExtArgs>
  }
  export type VulnerabilityIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    scan?: boolean | ScanDefaultArgs<ExtArgs>
  }

  export type $VulnerabilityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Vulnerability"
    objects: {
      scan: Prisma.$ScanPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      type: string
      severity: $Enums.Severity
      description: string
      proof: string
      isResolved: boolean
      foundAt: Date
      scanId: string
    }, ExtArgs["result"]["vulnerability"]>
    composites: {}
  }

  type VulnerabilityGetPayload<S extends boolean | null | undefined | VulnerabilityDefaultArgs> = $Result.GetResult<Prisma.$VulnerabilityPayload, S>

  type VulnerabilityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VulnerabilityFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VulnerabilityCountAggregateInputType | true
    }

  export interface VulnerabilityDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Vulnerability'], meta: { name: 'Vulnerability' } }
    /**
     * Find zero or one Vulnerability that matches the filter.
     * @param {VulnerabilityFindUniqueArgs} args - Arguments to find a Vulnerability
     * @example
     * // Get one Vulnerability
     * const vulnerability = await prisma.vulnerability.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VulnerabilityFindUniqueArgs>(args: SelectSubset<T, VulnerabilityFindUniqueArgs<ExtArgs>>): Prisma__VulnerabilityClient<$Result.GetResult<Prisma.$VulnerabilityPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Vulnerability that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VulnerabilityFindUniqueOrThrowArgs} args - Arguments to find a Vulnerability
     * @example
     * // Get one Vulnerability
     * const vulnerability = await prisma.vulnerability.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VulnerabilityFindUniqueOrThrowArgs>(args: SelectSubset<T, VulnerabilityFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VulnerabilityClient<$Result.GetResult<Prisma.$VulnerabilityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Vulnerability that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VulnerabilityFindFirstArgs} args - Arguments to find a Vulnerability
     * @example
     * // Get one Vulnerability
     * const vulnerability = await prisma.vulnerability.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VulnerabilityFindFirstArgs>(args?: SelectSubset<T, VulnerabilityFindFirstArgs<ExtArgs>>): Prisma__VulnerabilityClient<$Result.GetResult<Prisma.$VulnerabilityPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Vulnerability that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VulnerabilityFindFirstOrThrowArgs} args - Arguments to find a Vulnerability
     * @example
     * // Get one Vulnerability
     * const vulnerability = await prisma.vulnerability.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VulnerabilityFindFirstOrThrowArgs>(args?: SelectSubset<T, VulnerabilityFindFirstOrThrowArgs<ExtArgs>>): Prisma__VulnerabilityClient<$Result.GetResult<Prisma.$VulnerabilityPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Vulnerabilities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VulnerabilityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Vulnerabilities
     * const vulnerabilities = await prisma.vulnerability.findMany()
     * 
     * // Get first 10 Vulnerabilities
     * const vulnerabilities = await prisma.vulnerability.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const vulnerabilityWithIdOnly = await prisma.vulnerability.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VulnerabilityFindManyArgs>(args?: SelectSubset<T, VulnerabilityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VulnerabilityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Vulnerability.
     * @param {VulnerabilityCreateArgs} args - Arguments to create a Vulnerability.
     * @example
     * // Create one Vulnerability
     * const Vulnerability = await prisma.vulnerability.create({
     *   data: {
     *     // ... data to create a Vulnerability
     *   }
     * })
     * 
     */
    create<T extends VulnerabilityCreateArgs>(args: SelectSubset<T, VulnerabilityCreateArgs<ExtArgs>>): Prisma__VulnerabilityClient<$Result.GetResult<Prisma.$VulnerabilityPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Vulnerabilities.
     * @param {VulnerabilityCreateManyArgs} args - Arguments to create many Vulnerabilities.
     * @example
     * // Create many Vulnerabilities
     * const vulnerability = await prisma.vulnerability.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VulnerabilityCreateManyArgs>(args?: SelectSubset<T, VulnerabilityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Vulnerabilities and returns the data saved in the database.
     * @param {VulnerabilityCreateManyAndReturnArgs} args - Arguments to create many Vulnerabilities.
     * @example
     * // Create many Vulnerabilities
     * const vulnerability = await prisma.vulnerability.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Vulnerabilities and only return the `id`
     * const vulnerabilityWithIdOnly = await prisma.vulnerability.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VulnerabilityCreateManyAndReturnArgs>(args?: SelectSubset<T, VulnerabilityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VulnerabilityPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Vulnerability.
     * @param {VulnerabilityDeleteArgs} args - Arguments to delete one Vulnerability.
     * @example
     * // Delete one Vulnerability
     * const Vulnerability = await prisma.vulnerability.delete({
     *   where: {
     *     // ... filter to delete one Vulnerability
     *   }
     * })
     * 
     */
    delete<T extends VulnerabilityDeleteArgs>(args: SelectSubset<T, VulnerabilityDeleteArgs<ExtArgs>>): Prisma__VulnerabilityClient<$Result.GetResult<Prisma.$VulnerabilityPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Vulnerability.
     * @param {VulnerabilityUpdateArgs} args - Arguments to update one Vulnerability.
     * @example
     * // Update one Vulnerability
     * const vulnerability = await prisma.vulnerability.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VulnerabilityUpdateArgs>(args: SelectSubset<T, VulnerabilityUpdateArgs<ExtArgs>>): Prisma__VulnerabilityClient<$Result.GetResult<Prisma.$VulnerabilityPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Vulnerabilities.
     * @param {VulnerabilityDeleteManyArgs} args - Arguments to filter Vulnerabilities to delete.
     * @example
     * // Delete a few Vulnerabilities
     * const { count } = await prisma.vulnerability.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VulnerabilityDeleteManyArgs>(args?: SelectSubset<T, VulnerabilityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Vulnerabilities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VulnerabilityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Vulnerabilities
     * const vulnerability = await prisma.vulnerability.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VulnerabilityUpdateManyArgs>(args: SelectSubset<T, VulnerabilityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Vulnerabilities and returns the data updated in the database.
     * @param {VulnerabilityUpdateManyAndReturnArgs} args - Arguments to update many Vulnerabilities.
     * @example
     * // Update many Vulnerabilities
     * const vulnerability = await prisma.vulnerability.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Vulnerabilities and only return the `id`
     * const vulnerabilityWithIdOnly = await prisma.vulnerability.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VulnerabilityUpdateManyAndReturnArgs>(args: SelectSubset<T, VulnerabilityUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VulnerabilityPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Vulnerability.
     * @param {VulnerabilityUpsertArgs} args - Arguments to update or create a Vulnerability.
     * @example
     * // Update or create a Vulnerability
     * const vulnerability = await prisma.vulnerability.upsert({
     *   create: {
     *     // ... data to create a Vulnerability
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Vulnerability we want to update
     *   }
     * })
     */
    upsert<T extends VulnerabilityUpsertArgs>(args: SelectSubset<T, VulnerabilityUpsertArgs<ExtArgs>>): Prisma__VulnerabilityClient<$Result.GetResult<Prisma.$VulnerabilityPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Vulnerabilities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VulnerabilityCountArgs} args - Arguments to filter Vulnerabilities to count.
     * @example
     * // Count the number of Vulnerabilities
     * const count = await prisma.vulnerability.count({
     *   where: {
     *     // ... the filter for the Vulnerabilities we want to count
     *   }
     * })
    **/
    count<T extends VulnerabilityCountArgs>(
      args?: Subset<T, VulnerabilityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VulnerabilityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Vulnerability.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VulnerabilityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VulnerabilityAggregateArgs>(args: Subset<T, VulnerabilityAggregateArgs>): Prisma.PrismaPromise<GetVulnerabilityAggregateType<T>>

    /**
     * Group by Vulnerability.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VulnerabilityGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VulnerabilityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VulnerabilityGroupByArgs['orderBy'] }
        : { orderBy?: VulnerabilityGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VulnerabilityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVulnerabilityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Vulnerability model
   */
  readonly fields: VulnerabilityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Vulnerability.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VulnerabilityClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    scan<T extends ScanDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ScanDefaultArgs<ExtArgs>>): Prisma__ScanClient<$Result.GetResult<Prisma.$ScanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Vulnerability model
   */
  interface VulnerabilityFieldRefs {
    readonly id: FieldRef<"Vulnerability", 'String'>
    readonly type: FieldRef<"Vulnerability", 'String'>
    readonly severity: FieldRef<"Vulnerability", 'Severity'>
    readonly description: FieldRef<"Vulnerability", 'String'>
    readonly proof: FieldRef<"Vulnerability", 'String'>
    readonly isResolved: FieldRef<"Vulnerability", 'Boolean'>
    readonly foundAt: FieldRef<"Vulnerability", 'DateTime'>
    readonly scanId: FieldRef<"Vulnerability", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Vulnerability findUnique
   */
  export type VulnerabilityFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vulnerability
     */
    select?: VulnerabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vulnerability
     */
    omit?: VulnerabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VulnerabilityInclude<ExtArgs> | null
    /**
     * Filter, which Vulnerability to fetch.
     */
    where: VulnerabilityWhereUniqueInput
  }

  /**
   * Vulnerability findUniqueOrThrow
   */
  export type VulnerabilityFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vulnerability
     */
    select?: VulnerabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vulnerability
     */
    omit?: VulnerabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VulnerabilityInclude<ExtArgs> | null
    /**
     * Filter, which Vulnerability to fetch.
     */
    where: VulnerabilityWhereUniqueInput
  }

  /**
   * Vulnerability findFirst
   */
  export type VulnerabilityFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vulnerability
     */
    select?: VulnerabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vulnerability
     */
    omit?: VulnerabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VulnerabilityInclude<ExtArgs> | null
    /**
     * Filter, which Vulnerability to fetch.
     */
    where?: VulnerabilityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vulnerabilities to fetch.
     */
    orderBy?: VulnerabilityOrderByWithRelationInput | VulnerabilityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vulnerabilities.
     */
    cursor?: VulnerabilityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vulnerabilities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vulnerabilities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vulnerabilities.
     */
    distinct?: VulnerabilityScalarFieldEnum | VulnerabilityScalarFieldEnum[]
  }

  /**
   * Vulnerability findFirstOrThrow
   */
  export type VulnerabilityFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vulnerability
     */
    select?: VulnerabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vulnerability
     */
    omit?: VulnerabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VulnerabilityInclude<ExtArgs> | null
    /**
     * Filter, which Vulnerability to fetch.
     */
    where?: VulnerabilityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vulnerabilities to fetch.
     */
    orderBy?: VulnerabilityOrderByWithRelationInput | VulnerabilityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vulnerabilities.
     */
    cursor?: VulnerabilityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vulnerabilities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vulnerabilities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vulnerabilities.
     */
    distinct?: VulnerabilityScalarFieldEnum | VulnerabilityScalarFieldEnum[]
  }

  /**
   * Vulnerability findMany
   */
  export type VulnerabilityFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vulnerability
     */
    select?: VulnerabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vulnerability
     */
    omit?: VulnerabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VulnerabilityInclude<ExtArgs> | null
    /**
     * Filter, which Vulnerabilities to fetch.
     */
    where?: VulnerabilityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vulnerabilities to fetch.
     */
    orderBy?: VulnerabilityOrderByWithRelationInput | VulnerabilityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Vulnerabilities.
     */
    cursor?: VulnerabilityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vulnerabilities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vulnerabilities.
     */
    skip?: number
    distinct?: VulnerabilityScalarFieldEnum | VulnerabilityScalarFieldEnum[]
  }

  /**
   * Vulnerability create
   */
  export type VulnerabilityCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vulnerability
     */
    select?: VulnerabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vulnerability
     */
    omit?: VulnerabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VulnerabilityInclude<ExtArgs> | null
    /**
     * The data needed to create a Vulnerability.
     */
    data: XOR<VulnerabilityCreateInput, VulnerabilityUncheckedCreateInput>
  }

  /**
   * Vulnerability createMany
   */
  export type VulnerabilityCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Vulnerabilities.
     */
    data: VulnerabilityCreateManyInput | VulnerabilityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Vulnerability createManyAndReturn
   */
  export type VulnerabilityCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vulnerability
     */
    select?: VulnerabilitySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Vulnerability
     */
    omit?: VulnerabilityOmit<ExtArgs> | null
    /**
     * The data used to create many Vulnerabilities.
     */
    data: VulnerabilityCreateManyInput | VulnerabilityCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VulnerabilityIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Vulnerability update
   */
  export type VulnerabilityUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vulnerability
     */
    select?: VulnerabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vulnerability
     */
    omit?: VulnerabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VulnerabilityInclude<ExtArgs> | null
    /**
     * The data needed to update a Vulnerability.
     */
    data: XOR<VulnerabilityUpdateInput, VulnerabilityUncheckedUpdateInput>
    /**
     * Choose, which Vulnerability to update.
     */
    where: VulnerabilityWhereUniqueInput
  }

  /**
   * Vulnerability updateMany
   */
  export type VulnerabilityUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Vulnerabilities.
     */
    data: XOR<VulnerabilityUpdateManyMutationInput, VulnerabilityUncheckedUpdateManyInput>
    /**
     * Filter which Vulnerabilities to update
     */
    where?: VulnerabilityWhereInput
    /**
     * Limit how many Vulnerabilities to update.
     */
    limit?: number
  }

  /**
   * Vulnerability updateManyAndReturn
   */
  export type VulnerabilityUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vulnerability
     */
    select?: VulnerabilitySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Vulnerability
     */
    omit?: VulnerabilityOmit<ExtArgs> | null
    /**
     * The data used to update Vulnerabilities.
     */
    data: XOR<VulnerabilityUpdateManyMutationInput, VulnerabilityUncheckedUpdateManyInput>
    /**
     * Filter which Vulnerabilities to update
     */
    where?: VulnerabilityWhereInput
    /**
     * Limit how many Vulnerabilities to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VulnerabilityIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Vulnerability upsert
   */
  export type VulnerabilityUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vulnerability
     */
    select?: VulnerabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vulnerability
     */
    omit?: VulnerabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VulnerabilityInclude<ExtArgs> | null
    /**
     * The filter to search for the Vulnerability to update in case it exists.
     */
    where: VulnerabilityWhereUniqueInput
    /**
     * In case the Vulnerability found by the `where` argument doesn't exist, create a new Vulnerability with this data.
     */
    create: XOR<VulnerabilityCreateInput, VulnerabilityUncheckedCreateInput>
    /**
     * In case the Vulnerability was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VulnerabilityUpdateInput, VulnerabilityUncheckedUpdateInput>
  }

  /**
   * Vulnerability delete
   */
  export type VulnerabilityDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vulnerability
     */
    select?: VulnerabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vulnerability
     */
    omit?: VulnerabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VulnerabilityInclude<ExtArgs> | null
    /**
     * Filter which Vulnerability to delete.
     */
    where: VulnerabilityWhereUniqueInput
  }

  /**
   * Vulnerability deleteMany
   */
  export type VulnerabilityDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vulnerabilities to delete
     */
    where?: VulnerabilityWhereInput
    /**
     * Limit how many Vulnerabilities to delete.
     */
    limit?: number
  }

  /**
   * Vulnerability without action
   */
  export type VulnerabilityDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vulnerability
     */
    select?: VulnerabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vulnerability
     */
    omit?: VulnerabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VulnerabilityInclude<ExtArgs> | null
  }


  /**
   * Model ScanConfiguration
   */

  export type AggregateScanConfiguration = {
    _count: ScanConfigurationCountAggregateOutputType | null
    _min: ScanConfigurationMinAggregateOutputType | null
    _max: ScanConfigurationMaxAggregateOutputType | null
  }

  export type ScanConfigurationMinAggregateOutputType = {
    id: string | null
    name: string | null
    isDiscoveryFocused: boolean | null
    isAiPowered: boolean | null
  }

  export type ScanConfigurationMaxAggregateOutputType = {
    id: string | null
    name: string | null
    isDiscoveryFocused: boolean | null
    isAiPowered: boolean | null
  }

  export type ScanConfigurationCountAggregateOutputType = {
    id: number
    name: number
    isDiscoveryFocused: number
    isAiPowered: number
    _all: number
  }


  export type ScanConfigurationMinAggregateInputType = {
    id?: true
    name?: true
    isDiscoveryFocused?: true
    isAiPowered?: true
  }

  export type ScanConfigurationMaxAggregateInputType = {
    id?: true
    name?: true
    isDiscoveryFocused?: true
    isAiPowered?: true
  }

  export type ScanConfigurationCountAggregateInputType = {
    id?: true
    name?: true
    isDiscoveryFocused?: true
    isAiPowered?: true
    _all?: true
  }

  export type ScanConfigurationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ScanConfiguration to aggregate.
     */
    where?: ScanConfigurationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScanConfigurations to fetch.
     */
    orderBy?: ScanConfigurationOrderByWithRelationInput | ScanConfigurationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ScanConfigurationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScanConfigurations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScanConfigurations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ScanConfigurations
    **/
    _count?: true | ScanConfigurationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ScanConfigurationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ScanConfigurationMaxAggregateInputType
  }

  export type GetScanConfigurationAggregateType<T extends ScanConfigurationAggregateArgs> = {
        [P in keyof T & keyof AggregateScanConfiguration]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateScanConfiguration[P]>
      : GetScalarType<T[P], AggregateScanConfiguration[P]>
  }




  export type ScanConfigurationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScanConfigurationWhereInput
    orderBy?: ScanConfigurationOrderByWithAggregationInput | ScanConfigurationOrderByWithAggregationInput[]
    by: ScanConfigurationScalarFieldEnum[] | ScanConfigurationScalarFieldEnum
    having?: ScanConfigurationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ScanConfigurationCountAggregateInputType | true
    _min?: ScanConfigurationMinAggregateInputType
    _max?: ScanConfigurationMaxAggregateInputType
  }

  export type ScanConfigurationGroupByOutputType = {
    id: string
    name: string
    isDiscoveryFocused: boolean
    isAiPowered: boolean
    _count: ScanConfigurationCountAggregateOutputType | null
    _min: ScanConfigurationMinAggregateOutputType | null
    _max: ScanConfigurationMaxAggregateOutputType | null
  }

  type GetScanConfigurationGroupByPayload<T extends ScanConfigurationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ScanConfigurationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ScanConfigurationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ScanConfigurationGroupByOutputType[P]>
            : GetScalarType<T[P], ScanConfigurationGroupByOutputType[P]>
        }
      >
    >


  export type ScanConfigurationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    isDiscoveryFocused?: boolean
    isAiPowered?: boolean
    scans?: boolean | ScanConfiguration$scansArgs<ExtArgs>
    _count?: boolean | ScanConfigurationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["scanConfiguration"]>

  export type ScanConfigurationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    isDiscoveryFocused?: boolean
    isAiPowered?: boolean
  }, ExtArgs["result"]["scanConfiguration"]>

  export type ScanConfigurationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    isDiscoveryFocused?: boolean
    isAiPowered?: boolean
  }, ExtArgs["result"]["scanConfiguration"]>

  export type ScanConfigurationSelectScalar = {
    id?: boolean
    name?: boolean
    isDiscoveryFocused?: boolean
    isAiPowered?: boolean
  }

  export type ScanConfigurationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "isDiscoveryFocused" | "isAiPowered", ExtArgs["result"]["scanConfiguration"]>
  export type ScanConfigurationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    scans?: boolean | ScanConfiguration$scansArgs<ExtArgs>
    _count?: boolean | ScanConfigurationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ScanConfigurationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ScanConfigurationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ScanConfigurationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ScanConfiguration"
    objects: {
      scans: Prisma.$ScanPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      isDiscoveryFocused: boolean
      isAiPowered: boolean
    }, ExtArgs["result"]["scanConfiguration"]>
    composites: {}
  }

  type ScanConfigurationGetPayload<S extends boolean | null | undefined | ScanConfigurationDefaultArgs> = $Result.GetResult<Prisma.$ScanConfigurationPayload, S>

  type ScanConfigurationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ScanConfigurationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ScanConfigurationCountAggregateInputType | true
    }

  export interface ScanConfigurationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ScanConfiguration'], meta: { name: 'ScanConfiguration' } }
    /**
     * Find zero or one ScanConfiguration that matches the filter.
     * @param {ScanConfigurationFindUniqueArgs} args - Arguments to find a ScanConfiguration
     * @example
     * // Get one ScanConfiguration
     * const scanConfiguration = await prisma.scanConfiguration.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ScanConfigurationFindUniqueArgs>(args: SelectSubset<T, ScanConfigurationFindUniqueArgs<ExtArgs>>): Prisma__ScanConfigurationClient<$Result.GetResult<Prisma.$ScanConfigurationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ScanConfiguration that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ScanConfigurationFindUniqueOrThrowArgs} args - Arguments to find a ScanConfiguration
     * @example
     * // Get one ScanConfiguration
     * const scanConfiguration = await prisma.scanConfiguration.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ScanConfigurationFindUniqueOrThrowArgs>(args: SelectSubset<T, ScanConfigurationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ScanConfigurationClient<$Result.GetResult<Prisma.$ScanConfigurationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ScanConfiguration that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScanConfigurationFindFirstArgs} args - Arguments to find a ScanConfiguration
     * @example
     * // Get one ScanConfiguration
     * const scanConfiguration = await prisma.scanConfiguration.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ScanConfigurationFindFirstArgs>(args?: SelectSubset<T, ScanConfigurationFindFirstArgs<ExtArgs>>): Prisma__ScanConfigurationClient<$Result.GetResult<Prisma.$ScanConfigurationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ScanConfiguration that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScanConfigurationFindFirstOrThrowArgs} args - Arguments to find a ScanConfiguration
     * @example
     * // Get one ScanConfiguration
     * const scanConfiguration = await prisma.scanConfiguration.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ScanConfigurationFindFirstOrThrowArgs>(args?: SelectSubset<T, ScanConfigurationFindFirstOrThrowArgs<ExtArgs>>): Prisma__ScanConfigurationClient<$Result.GetResult<Prisma.$ScanConfigurationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ScanConfigurations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScanConfigurationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ScanConfigurations
     * const scanConfigurations = await prisma.scanConfiguration.findMany()
     * 
     * // Get first 10 ScanConfigurations
     * const scanConfigurations = await prisma.scanConfiguration.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const scanConfigurationWithIdOnly = await prisma.scanConfiguration.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ScanConfigurationFindManyArgs>(args?: SelectSubset<T, ScanConfigurationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScanConfigurationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ScanConfiguration.
     * @param {ScanConfigurationCreateArgs} args - Arguments to create a ScanConfiguration.
     * @example
     * // Create one ScanConfiguration
     * const ScanConfiguration = await prisma.scanConfiguration.create({
     *   data: {
     *     // ... data to create a ScanConfiguration
     *   }
     * })
     * 
     */
    create<T extends ScanConfigurationCreateArgs>(args: SelectSubset<T, ScanConfigurationCreateArgs<ExtArgs>>): Prisma__ScanConfigurationClient<$Result.GetResult<Prisma.$ScanConfigurationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ScanConfigurations.
     * @param {ScanConfigurationCreateManyArgs} args - Arguments to create many ScanConfigurations.
     * @example
     * // Create many ScanConfigurations
     * const scanConfiguration = await prisma.scanConfiguration.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ScanConfigurationCreateManyArgs>(args?: SelectSubset<T, ScanConfigurationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ScanConfigurations and returns the data saved in the database.
     * @param {ScanConfigurationCreateManyAndReturnArgs} args - Arguments to create many ScanConfigurations.
     * @example
     * // Create many ScanConfigurations
     * const scanConfiguration = await prisma.scanConfiguration.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ScanConfigurations and only return the `id`
     * const scanConfigurationWithIdOnly = await prisma.scanConfiguration.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ScanConfigurationCreateManyAndReturnArgs>(args?: SelectSubset<T, ScanConfigurationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScanConfigurationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ScanConfiguration.
     * @param {ScanConfigurationDeleteArgs} args - Arguments to delete one ScanConfiguration.
     * @example
     * // Delete one ScanConfiguration
     * const ScanConfiguration = await prisma.scanConfiguration.delete({
     *   where: {
     *     // ... filter to delete one ScanConfiguration
     *   }
     * })
     * 
     */
    delete<T extends ScanConfigurationDeleteArgs>(args: SelectSubset<T, ScanConfigurationDeleteArgs<ExtArgs>>): Prisma__ScanConfigurationClient<$Result.GetResult<Prisma.$ScanConfigurationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ScanConfiguration.
     * @param {ScanConfigurationUpdateArgs} args - Arguments to update one ScanConfiguration.
     * @example
     * // Update one ScanConfiguration
     * const scanConfiguration = await prisma.scanConfiguration.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ScanConfigurationUpdateArgs>(args: SelectSubset<T, ScanConfigurationUpdateArgs<ExtArgs>>): Prisma__ScanConfigurationClient<$Result.GetResult<Prisma.$ScanConfigurationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ScanConfigurations.
     * @param {ScanConfigurationDeleteManyArgs} args - Arguments to filter ScanConfigurations to delete.
     * @example
     * // Delete a few ScanConfigurations
     * const { count } = await prisma.scanConfiguration.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ScanConfigurationDeleteManyArgs>(args?: SelectSubset<T, ScanConfigurationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ScanConfigurations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScanConfigurationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ScanConfigurations
     * const scanConfiguration = await prisma.scanConfiguration.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ScanConfigurationUpdateManyArgs>(args: SelectSubset<T, ScanConfigurationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ScanConfigurations and returns the data updated in the database.
     * @param {ScanConfigurationUpdateManyAndReturnArgs} args - Arguments to update many ScanConfigurations.
     * @example
     * // Update many ScanConfigurations
     * const scanConfiguration = await prisma.scanConfiguration.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ScanConfigurations and only return the `id`
     * const scanConfigurationWithIdOnly = await prisma.scanConfiguration.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ScanConfigurationUpdateManyAndReturnArgs>(args: SelectSubset<T, ScanConfigurationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScanConfigurationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ScanConfiguration.
     * @param {ScanConfigurationUpsertArgs} args - Arguments to update or create a ScanConfiguration.
     * @example
     * // Update or create a ScanConfiguration
     * const scanConfiguration = await prisma.scanConfiguration.upsert({
     *   create: {
     *     // ... data to create a ScanConfiguration
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ScanConfiguration we want to update
     *   }
     * })
     */
    upsert<T extends ScanConfigurationUpsertArgs>(args: SelectSubset<T, ScanConfigurationUpsertArgs<ExtArgs>>): Prisma__ScanConfigurationClient<$Result.GetResult<Prisma.$ScanConfigurationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ScanConfigurations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScanConfigurationCountArgs} args - Arguments to filter ScanConfigurations to count.
     * @example
     * // Count the number of ScanConfigurations
     * const count = await prisma.scanConfiguration.count({
     *   where: {
     *     // ... the filter for the ScanConfigurations we want to count
     *   }
     * })
    **/
    count<T extends ScanConfigurationCountArgs>(
      args?: Subset<T, ScanConfigurationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ScanConfigurationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ScanConfiguration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScanConfigurationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ScanConfigurationAggregateArgs>(args: Subset<T, ScanConfigurationAggregateArgs>): Prisma.PrismaPromise<GetScanConfigurationAggregateType<T>>

    /**
     * Group by ScanConfiguration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScanConfigurationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ScanConfigurationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ScanConfigurationGroupByArgs['orderBy'] }
        : { orderBy?: ScanConfigurationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ScanConfigurationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetScanConfigurationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ScanConfiguration model
   */
  readonly fields: ScanConfigurationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ScanConfiguration.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ScanConfigurationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    scans<T extends ScanConfiguration$scansArgs<ExtArgs> = {}>(args?: Subset<T, ScanConfiguration$scansArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ScanConfiguration model
   */
  interface ScanConfigurationFieldRefs {
    readonly id: FieldRef<"ScanConfiguration", 'String'>
    readonly name: FieldRef<"ScanConfiguration", 'String'>
    readonly isDiscoveryFocused: FieldRef<"ScanConfiguration", 'Boolean'>
    readonly isAiPowered: FieldRef<"ScanConfiguration", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * ScanConfiguration findUnique
   */
  export type ScanConfigurationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanConfiguration
     */
    select?: ScanConfigurationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScanConfiguration
     */
    omit?: ScanConfigurationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanConfigurationInclude<ExtArgs> | null
    /**
     * Filter, which ScanConfiguration to fetch.
     */
    where: ScanConfigurationWhereUniqueInput
  }

  /**
   * ScanConfiguration findUniqueOrThrow
   */
  export type ScanConfigurationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanConfiguration
     */
    select?: ScanConfigurationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScanConfiguration
     */
    omit?: ScanConfigurationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanConfigurationInclude<ExtArgs> | null
    /**
     * Filter, which ScanConfiguration to fetch.
     */
    where: ScanConfigurationWhereUniqueInput
  }

  /**
   * ScanConfiguration findFirst
   */
  export type ScanConfigurationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanConfiguration
     */
    select?: ScanConfigurationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScanConfiguration
     */
    omit?: ScanConfigurationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanConfigurationInclude<ExtArgs> | null
    /**
     * Filter, which ScanConfiguration to fetch.
     */
    where?: ScanConfigurationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScanConfigurations to fetch.
     */
    orderBy?: ScanConfigurationOrderByWithRelationInput | ScanConfigurationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ScanConfigurations.
     */
    cursor?: ScanConfigurationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScanConfigurations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScanConfigurations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ScanConfigurations.
     */
    distinct?: ScanConfigurationScalarFieldEnum | ScanConfigurationScalarFieldEnum[]
  }

  /**
   * ScanConfiguration findFirstOrThrow
   */
  export type ScanConfigurationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanConfiguration
     */
    select?: ScanConfigurationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScanConfiguration
     */
    omit?: ScanConfigurationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanConfigurationInclude<ExtArgs> | null
    /**
     * Filter, which ScanConfiguration to fetch.
     */
    where?: ScanConfigurationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScanConfigurations to fetch.
     */
    orderBy?: ScanConfigurationOrderByWithRelationInput | ScanConfigurationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ScanConfigurations.
     */
    cursor?: ScanConfigurationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScanConfigurations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScanConfigurations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ScanConfigurations.
     */
    distinct?: ScanConfigurationScalarFieldEnum | ScanConfigurationScalarFieldEnum[]
  }

  /**
   * ScanConfiguration findMany
   */
  export type ScanConfigurationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanConfiguration
     */
    select?: ScanConfigurationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScanConfiguration
     */
    omit?: ScanConfigurationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanConfigurationInclude<ExtArgs> | null
    /**
     * Filter, which ScanConfigurations to fetch.
     */
    where?: ScanConfigurationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScanConfigurations to fetch.
     */
    orderBy?: ScanConfigurationOrderByWithRelationInput | ScanConfigurationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ScanConfigurations.
     */
    cursor?: ScanConfigurationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScanConfigurations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScanConfigurations.
     */
    skip?: number
    distinct?: ScanConfigurationScalarFieldEnum | ScanConfigurationScalarFieldEnum[]
  }

  /**
   * ScanConfiguration create
   */
  export type ScanConfigurationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanConfiguration
     */
    select?: ScanConfigurationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScanConfiguration
     */
    omit?: ScanConfigurationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanConfigurationInclude<ExtArgs> | null
    /**
     * The data needed to create a ScanConfiguration.
     */
    data: XOR<ScanConfigurationCreateInput, ScanConfigurationUncheckedCreateInput>
  }

  /**
   * ScanConfiguration createMany
   */
  export type ScanConfigurationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ScanConfigurations.
     */
    data: ScanConfigurationCreateManyInput | ScanConfigurationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ScanConfiguration createManyAndReturn
   */
  export type ScanConfigurationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanConfiguration
     */
    select?: ScanConfigurationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ScanConfiguration
     */
    omit?: ScanConfigurationOmit<ExtArgs> | null
    /**
     * The data used to create many ScanConfigurations.
     */
    data: ScanConfigurationCreateManyInput | ScanConfigurationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ScanConfiguration update
   */
  export type ScanConfigurationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanConfiguration
     */
    select?: ScanConfigurationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScanConfiguration
     */
    omit?: ScanConfigurationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanConfigurationInclude<ExtArgs> | null
    /**
     * The data needed to update a ScanConfiguration.
     */
    data: XOR<ScanConfigurationUpdateInput, ScanConfigurationUncheckedUpdateInput>
    /**
     * Choose, which ScanConfiguration to update.
     */
    where: ScanConfigurationWhereUniqueInput
  }

  /**
   * ScanConfiguration updateMany
   */
  export type ScanConfigurationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ScanConfigurations.
     */
    data: XOR<ScanConfigurationUpdateManyMutationInput, ScanConfigurationUncheckedUpdateManyInput>
    /**
     * Filter which ScanConfigurations to update
     */
    where?: ScanConfigurationWhereInput
    /**
     * Limit how many ScanConfigurations to update.
     */
    limit?: number
  }

  /**
   * ScanConfiguration updateManyAndReturn
   */
  export type ScanConfigurationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanConfiguration
     */
    select?: ScanConfigurationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ScanConfiguration
     */
    omit?: ScanConfigurationOmit<ExtArgs> | null
    /**
     * The data used to update ScanConfigurations.
     */
    data: XOR<ScanConfigurationUpdateManyMutationInput, ScanConfigurationUncheckedUpdateManyInput>
    /**
     * Filter which ScanConfigurations to update
     */
    where?: ScanConfigurationWhereInput
    /**
     * Limit how many ScanConfigurations to update.
     */
    limit?: number
  }

  /**
   * ScanConfiguration upsert
   */
  export type ScanConfigurationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanConfiguration
     */
    select?: ScanConfigurationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScanConfiguration
     */
    omit?: ScanConfigurationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanConfigurationInclude<ExtArgs> | null
    /**
     * The filter to search for the ScanConfiguration to update in case it exists.
     */
    where: ScanConfigurationWhereUniqueInput
    /**
     * In case the ScanConfiguration found by the `where` argument doesn't exist, create a new ScanConfiguration with this data.
     */
    create: XOR<ScanConfigurationCreateInput, ScanConfigurationUncheckedCreateInput>
    /**
     * In case the ScanConfiguration was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ScanConfigurationUpdateInput, ScanConfigurationUncheckedUpdateInput>
  }

  /**
   * ScanConfiguration delete
   */
  export type ScanConfigurationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanConfiguration
     */
    select?: ScanConfigurationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScanConfiguration
     */
    omit?: ScanConfigurationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanConfigurationInclude<ExtArgs> | null
    /**
     * Filter which ScanConfiguration to delete.
     */
    where: ScanConfigurationWhereUniqueInput
  }

  /**
   * ScanConfiguration deleteMany
   */
  export type ScanConfigurationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ScanConfigurations to delete
     */
    where?: ScanConfigurationWhereInput
    /**
     * Limit how many ScanConfigurations to delete.
     */
    limit?: number
  }

  /**
   * ScanConfiguration.scans
   */
  export type ScanConfiguration$scansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scan
     */
    select?: ScanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Scan
     */
    omit?: ScanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanInclude<ExtArgs> | null
    where?: ScanWhereInput
    orderBy?: ScanOrderByWithRelationInput | ScanOrderByWithRelationInput[]
    cursor?: ScanWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ScanScalarFieldEnum | ScanScalarFieldEnum[]
  }

  /**
   * ScanConfiguration without action
   */
  export type ScanConfigurationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanConfiguration
     */
    select?: ScanConfigurationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScanConfiguration
     */
    omit?: ScanConfigurationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanConfigurationInclude<ExtArgs> | null
  }


  /**
   * Model Report
   */

  export type AggregateReport = {
    _count: ReportCountAggregateOutputType | null
    _min: ReportMinAggregateOutputType | null
    _max: ReportMaxAggregateOutputType | null
  }

  export type ReportMinAggregateOutputType = {
    id: string | null
    format: string | null
    storagePath: string | null
    createdAt: Date | null
    scanId: string | null
    organizationId: string | null
  }

  export type ReportMaxAggregateOutputType = {
    id: string | null
    format: string | null
    storagePath: string | null
    createdAt: Date | null
    scanId: string | null
    organizationId: string | null
  }

  export type ReportCountAggregateOutputType = {
    id: number
    format: number
    storagePath: number
    createdAt: number
    scanId: number
    organizationId: number
    _all: number
  }


  export type ReportMinAggregateInputType = {
    id?: true
    format?: true
    storagePath?: true
    createdAt?: true
    scanId?: true
    organizationId?: true
  }

  export type ReportMaxAggregateInputType = {
    id?: true
    format?: true
    storagePath?: true
    createdAt?: true
    scanId?: true
    organizationId?: true
  }

  export type ReportCountAggregateInputType = {
    id?: true
    format?: true
    storagePath?: true
    createdAt?: true
    scanId?: true
    organizationId?: true
    _all?: true
  }

  export type ReportAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Report to aggregate.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Reports
    **/
    _count?: true | ReportCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReportMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReportMaxAggregateInputType
  }

  export type GetReportAggregateType<T extends ReportAggregateArgs> = {
        [P in keyof T & keyof AggregateReport]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReport[P]>
      : GetScalarType<T[P], AggregateReport[P]>
  }




  export type ReportGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReportWhereInput
    orderBy?: ReportOrderByWithAggregationInput | ReportOrderByWithAggregationInput[]
    by: ReportScalarFieldEnum[] | ReportScalarFieldEnum
    having?: ReportScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReportCountAggregateInputType | true
    _min?: ReportMinAggregateInputType
    _max?: ReportMaxAggregateInputType
  }

  export type ReportGroupByOutputType = {
    id: string
    format: string
    storagePath: string
    createdAt: Date
    scanId: string
    organizationId: string
    _count: ReportCountAggregateOutputType | null
    _min: ReportMinAggregateOutputType | null
    _max: ReportMaxAggregateOutputType | null
  }

  type GetReportGroupByPayload<T extends ReportGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReportGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReportGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReportGroupByOutputType[P]>
            : GetScalarType<T[P], ReportGroupByOutputType[P]>
        }
      >
    >


  export type ReportSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    format?: boolean
    storagePath?: boolean
    createdAt?: boolean
    scanId?: boolean
    organizationId?: boolean
    scan?: boolean | ScanDefaultArgs<ExtArgs>
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["report"]>

  export type ReportSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    format?: boolean
    storagePath?: boolean
    createdAt?: boolean
    scanId?: boolean
    organizationId?: boolean
    scan?: boolean | ScanDefaultArgs<ExtArgs>
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["report"]>

  export type ReportSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    format?: boolean
    storagePath?: boolean
    createdAt?: boolean
    scanId?: boolean
    organizationId?: boolean
    scan?: boolean | ScanDefaultArgs<ExtArgs>
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["report"]>

  export type ReportSelectScalar = {
    id?: boolean
    format?: boolean
    storagePath?: boolean
    createdAt?: boolean
    scanId?: boolean
    organizationId?: boolean
  }

  export type ReportOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "format" | "storagePath" | "createdAt" | "scanId" | "organizationId", ExtArgs["result"]["report"]>
  export type ReportInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    scan?: boolean | ScanDefaultArgs<ExtArgs>
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }
  export type ReportIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    scan?: boolean | ScanDefaultArgs<ExtArgs>
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }
  export type ReportIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    scan?: boolean | ScanDefaultArgs<ExtArgs>
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }

  export type $ReportPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Report"
    objects: {
      scan: Prisma.$ScanPayload<ExtArgs>
      organization: Prisma.$OrganizationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      format: string
      storagePath: string
      createdAt: Date
      scanId: string
      organizationId: string
    }, ExtArgs["result"]["report"]>
    composites: {}
  }

  type ReportGetPayload<S extends boolean | null | undefined | ReportDefaultArgs> = $Result.GetResult<Prisma.$ReportPayload, S>

  type ReportCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReportFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReportCountAggregateInputType | true
    }

  export interface ReportDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Report'], meta: { name: 'Report' } }
    /**
     * Find zero or one Report that matches the filter.
     * @param {ReportFindUniqueArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReportFindUniqueArgs>(args: SelectSubset<T, ReportFindUniqueArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Report that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReportFindUniqueOrThrowArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReportFindUniqueOrThrowArgs>(args: SelectSubset<T, ReportFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Report that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportFindFirstArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReportFindFirstArgs>(args?: SelectSubset<T, ReportFindFirstArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Report that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportFindFirstOrThrowArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReportFindFirstOrThrowArgs>(args?: SelectSubset<T, ReportFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Reports that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reports
     * const reports = await prisma.report.findMany()
     * 
     * // Get first 10 Reports
     * const reports = await prisma.report.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reportWithIdOnly = await prisma.report.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReportFindManyArgs>(args?: SelectSubset<T, ReportFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Report.
     * @param {ReportCreateArgs} args - Arguments to create a Report.
     * @example
     * // Create one Report
     * const Report = await prisma.report.create({
     *   data: {
     *     // ... data to create a Report
     *   }
     * })
     * 
     */
    create<T extends ReportCreateArgs>(args: SelectSubset<T, ReportCreateArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Reports.
     * @param {ReportCreateManyArgs} args - Arguments to create many Reports.
     * @example
     * // Create many Reports
     * const report = await prisma.report.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReportCreateManyArgs>(args?: SelectSubset<T, ReportCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Reports and returns the data saved in the database.
     * @param {ReportCreateManyAndReturnArgs} args - Arguments to create many Reports.
     * @example
     * // Create many Reports
     * const report = await prisma.report.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Reports and only return the `id`
     * const reportWithIdOnly = await prisma.report.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReportCreateManyAndReturnArgs>(args?: SelectSubset<T, ReportCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Report.
     * @param {ReportDeleteArgs} args - Arguments to delete one Report.
     * @example
     * // Delete one Report
     * const Report = await prisma.report.delete({
     *   where: {
     *     // ... filter to delete one Report
     *   }
     * })
     * 
     */
    delete<T extends ReportDeleteArgs>(args: SelectSubset<T, ReportDeleteArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Report.
     * @param {ReportUpdateArgs} args - Arguments to update one Report.
     * @example
     * // Update one Report
     * const report = await prisma.report.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReportUpdateArgs>(args: SelectSubset<T, ReportUpdateArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Reports.
     * @param {ReportDeleteManyArgs} args - Arguments to filter Reports to delete.
     * @example
     * // Delete a few Reports
     * const { count } = await prisma.report.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReportDeleteManyArgs>(args?: SelectSubset<T, ReportDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reports
     * const report = await prisma.report.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReportUpdateManyArgs>(args: SelectSubset<T, ReportUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reports and returns the data updated in the database.
     * @param {ReportUpdateManyAndReturnArgs} args - Arguments to update many Reports.
     * @example
     * // Update many Reports
     * const report = await prisma.report.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Reports and only return the `id`
     * const reportWithIdOnly = await prisma.report.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ReportUpdateManyAndReturnArgs>(args: SelectSubset<T, ReportUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Report.
     * @param {ReportUpsertArgs} args - Arguments to update or create a Report.
     * @example
     * // Update or create a Report
     * const report = await prisma.report.upsert({
     *   create: {
     *     // ... data to create a Report
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Report we want to update
     *   }
     * })
     */
    upsert<T extends ReportUpsertArgs>(args: SelectSubset<T, ReportUpsertArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Reports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportCountArgs} args - Arguments to filter Reports to count.
     * @example
     * // Count the number of Reports
     * const count = await prisma.report.count({
     *   where: {
     *     // ... the filter for the Reports we want to count
     *   }
     * })
    **/
    count<T extends ReportCountArgs>(
      args?: Subset<T, ReportCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReportCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Report.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReportAggregateArgs>(args: Subset<T, ReportAggregateArgs>): Prisma.PrismaPromise<GetReportAggregateType<T>>

    /**
     * Group by Report.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReportGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReportGroupByArgs['orderBy'] }
        : { orderBy?: ReportGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReportGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReportGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Report model
   */
  readonly fields: ReportFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Report.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReportClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    scan<T extends ScanDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ScanDefaultArgs<ExtArgs>>): Prisma__ScanClient<$Result.GetResult<Prisma.$ScanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    organization<T extends OrganizationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrganizationDefaultArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Report model
   */
  interface ReportFieldRefs {
    readonly id: FieldRef<"Report", 'String'>
    readonly format: FieldRef<"Report", 'String'>
    readonly storagePath: FieldRef<"Report", 'String'>
    readonly createdAt: FieldRef<"Report", 'DateTime'>
    readonly scanId: FieldRef<"Report", 'String'>
    readonly organizationId: FieldRef<"Report", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Report findUnique
   */
  export type ReportFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where: ReportWhereUniqueInput
  }

  /**
   * Report findUniqueOrThrow
   */
  export type ReportFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where: ReportWhereUniqueInput
  }

  /**
   * Report findFirst
   */
  export type ReportFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reports.
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reports.
     */
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }

  /**
   * Report findFirstOrThrow
   */
  export type ReportFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reports.
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reports.
     */
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }

  /**
   * Report findMany
   */
  export type ReportFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Reports to fetch.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Reports.
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }

  /**
   * Report create
   */
  export type ReportCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * The data needed to create a Report.
     */
    data: XOR<ReportCreateInput, ReportUncheckedCreateInput>
  }

  /**
   * Report createMany
   */
  export type ReportCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Reports.
     */
    data: ReportCreateManyInput | ReportCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Report createManyAndReturn
   */
  export type ReportCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * The data used to create many Reports.
     */
    data: ReportCreateManyInput | ReportCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Report update
   */
  export type ReportUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * The data needed to update a Report.
     */
    data: XOR<ReportUpdateInput, ReportUncheckedUpdateInput>
    /**
     * Choose, which Report to update.
     */
    where: ReportWhereUniqueInput
  }

  /**
   * Report updateMany
   */
  export type ReportUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Reports.
     */
    data: XOR<ReportUpdateManyMutationInput, ReportUncheckedUpdateManyInput>
    /**
     * Filter which Reports to update
     */
    where?: ReportWhereInput
    /**
     * Limit how many Reports to update.
     */
    limit?: number
  }

  /**
   * Report updateManyAndReturn
   */
  export type ReportUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * The data used to update Reports.
     */
    data: XOR<ReportUpdateManyMutationInput, ReportUncheckedUpdateManyInput>
    /**
     * Filter which Reports to update
     */
    where?: ReportWhereInput
    /**
     * Limit how many Reports to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Report upsert
   */
  export type ReportUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * The filter to search for the Report to update in case it exists.
     */
    where: ReportWhereUniqueInput
    /**
     * In case the Report found by the `where` argument doesn't exist, create a new Report with this data.
     */
    create: XOR<ReportCreateInput, ReportUncheckedCreateInput>
    /**
     * In case the Report was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReportUpdateInput, ReportUncheckedUpdateInput>
  }

  /**
   * Report delete
   */
  export type ReportDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter which Report to delete.
     */
    where: ReportWhereUniqueInput
  }

  /**
   * Report deleteMany
   */
  export type ReportDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reports to delete
     */
    where?: ReportWhereInput
    /**
     * Limit how many Reports to delete.
     */
    limit?: number
  }

  /**
   * Report without action
   */
  export type ReportDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
  }


  /**
   * Model ApiToken
   */

  export type AggregateApiToken = {
    _count: ApiTokenCountAggregateOutputType | null
    _min: ApiTokenMinAggregateOutputType | null
    _max: ApiTokenMaxAggregateOutputType | null
  }

  export type ApiTokenMinAggregateOutputType = {
    id: string | null
    name: string | null
    token: string | null
    lastUsedAt: Date | null
    expiresAt: Date | null
    createdAt: Date | null
    organizationId: string | null
  }

  export type ApiTokenMaxAggregateOutputType = {
    id: string | null
    name: string | null
    token: string | null
    lastUsedAt: Date | null
    expiresAt: Date | null
    createdAt: Date | null
    organizationId: string | null
  }

  export type ApiTokenCountAggregateOutputType = {
    id: number
    name: number
    token: number
    permissions: number
    lastUsedAt: number
    expiresAt: number
    createdAt: number
    organizationId: number
    _all: number
  }


  export type ApiTokenMinAggregateInputType = {
    id?: true
    name?: true
    token?: true
    lastUsedAt?: true
    expiresAt?: true
    createdAt?: true
    organizationId?: true
  }

  export type ApiTokenMaxAggregateInputType = {
    id?: true
    name?: true
    token?: true
    lastUsedAt?: true
    expiresAt?: true
    createdAt?: true
    organizationId?: true
  }

  export type ApiTokenCountAggregateInputType = {
    id?: true
    name?: true
    token?: true
    permissions?: true
    lastUsedAt?: true
    expiresAt?: true
    createdAt?: true
    organizationId?: true
    _all?: true
  }

  export type ApiTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ApiToken to aggregate.
     */
    where?: ApiTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiTokens to fetch.
     */
    orderBy?: ApiTokenOrderByWithRelationInput | ApiTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ApiTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ApiTokens
    **/
    _count?: true | ApiTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ApiTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ApiTokenMaxAggregateInputType
  }

  export type GetApiTokenAggregateType<T extends ApiTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateApiToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateApiToken[P]>
      : GetScalarType<T[P], AggregateApiToken[P]>
  }




  export type ApiTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApiTokenWhereInput
    orderBy?: ApiTokenOrderByWithAggregationInput | ApiTokenOrderByWithAggregationInput[]
    by: ApiTokenScalarFieldEnum[] | ApiTokenScalarFieldEnum
    having?: ApiTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ApiTokenCountAggregateInputType | true
    _min?: ApiTokenMinAggregateInputType
    _max?: ApiTokenMaxAggregateInputType
  }

  export type ApiTokenGroupByOutputType = {
    id: string
    name: string
    token: string
    permissions: string[]
    lastUsedAt: Date | null
    expiresAt: Date | null
    createdAt: Date
    organizationId: string
    _count: ApiTokenCountAggregateOutputType | null
    _min: ApiTokenMinAggregateOutputType | null
    _max: ApiTokenMaxAggregateOutputType | null
  }

  type GetApiTokenGroupByPayload<T extends ApiTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ApiTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ApiTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ApiTokenGroupByOutputType[P]>
            : GetScalarType<T[P], ApiTokenGroupByOutputType[P]>
        }
      >
    >


  export type ApiTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    token?: boolean
    permissions?: boolean
    lastUsedAt?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    organizationId?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["apiToken"]>

  export type ApiTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    token?: boolean
    permissions?: boolean
    lastUsedAt?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    organizationId?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["apiToken"]>

  export type ApiTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    token?: boolean
    permissions?: boolean
    lastUsedAt?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    organizationId?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["apiToken"]>

  export type ApiTokenSelectScalar = {
    id?: boolean
    name?: boolean
    token?: boolean
    permissions?: boolean
    lastUsedAt?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    organizationId?: boolean
  }

  export type ApiTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "token" | "permissions" | "lastUsedAt" | "expiresAt" | "createdAt" | "organizationId", ExtArgs["result"]["apiToken"]>
  export type ApiTokenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }
  export type ApiTokenIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }
  export type ApiTokenIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }

  export type $ApiTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ApiToken"
    objects: {
      organization: Prisma.$OrganizationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      token: string
      permissions: string[]
      lastUsedAt: Date | null
      expiresAt: Date | null
      createdAt: Date
      organizationId: string
    }, ExtArgs["result"]["apiToken"]>
    composites: {}
  }

  type ApiTokenGetPayload<S extends boolean | null | undefined | ApiTokenDefaultArgs> = $Result.GetResult<Prisma.$ApiTokenPayload, S>

  type ApiTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ApiTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ApiTokenCountAggregateInputType | true
    }

  export interface ApiTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ApiToken'], meta: { name: 'ApiToken' } }
    /**
     * Find zero or one ApiToken that matches the filter.
     * @param {ApiTokenFindUniqueArgs} args - Arguments to find a ApiToken
     * @example
     * // Get one ApiToken
     * const apiToken = await prisma.apiToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ApiTokenFindUniqueArgs>(args: SelectSubset<T, ApiTokenFindUniqueArgs<ExtArgs>>): Prisma__ApiTokenClient<$Result.GetResult<Prisma.$ApiTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ApiToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ApiTokenFindUniqueOrThrowArgs} args - Arguments to find a ApiToken
     * @example
     * // Get one ApiToken
     * const apiToken = await prisma.apiToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ApiTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, ApiTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ApiTokenClient<$Result.GetResult<Prisma.$ApiTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ApiToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiTokenFindFirstArgs} args - Arguments to find a ApiToken
     * @example
     * // Get one ApiToken
     * const apiToken = await prisma.apiToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ApiTokenFindFirstArgs>(args?: SelectSubset<T, ApiTokenFindFirstArgs<ExtArgs>>): Prisma__ApiTokenClient<$Result.GetResult<Prisma.$ApiTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ApiToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiTokenFindFirstOrThrowArgs} args - Arguments to find a ApiToken
     * @example
     * // Get one ApiToken
     * const apiToken = await prisma.apiToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ApiTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, ApiTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__ApiTokenClient<$Result.GetResult<Prisma.$ApiTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ApiTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ApiTokens
     * const apiTokens = await prisma.apiToken.findMany()
     * 
     * // Get first 10 ApiTokens
     * const apiTokens = await prisma.apiToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const apiTokenWithIdOnly = await prisma.apiToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ApiTokenFindManyArgs>(args?: SelectSubset<T, ApiTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApiTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ApiToken.
     * @param {ApiTokenCreateArgs} args - Arguments to create a ApiToken.
     * @example
     * // Create one ApiToken
     * const ApiToken = await prisma.apiToken.create({
     *   data: {
     *     // ... data to create a ApiToken
     *   }
     * })
     * 
     */
    create<T extends ApiTokenCreateArgs>(args: SelectSubset<T, ApiTokenCreateArgs<ExtArgs>>): Prisma__ApiTokenClient<$Result.GetResult<Prisma.$ApiTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ApiTokens.
     * @param {ApiTokenCreateManyArgs} args - Arguments to create many ApiTokens.
     * @example
     * // Create many ApiTokens
     * const apiToken = await prisma.apiToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ApiTokenCreateManyArgs>(args?: SelectSubset<T, ApiTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ApiTokens and returns the data saved in the database.
     * @param {ApiTokenCreateManyAndReturnArgs} args - Arguments to create many ApiTokens.
     * @example
     * // Create many ApiTokens
     * const apiToken = await prisma.apiToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ApiTokens and only return the `id`
     * const apiTokenWithIdOnly = await prisma.apiToken.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ApiTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, ApiTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApiTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ApiToken.
     * @param {ApiTokenDeleteArgs} args - Arguments to delete one ApiToken.
     * @example
     * // Delete one ApiToken
     * const ApiToken = await prisma.apiToken.delete({
     *   where: {
     *     // ... filter to delete one ApiToken
     *   }
     * })
     * 
     */
    delete<T extends ApiTokenDeleteArgs>(args: SelectSubset<T, ApiTokenDeleteArgs<ExtArgs>>): Prisma__ApiTokenClient<$Result.GetResult<Prisma.$ApiTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ApiToken.
     * @param {ApiTokenUpdateArgs} args - Arguments to update one ApiToken.
     * @example
     * // Update one ApiToken
     * const apiToken = await prisma.apiToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ApiTokenUpdateArgs>(args: SelectSubset<T, ApiTokenUpdateArgs<ExtArgs>>): Prisma__ApiTokenClient<$Result.GetResult<Prisma.$ApiTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ApiTokens.
     * @param {ApiTokenDeleteManyArgs} args - Arguments to filter ApiTokens to delete.
     * @example
     * // Delete a few ApiTokens
     * const { count } = await prisma.apiToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ApiTokenDeleteManyArgs>(args?: SelectSubset<T, ApiTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ApiTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ApiTokens
     * const apiToken = await prisma.apiToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ApiTokenUpdateManyArgs>(args: SelectSubset<T, ApiTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ApiTokens and returns the data updated in the database.
     * @param {ApiTokenUpdateManyAndReturnArgs} args - Arguments to update many ApiTokens.
     * @example
     * // Update many ApiTokens
     * const apiToken = await prisma.apiToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ApiTokens and only return the `id`
     * const apiTokenWithIdOnly = await prisma.apiToken.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ApiTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, ApiTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApiTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ApiToken.
     * @param {ApiTokenUpsertArgs} args - Arguments to update or create a ApiToken.
     * @example
     * // Update or create a ApiToken
     * const apiToken = await prisma.apiToken.upsert({
     *   create: {
     *     // ... data to create a ApiToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ApiToken we want to update
     *   }
     * })
     */
    upsert<T extends ApiTokenUpsertArgs>(args: SelectSubset<T, ApiTokenUpsertArgs<ExtArgs>>): Prisma__ApiTokenClient<$Result.GetResult<Prisma.$ApiTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ApiTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiTokenCountArgs} args - Arguments to filter ApiTokens to count.
     * @example
     * // Count the number of ApiTokens
     * const count = await prisma.apiToken.count({
     *   where: {
     *     // ... the filter for the ApiTokens we want to count
     *   }
     * })
    **/
    count<T extends ApiTokenCountArgs>(
      args?: Subset<T, ApiTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ApiTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ApiToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ApiTokenAggregateArgs>(args: Subset<T, ApiTokenAggregateArgs>): Prisma.PrismaPromise<GetApiTokenAggregateType<T>>

    /**
     * Group by ApiToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ApiTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ApiTokenGroupByArgs['orderBy'] }
        : { orderBy?: ApiTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ApiTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetApiTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ApiToken model
   */
  readonly fields: ApiTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ApiToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ApiTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    organization<T extends OrganizationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrganizationDefaultArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ApiToken model
   */
  interface ApiTokenFieldRefs {
    readonly id: FieldRef<"ApiToken", 'String'>
    readonly name: FieldRef<"ApiToken", 'String'>
    readonly token: FieldRef<"ApiToken", 'String'>
    readonly permissions: FieldRef<"ApiToken", 'String[]'>
    readonly lastUsedAt: FieldRef<"ApiToken", 'DateTime'>
    readonly expiresAt: FieldRef<"ApiToken", 'DateTime'>
    readonly createdAt: FieldRef<"ApiToken", 'DateTime'>
    readonly organizationId: FieldRef<"ApiToken", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ApiToken findUnique
   */
  export type ApiTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiToken
     */
    select?: ApiTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiToken
     */
    omit?: ApiTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiTokenInclude<ExtArgs> | null
    /**
     * Filter, which ApiToken to fetch.
     */
    where: ApiTokenWhereUniqueInput
  }

  /**
   * ApiToken findUniqueOrThrow
   */
  export type ApiTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiToken
     */
    select?: ApiTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiToken
     */
    omit?: ApiTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiTokenInclude<ExtArgs> | null
    /**
     * Filter, which ApiToken to fetch.
     */
    where: ApiTokenWhereUniqueInput
  }

  /**
   * ApiToken findFirst
   */
  export type ApiTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiToken
     */
    select?: ApiTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiToken
     */
    omit?: ApiTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiTokenInclude<ExtArgs> | null
    /**
     * Filter, which ApiToken to fetch.
     */
    where?: ApiTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiTokens to fetch.
     */
    orderBy?: ApiTokenOrderByWithRelationInput | ApiTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ApiTokens.
     */
    cursor?: ApiTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApiTokens.
     */
    distinct?: ApiTokenScalarFieldEnum | ApiTokenScalarFieldEnum[]
  }

  /**
   * ApiToken findFirstOrThrow
   */
  export type ApiTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiToken
     */
    select?: ApiTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiToken
     */
    omit?: ApiTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiTokenInclude<ExtArgs> | null
    /**
     * Filter, which ApiToken to fetch.
     */
    where?: ApiTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiTokens to fetch.
     */
    orderBy?: ApiTokenOrderByWithRelationInput | ApiTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ApiTokens.
     */
    cursor?: ApiTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApiTokens.
     */
    distinct?: ApiTokenScalarFieldEnum | ApiTokenScalarFieldEnum[]
  }

  /**
   * ApiToken findMany
   */
  export type ApiTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiToken
     */
    select?: ApiTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiToken
     */
    omit?: ApiTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiTokenInclude<ExtArgs> | null
    /**
     * Filter, which ApiTokens to fetch.
     */
    where?: ApiTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiTokens to fetch.
     */
    orderBy?: ApiTokenOrderByWithRelationInput | ApiTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ApiTokens.
     */
    cursor?: ApiTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiTokens.
     */
    skip?: number
    distinct?: ApiTokenScalarFieldEnum | ApiTokenScalarFieldEnum[]
  }

  /**
   * ApiToken create
   */
  export type ApiTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiToken
     */
    select?: ApiTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiToken
     */
    omit?: ApiTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiTokenInclude<ExtArgs> | null
    /**
     * The data needed to create a ApiToken.
     */
    data: XOR<ApiTokenCreateInput, ApiTokenUncheckedCreateInput>
  }

  /**
   * ApiToken createMany
   */
  export type ApiTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ApiTokens.
     */
    data: ApiTokenCreateManyInput | ApiTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ApiToken createManyAndReturn
   */
  export type ApiTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiToken
     */
    select?: ApiTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ApiToken
     */
    omit?: ApiTokenOmit<ExtArgs> | null
    /**
     * The data used to create many ApiTokens.
     */
    data: ApiTokenCreateManyInput | ApiTokenCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiTokenIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ApiToken update
   */
  export type ApiTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiToken
     */
    select?: ApiTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiToken
     */
    omit?: ApiTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiTokenInclude<ExtArgs> | null
    /**
     * The data needed to update a ApiToken.
     */
    data: XOR<ApiTokenUpdateInput, ApiTokenUncheckedUpdateInput>
    /**
     * Choose, which ApiToken to update.
     */
    where: ApiTokenWhereUniqueInput
  }

  /**
   * ApiToken updateMany
   */
  export type ApiTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ApiTokens.
     */
    data: XOR<ApiTokenUpdateManyMutationInput, ApiTokenUncheckedUpdateManyInput>
    /**
     * Filter which ApiTokens to update
     */
    where?: ApiTokenWhereInput
    /**
     * Limit how many ApiTokens to update.
     */
    limit?: number
  }

  /**
   * ApiToken updateManyAndReturn
   */
  export type ApiTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiToken
     */
    select?: ApiTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ApiToken
     */
    omit?: ApiTokenOmit<ExtArgs> | null
    /**
     * The data used to update ApiTokens.
     */
    data: XOR<ApiTokenUpdateManyMutationInput, ApiTokenUncheckedUpdateManyInput>
    /**
     * Filter which ApiTokens to update
     */
    where?: ApiTokenWhereInput
    /**
     * Limit how many ApiTokens to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiTokenIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ApiToken upsert
   */
  export type ApiTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiToken
     */
    select?: ApiTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiToken
     */
    omit?: ApiTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiTokenInclude<ExtArgs> | null
    /**
     * The filter to search for the ApiToken to update in case it exists.
     */
    where: ApiTokenWhereUniqueInput
    /**
     * In case the ApiToken found by the `where` argument doesn't exist, create a new ApiToken with this data.
     */
    create: XOR<ApiTokenCreateInput, ApiTokenUncheckedCreateInput>
    /**
     * In case the ApiToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ApiTokenUpdateInput, ApiTokenUncheckedUpdateInput>
  }

  /**
   * ApiToken delete
   */
  export type ApiTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiToken
     */
    select?: ApiTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiToken
     */
    omit?: ApiTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiTokenInclude<ExtArgs> | null
    /**
     * Filter which ApiToken to delete.
     */
    where: ApiTokenWhereUniqueInput
  }

  /**
   * ApiToken deleteMany
   */
  export type ApiTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ApiTokens to delete
     */
    where?: ApiTokenWhereInput
    /**
     * Limit how many ApiTokens to delete.
     */
    limit?: number
  }

  /**
   * ApiToken without action
   */
  export type ApiTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiToken
     */
    select?: ApiTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiToken
     */
    omit?: ApiTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiTokenInclude<ExtArgs> | null
  }


  /**
   * Model AuditLog
   */

  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  export type AuditLogMinAggregateOutputType = {
    id: string | null
    action: string | null
    ipAddress: string | null
    createdAt: Date | null
    userId: string | null
    organizationId: string | null
  }

  export type AuditLogMaxAggregateOutputType = {
    id: string | null
    action: string | null
    ipAddress: string | null
    createdAt: Date | null
    userId: string | null
    organizationId: string | null
  }

  export type AuditLogCountAggregateOutputType = {
    id: number
    action: number
    details: number
    ipAddress: number
    createdAt: number
    userId: number
    organizationId: number
    _all: number
  }


  export type AuditLogMinAggregateInputType = {
    id?: true
    action?: true
    ipAddress?: true
    createdAt?: true
    userId?: true
    organizationId?: true
  }

  export type AuditLogMaxAggregateInputType = {
    id?: true
    action?: true
    ipAddress?: true
    createdAt?: true
    userId?: true
    organizationId?: true
  }

  export type AuditLogCountAggregateInputType = {
    id?: true
    action?: true
    details?: true
    ipAddress?: true
    createdAt?: true
    userId?: true
    organizationId?: true
    _all?: true
  }

  export type AuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditLogs
    **/
    _count?: true | AuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditLogMaxAggregateInputType
  }

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>
  }




  export type AuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithAggregationInput | AuditLogOrderByWithAggregationInput[]
    by: AuditLogScalarFieldEnum[] | AuditLogScalarFieldEnum
    having?: AuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditLogCountAggregateInputType | true
    _min?: AuditLogMinAggregateInputType
    _max?: AuditLogMaxAggregateInputType
  }

  export type AuditLogGroupByOutputType = {
    id: string
    action: string
    details: JsonValue
    ipAddress: string | null
    createdAt: Date
    userId: string
    organizationId: string
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    action?: boolean
    details?: boolean
    ipAddress?: boolean
    createdAt?: boolean
    userId?: boolean
    organizationId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    action?: boolean
    details?: boolean
    ipAddress?: boolean
    createdAt?: boolean
    userId?: boolean
    organizationId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    action?: boolean
    details?: boolean
    ipAddress?: boolean
    createdAt?: boolean
    userId?: boolean
    organizationId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectScalar = {
    id?: boolean
    action?: boolean
    details?: boolean
    ipAddress?: boolean
    createdAt?: boolean
    userId?: boolean
    organizationId?: boolean
  }

  export type AuditLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "action" | "details" | "ipAddress" | "createdAt" | "userId" | "organizationId", ExtArgs["result"]["auditLog"]>
  export type AuditLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }
  export type AuditLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }
  export type AuditLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }

  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      organization: Prisma.$OrganizationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      action: string
      details: Prisma.JsonValue
      ipAddress: string | null
      createdAt: Date
      userId: string
      organizationId: string
    }, ExtArgs["result"]["auditLog"]>
    composites: {}
  }

  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = $Result.GetResult<Prisma.$AuditLogPayload, S>

  type AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuditLogCountAggregateInputType | true
    }

  export interface AuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'], meta: { name: 'AuditLog' } }
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     * 
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditLogFindManyArgs>(args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     * 
     */
    create<T extends AuditLogCreateArgs>(args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditLogCreateManyArgs>(args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuditLogs and returns the data saved in the database.
     * @param {AuditLogCreateManyAndReturnArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     * 
     */
    delete<T extends AuditLogDeleteArgs>(args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditLogUpdateArgs>(args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditLogUpdateManyArgs>(args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs and returns the data updated in the database.
     * @param {AuditLogUpdateManyAndReturnArgs} args - Arguments to update many AuditLogs.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AuditLogUpdateManyAndReturnArgs>(args: SelectSubset<T, AuditLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuditLogAggregateArgs>(args: Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditLog model
   */
  readonly fields: AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    organization<T extends OrganizationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrganizationDefaultArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuditLog model
   */
  interface AuditLogFieldRefs {
    readonly id: FieldRef<"AuditLog", 'String'>
    readonly action: FieldRef<"AuditLog", 'String'>
    readonly details: FieldRef<"AuditLog", 'Json'>
    readonly ipAddress: FieldRef<"AuditLog", 'String'>
    readonly createdAt: FieldRef<"AuditLog", 'DateTime'>
    readonly userId: FieldRef<"AuditLog", 'String'>
    readonly organizationId: FieldRef<"AuditLog", 'String'>
  }
    

  // Custom InputTypes
  /**
   * AuditLog findUnique
   */
  export type AuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findFirst
   */
  export type AuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to create a AuditLog.
     */
    data: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
  }

  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog createManyAndReturn
   */
  export type AuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
  }

  /**
   * AuditLog updateManyAndReturn
   */
  export type AuditLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
  }

  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to delete.
     */
    limit?: number
  }

  /**
   * AuditLog without action
   */
  export type AuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    password: 'password',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const OrganizationScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type OrganizationScalarFieldEnum = (typeof OrganizationScalarFieldEnum)[keyof typeof OrganizationScalarFieldEnum]


  export const MembershipScalarFieldEnum: {
    id: 'id',
    role: 'role',
    createdAt: 'createdAt',
    userId: 'userId',
    organizationId: 'organizationId'
  };

  export type MembershipScalarFieldEnum = (typeof MembershipScalarFieldEnum)[keyof typeof MembershipScalarFieldEnum]


  export const InvitationScalarFieldEnum: {
    id: 'id',
    email: 'email',
    role: 'role',
    status: 'status',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt',
    organizationId: 'organizationId',
    invitedById: 'invitedById'
  };

  export type InvitationScalarFieldEnum = (typeof InvitationScalarFieldEnum)[keyof typeof InvitationScalarFieldEnum]


  export const TargetScalarFieldEnum: {
    id: 'id',
    url: 'url',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    organizationId: 'organizationId'
  };

  export type TargetScalarFieldEnum = (typeof TargetScalarFieldEnum)[keyof typeof TargetScalarFieldEnum]


  export const ScanScalarFieldEnum: {
    id: 'id',
    status: 'status',
    startedAt: 'startedAt',
    completedAt: 'completedAt',
    createdAt: 'createdAt',
    targetId: 'targetId',
    configurationId: 'configurationId'
  };

  export type ScanScalarFieldEnum = (typeof ScanScalarFieldEnum)[keyof typeof ScanScalarFieldEnum]


  export const VulnerabilityScalarFieldEnum: {
    id: 'id',
    type: 'type',
    severity: 'severity',
    description: 'description',
    proof: 'proof',
    isResolved: 'isResolved',
    foundAt: 'foundAt',
    scanId: 'scanId'
  };

  export type VulnerabilityScalarFieldEnum = (typeof VulnerabilityScalarFieldEnum)[keyof typeof VulnerabilityScalarFieldEnum]


  export const ScanConfigurationScalarFieldEnum: {
    id: 'id',
    name: 'name',
    isDiscoveryFocused: 'isDiscoveryFocused',
    isAiPowered: 'isAiPowered'
  };

  export type ScanConfigurationScalarFieldEnum = (typeof ScanConfigurationScalarFieldEnum)[keyof typeof ScanConfigurationScalarFieldEnum]


  export const ReportScalarFieldEnum: {
    id: 'id',
    format: 'format',
    storagePath: 'storagePath',
    createdAt: 'createdAt',
    scanId: 'scanId',
    organizationId: 'organizationId'
  };

  export type ReportScalarFieldEnum = (typeof ReportScalarFieldEnum)[keyof typeof ReportScalarFieldEnum]


  export const ApiTokenScalarFieldEnum: {
    id: 'id',
    name: 'name',
    token: 'token',
    permissions: 'permissions',
    lastUsedAt: 'lastUsedAt',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt',
    organizationId: 'organizationId'
  };

  export type ApiTokenScalarFieldEnum = (typeof ApiTokenScalarFieldEnum)[keyof typeof ApiTokenScalarFieldEnum]


  export const AuditLogScalarFieldEnum: {
    id: 'id',
    action: 'action',
    details: 'details',
    ipAddress: 'ipAddress',
    createdAt: 'createdAt',
    userId: 'userId',
    organizationId: 'organizationId'
  };

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'InvitationStatus'
   */
  export type EnumInvitationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InvitationStatus'>
    


  /**
   * Reference to a field of type 'InvitationStatus[]'
   */
  export type ListEnumInvitationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InvitationStatus[]'>
    


  /**
   * Reference to a field of type 'ScanStatus'
   */
  export type EnumScanStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ScanStatus'>
    


  /**
   * Reference to a field of type 'ScanStatus[]'
   */
  export type ListEnumScanStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ScanStatus[]'>
    


  /**
   * Reference to a field of type 'Severity'
   */
  export type EnumSeverityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Severity'>
    


  /**
   * Reference to a field of type 'Severity[]'
   */
  export type ListEnumSeverityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Severity[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    password?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    memberships?: MembershipListRelationFilter
    invitations?: InvitationListRelationFilter
    auditLogs?: AuditLogListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    memberships?: MembershipOrderByRelationAggregateInput
    invitations?: InvitationOrderByRelationAggregateInput
    auditLogs?: AuditLogOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    password?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    memberships?: MembershipListRelationFilter
    invitations?: InvitationListRelationFilter
    auditLogs?: AuditLogListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    password?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type OrganizationWhereInput = {
    AND?: OrganizationWhereInput | OrganizationWhereInput[]
    OR?: OrganizationWhereInput[]
    NOT?: OrganizationWhereInput | OrganizationWhereInput[]
    id?: StringFilter<"Organization"> | string
    name?: StringFilter<"Organization"> | string
    slug?: StringFilter<"Organization"> | string
    createdAt?: DateTimeFilter<"Organization"> | Date | string
    updatedAt?: DateTimeFilter<"Organization"> | Date | string
    members?: MembershipListRelationFilter
    invitations?: InvitationListRelationFilter
    targets?: TargetListRelationFilter
    reports?: ReportListRelationFilter
    apiTokens?: ApiTokenListRelationFilter
    auditLogs?: AuditLogListRelationFilter
  }

  export type OrganizationOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    members?: MembershipOrderByRelationAggregateInput
    invitations?: InvitationOrderByRelationAggregateInput
    targets?: TargetOrderByRelationAggregateInput
    reports?: ReportOrderByRelationAggregateInput
    apiTokens?: ApiTokenOrderByRelationAggregateInput
    auditLogs?: AuditLogOrderByRelationAggregateInput
  }

  export type OrganizationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: OrganizationWhereInput | OrganizationWhereInput[]
    OR?: OrganizationWhereInput[]
    NOT?: OrganizationWhereInput | OrganizationWhereInput[]
    name?: StringFilter<"Organization"> | string
    createdAt?: DateTimeFilter<"Organization"> | Date | string
    updatedAt?: DateTimeFilter<"Organization"> | Date | string
    members?: MembershipListRelationFilter
    invitations?: InvitationListRelationFilter
    targets?: TargetListRelationFilter
    reports?: ReportListRelationFilter
    apiTokens?: ApiTokenListRelationFilter
    auditLogs?: AuditLogListRelationFilter
  }, "id" | "slug">

  export type OrganizationOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: OrganizationCountOrderByAggregateInput
    _max?: OrganizationMaxOrderByAggregateInput
    _min?: OrganizationMinOrderByAggregateInput
  }

  export type OrganizationScalarWhereWithAggregatesInput = {
    AND?: OrganizationScalarWhereWithAggregatesInput | OrganizationScalarWhereWithAggregatesInput[]
    OR?: OrganizationScalarWhereWithAggregatesInput[]
    NOT?: OrganizationScalarWhereWithAggregatesInput | OrganizationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Organization"> | string
    name?: StringWithAggregatesFilter<"Organization"> | string
    slug?: StringWithAggregatesFilter<"Organization"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Organization"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Organization"> | Date | string
  }

  export type MembershipWhereInput = {
    AND?: MembershipWhereInput | MembershipWhereInput[]
    OR?: MembershipWhereInput[]
    NOT?: MembershipWhereInput | MembershipWhereInput[]
    id?: StringFilter<"Membership"> | string
    role?: EnumRoleFilter<"Membership"> | $Enums.Role
    createdAt?: DateTimeFilter<"Membership"> | Date | string
    userId?: StringFilter<"Membership"> | string
    organizationId?: StringFilter<"Membership"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    organization?: XOR<OrganizationScalarRelationFilter, OrganizationWhereInput>
  }

  export type MembershipOrderByWithRelationInput = {
    id?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    organizationId?: SortOrder
    user?: UserOrderByWithRelationInput
    organization?: OrganizationOrderByWithRelationInput
  }

  export type MembershipWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_organizationId?: MembershipUserIdOrganizationIdCompoundUniqueInput
    AND?: MembershipWhereInput | MembershipWhereInput[]
    OR?: MembershipWhereInput[]
    NOT?: MembershipWhereInput | MembershipWhereInput[]
    role?: EnumRoleFilter<"Membership"> | $Enums.Role
    createdAt?: DateTimeFilter<"Membership"> | Date | string
    userId?: StringFilter<"Membership"> | string
    organizationId?: StringFilter<"Membership"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    organization?: XOR<OrganizationScalarRelationFilter, OrganizationWhereInput>
  }, "id" | "userId_organizationId">

  export type MembershipOrderByWithAggregationInput = {
    id?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    organizationId?: SortOrder
    _count?: MembershipCountOrderByAggregateInput
    _max?: MembershipMaxOrderByAggregateInput
    _min?: MembershipMinOrderByAggregateInput
  }

  export type MembershipScalarWhereWithAggregatesInput = {
    AND?: MembershipScalarWhereWithAggregatesInput | MembershipScalarWhereWithAggregatesInput[]
    OR?: MembershipScalarWhereWithAggregatesInput[]
    NOT?: MembershipScalarWhereWithAggregatesInput | MembershipScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Membership"> | string
    role?: EnumRoleWithAggregatesFilter<"Membership"> | $Enums.Role
    createdAt?: DateTimeWithAggregatesFilter<"Membership"> | Date | string
    userId?: StringWithAggregatesFilter<"Membership"> | string
    organizationId?: StringWithAggregatesFilter<"Membership"> | string
  }

  export type InvitationWhereInput = {
    AND?: InvitationWhereInput | InvitationWhereInput[]
    OR?: InvitationWhereInput[]
    NOT?: InvitationWhereInput | InvitationWhereInput[]
    id?: StringFilter<"Invitation"> | string
    email?: StringFilter<"Invitation"> | string
    role?: EnumRoleFilter<"Invitation"> | $Enums.Role
    status?: EnumInvitationStatusFilter<"Invitation"> | $Enums.InvitationStatus
    expiresAt?: DateTimeFilter<"Invitation"> | Date | string
    createdAt?: DateTimeFilter<"Invitation"> | Date | string
    organizationId?: StringFilter<"Invitation"> | string
    invitedById?: StringFilter<"Invitation"> | string
    organization?: XOR<OrganizationScalarRelationFilter, OrganizationWhereInput>
    invitedBy?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type InvitationOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    role?: SortOrder
    status?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    organizationId?: SortOrder
    invitedById?: SortOrder
    organization?: OrganizationOrderByWithRelationInput
    invitedBy?: UserOrderByWithRelationInput
  }

  export type InvitationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email_organizationId?: InvitationEmailOrganizationIdCompoundUniqueInput
    AND?: InvitationWhereInput | InvitationWhereInput[]
    OR?: InvitationWhereInput[]
    NOT?: InvitationWhereInput | InvitationWhereInput[]
    email?: StringFilter<"Invitation"> | string
    role?: EnumRoleFilter<"Invitation"> | $Enums.Role
    status?: EnumInvitationStatusFilter<"Invitation"> | $Enums.InvitationStatus
    expiresAt?: DateTimeFilter<"Invitation"> | Date | string
    createdAt?: DateTimeFilter<"Invitation"> | Date | string
    organizationId?: StringFilter<"Invitation"> | string
    invitedById?: StringFilter<"Invitation"> | string
    organization?: XOR<OrganizationScalarRelationFilter, OrganizationWhereInput>
    invitedBy?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "email_organizationId">

  export type InvitationOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    role?: SortOrder
    status?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    organizationId?: SortOrder
    invitedById?: SortOrder
    _count?: InvitationCountOrderByAggregateInput
    _max?: InvitationMaxOrderByAggregateInput
    _min?: InvitationMinOrderByAggregateInput
  }

  export type InvitationScalarWhereWithAggregatesInput = {
    AND?: InvitationScalarWhereWithAggregatesInput | InvitationScalarWhereWithAggregatesInput[]
    OR?: InvitationScalarWhereWithAggregatesInput[]
    NOT?: InvitationScalarWhereWithAggregatesInput | InvitationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Invitation"> | string
    email?: StringWithAggregatesFilter<"Invitation"> | string
    role?: EnumRoleWithAggregatesFilter<"Invitation"> | $Enums.Role
    status?: EnumInvitationStatusWithAggregatesFilter<"Invitation"> | $Enums.InvitationStatus
    expiresAt?: DateTimeWithAggregatesFilter<"Invitation"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Invitation"> | Date | string
    organizationId?: StringWithAggregatesFilter<"Invitation"> | string
    invitedById?: StringWithAggregatesFilter<"Invitation"> | string
  }

  export type TargetWhereInput = {
    AND?: TargetWhereInput | TargetWhereInput[]
    OR?: TargetWhereInput[]
    NOT?: TargetWhereInput | TargetWhereInput[]
    id?: StringFilter<"Target"> | string
    url?: StringFilter<"Target"> | string
    name?: StringFilter<"Target"> | string
    createdAt?: DateTimeFilter<"Target"> | Date | string
    updatedAt?: DateTimeFilter<"Target"> | Date | string
    organizationId?: StringFilter<"Target"> | string
    organization?: XOR<OrganizationScalarRelationFilter, OrganizationWhereInput>
    scans?: ScanListRelationFilter
  }

  export type TargetOrderByWithRelationInput = {
    id?: SortOrder
    url?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    organizationId?: SortOrder
    organization?: OrganizationOrderByWithRelationInput
    scans?: ScanOrderByRelationAggregateInput
  }

  export type TargetWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    url_organizationId?: TargetUrlOrganizationIdCompoundUniqueInput
    AND?: TargetWhereInput | TargetWhereInput[]
    OR?: TargetWhereInput[]
    NOT?: TargetWhereInput | TargetWhereInput[]
    url?: StringFilter<"Target"> | string
    name?: StringFilter<"Target"> | string
    createdAt?: DateTimeFilter<"Target"> | Date | string
    updatedAt?: DateTimeFilter<"Target"> | Date | string
    organizationId?: StringFilter<"Target"> | string
    organization?: XOR<OrganizationScalarRelationFilter, OrganizationWhereInput>
    scans?: ScanListRelationFilter
  }, "id" | "url_organizationId">

  export type TargetOrderByWithAggregationInput = {
    id?: SortOrder
    url?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    organizationId?: SortOrder
    _count?: TargetCountOrderByAggregateInput
    _max?: TargetMaxOrderByAggregateInput
    _min?: TargetMinOrderByAggregateInput
  }

  export type TargetScalarWhereWithAggregatesInput = {
    AND?: TargetScalarWhereWithAggregatesInput | TargetScalarWhereWithAggregatesInput[]
    OR?: TargetScalarWhereWithAggregatesInput[]
    NOT?: TargetScalarWhereWithAggregatesInput | TargetScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Target"> | string
    url?: StringWithAggregatesFilter<"Target"> | string
    name?: StringWithAggregatesFilter<"Target"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Target"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Target"> | Date | string
    organizationId?: StringWithAggregatesFilter<"Target"> | string
  }

  export type ScanWhereInput = {
    AND?: ScanWhereInput | ScanWhereInput[]
    OR?: ScanWhereInput[]
    NOT?: ScanWhereInput | ScanWhereInput[]
    id?: StringFilter<"Scan"> | string
    status?: EnumScanStatusFilter<"Scan"> | $Enums.ScanStatus
    startedAt?: DateTimeNullableFilter<"Scan"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"Scan"> | Date | string | null
    createdAt?: DateTimeFilter<"Scan"> | Date | string
    targetId?: StringFilter<"Scan"> | string
    configurationId?: StringNullableFilter<"Scan"> | string | null
    target?: XOR<TargetScalarRelationFilter, TargetWhereInput>
    vulnerabilities?: VulnerabilityListRelationFilter
    report?: XOR<ReportNullableScalarRelationFilter, ReportWhereInput> | null
    configuration?: XOR<ScanConfigurationNullableScalarRelationFilter, ScanConfigurationWhereInput> | null
  }

  export type ScanOrderByWithRelationInput = {
    id?: SortOrder
    status?: SortOrder
    startedAt?: SortOrderInput | SortOrder
    completedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    targetId?: SortOrder
    configurationId?: SortOrderInput | SortOrder
    target?: TargetOrderByWithRelationInput
    vulnerabilities?: VulnerabilityOrderByRelationAggregateInput
    report?: ReportOrderByWithRelationInput
    configuration?: ScanConfigurationOrderByWithRelationInput
  }

  export type ScanWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ScanWhereInput | ScanWhereInput[]
    OR?: ScanWhereInput[]
    NOT?: ScanWhereInput | ScanWhereInput[]
    status?: EnumScanStatusFilter<"Scan"> | $Enums.ScanStatus
    startedAt?: DateTimeNullableFilter<"Scan"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"Scan"> | Date | string | null
    createdAt?: DateTimeFilter<"Scan"> | Date | string
    targetId?: StringFilter<"Scan"> | string
    configurationId?: StringNullableFilter<"Scan"> | string | null
    target?: XOR<TargetScalarRelationFilter, TargetWhereInput>
    vulnerabilities?: VulnerabilityListRelationFilter
    report?: XOR<ReportNullableScalarRelationFilter, ReportWhereInput> | null
    configuration?: XOR<ScanConfigurationNullableScalarRelationFilter, ScanConfigurationWhereInput> | null
  }, "id">

  export type ScanOrderByWithAggregationInput = {
    id?: SortOrder
    status?: SortOrder
    startedAt?: SortOrderInput | SortOrder
    completedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    targetId?: SortOrder
    configurationId?: SortOrderInput | SortOrder
    _count?: ScanCountOrderByAggregateInput
    _max?: ScanMaxOrderByAggregateInput
    _min?: ScanMinOrderByAggregateInput
  }

  export type ScanScalarWhereWithAggregatesInput = {
    AND?: ScanScalarWhereWithAggregatesInput | ScanScalarWhereWithAggregatesInput[]
    OR?: ScanScalarWhereWithAggregatesInput[]
    NOT?: ScanScalarWhereWithAggregatesInput | ScanScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Scan"> | string
    status?: EnumScanStatusWithAggregatesFilter<"Scan"> | $Enums.ScanStatus
    startedAt?: DateTimeNullableWithAggregatesFilter<"Scan"> | Date | string | null
    completedAt?: DateTimeNullableWithAggregatesFilter<"Scan"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Scan"> | Date | string
    targetId?: StringWithAggregatesFilter<"Scan"> | string
    configurationId?: StringNullableWithAggregatesFilter<"Scan"> | string | null
  }

  export type VulnerabilityWhereInput = {
    AND?: VulnerabilityWhereInput | VulnerabilityWhereInput[]
    OR?: VulnerabilityWhereInput[]
    NOT?: VulnerabilityWhereInput | VulnerabilityWhereInput[]
    id?: StringFilter<"Vulnerability"> | string
    type?: StringFilter<"Vulnerability"> | string
    severity?: EnumSeverityFilter<"Vulnerability"> | $Enums.Severity
    description?: StringFilter<"Vulnerability"> | string
    proof?: StringFilter<"Vulnerability"> | string
    isResolved?: BoolFilter<"Vulnerability"> | boolean
    foundAt?: DateTimeFilter<"Vulnerability"> | Date | string
    scanId?: StringFilter<"Vulnerability"> | string
    scan?: XOR<ScanScalarRelationFilter, ScanWhereInput>
  }

  export type VulnerabilityOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    severity?: SortOrder
    description?: SortOrder
    proof?: SortOrder
    isResolved?: SortOrder
    foundAt?: SortOrder
    scanId?: SortOrder
    scan?: ScanOrderByWithRelationInput
  }

  export type VulnerabilityWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: VulnerabilityWhereInput | VulnerabilityWhereInput[]
    OR?: VulnerabilityWhereInput[]
    NOT?: VulnerabilityWhereInput | VulnerabilityWhereInput[]
    type?: StringFilter<"Vulnerability"> | string
    severity?: EnumSeverityFilter<"Vulnerability"> | $Enums.Severity
    description?: StringFilter<"Vulnerability"> | string
    proof?: StringFilter<"Vulnerability"> | string
    isResolved?: BoolFilter<"Vulnerability"> | boolean
    foundAt?: DateTimeFilter<"Vulnerability"> | Date | string
    scanId?: StringFilter<"Vulnerability"> | string
    scan?: XOR<ScanScalarRelationFilter, ScanWhereInput>
  }, "id">

  export type VulnerabilityOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    severity?: SortOrder
    description?: SortOrder
    proof?: SortOrder
    isResolved?: SortOrder
    foundAt?: SortOrder
    scanId?: SortOrder
    _count?: VulnerabilityCountOrderByAggregateInput
    _max?: VulnerabilityMaxOrderByAggregateInput
    _min?: VulnerabilityMinOrderByAggregateInput
  }

  export type VulnerabilityScalarWhereWithAggregatesInput = {
    AND?: VulnerabilityScalarWhereWithAggregatesInput | VulnerabilityScalarWhereWithAggregatesInput[]
    OR?: VulnerabilityScalarWhereWithAggregatesInput[]
    NOT?: VulnerabilityScalarWhereWithAggregatesInput | VulnerabilityScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Vulnerability"> | string
    type?: StringWithAggregatesFilter<"Vulnerability"> | string
    severity?: EnumSeverityWithAggregatesFilter<"Vulnerability"> | $Enums.Severity
    description?: StringWithAggregatesFilter<"Vulnerability"> | string
    proof?: StringWithAggregatesFilter<"Vulnerability"> | string
    isResolved?: BoolWithAggregatesFilter<"Vulnerability"> | boolean
    foundAt?: DateTimeWithAggregatesFilter<"Vulnerability"> | Date | string
    scanId?: StringWithAggregatesFilter<"Vulnerability"> | string
  }

  export type ScanConfigurationWhereInput = {
    AND?: ScanConfigurationWhereInput | ScanConfigurationWhereInput[]
    OR?: ScanConfigurationWhereInput[]
    NOT?: ScanConfigurationWhereInput | ScanConfigurationWhereInput[]
    id?: StringFilter<"ScanConfiguration"> | string
    name?: StringFilter<"ScanConfiguration"> | string
    isDiscoveryFocused?: BoolFilter<"ScanConfiguration"> | boolean
    isAiPowered?: BoolFilter<"ScanConfiguration"> | boolean
    scans?: ScanListRelationFilter
  }

  export type ScanConfigurationOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    isDiscoveryFocused?: SortOrder
    isAiPowered?: SortOrder
    scans?: ScanOrderByRelationAggregateInput
  }

  export type ScanConfigurationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ScanConfigurationWhereInput | ScanConfigurationWhereInput[]
    OR?: ScanConfigurationWhereInput[]
    NOT?: ScanConfigurationWhereInput | ScanConfigurationWhereInput[]
    name?: StringFilter<"ScanConfiguration"> | string
    isDiscoveryFocused?: BoolFilter<"ScanConfiguration"> | boolean
    isAiPowered?: BoolFilter<"ScanConfiguration"> | boolean
    scans?: ScanListRelationFilter
  }, "id">

  export type ScanConfigurationOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    isDiscoveryFocused?: SortOrder
    isAiPowered?: SortOrder
    _count?: ScanConfigurationCountOrderByAggregateInput
    _max?: ScanConfigurationMaxOrderByAggregateInput
    _min?: ScanConfigurationMinOrderByAggregateInput
  }

  export type ScanConfigurationScalarWhereWithAggregatesInput = {
    AND?: ScanConfigurationScalarWhereWithAggregatesInput | ScanConfigurationScalarWhereWithAggregatesInput[]
    OR?: ScanConfigurationScalarWhereWithAggregatesInput[]
    NOT?: ScanConfigurationScalarWhereWithAggregatesInput | ScanConfigurationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ScanConfiguration"> | string
    name?: StringWithAggregatesFilter<"ScanConfiguration"> | string
    isDiscoveryFocused?: BoolWithAggregatesFilter<"ScanConfiguration"> | boolean
    isAiPowered?: BoolWithAggregatesFilter<"ScanConfiguration"> | boolean
  }

  export type ReportWhereInput = {
    AND?: ReportWhereInput | ReportWhereInput[]
    OR?: ReportWhereInput[]
    NOT?: ReportWhereInput | ReportWhereInput[]
    id?: StringFilter<"Report"> | string
    format?: StringFilter<"Report"> | string
    storagePath?: StringFilter<"Report"> | string
    createdAt?: DateTimeFilter<"Report"> | Date | string
    scanId?: StringFilter<"Report"> | string
    organizationId?: StringFilter<"Report"> | string
    scan?: XOR<ScanScalarRelationFilter, ScanWhereInput>
    organization?: XOR<OrganizationScalarRelationFilter, OrganizationWhereInput>
  }

  export type ReportOrderByWithRelationInput = {
    id?: SortOrder
    format?: SortOrder
    storagePath?: SortOrder
    createdAt?: SortOrder
    scanId?: SortOrder
    organizationId?: SortOrder
    scan?: ScanOrderByWithRelationInput
    organization?: OrganizationOrderByWithRelationInput
  }

  export type ReportWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    scanId?: string
    AND?: ReportWhereInput | ReportWhereInput[]
    OR?: ReportWhereInput[]
    NOT?: ReportWhereInput | ReportWhereInput[]
    format?: StringFilter<"Report"> | string
    storagePath?: StringFilter<"Report"> | string
    createdAt?: DateTimeFilter<"Report"> | Date | string
    organizationId?: StringFilter<"Report"> | string
    scan?: XOR<ScanScalarRelationFilter, ScanWhereInput>
    organization?: XOR<OrganizationScalarRelationFilter, OrganizationWhereInput>
  }, "id" | "scanId">

  export type ReportOrderByWithAggregationInput = {
    id?: SortOrder
    format?: SortOrder
    storagePath?: SortOrder
    createdAt?: SortOrder
    scanId?: SortOrder
    organizationId?: SortOrder
    _count?: ReportCountOrderByAggregateInput
    _max?: ReportMaxOrderByAggregateInput
    _min?: ReportMinOrderByAggregateInput
  }

  export type ReportScalarWhereWithAggregatesInput = {
    AND?: ReportScalarWhereWithAggregatesInput | ReportScalarWhereWithAggregatesInput[]
    OR?: ReportScalarWhereWithAggregatesInput[]
    NOT?: ReportScalarWhereWithAggregatesInput | ReportScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Report"> | string
    format?: StringWithAggregatesFilter<"Report"> | string
    storagePath?: StringWithAggregatesFilter<"Report"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Report"> | Date | string
    scanId?: StringWithAggregatesFilter<"Report"> | string
    organizationId?: StringWithAggregatesFilter<"Report"> | string
  }

  export type ApiTokenWhereInput = {
    AND?: ApiTokenWhereInput | ApiTokenWhereInput[]
    OR?: ApiTokenWhereInput[]
    NOT?: ApiTokenWhereInput | ApiTokenWhereInput[]
    id?: StringFilter<"ApiToken"> | string
    name?: StringFilter<"ApiToken"> | string
    token?: StringFilter<"ApiToken"> | string
    permissions?: StringNullableListFilter<"ApiToken">
    lastUsedAt?: DateTimeNullableFilter<"ApiToken"> | Date | string | null
    expiresAt?: DateTimeNullableFilter<"ApiToken"> | Date | string | null
    createdAt?: DateTimeFilter<"ApiToken"> | Date | string
    organizationId?: StringFilter<"ApiToken"> | string
    organization?: XOR<OrganizationScalarRelationFilter, OrganizationWhereInput>
  }

  export type ApiTokenOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    token?: SortOrder
    permissions?: SortOrder
    lastUsedAt?: SortOrderInput | SortOrder
    expiresAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    organizationId?: SortOrder
    organization?: OrganizationOrderByWithRelationInput
  }

  export type ApiTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: ApiTokenWhereInput | ApiTokenWhereInput[]
    OR?: ApiTokenWhereInput[]
    NOT?: ApiTokenWhereInput | ApiTokenWhereInput[]
    name?: StringFilter<"ApiToken"> | string
    permissions?: StringNullableListFilter<"ApiToken">
    lastUsedAt?: DateTimeNullableFilter<"ApiToken"> | Date | string | null
    expiresAt?: DateTimeNullableFilter<"ApiToken"> | Date | string | null
    createdAt?: DateTimeFilter<"ApiToken"> | Date | string
    organizationId?: StringFilter<"ApiToken"> | string
    organization?: XOR<OrganizationScalarRelationFilter, OrganizationWhereInput>
  }, "id" | "token">

  export type ApiTokenOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    token?: SortOrder
    permissions?: SortOrder
    lastUsedAt?: SortOrderInput | SortOrder
    expiresAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    organizationId?: SortOrder
    _count?: ApiTokenCountOrderByAggregateInput
    _max?: ApiTokenMaxOrderByAggregateInput
    _min?: ApiTokenMinOrderByAggregateInput
  }

  export type ApiTokenScalarWhereWithAggregatesInput = {
    AND?: ApiTokenScalarWhereWithAggregatesInput | ApiTokenScalarWhereWithAggregatesInput[]
    OR?: ApiTokenScalarWhereWithAggregatesInput[]
    NOT?: ApiTokenScalarWhereWithAggregatesInput | ApiTokenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ApiToken"> | string
    name?: StringWithAggregatesFilter<"ApiToken"> | string
    token?: StringWithAggregatesFilter<"ApiToken"> | string
    permissions?: StringNullableListFilter<"ApiToken">
    lastUsedAt?: DateTimeNullableWithAggregatesFilter<"ApiToken"> | Date | string | null
    expiresAt?: DateTimeNullableWithAggregatesFilter<"ApiToken"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ApiToken"> | Date | string
    organizationId?: StringWithAggregatesFilter<"ApiToken"> | string
  }

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    details?: JsonFilter<"AuditLog">
    ipAddress?: StringNullableFilter<"AuditLog"> | string | null
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
    userId?: StringFilter<"AuditLog"> | string
    organizationId?: StringFilter<"AuditLog"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    organization?: XOR<OrganizationScalarRelationFilter, OrganizationWhereInput>
  }

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder
    action?: SortOrder
    details?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    organizationId?: SortOrder
    user?: UserOrderByWithRelationInput
    organization?: OrganizationOrderByWithRelationInput
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    action?: StringFilter<"AuditLog"> | string
    details?: JsonFilter<"AuditLog">
    ipAddress?: StringNullableFilter<"AuditLog"> | string | null
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
    userId?: StringFilter<"AuditLog"> | string
    organizationId?: StringFilter<"AuditLog"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    organization?: XOR<OrganizationScalarRelationFilter, OrganizationWhereInput>
  }, "id">

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    action?: SortOrder
    details?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    organizationId?: SortOrder
    _count?: AuditLogCountOrderByAggregateInput
    _max?: AuditLogMaxOrderByAggregateInput
    _min?: AuditLogMinOrderByAggregateInput
  }

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    OR?: AuditLogScalarWhereWithAggregatesInput[]
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AuditLog"> | string
    action?: StringWithAggregatesFilter<"AuditLog"> | string
    details?: JsonWithAggregatesFilter<"AuditLog">
    ipAddress?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
    userId?: StringWithAggregatesFilter<"AuditLog"> | string
    organizationId?: StringWithAggregatesFilter<"AuditLog"> | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    name?: string | null
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    memberships?: MembershipCreateNestedManyWithoutUserInput
    invitations?: InvitationCreateNestedManyWithoutInvitedByInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    name?: string | null
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    memberships?: MembershipUncheckedCreateNestedManyWithoutUserInput
    invitations?: InvitationUncheckedCreateNestedManyWithoutInvitedByInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: MembershipUpdateManyWithoutUserNestedInput
    invitations?: InvitationUpdateManyWithoutInvitedByNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: MembershipUncheckedUpdateManyWithoutUserNestedInput
    invitations?: InvitationUncheckedUpdateManyWithoutInvitedByNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    name?: string | null
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrganizationCreateInput = {
    id?: string
    name: string
    slug: string
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: MembershipCreateNestedManyWithoutOrganizationInput
    invitations?: InvitationCreateNestedManyWithoutOrganizationInput
    targets?: TargetCreateNestedManyWithoutOrganizationInput
    reports?: ReportCreateNestedManyWithoutOrganizationInput
    apiTokens?: ApiTokenCreateNestedManyWithoutOrganizationInput
    auditLogs?: AuditLogCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateInput = {
    id?: string
    name: string
    slug: string
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: MembershipUncheckedCreateNestedManyWithoutOrganizationInput
    invitations?: InvitationUncheckedCreateNestedManyWithoutOrganizationInput
    targets?: TargetUncheckedCreateNestedManyWithoutOrganizationInput
    reports?: ReportUncheckedCreateNestedManyWithoutOrganizationInput
    apiTokens?: ApiTokenUncheckedCreateNestedManyWithoutOrganizationInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: MembershipUpdateManyWithoutOrganizationNestedInput
    invitations?: InvitationUpdateManyWithoutOrganizationNestedInput
    targets?: TargetUpdateManyWithoutOrganizationNestedInput
    reports?: ReportUpdateManyWithoutOrganizationNestedInput
    apiTokens?: ApiTokenUpdateManyWithoutOrganizationNestedInput
    auditLogs?: AuditLogUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: MembershipUncheckedUpdateManyWithoutOrganizationNestedInput
    invitations?: InvitationUncheckedUpdateManyWithoutOrganizationNestedInput
    targets?: TargetUncheckedUpdateManyWithoutOrganizationNestedInput
    reports?: ReportUncheckedUpdateManyWithoutOrganizationNestedInput
    apiTokens?: ApiTokenUncheckedUpdateManyWithoutOrganizationNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationCreateManyInput = {
    id?: string
    name: string
    slug: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrganizationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrganizationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MembershipCreateInput = {
    id?: string
    role?: $Enums.Role
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutMembershipsInput
    organization: OrganizationCreateNestedOneWithoutMembersInput
  }

  export type MembershipUncheckedCreateInput = {
    id?: string
    role?: $Enums.Role
    createdAt?: Date | string
    userId: string
    organizationId: string
  }

  export type MembershipUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMembershipsNestedInput
    organization?: OrganizationUpdateOneRequiredWithoutMembersNestedInput
  }

  export type MembershipUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
  }

  export type MembershipCreateManyInput = {
    id?: string
    role?: $Enums.Role
    createdAt?: Date | string
    userId: string
    organizationId: string
  }

  export type MembershipUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MembershipUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
  }

  export type InvitationCreateInput = {
    id?: string
    email: string
    role?: $Enums.Role
    status?: $Enums.InvitationStatus
    expiresAt: Date | string
    createdAt?: Date | string
    organization: OrganizationCreateNestedOneWithoutInvitationsInput
    invitedBy: UserCreateNestedOneWithoutInvitationsInput
  }

  export type InvitationUncheckedCreateInput = {
    id?: string
    email: string
    role?: $Enums.Role
    status?: $Enums.InvitationStatus
    expiresAt: Date | string
    createdAt?: Date | string
    organizationId: string
    invitedById: string
  }

  export type InvitationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    status?: EnumInvitationStatusFieldUpdateOperationsInput | $Enums.InvitationStatus
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutInvitationsNestedInput
    invitedBy?: UserUpdateOneRequiredWithoutInvitationsNestedInput
  }

  export type InvitationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    status?: EnumInvitationStatusFieldUpdateOperationsInput | $Enums.InvitationStatus
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizationId?: StringFieldUpdateOperationsInput | string
    invitedById?: StringFieldUpdateOperationsInput | string
  }

  export type InvitationCreateManyInput = {
    id?: string
    email: string
    role?: $Enums.Role
    status?: $Enums.InvitationStatus
    expiresAt: Date | string
    createdAt?: Date | string
    organizationId: string
    invitedById: string
  }

  export type InvitationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    status?: EnumInvitationStatusFieldUpdateOperationsInput | $Enums.InvitationStatus
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvitationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    status?: EnumInvitationStatusFieldUpdateOperationsInput | $Enums.InvitationStatus
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizationId?: StringFieldUpdateOperationsInput | string
    invitedById?: StringFieldUpdateOperationsInput | string
  }

  export type TargetCreateInput = {
    id?: string
    url: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    organization: OrganizationCreateNestedOneWithoutTargetsInput
    scans?: ScanCreateNestedManyWithoutTargetInput
  }

  export type TargetUncheckedCreateInput = {
    id?: string
    url: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    organizationId: string
    scans?: ScanUncheckedCreateNestedManyWithoutTargetInput
  }

  export type TargetUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutTargetsNestedInput
    scans?: ScanUpdateManyWithoutTargetNestedInput
  }

  export type TargetUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizationId?: StringFieldUpdateOperationsInput | string
    scans?: ScanUncheckedUpdateManyWithoutTargetNestedInput
  }

  export type TargetCreateManyInput = {
    id?: string
    url: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    organizationId: string
  }

  export type TargetUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TargetUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizationId?: StringFieldUpdateOperationsInput | string
  }

  export type ScanCreateInput = {
    id?: string
    status?: $Enums.ScanStatus
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    target: TargetCreateNestedOneWithoutScansInput
    vulnerabilities?: VulnerabilityCreateNestedManyWithoutScanInput
    report?: ReportCreateNestedOneWithoutScanInput
    configuration?: ScanConfigurationCreateNestedOneWithoutScansInput
  }

  export type ScanUncheckedCreateInput = {
    id?: string
    status?: $Enums.ScanStatus
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    targetId: string
    configurationId?: string | null
    vulnerabilities?: VulnerabilityUncheckedCreateNestedManyWithoutScanInput
    report?: ReportUncheckedCreateNestedOneWithoutScanInput
  }

  export type ScanUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumScanStatusFieldUpdateOperationsInput | $Enums.ScanStatus
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    target?: TargetUpdateOneRequiredWithoutScansNestedInput
    vulnerabilities?: VulnerabilityUpdateManyWithoutScanNestedInput
    report?: ReportUpdateOneWithoutScanNestedInput
    configuration?: ScanConfigurationUpdateOneWithoutScansNestedInput
  }

  export type ScanUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumScanStatusFieldUpdateOperationsInput | $Enums.ScanStatus
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    targetId?: StringFieldUpdateOperationsInput | string
    configurationId?: NullableStringFieldUpdateOperationsInput | string | null
    vulnerabilities?: VulnerabilityUncheckedUpdateManyWithoutScanNestedInput
    report?: ReportUncheckedUpdateOneWithoutScanNestedInput
  }

  export type ScanCreateManyInput = {
    id?: string
    status?: $Enums.ScanStatus
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    targetId: string
    configurationId?: string | null
  }

  export type ScanUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumScanStatusFieldUpdateOperationsInput | $Enums.ScanStatus
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScanUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumScanStatusFieldUpdateOperationsInput | $Enums.ScanStatus
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    targetId?: StringFieldUpdateOperationsInput | string
    configurationId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type VulnerabilityCreateInput = {
    id?: string
    type: string
    severity?: $Enums.Severity
    description: string
    proof: string
    isResolved?: boolean
    foundAt?: Date | string
    scan: ScanCreateNestedOneWithoutVulnerabilitiesInput
  }

  export type VulnerabilityUncheckedCreateInput = {
    id?: string
    type: string
    severity?: $Enums.Severity
    description: string
    proof: string
    isResolved?: boolean
    foundAt?: Date | string
    scanId: string
  }

  export type VulnerabilityUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    severity?: EnumSeverityFieldUpdateOperationsInput | $Enums.Severity
    description?: StringFieldUpdateOperationsInput | string
    proof?: StringFieldUpdateOperationsInput | string
    isResolved?: BoolFieldUpdateOperationsInput | boolean
    foundAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scan?: ScanUpdateOneRequiredWithoutVulnerabilitiesNestedInput
  }

  export type VulnerabilityUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    severity?: EnumSeverityFieldUpdateOperationsInput | $Enums.Severity
    description?: StringFieldUpdateOperationsInput | string
    proof?: StringFieldUpdateOperationsInput | string
    isResolved?: BoolFieldUpdateOperationsInput | boolean
    foundAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scanId?: StringFieldUpdateOperationsInput | string
  }

  export type VulnerabilityCreateManyInput = {
    id?: string
    type: string
    severity?: $Enums.Severity
    description: string
    proof: string
    isResolved?: boolean
    foundAt?: Date | string
    scanId: string
  }

  export type VulnerabilityUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    severity?: EnumSeverityFieldUpdateOperationsInput | $Enums.Severity
    description?: StringFieldUpdateOperationsInput | string
    proof?: StringFieldUpdateOperationsInput | string
    isResolved?: BoolFieldUpdateOperationsInput | boolean
    foundAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VulnerabilityUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    severity?: EnumSeverityFieldUpdateOperationsInput | $Enums.Severity
    description?: StringFieldUpdateOperationsInput | string
    proof?: StringFieldUpdateOperationsInput | string
    isResolved?: BoolFieldUpdateOperationsInput | boolean
    foundAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scanId?: StringFieldUpdateOperationsInput | string
  }

  export type ScanConfigurationCreateInput = {
    id?: string
    name: string
    isDiscoveryFocused?: boolean
    isAiPowered?: boolean
    scans?: ScanCreateNestedManyWithoutConfigurationInput
  }

  export type ScanConfigurationUncheckedCreateInput = {
    id?: string
    name: string
    isDiscoveryFocused?: boolean
    isAiPowered?: boolean
    scans?: ScanUncheckedCreateNestedManyWithoutConfigurationInput
  }

  export type ScanConfigurationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isDiscoveryFocused?: BoolFieldUpdateOperationsInput | boolean
    isAiPowered?: BoolFieldUpdateOperationsInput | boolean
    scans?: ScanUpdateManyWithoutConfigurationNestedInput
  }

  export type ScanConfigurationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isDiscoveryFocused?: BoolFieldUpdateOperationsInput | boolean
    isAiPowered?: BoolFieldUpdateOperationsInput | boolean
    scans?: ScanUncheckedUpdateManyWithoutConfigurationNestedInput
  }

  export type ScanConfigurationCreateManyInput = {
    id?: string
    name: string
    isDiscoveryFocused?: boolean
    isAiPowered?: boolean
  }

  export type ScanConfigurationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isDiscoveryFocused?: BoolFieldUpdateOperationsInput | boolean
    isAiPowered?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ScanConfigurationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isDiscoveryFocused?: BoolFieldUpdateOperationsInput | boolean
    isAiPowered?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ReportCreateInput = {
    id?: string
    format: string
    storagePath: string
    createdAt?: Date | string
    scan: ScanCreateNestedOneWithoutReportInput
    organization: OrganizationCreateNestedOneWithoutReportsInput
  }

  export type ReportUncheckedCreateInput = {
    id?: string
    format: string
    storagePath: string
    createdAt?: Date | string
    scanId: string
    organizationId: string
  }

  export type ReportUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    storagePath?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scan?: ScanUpdateOneRequiredWithoutReportNestedInput
    organization?: OrganizationUpdateOneRequiredWithoutReportsNestedInput
  }

  export type ReportUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    storagePath?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scanId?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
  }

  export type ReportCreateManyInput = {
    id?: string
    format: string
    storagePath: string
    createdAt?: Date | string
    scanId: string
    organizationId: string
  }

  export type ReportUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    storagePath?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    storagePath?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scanId?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
  }

  export type ApiTokenCreateInput = {
    id?: string
    name: string
    token: string
    permissions?: ApiTokenCreatepermissionsInput | string[]
    lastUsedAt?: Date | string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    organization: OrganizationCreateNestedOneWithoutApiTokensInput
  }

  export type ApiTokenUncheckedCreateInput = {
    id?: string
    name: string
    token: string
    permissions?: ApiTokenCreatepermissionsInput | string[]
    lastUsedAt?: Date | string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    organizationId: string
  }

  export type ApiTokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    permissions?: ApiTokenUpdatepermissionsInput | string[]
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutApiTokensNestedInput
  }

  export type ApiTokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    permissions?: ApiTokenUpdatepermissionsInput | string[]
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizationId?: StringFieldUpdateOperationsInput | string
  }

  export type ApiTokenCreateManyInput = {
    id?: string
    name: string
    token: string
    permissions?: ApiTokenCreatepermissionsInput | string[]
    lastUsedAt?: Date | string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    organizationId: string
  }

  export type ApiTokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    permissions?: ApiTokenUpdatepermissionsInput | string[]
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiTokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    permissions?: ApiTokenUpdatepermissionsInput | string[]
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizationId?: StringFieldUpdateOperationsInput | string
  }

  export type AuditLogCreateInput = {
    id?: string
    action: string
    details: JsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutAuditLogsInput
    organization: OrganizationCreateNestedOneWithoutAuditLogsInput
  }

  export type AuditLogUncheckedCreateInput = {
    id?: string
    action: string
    details: JsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    createdAt?: Date | string
    userId: string
    organizationId: string
  }

  export type AuditLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    details?: JsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAuditLogsNestedInput
    organization?: OrganizationUpdateOneRequiredWithoutAuditLogsNestedInput
  }

  export type AuditLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    details?: JsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
  }

  export type AuditLogCreateManyInput = {
    id?: string
    action: string
    details: JsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    createdAt?: Date | string
    userId: string
    organizationId: string
  }

  export type AuditLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    details?: JsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    details?: JsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type MembershipListRelationFilter = {
    every?: MembershipWhereInput
    some?: MembershipWhereInput
    none?: MembershipWhereInput
  }

  export type InvitationListRelationFilter = {
    every?: InvitationWhereInput
    some?: InvitationWhereInput
    none?: InvitationWhereInput
  }

  export type AuditLogListRelationFilter = {
    every?: AuditLogWhereInput
    some?: AuditLogWhereInput
    none?: AuditLogWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type MembershipOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type InvitationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AuditLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type TargetListRelationFilter = {
    every?: TargetWhereInput
    some?: TargetWhereInput
    none?: TargetWhereInput
  }

  export type ReportListRelationFilter = {
    every?: ReportWhereInput
    some?: ReportWhereInput
    none?: ReportWhereInput
  }

  export type ApiTokenListRelationFilter = {
    every?: ApiTokenWhereInput
    some?: ApiTokenWhereInput
    none?: ApiTokenWhereInput
  }

  export type TargetOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReportOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ApiTokenOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrganizationCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrganizationMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrganizationMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type OrganizationScalarRelationFilter = {
    is?: OrganizationWhereInput
    isNot?: OrganizationWhereInput
  }

  export type MembershipUserIdOrganizationIdCompoundUniqueInput = {
    userId: string
    organizationId: string
  }

  export type MembershipCountOrderByAggregateInput = {
    id?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    organizationId?: SortOrder
  }

  export type MembershipMaxOrderByAggregateInput = {
    id?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    organizationId?: SortOrder
  }

  export type MembershipMinOrderByAggregateInput = {
    id?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    organizationId?: SortOrder
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type EnumInvitationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.InvitationStatus | EnumInvitationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.InvitationStatus[] | ListEnumInvitationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.InvitationStatus[] | ListEnumInvitationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumInvitationStatusFilter<$PrismaModel> | $Enums.InvitationStatus
  }

  export type InvitationEmailOrganizationIdCompoundUniqueInput = {
    email: string
    organizationId: string
  }

  export type InvitationCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    role?: SortOrder
    status?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    organizationId?: SortOrder
    invitedById?: SortOrder
  }

  export type InvitationMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    role?: SortOrder
    status?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    organizationId?: SortOrder
    invitedById?: SortOrder
  }

  export type InvitationMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    role?: SortOrder
    status?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    organizationId?: SortOrder
    invitedById?: SortOrder
  }

  export type EnumInvitationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InvitationStatus | EnumInvitationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.InvitationStatus[] | ListEnumInvitationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.InvitationStatus[] | ListEnumInvitationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumInvitationStatusWithAggregatesFilter<$PrismaModel> | $Enums.InvitationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumInvitationStatusFilter<$PrismaModel>
    _max?: NestedEnumInvitationStatusFilter<$PrismaModel>
  }

  export type ScanListRelationFilter = {
    every?: ScanWhereInput
    some?: ScanWhereInput
    none?: ScanWhereInput
  }

  export type ScanOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TargetUrlOrganizationIdCompoundUniqueInput = {
    url: string
    organizationId: string
  }

  export type TargetCountOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    organizationId?: SortOrder
  }

  export type TargetMaxOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    organizationId?: SortOrder
  }

  export type TargetMinOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    organizationId?: SortOrder
  }

  export type EnumScanStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ScanStatus | EnumScanStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ScanStatus[] | ListEnumScanStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ScanStatus[] | ListEnumScanStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumScanStatusFilter<$PrismaModel> | $Enums.ScanStatus
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type TargetScalarRelationFilter = {
    is?: TargetWhereInput
    isNot?: TargetWhereInput
  }

  export type VulnerabilityListRelationFilter = {
    every?: VulnerabilityWhereInput
    some?: VulnerabilityWhereInput
    none?: VulnerabilityWhereInput
  }

  export type ReportNullableScalarRelationFilter = {
    is?: ReportWhereInput | null
    isNot?: ReportWhereInput | null
  }

  export type ScanConfigurationNullableScalarRelationFilter = {
    is?: ScanConfigurationWhereInput | null
    isNot?: ScanConfigurationWhereInput | null
  }

  export type VulnerabilityOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ScanCountOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
    createdAt?: SortOrder
    targetId?: SortOrder
    configurationId?: SortOrder
  }

  export type ScanMaxOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
    createdAt?: SortOrder
    targetId?: SortOrder
    configurationId?: SortOrder
  }

  export type ScanMinOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
    createdAt?: SortOrder
    targetId?: SortOrder
    configurationId?: SortOrder
  }

  export type EnumScanStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ScanStatus | EnumScanStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ScanStatus[] | ListEnumScanStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ScanStatus[] | ListEnumScanStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumScanStatusWithAggregatesFilter<$PrismaModel> | $Enums.ScanStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumScanStatusFilter<$PrismaModel>
    _max?: NestedEnumScanStatusFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumSeverityFilter<$PrismaModel = never> = {
    equals?: $Enums.Severity | EnumSeverityFieldRefInput<$PrismaModel>
    in?: $Enums.Severity[] | ListEnumSeverityFieldRefInput<$PrismaModel>
    notIn?: $Enums.Severity[] | ListEnumSeverityFieldRefInput<$PrismaModel>
    not?: NestedEnumSeverityFilter<$PrismaModel> | $Enums.Severity
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type ScanScalarRelationFilter = {
    is?: ScanWhereInput
    isNot?: ScanWhereInput
  }

  export type VulnerabilityCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    severity?: SortOrder
    description?: SortOrder
    proof?: SortOrder
    isResolved?: SortOrder
    foundAt?: SortOrder
    scanId?: SortOrder
  }

  export type VulnerabilityMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    severity?: SortOrder
    description?: SortOrder
    proof?: SortOrder
    isResolved?: SortOrder
    foundAt?: SortOrder
    scanId?: SortOrder
  }

  export type VulnerabilityMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    severity?: SortOrder
    description?: SortOrder
    proof?: SortOrder
    isResolved?: SortOrder
    foundAt?: SortOrder
    scanId?: SortOrder
  }

  export type EnumSeverityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Severity | EnumSeverityFieldRefInput<$PrismaModel>
    in?: $Enums.Severity[] | ListEnumSeverityFieldRefInput<$PrismaModel>
    notIn?: $Enums.Severity[] | ListEnumSeverityFieldRefInput<$PrismaModel>
    not?: NestedEnumSeverityWithAggregatesFilter<$PrismaModel> | $Enums.Severity
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSeverityFilter<$PrismaModel>
    _max?: NestedEnumSeverityFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type ScanConfigurationCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    isDiscoveryFocused?: SortOrder
    isAiPowered?: SortOrder
  }

  export type ScanConfigurationMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    isDiscoveryFocused?: SortOrder
    isAiPowered?: SortOrder
  }

  export type ScanConfigurationMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    isDiscoveryFocused?: SortOrder
    isAiPowered?: SortOrder
  }

  export type ReportCountOrderByAggregateInput = {
    id?: SortOrder
    format?: SortOrder
    storagePath?: SortOrder
    createdAt?: SortOrder
    scanId?: SortOrder
    organizationId?: SortOrder
  }

  export type ReportMaxOrderByAggregateInput = {
    id?: SortOrder
    format?: SortOrder
    storagePath?: SortOrder
    createdAt?: SortOrder
    scanId?: SortOrder
    organizationId?: SortOrder
  }

  export type ReportMinOrderByAggregateInput = {
    id?: SortOrder
    format?: SortOrder
    storagePath?: SortOrder
    createdAt?: SortOrder
    scanId?: SortOrder
    organizationId?: SortOrder
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type ApiTokenCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    token?: SortOrder
    permissions?: SortOrder
    lastUsedAt?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    organizationId?: SortOrder
  }

  export type ApiTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    token?: SortOrder
    lastUsedAt?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    organizationId?: SortOrder
  }

  export type ApiTokenMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    token?: SortOrder
    lastUsedAt?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    organizationId?: SortOrder
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    action?: SortOrder
    details?: SortOrder
    ipAddress?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    organizationId?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    action?: SortOrder
    ipAddress?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    organizationId?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    action?: SortOrder
    ipAddress?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    organizationId?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type MembershipCreateNestedManyWithoutUserInput = {
    create?: XOR<MembershipCreateWithoutUserInput, MembershipUncheckedCreateWithoutUserInput> | MembershipCreateWithoutUserInput[] | MembershipUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MembershipCreateOrConnectWithoutUserInput | MembershipCreateOrConnectWithoutUserInput[]
    createMany?: MembershipCreateManyUserInputEnvelope
    connect?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
  }

  export type InvitationCreateNestedManyWithoutInvitedByInput = {
    create?: XOR<InvitationCreateWithoutInvitedByInput, InvitationUncheckedCreateWithoutInvitedByInput> | InvitationCreateWithoutInvitedByInput[] | InvitationUncheckedCreateWithoutInvitedByInput[]
    connectOrCreate?: InvitationCreateOrConnectWithoutInvitedByInput | InvitationCreateOrConnectWithoutInvitedByInput[]
    createMany?: InvitationCreateManyInvitedByInputEnvelope
    connect?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
  }

  export type AuditLogCreateNestedManyWithoutUserInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type MembershipUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<MembershipCreateWithoutUserInput, MembershipUncheckedCreateWithoutUserInput> | MembershipCreateWithoutUserInput[] | MembershipUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MembershipCreateOrConnectWithoutUserInput | MembershipCreateOrConnectWithoutUserInput[]
    createMany?: MembershipCreateManyUserInputEnvelope
    connect?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
  }

  export type InvitationUncheckedCreateNestedManyWithoutInvitedByInput = {
    create?: XOR<InvitationCreateWithoutInvitedByInput, InvitationUncheckedCreateWithoutInvitedByInput> | InvitationCreateWithoutInvitedByInput[] | InvitationUncheckedCreateWithoutInvitedByInput[]
    connectOrCreate?: InvitationCreateOrConnectWithoutInvitedByInput | InvitationCreateOrConnectWithoutInvitedByInput[]
    createMany?: InvitationCreateManyInvitedByInputEnvelope
    connect?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
  }

  export type AuditLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type MembershipUpdateManyWithoutUserNestedInput = {
    create?: XOR<MembershipCreateWithoutUserInput, MembershipUncheckedCreateWithoutUserInput> | MembershipCreateWithoutUserInput[] | MembershipUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MembershipCreateOrConnectWithoutUserInput | MembershipCreateOrConnectWithoutUserInput[]
    upsert?: MembershipUpsertWithWhereUniqueWithoutUserInput | MembershipUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MembershipCreateManyUserInputEnvelope
    set?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
    disconnect?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
    delete?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
    connect?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
    update?: MembershipUpdateWithWhereUniqueWithoutUserInput | MembershipUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MembershipUpdateManyWithWhereWithoutUserInput | MembershipUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MembershipScalarWhereInput | MembershipScalarWhereInput[]
  }

  export type InvitationUpdateManyWithoutInvitedByNestedInput = {
    create?: XOR<InvitationCreateWithoutInvitedByInput, InvitationUncheckedCreateWithoutInvitedByInput> | InvitationCreateWithoutInvitedByInput[] | InvitationUncheckedCreateWithoutInvitedByInput[]
    connectOrCreate?: InvitationCreateOrConnectWithoutInvitedByInput | InvitationCreateOrConnectWithoutInvitedByInput[]
    upsert?: InvitationUpsertWithWhereUniqueWithoutInvitedByInput | InvitationUpsertWithWhereUniqueWithoutInvitedByInput[]
    createMany?: InvitationCreateManyInvitedByInputEnvelope
    set?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    disconnect?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    delete?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    connect?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    update?: InvitationUpdateWithWhereUniqueWithoutInvitedByInput | InvitationUpdateWithWhereUniqueWithoutInvitedByInput[]
    updateMany?: InvitationUpdateManyWithWhereWithoutInvitedByInput | InvitationUpdateManyWithWhereWithoutInvitedByInput[]
    deleteMany?: InvitationScalarWhereInput | InvitationScalarWhereInput[]
  }

  export type AuditLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutUserInput | AuditLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutUserInput | AuditLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutUserInput | AuditLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type MembershipUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<MembershipCreateWithoutUserInput, MembershipUncheckedCreateWithoutUserInput> | MembershipCreateWithoutUserInput[] | MembershipUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MembershipCreateOrConnectWithoutUserInput | MembershipCreateOrConnectWithoutUserInput[]
    upsert?: MembershipUpsertWithWhereUniqueWithoutUserInput | MembershipUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MembershipCreateManyUserInputEnvelope
    set?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
    disconnect?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
    delete?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
    connect?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
    update?: MembershipUpdateWithWhereUniqueWithoutUserInput | MembershipUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MembershipUpdateManyWithWhereWithoutUserInput | MembershipUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MembershipScalarWhereInput | MembershipScalarWhereInput[]
  }

  export type InvitationUncheckedUpdateManyWithoutInvitedByNestedInput = {
    create?: XOR<InvitationCreateWithoutInvitedByInput, InvitationUncheckedCreateWithoutInvitedByInput> | InvitationCreateWithoutInvitedByInput[] | InvitationUncheckedCreateWithoutInvitedByInput[]
    connectOrCreate?: InvitationCreateOrConnectWithoutInvitedByInput | InvitationCreateOrConnectWithoutInvitedByInput[]
    upsert?: InvitationUpsertWithWhereUniqueWithoutInvitedByInput | InvitationUpsertWithWhereUniqueWithoutInvitedByInput[]
    createMany?: InvitationCreateManyInvitedByInputEnvelope
    set?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    disconnect?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    delete?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    connect?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    update?: InvitationUpdateWithWhereUniqueWithoutInvitedByInput | InvitationUpdateWithWhereUniqueWithoutInvitedByInput[]
    updateMany?: InvitationUpdateManyWithWhereWithoutInvitedByInput | InvitationUpdateManyWithWhereWithoutInvitedByInput[]
    deleteMany?: InvitationScalarWhereInput | InvitationScalarWhereInput[]
  }

  export type AuditLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutUserInput | AuditLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutUserInput | AuditLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutUserInput | AuditLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type MembershipCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<MembershipCreateWithoutOrganizationInput, MembershipUncheckedCreateWithoutOrganizationInput> | MembershipCreateWithoutOrganizationInput[] | MembershipUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: MembershipCreateOrConnectWithoutOrganizationInput | MembershipCreateOrConnectWithoutOrganizationInput[]
    createMany?: MembershipCreateManyOrganizationInputEnvelope
    connect?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
  }

  export type InvitationCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<InvitationCreateWithoutOrganizationInput, InvitationUncheckedCreateWithoutOrganizationInput> | InvitationCreateWithoutOrganizationInput[] | InvitationUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: InvitationCreateOrConnectWithoutOrganizationInput | InvitationCreateOrConnectWithoutOrganizationInput[]
    createMany?: InvitationCreateManyOrganizationInputEnvelope
    connect?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
  }

  export type TargetCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<TargetCreateWithoutOrganizationInput, TargetUncheckedCreateWithoutOrganizationInput> | TargetCreateWithoutOrganizationInput[] | TargetUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: TargetCreateOrConnectWithoutOrganizationInput | TargetCreateOrConnectWithoutOrganizationInput[]
    createMany?: TargetCreateManyOrganizationInputEnvelope
    connect?: TargetWhereUniqueInput | TargetWhereUniqueInput[]
  }

  export type ReportCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<ReportCreateWithoutOrganizationInput, ReportUncheckedCreateWithoutOrganizationInput> | ReportCreateWithoutOrganizationInput[] | ReportUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutOrganizationInput | ReportCreateOrConnectWithoutOrganizationInput[]
    createMany?: ReportCreateManyOrganizationInputEnvelope
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
  }

  export type ApiTokenCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<ApiTokenCreateWithoutOrganizationInput, ApiTokenUncheckedCreateWithoutOrganizationInput> | ApiTokenCreateWithoutOrganizationInput[] | ApiTokenUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: ApiTokenCreateOrConnectWithoutOrganizationInput | ApiTokenCreateOrConnectWithoutOrganizationInput[]
    createMany?: ApiTokenCreateManyOrganizationInputEnvelope
    connect?: ApiTokenWhereUniqueInput | ApiTokenWhereUniqueInput[]
  }

  export type AuditLogCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<AuditLogCreateWithoutOrganizationInput, AuditLogUncheckedCreateWithoutOrganizationInput> | AuditLogCreateWithoutOrganizationInput[] | AuditLogUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutOrganizationInput | AuditLogCreateOrConnectWithoutOrganizationInput[]
    createMany?: AuditLogCreateManyOrganizationInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type MembershipUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<MembershipCreateWithoutOrganizationInput, MembershipUncheckedCreateWithoutOrganizationInput> | MembershipCreateWithoutOrganizationInput[] | MembershipUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: MembershipCreateOrConnectWithoutOrganizationInput | MembershipCreateOrConnectWithoutOrganizationInput[]
    createMany?: MembershipCreateManyOrganizationInputEnvelope
    connect?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
  }

  export type InvitationUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<InvitationCreateWithoutOrganizationInput, InvitationUncheckedCreateWithoutOrganizationInput> | InvitationCreateWithoutOrganizationInput[] | InvitationUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: InvitationCreateOrConnectWithoutOrganizationInput | InvitationCreateOrConnectWithoutOrganizationInput[]
    createMany?: InvitationCreateManyOrganizationInputEnvelope
    connect?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
  }

  export type TargetUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<TargetCreateWithoutOrganizationInput, TargetUncheckedCreateWithoutOrganizationInput> | TargetCreateWithoutOrganizationInput[] | TargetUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: TargetCreateOrConnectWithoutOrganizationInput | TargetCreateOrConnectWithoutOrganizationInput[]
    createMany?: TargetCreateManyOrganizationInputEnvelope
    connect?: TargetWhereUniqueInput | TargetWhereUniqueInput[]
  }

  export type ReportUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<ReportCreateWithoutOrganizationInput, ReportUncheckedCreateWithoutOrganizationInput> | ReportCreateWithoutOrganizationInput[] | ReportUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutOrganizationInput | ReportCreateOrConnectWithoutOrganizationInput[]
    createMany?: ReportCreateManyOrganizationInputEnvelope
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
  }

  export type ApiTokenUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<ApiTokenCreateWithoutOrganizationInput, ApiTokenUncheckedCreateWithoutOrganizationInput> | ApiTokenCreateWithoutOrganizationInput[] | ApiTokenUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: ApiTokenCreateOrConnectWithoutOrganizationInput | ApiTokenCreateOrConnectWithoutOrganizationInput[]
    createMany?: ApiTokenCreateManyOrganizationInputEnvelope
    connect?: ApiTokenWhereUniqueInput | ApiTokenWhereUniqueInput[]
  }

  export type AuditLogUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<AuditLogCreateWithoutOrganizationInput, AuditLogUncheckedCreateWithoutOrganizationInput> | AuditLogCreateWithoutOrganizationInput[] | AuditLogUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutOrganizationInput | AuditLogCreateOrConnectWithoutOrganizationInput[]
    createMany?: AuditLogCreateManyOrganizationInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type MembershipUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<MembershipCreateWithoutOrganizationInput, MembershipUncheckedCreateWithoutOrganizationInput> | MembershipCreateWithoutOrganizationInput[] | MembershipUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: MembershipCreateOrConnectWithoutOrganizationInput | MembershipCreateOrConnectWithoutOrganizationInput[]
    upsert?: MembershipUpsertWithWhereUniqueWithoutOrganizationInput | MembershipUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: MembershipCreateManyOrganizationInputEnvelope
    set?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
    disconnect?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
    delete?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
    connect?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
    update?: MembershipUpdateWithWhereUniqueWithoutOrganizationInput | MembershipUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: MembershipUpdateManyWithWhereWithoutOrganizationInput | MembershipUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: MembershipScalarWhereInput | MembershipScalarWhereInput[]
  }

  export type InvitationUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<InvitationCreateWithoutOrganizationInput, InvitationUncheckedCreateWithoutOrganizationInput> | InvitationCreateWithoutOrganizationInput[] | InvitationUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: InvitationCreateOrConnectWithoutOrganizationInput | InvitationCreateOrConnectWithoutOrganizationInput[]
    upsert?: InvitationUpsertWithWhereUniqueWithoutOrganizationInput | InvitationUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: InvitationCreateManyOrganizationInputEnvelope
    set?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    disconnect?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    delete?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    connect?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    update?: InvitationUpdateWithWhereUniqueWithoutOrganizationInput | InvitationUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: InvitationUpdateManyWithWhereWithoutOrganizationInput | InvitationUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: InvitationScalarWhereInput | InvitationScalarWhereInput[]
  }

  export type TargetUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<TargetCreateWithoutOrganizationInput, TargetUncheckedCreateWithoutOrganizationInput> | TargetCreateWithoutOrganizationInput[] | TargetUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: TargetCreateOrConnectWithoutOrganizationInput | TargetCreateOrConnectWithoutOrganizationInput[]
    upsert?: TargetUpsertWithWhereUniqueWithoutOrganizationInput | TargetUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: TargetCreateManyOrganizationInputEnvelope
    set?: TargetWhereUniqueInput | TargetWhereUniqueInput[]
    disconnect?: TargetWhereUniqueInput | TargetWhereUniqueInput[]
    delete?: TargetWhereUniqueInput | TargetWhereUniqueInput[]
    connect?: TargetWhereUniqueInput | TargetWhereUniqueInput[]
    update?: TargetUpdateWithWhereUniqueWithoutOrganizationInput | TargetUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: TargetUpdateManyWithWhereWithoutOrganizationInput | TargetUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: TargetScalarWhereInput | TargetScalarWhereInput[]
  }

  export type ReportUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<ReportCreateWithoutOrganizationInput, ReportUncheckedCreateWithoutOrganizationInput> | ReportCreateWithoutOrganizationInput[] | ReportUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutOrganizationInput | ReportCreateOrConnectWithoutOrganizationInput[]
    upsert?: ReportUpsertWithWhereUniqueWithoutOrganizationInput | ReportUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: ReportCreateManyOrganizationInputEnvelope
    set?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    disconnect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    delete?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    update?: ReportUpdateWithWhereUniqueWithoutOrganizationInput | ReportUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: ReportUpdateManyWithWhereWithoutOrganizationInput | ReportUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: ReportScalarWhereInput | ReportScalarWhereInput[]
  }

  export type ApiTokenUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<ApiTokenCreateWithoutOrganizationInput, ApiTokenUncheckedCreateWithoutOrganizationInput> | ApiTokenCreateWithoutOrganizationInput[] | ApiTokenUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: ApiTokenCreateOrConnectWithoutOrganizationInput | ApiTokenCreateOrConnectWithoutOrganizationInput[]
    upsert?: ApiTokenUpsertWithWhereUniqueWithoutOrganizationInput | ApiTokenUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: ApiTokenCreateManyOrganizationInputEnvelope
    set?: ApiTokenWhereUniqueInput | ApiTokenWhereUniqueInput[]
    disconnect?: ApiTokenWhereUniqueInput | ApiTokenWhereUniqueInput[]
    delete?: ApiTokenWhereUniqueInput | ApiTokenWhereUniqueInput[]
    connect?: ApiTokenWhereUniqueInput | ApiTokenWhereUniqueInput[]
    update?: ApiTokenUpdateWithWhereUniqueWithoutOrganizationInput | ApiTokenUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: ApiTokenUpdateManyWithWhereWithoutOrganizationInput | ApiTokenUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: ApiTokenScalarWhereInput | ApiTokenScalarWhereInput[]
  }

  export type AuditLogUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<AuditLogCreateWithoutOrganizationInput, AuditLogUncheckedCreateWithoutOrganizationInput> | AuditLogCreateWithoutOrganizationInput[] | AuditLogUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutOrganizationInput | AuditLogCreateOrConnectWithoutOrganizationInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutOrganizationInput | AuditLogUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: AuditLogCreateManyOrganizationInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutOrganizationInput | AuditLogUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutOrganizationInput | AuditLogUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type MembershipUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<MembershipCreateWithoutOrganizationInput, MembershipUncheckedCreateWithoutOrganizationInput> | MembershipCreateWithoutOrganizationInput[] | MembershipUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: MembershipCreateOrConnectWithoutOrganizationInput | MembershipCreateOrConnectWithoutOrganizationInput[]
    upsert?: MembershipUpsertWithWhereUniqueWithoutOrganizationInput | MembershipUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: MembershipCreateManyOrganizationInputEnvelope
    set?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
    disconnect?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
    delete?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
    connect?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
    update?: MembershipUpdateWithWhereUniqueWithoutOrganizationInput | MembershipUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: MembershipUpdateManyWithWhereWithoutOrganizationInput | MembershipUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: MembershipScalarWhereInput | MembershipScalarWhereInput[]
  }

  export type InvitationUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<InvitationCreateWithoutOrganizationInput, InvitationUncheckedCreateWithoutOrganizationInput> | InvitationCreateWithoutOrganizationInput[] | InvitationUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: InvitationCreateOrConnectWithoutOrganizationInput | InvitationCreateOrConnectWithoutOrganizationInput[]
    upsert?: InvitationUpsertWithWhereUniqueWithoutOrganizationInput | InvitationUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: InvitationCreateManyOrganizationInputEnvelope
    set?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    disconnect?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    delete?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    connect?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    update?: InvitationUpdateWithWhereUniqueWithoutOrganizationInput | InvitationUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: InvitationUpdateManyWithWhereWithoutOrganizationInput | InvitationUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: InvitationScalarWhereInput | InvitationScalarWhereInput[]
  }

  export type TargetUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<TargetCreateWithoutOrganizationInput, TargetUncheckedCreateWithoutOrganizationInput> | TargetCreateWithoutOrganizationInput[] | TargetUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: TargetCreateOrConnectWithoutOrganizationInput | TargetCreateOrConnectWithoutOrganizationInput[]
    upsert?: TargetUpsertWithWhereUniqueWithoutOrganizationInput | TargetUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: TargetCreateManyOrganizationInputEnvelope
    set?: TargetWhereUniqueInput | TargetWhereUniqueInput[]
    disconnect?: TargetWhereUniqueInput | TargetWhereUniqueInput[]
    delete?: TargetWhereUniqueInput | TargetWhereUniqueInput[]
    connect?: TargetWhereUniqueInput | TargetWhereUniqueInput[]
    update?: TargetUpdateWithWhereUniqueWithoutOrganizationInput | TargetUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: TargetUpdateManyWithWhereWithoutOrganizationInput | TargetUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: TargetScalarWhereInput | TargetScalarWhereInput[]
  }

  export type ReportUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<ReportCreateWithoutOrganizationInput, ReportUncheckedCreateWithoutOrganizationInput> | ReportCreateWithoutOrganizationInput[] | ReportUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutOrganizationInput | ReportCreateOrConnectWithoutOrganizationInput[]
    upsert?: ReportUpsertWithWhereUniqueWithoutOrganizationInput | ReportUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: ReportCreateManyOrganizationInputEnvelope
    set?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    disconnect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    delete?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    update?: ReportUpdateWithWhereUniqueWithoutOrganizationInput | ReportUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: ReportUpdateManyWithWhereWithoutOrganizationInput | ReportUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: ReportScalarWhereInput | ReportScalarWhereInput[]
  }

  export type ApiTokenUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<ApiTokenCreateWithoutOrganizationInput, ApiTokenUncheckedCreateWithoutOrganizationInput> | ApiTokenCreateWithoutOrganizationInput[] | ApiTokenUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: ApiTokenCreateOrConnectWithoutOrganizationInput | ApiTokenCreateOrConnectWithoutOrganizationInput[]
    upsert?: ApiTokenUpsertWithWhereUniqueWithoutOrganizationInput | ApiTokenUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: ApiTokenCreateManyOrganizationInputEnvelope
    set?: ApiTokenWhereUniqueInput | ApiTokenWhereUniqueInput[]
    disconnect?: ApiTokenWhereUniqueInput | ApiTokenWhereUniqueInput[]
    delete?: ApiTokenWhereUniqueInput | ApiTokenWhereUniqueInput[]
    connect?: ApiTokenWhereUniqueInput | ApiTokenWhereUniqueInput[]
    update?: ApiTokenUpdateWithWhereUniqueWithoutOrganizationInput | ApiTokenUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: ApiTokenUpdateManyWithWhereWithoutOrganizationInput | ApiTokenUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: ApiTokenScalarWhereInput | ApiTokenScalarWhereInput[]
  }

  export type AuditLogUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<AuditLogCreateWithoutOrganizationInput, AuditLogUncheckedCreateWithoutOrganizationInput> | AuditLogCreateWithoutOrganizationInput[] | AuditLogUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutOrganizationInput | AuditLogCreateOrConnectWithoutOrganizationInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutOrganizationInput | AuditLogUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: AuditLogCreateManyOrganizationInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutOrganizationInput | AuditLogUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutOrganizationInput | AuditLogUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutMembershipsInput = {
    create?: XOR<UserCreateWithoutMembershipsInput, UserUncheckedCreateWithoutMembershipsInput>
    connectOrCreate?: UserCreateOrConnectWithoutMembershipsInput
    connect?: UserWhereUniqueInput
  }

  export type OrganizationCreateNestedOneWithoutMembersInput = {
    create?: XOR<OrganizationCreateWithoutMembersInput, OrganizationUncheckedCreateWithoutMembersInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutMembersInput
    connect?: OrganizationWhereUniqueInput
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type UserUpdateOneRequiredWithoutMembershipsNestedInput = {
    create?: XOR<UserCreateWithoutMembershipsInput, UserUncheckedCreateWithoutMembershipsInput>
    connectOrCreate?: UserCreateOrConnectWithoutMembershipsInput
    upsert?: UserUpsertWithoutMembershipsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMembershipsInput, UserUpdateWithoutMembershipsInput>, UserUncheckedUpdateWithoutMembershipsInput>
  }

  export type OrganizationUpdateOneRequiredWithoutMembersNestedInput = {
    create?: XOR<OrganizationCreateWithoutMembersInput, OrganizationUncheckedCreateWithoutMembersInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutMembersInput
    upsert?: OrganizationUpsertWithoutMembersInput
    connect?: OrganizationWhereUniqueInput
    update?: XOR<XOR<OrganizationUpdateToOneWithWhereWithoutMembersInput, OrganizationUpdateWithoutMembersInput>, OrganizationUncheckedUpdateWithoutMembersInput>
  }

  export type OrganizationCreateNestedOneWithoutInvitationsInput = {
    create?: XOR<OrganizationCreateWithoutInvitationsInput, OrganizationUncheckedCreateWithoutInvitationsInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutInvitationsInput
    connect?: OrganizationWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutInvitationsInput = {
    create?: XOR<UserCreateWithoutInvitationsInput, UserUncheckedCreateWithoutInvitationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutInvitationsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumInvitationStatusFieldUpdateOperationsInput = {
    set?: $Enums.InvitationStatus
  }

  export type OrganizationUpdateOneRequiredWithoutInvitationsNestedInput = {
    create?: XOR<OrganizationCreateWithoutInvitationsInput, OrganizationUncheckedCreateWithoutInvitationsInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutInvitationsInput
    upsert?: OrganizationUpsertWithoutInvitationsInput
    connect?: OrganizationWhereUniqueInput
    update?: XOR<XOR<OrganizationUpdateToOneWithWhereWithoutInvitationsInput, OrganizationUpdateWithoutInvitationsInput>, OrganizationUncheckedUpdateWithoutInvitationsInput>
  }

  export type UserUpdateOneRequiredWithoutInvitationsNestedInput = {
    create?: XOR<UserCreateWithoutInvitationsInput, UserUncheckedCreateWithoutInvitationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutInvitationsInput
    upsert?: UserUpsertWithoutInvitationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutInvitationsInput, UserUpdateWithoutInvitationsInput>, UserUncheckedUpdateWithoutInvitationsInput>
  }

  export type OrganizationCreateNestedOneWithoutTargetsInput = {
    create?: XOR<OrganizationCreateWithoutTargetsInput, OrganizationUncheckedCreateWithoutTargetsInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutTargetsInput
    connect?: OrganizationWhereUniqueInput
  }

  export type ScanCreateNestedManyWithoutTargetInput = {
    create?: XOR<ScanCreateWithoutTargetInput, ScanUncheckedCreateWithoutTargetInput> | ScanCreateWithoutTargetInput[] | ScanUncheckedCreateWithoutTargetInput[]
    connectOrCreate?: ScanCreateOrConnectWithoutTargetInput | ScanCreateOrConnectWithoutTargetInput[]
    createMany?: ScanCreateManyTargetInputEnvelope
    connect?: ScanWhereUniqueInput | ScanWhereUniqueInput[]
  }

  export type ScanUncheckedCreateNestedManyWithoutTargetInput = {
    create?: XOR<ScanCreateWithoutTargetInput, ScanUncheckedCreateWithoutTargetInput> | ScanCreateWithoutTargetInput[] | ScanUncheckedCreateWithoutTargetInput[]
    connectOrCreate?: ScanCreateOrConnectWithoutTargetInput | ScanCreateOrConnectWithoutTargetInput[]
    createMany?: ScanCreateManyTargetInputEnvelope
    connect?: ScanWhereUniqueInput | ScanWhereUniqueInput[]
  }

  export type OrganizationUpdateOneRequiredWithoutTargetsNestedInput = {
    create?: XOR<OrganizationCreateWithoutTargetsInput, OrganizationUncheckedCreateWithoutTargetsInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutTargetsInput
    upsert?: OrganizationUpsertWithoutTargetsInput
    connect?: OrganizationWhereUniqueInput
    update?: XOR<XOR<OrganizationUpdateToOneWithWhereWithoutTargetsInput, OrganizationUpdateWithoutTargetsInput>, OrganizationUncheckedUpdateWithoutTargetsInput>
  }

  export type ScanUpdateManyWithoutTargetNestedInput = {
    create?: XOR<ScanCreateWithoutTargetInput, ScanUncheckedCreateWithoutTargetInput> | ScanCreateWithoutTargetInput[] | ScanUncheckedCreateWithoutTargetInput[]
    connectOrCreate?: ScanCreateOrConnectWithoutTargetInput | ScanCreateOrConnectWithoutTargetInput[]
    upsert?: ScanUpsertWithWhereUniqueWithoutTargetInput | ScanUpsertWithWhereUniqueWithoutTargetInput[]
    createMany?: ScanCreateManyTargetInputEnvelope
    set?: ScanWhereUniqueInput | ScanWhereUniqueInput[]
    disconnect?: ScanWhereUniqueInput | ScanWhereUniqueInput[]
    delete?: ScanWhereUniqueInput | ScanWhereUniqueInput[]
    connect?: ScanWhereUniqueInput | ScanWhereUniqueInput[]
    update?: ScanUpdateWithWhereUniqueWithoutTargetInput | ScanUpdateWithWhereUniqueWithoutTargetInput[]
    updateMany?: ScanUpdateManyWithWhereWithoutTargetInput | ScanUpdateManyWithWhereWithoutTargetInput[]
    deleteMany?: ScanScalarWhereInput | ScanScalarWhereInput[]
  }

  export type ScanUncheckedUpdateManyWithoutTargetNestedInput = {
    create?: XOR<ScanCreateWithoutTargetInput, ScanUncheckedCreateWithoutTargetInput> | ScanCreateWithoutTargetInput[] | ScanUncheckedCreateWithoutTargetInput[]
    connectOrCreate?: ScanCreateOrConnectWithoutTargetInput | ScanCreateOrConnectWithoutTargetInput[]
    upsert?: ScanUpsertWithWhereUniqueWithoutTargetInput | ScanUpsertWithWhereUniqueWithoutTargetInput[]
    createMany?: ScanCreateManyTargetInputEnvelope
    set?: ScanWhereUniqueInput | ScanWhereUniqueInput[]
    disconnect?: ScanWhereUniqueInput | ScanWhereUniqueInput[]
    delete?: ScanWhereUniqueInput | ScanWhereUniqueInput[]
    connect?: ScanWhereUniqueInput | ScanWhereUniqueInput[]
    update?: ScanUpdateWithWhereUniqueWithoutTargetInput | ScanUpdateWithWhereUniqueWithoutTargetInput[]
    updateMany?: ScanUpdateManyWithWhereWithoutTargetInput | ScanUpdateManyWithWhereWithoutTargetInput[]
    deleteMany?: ScanScalarWhereInput | ScanScalarWhereInput[]
  }

  export type TargetCreateNestedOneWithoutScansInput = {
    create?: XOR<TargetCreateWithoutScansInput, TargetUncheckedCreateWithoutScansInput>
    connectOrCreate?: TargetCreateOrConnectWithoutScansInput
    connect?: TargetWhereUniqueInput
  }

  export type VulnerabilityCreateNestedManyWithoutScanInput = {
    create?: XOR<VulnerabilityCreateWithoutScanInput, VulnerabilityUncheckedCreateWithoutScanInput> | VulnerabilityCreateWithoutScanInput[] | VulnerabilityUncheckedCreateWithoutScanInput[]
    connectOrCreate?: VulnerabilityCreateOrConnectWithoutScanInput | VulnerabilityCreateOrConnectWithoutScanInput[]
    createMany?: VulnerabilityCreateManyScanInputEnvelope
    connect?: VulnerabilityWhereUniqueInput | VulnerabilityWhereUniqueInput[]
  }

  export type ReportCreateNestedOneWithoutScanInput = {
    create?: XOR<ReportCreateWithoutScanInput, ReportUncheckedCreateWithoutScanInput>
    connectOrCreate?: ReportCreateOrConnectWithoutScanInput
    connect?: ReportWhereUniqueInput
  }

  export type ScanConfigurationCreateNestedOneWithoutScansInput = {
    create?: XOR<ScanConfigurationCreateWithoutScansInput, ScanConfigurationUncheckedCreateWithoutScansInput>
    connectOrCreate?: ScanConfigurationCreateOrConnectWithoutScansInput
    connect?: ScanConfigurationWhereUniqueInput
  }

  export type VulnerabilityUncheckedCreateNestedManyWithoutScanInput = {
    create?: XOR<VulnerabilityCreateWithoutScanInput, VulnerabilityUncheckedCreateWithoutScanInput> | VulnerabilityCreateWithoutScanInput[] | VulnerabilityUncheckedCreateWithoutScanInput[]
    connectOrCreate?: VulnerabilityCreateOrConnectWithoutScanInput | VulnerabilityCreateOrConnectWithoutScanInput[]
    createMany?: VulnerabilityCreateManyScanInputEnvelope
    connect?: VulnerabilityWhereUniqueInput | VulnerabilityWhereUniqueInput[]
  }

  export type ReportUncheckedCreateNestedOneWithoutScanInput = {
    create?: XOR<ReportCreateWithoutScanInput, ReportUncheckedCreateWithoutScanInput>
    connectOrCreate?: ReportCreateOrConnectWithoutScanInput
    connect?: ReportWhereUniqueInput
  }

  export type EnumScanStatusFieldUpdateOperationsInput = {
    set?: $Enums.ScanStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type TargetUpdateOneRequiredWithoutScansNestedInput = {
    create?: XOR<TargetCreateWithoutScansInput, TargetUncheckedCreateWithoutScansInput>
    connectOrCreate?: TargetCreateOrConnectWithoutScansInput
    upsert?: TargetUpsertWithoutScansInput
    connect?: TargetWhereUniqueInput
    update?: XOR<XOR<TargetUpdateToOneWithWhereWithoutScansInput, TargetUpdateWithoutScansInput>, TargetUncheckedUpdateWithoutScansInput>
  }

  export type VulnerabilityUpdateManyWithoutScanNestedInput = {
    create?: XOR<VulnerabilityCreateWithoutScanInput, VulnerabilityUncheckedCreateWithoutScanInput> | VulnerabilityCreateWithoutScanInput[] | VulnerabilityUncheckedCreateWithoutScanInput[]
    connectOrCreate?: VulnerabilityCreateOrConnectWithoutScanInput | VulnerabilityCreateOrConnectWithoutScanInput[]
    upsert?: VulnerabilityUpsertWithWhereUniqueWithoutScanInput | VulnerabilityUpsertWithWhereUniqueWithoutScanInput[]
    createMany?: VulnerabilityCreateManyScanInputEnvelope
    set?: VulnerabilityWhereUniqueInput | VulnerabilityWhereUniqueInput[]
    disconnect?: VulnerabilityWhereUniqueInput | VulnerabilityWhereUniqueInput[]
    delete?: VulnerabilityWhereUniqueInput | VulnerabilityWhereUniqueInput[]
    connect?: VulnerabilityWhereUniqueInput | VulnerabilityWhereUniqueInput[]
    update?: VulnerabilityUpdateWithWhereUniqueWithoutScanInput | VulnerabilityUpdateWithWhereUniqueWithoutScanInput[]
    updateMany?: VulnerabilityUpdateManyWithWhereWithoutScanInput | VulnerabilityUpdateManyWithWhereWithoutScanInput[]
    deleteMany?: VulnerabilityScalarWhereInput | VulnerabilityScalarWhereInput[]
  }

  export type ReportUpdateOneWithoutScanNestedInput = {
    create?: XOR<ReportCreateWithoutScanInput, ReportUncheckedCreateWithoutScanInput>
    connectOrCreate?: ReportCreateOrConnectWithoutScanInput
    upsert?: ReportUpsertWithoutScanInput
    disconnect?: ReportWhereInput | boolean
    delete?: ReportWhereInput | boolean
    connect?: ReportWhereUniqueInput
    update?: XOR<XOR<ReportUpdateToOneWithWhereWithoutScanInput, ReportUpdateWithoutScanInput>, ReportUncheckedUpdateWithoutScanInput>
  }

  export type ScanConfigurationUpdateOneWithoutScansNestedInput = {
    create?: XOR<ScanConfigurationCreateWithoutScansInput, ScanConfigurationUncheckedCreateWithoutScansInput>
    connectOrCreate?: ScanConfigurationCreateOrConnectWithoutScansInput
    upsert?: ScanConfigurationUpsertWithoutScansInput
    disconnect?: ScanConfigurationWhereInput | boolean
    delete?: ScanConfigurationWhereInput | boolean
    connect?: ScanConfigurationWhereUniqueInput
    update?: XOR<XOR<ScanConfigurationUpdateToOneWithWhereWithoutScansInput, ScanConfigurationUpdateWithoutScansInput>, ScanConfigurationUncheckedUpdateWithoutScansInput>
  }

  export type VulnerabilityUncheckedUpdateManyWithoutScanNestedInput = {
    create?: XOR<VulnerabilityCreateWithoutScanInput, VulnerabilityUncheckedCreateWithoutScanInput> | VulnerabilityCreateWithoutScanInput[] | VulnerabilityUncheckedCreateWithoutScanInput[]
    connectOrCreate?: VulnerabilityCreateOrConnectWithoutScanInput | VulnerabilityCreateOrConnectWithoutScanInput[]
    upsert?: VulnerabilityUpsertWithWhereUniqueWithoutScanInput | VulnerabilityUpsertWithWhereUniqueWithoutScanInput[]
    createMany?: VulnerabilityCreateManyScanInputEnvelope
    set?: VulnerabilityWhereUniqueInput | VulnerabilityWhereUniqueInput[]
    disconnect?: VulnerabilityWhereUniqueInput | VulnerabilityWhereUniqueInput[]
    delete?: VulnerabilityWhereUniqueInput | VulnerabilityWhereUniqueInput[]
    connect?: VulnerabilityWhereUniqueInput | VulnerabilityWhereUniqueInput[]
    update?: VulnerabilityUpdateWithWhereUniqueWithoutScanInput | VulnerabilityUpdateWithWhereUniqueWithoutScanInput[]
    updateMany?: VulnerabilityUpdateManyWithWhereWithoutScanInput | VulnerabilityUpdateManyWithWhereWithoutScanInput[]
    deleteMany?: VulnerabilityScalarWhereInput | VulnerabilityScalarWhereInput[]
  }

  export type ReportUncheckedUpdateOneWithoutScanNestedInput = {
    create?: XOR<ReportCreateWithoutScanInput, ReportUncheckedCreateWithoutScanInput>
    connectOrCreate?: ReportCreateOrConnectWithoutScanInput
    upsert?: ReportUpsertWithoutScanInput
    disconnect?: ReportWhereInput | boolean
    delete?: ReportWhereInput | boolean
    connect?: ReportWhereUniqueInput
    update?: XOR<XOR<ReportUpdateToOneWithWhereWithoutScanInput, ReportUpdateWithoutScanInput>, ReportUncheckedUpdateWithoutScanInput>
  }

  export type ScanCreateNestedOneWithoutVulnerabilitiesInput = {
    create?: XOR<ScanCreateWithoutVulnerabilitiesInput, ScanUncheckedCreateWithoutVulnerabilitiesInput>
    connectOrCreate?: ScanCreateOrConnectWithoutVulnerabilitiesInput
    connect?: ScanWhereUniqueInput
  }

  export type EnumSeverityFieldUpdateOperationsInput = {
    set?: $Enums.Severity
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type ScanUpdateOneRequiredWithoutVulnerabilitiesNestedInput = {
    create?: XOR<ScanCreateWithoutVulnerabilitiesInput, ScanUncheckedCreateWithoutVulnerabilitiesInput>
    connectOrCreate?: ScanCreateOrConnectWithoutVulnerabilitiesInput
    upsert?: ScanUpsertWithoutVulnerabilitiesInput
    connect?: ScanWhereUniqueInput
    update?: XOR<XOR<ScanUpdateToOneWithWhereWithoutVulnerabilitiesInput, ScanUpdateWithoutVulnerabilitiesInput>, ScanUncheckedUpdateWithoutVulnerabilitiesInput>
  }

  export type ScanCreateNestedManyWithoutConfigurationInput = {
    create?: XOR<ScanCreateWithoutConfigurationInput, ScanUncheckedCreateWithoutConfigurationInput> | ScanCreateWithoutConfigurationInput[] | ScanUncheckedCreateWithoutConfigurationInput[]
    connectOrCreate?: ScanCreateOrConnectWithoutConfigurationInput | ScanCreateOrConnectWithoutConfigurationInput[]
    createMany?: ScanCreateManyConfigurationInputEnvelope
    connect?: ScanWhereUniqueInput | ScanWhereUniqueInput[]
  }

  export type ScanUncheckedCreateNestedManyWithoutConfigurationInput = {
    create?: XOR<ScanCreateWithoutConfigurationInput, ScanUncheckedCreateWithoutConfigurationInput> | ScanCreateWithoutConfigurationInput[] | ScanUncheckedCreateWithoutConfigurationInput[]
    connectOrCreate?: ScanCreateOrConnectWithoutConfigurationInput | ScanCreateOrConnectWithoutConfigurationInput[]
    createMany?: ScanCreateManyConfigurationInputEnvelope
    connect?: ScanWhereUniqueInput | ScanWhereUniqueInput[]
  }

  export type ScanUpdateManyWithoutConfigurationNestedInput = {
    create?: XOR<ScanCreateWithoutConfigurationInput, ScanUncheckedCreateWithoutConfigurationInput> | ScanCreateWithoutConfigurationInput[] | ScanUncheckedCreateWithoutConfigurationInput[]
    connectOrCreate?: ScanCreateOrConnectWithoutConfigurationInput | ScanCreateOrConnectWithoutConfigurationInput[]
    upsert?: ScanUpsertWithWhereUniqueWithoutConfigurationInput | ScanUpsertWithWhereUniqueWithoutConfigurationInput[]
    createMany?: ScanCreateManyConfigurationInputEnvelope
    set?: ScanWhereUniqueInput | ScanWhereUniqueInput[]
    disconnect?: ScanWhereUniqueInput | ScanWhereUniqueInput[]
    delete?: ScanWhereUniqueInput | ScanWhereUniqueInput[]
    connect?: ScanWhereUniqueInput | ScanWhereUniqueInput[]
    update?: ScanUpdateWithWhereUniqueWithoutConfigurationInput | ScanUpdateWithWhereUniqueWithoutConfigurationInput[]
    updateMany?: ScanUpdateManyWithWhereWithoutConfigurationInput | ScanUpdateManyWithWhereWithoutConfigurationInput[]
    deleteMany?: ScanScalarWhereInput | ScanScalarWhereInput[]
  }

  export type ScanUncheckedUpdateManyWithoutConfigurationNestedInput = {
    create?: XOR<ScanCreateWithoutConfigurationInput, ScanUncheckedCreateWithoutConfigurationInput> | ScanCreateWithoutConfigurationInput[] | ScanUncheckedCreateWithoutConfigurationInput[]
    connectOrCreate?: ScanCreateOrConnectWithoutConfigurationInput | ScanCreateOrConnectWithoutConfigurationInput[]
    upsert?: ScanUpsertWithWhereUniqueWithoutConfigurationInput | ScanUpsertWithWhereUniqueWithoutConfigurationInput[]
    createMany?: ScanCreateManyConfigurationInputEnvelope
    set?: ScanWhereUniqueInput | ScanWhereUniqueInput[]
    disconnect?: ScanWhereUniqueInput | ScanWhereUniqueInput[]
    delete?: ScanWhereUniqueInput | ScanWhereUniqueInput[]
    connect?: ScanWhereUniqueInput | ScanWhereUniqueInput[]
    update?: ScanUpdateWithWhereUniqueWithoutConfigurationInput | ScanUpdateWithWhereUniqueWithoutConfigurationInput[]
    updateMany?: ScanUpdateManyWithWhereWithoutConfigurationInput | ScanUpdateManyWithWhereWithoutConfigurationInput[]
    deleteMany?: ScanScalarWhereInput | ScanScalarWhereInput[]
  }

  export type ScanCreateNestedOneWithoutReportInput = {
    create?: XOR<ScanCreateWithoutReportInput, ScanUncheckedCreateWithoutReportInput>
    connectOrCreate?: ScanCreateOrConnectWithoutReportInput
    connect?: ScanWhereUniqueInput
  }

  export type OrganizationCreateNestedOneWithoutReportsInput = {
    create?: XOR<OrganizationCreateWithoutReportsInput, OrganizationUncheckedCreateWithoutReportsInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutReportsInput
    connect?: OrganizationWhereUniqueInput
  }

  export type ScanUpdateOneRequiredWithoutReportNestedInput = {
    create?: XOR<ScanCreateWithoutReportInput, ScanUncheckedCreateWithoutReportInput>
    connectOrCreate?: ScanCreateOrConnectWithoutReportInput
    upsert?: ScanUpsertWithoutReportInput
    connect?: ScanWhereUniqueInput
    update?: XOR<XOR<ScanUpdateToOneWithWhereWithoutReportInput, ScanUpdateWithoutReportInput>, ScanUncheckedUpdateWithoutReportInput>
  }

  export type OrganizationUpdateOneRequiredWithoutReportsNestedInput = {
    create?: XOR<OrganizationCreateWithoutReportsInput, OrganizationUncheckedCreateWithoutReportsInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutReportsInput
    upsert?: OrganizationUpsertWithoutReportsInput
    connect?: OrganizationWhereUniqueInput
    update?: XOR<XOR<OrganizationUpdateToOneWithWhereWithoutReportsInput, OrganizationUpdateWithoutReportsInput>, OrganizationUncheckedUpdateWithoutReportsInput>
  }

  export type ApiTokenCreatepermissionsInput = {
    set: string[]
  }

  export type OrganizationCreateNestedOneWithoutApiTokensInput = {
    create?: XOR<OrganizationCreateWithoutApiTokensInput, OrganizationUncheckedCreateWithoutApiTokensInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutApiTokensInput
    connect?: OrganizationWhereUniqueInput
  }

  export type ApiTokenUpdatepermissionsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type OrganizationUpdateOneRequiredWithoutApiTokensNestedInput = {
    create?: XOR<OrganizationCreateWithoutApiTokensInput, OrganizationUncheckedCreateWithoutApiTokensInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutApiTokensInput
    upsert?: OrganizationUpsertWithoutApiTokensInput
    connect?: OrganizationWhereUniqueInput
    update?: XOR<XOR<OrganizationUpdateToOneWithWhereWithoutApiTokensInput, OrganizationUpdateWithoutApiTokensInput>, OrganizationUncheckedUpdateWithoutApiTokensInput>
  }

  export type UserCreateNestedOneWithoutAuditLogsInput = {
    create?: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuditLogsInput
    connect?: UserWhereUniqueInput
  }

  export type OrganizationCreateNestedOneWithoutAuditLogsInput = {
    create?: XOR<OrganizationCreateWithoutAuditLogsInput, OrganizationUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutAuditLogsInput
    connect?: OrganizationWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutAuditLogsNestedInput = {
    create?: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuditLogsInput
    upsert?: UserUpsertWithoutAuditLogsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAuditLogsInput, UserUpdateWithoutAuditLogsInput>, UserUncheckedUpdateWithoutAuditLogsInput>
  }

  export type OrganizationUpdateOneRequiredWithoutAuditLogsNestedInput = {
    create?: XOR<OrganizationCreateWithoutAuditLogsInput, OrganizationUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutAuditLogsInput
    upsert?: OrganizationUpsertWithoutAuditLogsInput
    connect?: OrganizationWhereUniqueInput
    update?: XOR<XOR<OrganizationUpdateToOneWithWhereWithoutAuditLogsInput, OrganizationUpdateWithoutAuditLogsInput>, OrganizationUncheckedUpdateWithoutAuditLogsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedEnumInvitationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.InvitationStatus | EnumInvitationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.InvitationStatus[] | ListEnumInvitationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.InvitationStatus[] | ListEnumInvitationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumInvitationStatusFilter<$PrismaModel> | $Enums.InvitationStatus
  }

  export type NestedEnumInvitationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InvitationStatus | EnumInvitationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.InvitationStatus[] | ListEnumInvitationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.InvitationStatus[] | ListEnumInvitationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumInvitationStatusWithAggregatesFilter<$PrismaModel> | $Enums.InvitationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumInvitationStatusFilter<$PrismaModel>
    _max?: NestedEnumInvitationStatusFilter<$PrismaModel>
  }

  export type NestedEnumScanStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ScanStatus | EnumScanStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ScanStatus[] | ListEnumScanStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ScanStatus[] | ListEnumScanStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumScanStatusFilter<$PrismaModel> | $Enums.ScanStatus
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumScanStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ScanStatus | EnumScanStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ScanStatus[] | ListEnumScanStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ScanStatus[] | ListEnumScanStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumScanStatusWithAggregatesFilter<$PrismaModel> | $Enums.ScanStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumScanStatusFilter<$PrismaModel>
    _max?: NestedEnumScanStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumSeverityFilter<$PrismaModel = never> = {
    equals?: $Enums.Severity | EnumSeverityFieldRefInput<$PrismaModel>
    in?: $Enums.Severity[] | ListEnumSeverityFieldRefInput<$PrismaModel>
    notIn?: $Enums.Severity[] | ListEnumSeverityFieldRefInput<$PrismaModel>
    not?: NestedEnumSeverityFilter<$PrismaModel> | $Enums.Severity
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumSeverityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Severity | EnumSeverityFieldRefInput<$PrismaModel>
    in?: $Enums.Severity[] | ListEnumSeverityFieldRefInput<$PrismaModel>
    notIn?: $Enums.Severity[] | ListEnumSeverityFieldRefInput<$PrismaModel>
    not?: NestedEnumSeverityWithAggregatesFilter<$PrismaModel> | $Enums.Severity
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSeverityFilter<$PrismaModel>
    _max?: NestedEnumSeverityFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type MembershipCreateWithoutUserInput = {
    id?: string
    role?: $Enums.Role
    createdAt?: Date | string
    organization: OrganizationCreateNestedOneWithoutMembersInput
  }

  export type MembershipUncheckedCreateWithoutUserInput = {
    id?: string
    role?: $Enums.Role
    createdAt?: Date | string
    organizationId: string
  }

  export type MembershipCreateOrConnectWithoutUserInput = {
    where: MembershipWhereUniqueInput
    create: XOR<MembershipCreateWithoutUserInput, MembershipUncheckedCreateWithoutUserInput>
  }

  export type MembershipCreateManyUserInputEnvelope = {
    data: MembershipCreateManyUserInput | MembershipCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type InvitationCreateWithoutInvitedByInput = {
    id?: string
    email: string
    role?: $Enums.Role
    status?: $Enums.InvitationStatus
    expiresAt: Date | string
    createdAt?: Date | string
    organization: OrganizationCreateNestedOneWithoutInvitationsInput
  }

  export type InvitationUncheckedCreateWithoutInvitedByInput = {
    id?: string
    email: string
    role?: $Enums.Role
    status?: $Enums.InvitationStatus
    expiresAt: Date | string
    createdAt?: Date | string
    organizationId: string
  }

  export type InvitationCreateOrConnectWithoutInvitedByInput = {
    where: InvitationWhereUniqueInput
    create: XOR<InvitationCreateWithoutInvitedByInput, InvitationUncheckedCreateWithoutInvitedByInput>
  }

  export type InvitationCreateManyInvitedByInputEnvelope = {
    data: InvitationCreateManyInvitedByInput | InvitationCreateManyInvitedByInput[]
    skipDuplicates?: boolean
  }

  export type AuditLogCreateWithoutUserInput = {
    id?: string
    action: string
    details: JsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    createdAt?: Date | string
    organization: OrganizationCreateNestedOneWithoutAuditLogsInput
  }

  export type AuditLogUncheckedCreateWithoutUserInput = {
    id?: string
    action: string
    details: JsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    createdAt?: Date | string
    organizationId: string
  }

  export type AuditLogCreateOrConnectWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    create: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput>
  }

  export type AuditLogCreateManyUserInputEnvelope = {
    data: AuditLogCreateManyUserInput | AuditLogCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type MembershipUpsertWithWhereUniqueWithoutUserInput = {
    where: MembershipWhereUniqueInput
    update: XOR<MembershipUpdateWithoutUserInput, MembershipUncheckedUpdateWithoutUserInput>
    create: XOR<MembershipCreateWithoutUserInput, MembershipUncheckedCreateWithoutUserInput>
  }

  export type MembershipUpdateWithWhereUniqueWithoutUserInput = {
    where: MembershipWhereUniqueInput
    data: XOR<MembershipUpdateWithoutUserInput, MembershipUncheckedUpdateWithoutUserInput>
  }

  export type MembershipUpdateManyWithWhereWithoutUserInput = {
    where: MembershipScalarWhereInput
    data: XOR<MembershipUpdateManyMutationInput, MembershipUncheckedUpdateManyWithoutUserInput>
  }

  export type MembershipScalarWhereInput = {
    AND?: MembershipScalarWhereInput | MembershipScalarWhereInput[]
    OR?: MembershipScalarWhereInput[]
    NOT?: MembershipScalarWhereInput | MembershipScalarWhereInput[]
    id?: StringFilter<"Membership"> | string
    role?: EnumRoleFilter<"Membership"> | $Enums.Role
    createdAt?: DateTimeFilter<"Membership"> | Date | string
    userId?: StringFilter<"Membership"> | string
    organizationId?: StringFilter<"Membership"> | string
  }

  export type InvitationUpsertWithWhereUniqueWithoutInvitedByInput = {
    where: InvitationWhereUniqueInput
    update: XOR<InvitationUpdateWithoutInvitedByInput, InvitationUncheckedUpdateWithoutInvitedByInput>
    create: XOR<InvitationCreateWithoutInvitedByInput, InvitationUncheckedCreateWithoutInvitedByInput>
  }

  export type InvitationUpdateWithWhereUniqueWithoutInvitedByInput = {
    where: InvitationWhereUniqueInput
    data: XOR<InvitationUpdateWithoutInvitedByInput, InvitationUncheckedUpdateWithoutInvitedByInput>
  }

  export type InvitationUpdateManyWithWhereWithoutInvitedByInput = {
    where: InvitationScalarWhereInput
    data: XOR<InvitationUpdateManyMutationInput, InvitationUncheckedUpdateManyWithoutInvitedByInput>
  }

  export type InvitationScalarWhereInput = {
    AND?: InvitationScalarWhereInput | InvitationScalarWhereInput[]
    OR?: InvitationScalarWhereInput[]
    NOT?: InvitationScalarWhereInput | InvitationScalarWhereInput[]
    id?: StringFilter<"Invitation"> | string
    email?: StringFilter<"Invitation"> | string
    role?: EnumRoleFilter<"Invitation"> | $Enums.Role
    status?: EnumInvitationStatusFilter<"Invitation"> | $Enums.InvitationStatus
    expiresAt?: DateTimeFilter<"Invitation"> | Date | string
    createdAt?: DateTimeFilter<"Invitation"> | Date | string
    organizationId?: StringFilter<"Invitation"> | string
    invitedById?: StringFilter<"Invitation"> | string
  }

  export type AuditLogUpsertWithWhereUniqueWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    update: XOR<AuditLogUpdateWithoutUserInput, AuditLogUncheckedUpdateWithoutUserInput>
    create: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput>
  }

  export type AuditLogUpdateWithWhereUniqueWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    data: XOR<AuditLogUpdateWithoutUserInput, AuditLogUncheckedUpdateWithoutUserInput>
  }

  export type AuditLogUpdateManyWithWhereWithoutUserInput = {
    where: AuditLogScalarWhereInput
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyWithoutUserInput>
  }

  export type AuditLogScalarWhereInput = {
    AND?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    OR?: AuditLogScalarWhereInput[]
    NOT?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    details?: JsonFilter<"AuditLog">
    ipAddress?: StringNullableFilter<"AuditLog"> | string | null
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
    userId?: StringFilter<"AuditLog"> | string
    organizationId?: StringFilter<"AuditLog"> | string
  }

  export type MembershipCreateWithoutOrganizationInput = {
    id?: string
    role?: $Enums.Role
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutMembershipsInput
  }

  export type MembershipUncheckedCreateWithoutOrganizationInput = {
    id?: string
    role?: $Enums.Role
    createdAt?: Date | string
    userId: string
  }

  export type MembershipCreateOrConnectWithoutOrganizationInput = {
    where: MembershipWhereUniqueInput
    create: XOR<MembershipCreateWithoutOrganizationInput, MembershipUncheckedCreateWithoutOrganizationInput>
  }

  export type MembershipCreateManyOrganizationInputEnvelope = {
    data: MembershipCreateManyOrganizationInput | MembershipCreateManyOrganizationInput[]
    skipDuplicates?: boolean
  }

  export type InvitationCreateWithoutOrganizationInput = {
    id?: string
    email: string
    role?: $Enums.Role
    status?: $Enums.InvitationStatus
    expiresAt: Date | string
    createdAt?: Date | string
    invitedBy: UserCreateNestedOneWithoutInvitationsInput
  }

  export type InvitationUncheckedCreateWithoutOrganizationInput = {
    id?: string
    email: string
    role?: $Enums.Role
    status?: $Enums.InvitationStatus
    expiresAt: Date | string
    createdAt?: Date | string
    invitedById: string
  }

  export type InvitationCreateOrConnectWithoutOrganizationInput = {
    where: InvitationWhereUniqueInput
    create: XOR<InvitationCreateWithoutOrganizationInput, InvitationUncheckedCreateWithoutOrganizationInput>
  }

  export type InvitationCreateManyOrganizationInputEnvelope = {
    data: InvitationCreateManyOrganizationInput | InvitationCreateManyOrganizationInput[]
    skipDuplicates?: boolean
  }

  export type TargetCreateWithoutOrganizationInput = {
    id?: string
    url: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    scans?: ScanCreateNestedManyWithoutTargetInput
  }

  export type TargetUncheckedCreateWithoutOrganizationInput = {
    id?: string
    url: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    scans?: ScanUncheckedCreateNestedManyWithoutTargetInput
  }

  export type TargetCreateOrConnectWithoutOrganizationInput = {
    where: TargetWhereUniqueInput
    create: XOR<TargetCreateWithoutOrganizationInput, TargetUncheckedCreateWithoutOrganizationInput>
  }

  export type TargetCreateManyOrganizationInputEnvelope = {
    data: TargetCreateManyOrganizationInput | TargetCreateManyOrganizationInput[]
    skipDuplicates?: boolean
  }

  export type ReportCreateWithoutOrganizationInput = {
    id?: string
    format: string
    storagePath: string
    createdAt?: Date | string
    scan: ScanCreateNestedOneWithoutReportInput
  }

  export type ReportUncheckedCreateWithoutOrganizationInput = {
    id?: string
    format: string
    storagePath: string
    createdAt?: Date | string
    scanId: string
  }

  export type ReportCreateOrConnectWithoutOrganizationInput = {
    where: ReportWhereUniqueInput
    create: XOR<ReportCreateWithoutOrganizationInput, ReportUncheckedCreateWithoutOrganizationInput>
  }

  export type ReportCreateManyOrganizationInputEnvelope = {
    data: ReportCreateManyOrganizationInput | ReportCreateManyOrganizationInput[]
    skipDuplicates?: boolean
  }

  export type ApiTokenCreateWithoutOrganizationInput = {
    id?: string
    name: string
    token: string
    permissions?: ApiTokenCreatepermissionsInput | string[]
    lastUsedAt?: Date | string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
  }

  export type ApiTokenUncheckedCreateWithoutOrganizationInput = {
    id?: string
    name: string
    token: string
    permissions?: ApiTokenCreatepermissionsInput | string[]
    lastUsedAt?: Date | string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
  }

  export type ApiTokenCreateOrConnectWithoutOrganizationInput = {
    where: ApiTokenWhereUniqueInput
    create: XOR<ApiTokenCreateWithoutOrganizationInput, ApiTokenUncheckedCreateWithoutOrganizationInput>
  }

  export type ApiTokenCreateManyOrganizationInputEnvelope = {
    data: ApiTokenCreateManyOrganizationInput | ApiTokenCreateManyOrganizationInput[]
    skipDuplicates?: boolean
  }

  export type AuditLogCreateWithoutOrganizationInput = {
    id?: string
    action: string
    details: JsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutAuditLogsInput
  }

  export type AuditLogUncheckedCreateWithoutOrganizationInput = {
    id?: string
    action: string
    details: JsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    createdAt?: Date | string
    userId: string
  }

  export type AuditLogCreateOrConnectWithoutOrganizationInput = {
    where: AuditLogWhereUniqueInput
    create: XOR<AuditLogCreateWithoutOrganizationInput, AuditLogUncheckedCreateWithoutOrganizationInput>
  }

  export type AuditLogCreateManyOrganizationInputEnvelope = {
    data: AuditLogCreateManyOrganizationInput | AuditLogCreateManyOrganizationInput[]
    skipDuplicates?: boolean
  }

  export type MembershipUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: MembershipWhereUniqueInput
    update: XOR<MembershipUpdateWithoutOrganizationInput, MembershipUncheckedUpdateWithoutOrganizationInput>
    create: XOR<MembershipCreateWithoutOrganizationInput, MembershipUncheckedCreateWithoutOrganizationInput>
  }

  export type MembershipUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: MembershipWhereUniqueInput
    data: XOR<MembershipUpdateWithoutOrganizationInput, MembershipUncheckedUpdateWithoutOrganizationInput>
  }

  export type MembershipUpdateManyWithWhereWithoutOrganizationInput = {
    where: MembershipScalarWhereInput
    data: XOR<MembershipUpdateManyMutationInput, MembershipUncheckedUpdateManyWithoutOrganizationInput>
  }

  export type InvitationUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: InvitationWhereUniqueInput
    update: XOR<InvitationUpdateWithoutOrganizationInput, InvitationUncheckedUpdateWithoutOrganizationInput>
    create: XOR<InvitationCreateWithoutOrganizationInput, InvitationUncheckedCreateWithoutOrganizationInput>
  }

  export type InvitationUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: InvitationWhereUniqueInput
    data: XOR<InvitationUpdateWithoutOrganizationInput, InvitationUncheckedUpdateWithoutOrganizationInput>
  }

  export type InvitationUpdateManyWithWhereWithoutOrganizationInput = {
    where: InvitationScalarWhereInput
    data: XOR<InvitationUpdateManyMutationInput, InvitationUncheckedUpdateManyWithoutOrganizationInput>
  }

  export type TargetUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: TargetWhereUniqueInput
    update: XOR<TargetUpdateWithoutOrganizationInput, TargetUncheckedUpdateWithoutOrganizationInput>
    create: XOR<TargetCreateWithoutOrganizationInput, TargetUncheckedCreateWithoutOrganizationInput>
  }

  export type TargetUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: TargetWhereUniqueInput
    data: XOR<TargetUpdateWithoutOrganizationInput, TargetUncheckedUpdateWithoutOrganizationInput>
  }

  export type TargetUpdateManyWithWhereWithoutOrganizationInput = {
    where: TargetScalarWhereInput
    data: XOR<TargetUpdateManyMutationInput, TargetUncheckedUpdateManyWithoutOrganizationInput>
  }

  export type TargetScalarWhereInput = {
    AND?: TargetScalarWhereInput | TargetScalarWhereInput[]
    OR?: TargetScalarWhereInput[]
    NOT?: TargetScalarWhereInput | TargetScalarWhereInput[]
    id?: StringFilter<"Target"> | string
    url?: StringFilter<"Target"> | string
    name?: StringFilter<"Target"> | string
    createdAt?: DateTimeFilter<"Target"> | Date | string
    updatedAt?: DateTimeFilter<"Target"> | Date | string
    organizationId?: StringFilter<"Target"> | string
  }

  export type ReportUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: ReportWhereUniqueInput
    update: XOR<ReportUpdateWithoutOrganizationInput, ReportUncheckedUpdateWithoutOrganizationInput>
    create: XOR<ReportCreateWithoutOrganizationInput, ReportUncheckedCreateWithoutOrganizationInput>
  }

  export type ReportUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: ReportWhereUniqueInput
    data: XOR<ReportUpdateWithoutOrganizationInput, ReportUncheckedUpdateWithoutOrganizationInput>
  }

  export type ReportUpdateManyWithWhereWithoutOrganizationInput = {
    where: ReportScalarWhereInput
    data: XOR<ReportUpdateManyMutationInput, ReportUncheckedUpdateManyWithoutOrganizationInput>
  }

  export type ReportScalarWhereInput = {
    AND?: ReportScalarWhereInput | ReportScalarWhereInput[]
    OR?: ReportScalarWhereInput[]
    NOT?: ReportScalarWhereInput | ReportScalarWhereInput[]
    id?: StringFilter<"Report"> | string
    format?: StringFilter<"Report"> | string
    storagePath?: StringFilter<"Report"> | string
    createdAt?: DateTimeFilter<"Report"> | Date | string
    scanId?: StringFilter<"Report"> | string
    organizationId?: StringFilter<"Report"> | string
  }

  export type ApiTokenUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: ApiTokenWhereUniqueInput
    update: XOR<ApiTokenUpdateWithoutOrganizationInput, ApiTokenUncheckedUpdateWithoutOrganizationInput>
    create: XOR<ApiTokenCreateWithoutOrganizationInput, ApiTokenUncheckedCreateWithoutOrganizationInput>
  }

  export type ApiTokenUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: ApiTokenWhereUniqueInput
    data: XOR<ApiTokenUpdateWithoutOrganizationInput, ApiTokenUncheckedUpdateWithoutOrganizationInput>
  }

  export type ApiTokenUpdateManyWithWhereWithoutOrganizationInput = {
    where: ApiTokenScalarWhereInput
    data: XOR<ApiTokenUpdateManyMutationInput, ApiTokenUncheckedUpdateManyWithoutOrganizationInput>
  }

  export type ApiTokenScalarWhereInput = {
    AND?: ApiTokenScalarWhereInput | ApiTokenScalarWhereInput[]
    OR?: ApiTokenScalarWhereInput[]
    NOT?: ApiTokenScalarWhereInput | ApiTokenScalarWhereInput[]
    id?: StringFilter<"ApiToken"> | string
    name?: StringFilter<"ApiToken"> | string
    token?: StringFilter<"ApiToken"> | string
    permissions?: StringNullableListFilter<"ApiToken">
    lastUsedAt?: DateTimeNullableFilter<"ApiToken"> | Date | string | null
    expiresAt?: DateTimeNullableFilter<"ApiToken"> | Date | string | null
    createdAt?: DateTimeFilter<"ApiToken"> | Date | string
    organizationId?: StringFilter<"ApiToken"> | string
  }

  export type AuditLogUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: AuditLogWhereUniqueInput
    update: XOR<AuditLogUpdateWithoutOrganizationInput, AuditLogUncheckedUpdateWithoutOrganizationInput>
    create: XOR<AuditLogCreateWithoutOrganizationInput, AuditLogUncheckedCreateWithoutOrganizationInput>
  }

  export type AuditLogUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: AuditLogWhereUniqueInput
    data: XOR<AuditLogUpdateWithoutOrganizationInput, AuditLogUncheckedUpdateWithoutOrganizationInput>
  }

  export type AuditLogUpdateManyWithWhereWithoutOrganizationInput = {
    where: AuditLogScalarWhereInput
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyWithoutOrganizationInput>
  }

  export type UserCreateWithoutMembershipsInput = {
    id?: string
    email: string
    name?: string | null
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    invitations?: InvitationCreateNestedManyWithoutInvitedByInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutMembershipsInput = {
    id?: string
    email: string
    name?: string | null
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    invitations?: InvitationUncheckedCreateNestedManyWithoutInvitedByInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutMembershipsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMembershipsInput, UserUncheckedCreateWithoutMembershipsInput>
  }

  export type OrganizationCreateWithoutMembersInput = {
    id?: string
    name: string
    slug: string
    createdAt?: Date | string
    updatedAt?: Date | string
    invitations?: InvitationCreateNestedManyWithoutOrganizationInput
    targets?: TargetCreateNestedManyWithoutOrganizationInput
    reports?: ReportCreateNestedManyWithoutOrganizationInput
    apiTokens?: ApiTokenCreateNestedManyWithoutOrganizationInput
    auditLogs?: AuditLogCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateWithoutMembersInput = {
    id?: string
    name: string
    slug: string
    createdAt?: Date | string
    updatedAt?: Date | string
    invitations?: InvitationUncheckedCreateNestedManyWithoutOrganizationInput
    targets?: TargetUncheckedCreateNestedManyWithoutOrganizationInput
    reports?: ReportUncheckedCreateNestedManyWithoutOrganizationInput
    apiTokens?: ApiTokenUncheckedCreateNestedManyWithoutOrganizationInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationCreateOrConnectWithoutMembersInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<OrganizationCreateWithoutMembersInput, OrganizationUncheckedCreateWithoutMembersInput>
  }

  export type UserUpsertWithoutMembershipsInput = {
    update: XOR<UserUpdateWithoutMembershipsInput, UserUncheckedUpdateWithoutMembershipsInput>
    create: XOR<UserCreateWithoutMembershipsInput, UserUncheckedCreateWithoutMembershipsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMembershipsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMembershipsInput, UserUncheckedUpdateWithoutMembershipsInput>
  }

  export type UserUpdateWithoutMembershipsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invitations?: InvitationUpdateManyWithoutInvitedByNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutMembershipsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invitations?: InvitationUncheckedUpdateManyWithoutInvitedByNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type OrganizationUpsertWithoutMembersInput = {
    update: XOR<OrganizationUpdateWithoutMembersInput, OrganizationUncheckedUpdateWithoutMembersInput>
    create: XOR<OrganizationCreateWithoutMembersInput, OrganizationUncheckedCreateWithoutMembersInput>
    where?: OrganizationWhereInput
  }

  export type OrganizationUpdateToOneWithWhereWithoutMembersInput = {
    where?: OrganizationWhereInput
    data: XOR<OrganizationUpdateWithoutMembersInput, OrganizationUncheckedUpdateWithoutMembersInput>
  }

  export type OrganizationUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invitations?: InvitationUpdateManyWithoutOrganizationNestedInput
    targets?: TargetUpdateManyWithoutOrganizationNestedInput
    reports?: ReportUpdateManyWithoutOrganizationNestedInput
    apiTokens?: ApiTokenUpdateManyWithoutOrganizationNestedInput
    auditLogs?: AuditLogUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invitations?: InvitationUncheckedUpdateManyWithoutOrganizationNestedInput
    targets?: TargetUncheckedUpdateManyWithoutOrganizationNestedInput
    reports?: ReportUncheckedUpdateManyWithoutOrganizationNestedInput
    apiTokens?: ApiTokenUncheckedUpdateManyWithoutOrganizationNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationCreateWithoutInvitationsInput = {
    id?: string
    name: string
    slug: string
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: MembershipCreateNestedManyWithoutOrganizationInput
    targets?: TargetCreateNestedManyWithoutOrganizationInput
    reports?: ReportCreateNestedManyWithoutOrganizationInput
    apiTokens?: ApiTokenCreateNestedManyWithoutOrganizationInput
    auditLogs?: AuditLogCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateWithoutInvitationsInput = {
    id?: string
    name: string
    slug: string
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: MembershipUncheckedCreateNestedManyWithoutOrganizationInput
    targets?: TargetUncheckedCreateNestedManyWithoutOrganizationInput
    reports?: ReportUncheckedCreateNestedManyWithoutOrganizationInput
    apiTokens?: ApiTokenUncheckedCreateNestedManyWithoutOrganizationInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationCreateOrConnectWithoutInvitationsInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<OrganizationCreateWithoutInvitationsInput, OrganizationUncheckedCreateWithoutInvitationsInput>
  }

  export type UserCreateWithoutInvitationsInput = {
    id?: string
    email: string
    name?: string | null
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    memberships?: MembershipCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutInvitationsInput = {
    id?: string
    email: string
    name?: string | null
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    memberships?: MembershipUncheckedCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutInvitationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutInvitationsInput, UserUncheckedCreateWithoutInvitationsInput>
  }

  export type OrganizationUpsertWithoutInvitationsInput = {
    update: XOR<OrganizationUpdateWithoutInvitationsInput, OrganizationUncheckedUpdateWithoutInvitationsInput>
    create: XOR<OrganizationCreateWithoutInvitationsInput, OrganizationUncheckedCreateWithoutInvitationsInput>
    where?: OrganizationWhereInput
  }

  export type OrganizationUpdateToOneWithWhereWithoutInvitationsInput = {
    where?: OrganizationWhereInput
    data: XOR<OrganizationUpdateWithoutInvitationsInput, OrganizationUncheckedUpdateWithoutInvitationsInput>
  }

  export type OrganizationUpdateWithoutInvitationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: MembershipUpdateManyWithoutOrganizationNestedInput
    targets?: TargetUpdateManyWithoutOrganizationNestedInput
    reports?: ReportUpdateManyWithoutOrganizationNestedInput
    apiTokens?: ApiTokenUpdateManyWithoutOrganizationNestedInput
    auditLogs?: AuditLogUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateWithoutInvitationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: MembershipUncheckedUpdateManyWithoutOrganizationNestedInput
    targets?: TargetUncheckedUpdateManyWithoutOrganizationNestedInput
    reports?: ReportUncheckedUpdateManyWithoutOrganizationNestedInput
    apiTokens?: ApiTokenUncheckedUpdateManyWithoutOrganizationNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type UserUpsertWithoutInvitationsInput = {
    update: XOR<UserUpdateWithoutInvitationsInput, UserUncheckedUpdateWithoutInvitationsInput>
    create: XOR<UserCreateWithoutInvitationsInput, UserUncheckedCreateWithoutInvitationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutInvitationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutInvitationsInput, UserUncheckedUpdateWithoutInvitationsInput>
  }

  export type UserUpdateWithoutInvitationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: MembershipUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutInvitationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: MembershipUncheckedUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type OrganizationCreateWithoutTargetsInput = {
    id?: string
    name: string
    slug: string
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: MembershipCreateNestedManyWithoutOrganizationInput
    invitations?: InvitationCreateNestedManyWithoutOrganizationInput
    reports?: ReportCreateNestedManyWithoutOrganizationInput
    apiTokens?: ApiTokenCreateNestedManyWithoutOrganizationInput
    auditLogs?: AuditLogCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateWithoutTargetsInput = {
    id?: string
    name: string
    slug: string
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: MembershipUncheckedCreateNestedManyWithoutOrganizationInput
    invitations?: InvitationUncheckedCreateNestedManyWithoutOrganizationInput
    reports?: ReportUncheckedCreateNestedManyWithoutOrganizationInput
    apiTokens?: ApiTokenUncheckedCreateNestedManyWithoutOrganizationInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationCreateOrConnectWithoutTargetsInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<OrganizationCreateWithoutTargetsInput, OrganizationUncheckedCreateWithoutTargetsInput>
  }

  export type ScanCreateWithoutTargetInput = {
    id?: string
    status?: $Enums.ScanStatus
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    vulnerabilities?: VulnerabilityCreateNestedManyWithoutScanInput
    report?: ReportCreateNestedOneWithoutScanInput
    configuration?: ScanConfigurationCreateNestedOneWithoutScansInput
  }

  export type ScanUncheckedCreateWithoutTargetInput = {
    id?: string
    status?: $Enums.ScanStatus
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    configurationId?: string | null
    vulnerabilities?: VulnerabilityUncheckedCreateNestedManyWithoutScanInput
    report?: ReportUncheckedCreateNestedOneWithoutScanInput
  }

  export type ScanCreateOrConnectWithoutTargetInput = {
    where: ScanWhereUniqueInput
    create: XOR<ScanCreateWithoutTargetInput, ScanUncheckedCreateWithoutTargetInput>
  }

  export type ScanCreateManyTargetInputEnvelope = {
    data: ScanCreateManyTargetInput | ScanCreateManyTargetInput[]
    skipDuplicates?: boolean
  }

  export type OrganizationUpsertWithoutTargetsInput = {
    update: XOR<OrganizationUpdateWithoutTargetsInput, OrganizationUncheckedUpdateWithoutTargetsInput>
    create: XOR<OrganizationCreateWithoutTargetsInput, OrganizationUncheckedCreateWithoutTargetsInput>
    where?: OrganizationWhereInput
  }

  export type OrganizationUpdateToOneWithWhereWithoutTargetsInput = {
    where?: OrganizationWhereInput
    data: XOR<OrganizationUpdateWithoutTargetsInput, OrganizationUncheckedUpdateWithoutTargetsInput>
  }

  export type OrganizationUpdateWithoutTargetsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: MembershipUpdateManyWithoutOrganizationNestedInput
    invitations?: InvitationUpdateManyWithoutOrganizationNestedInput
    reports?: ReportUpdateManyWithoutOrganizationNestedInput
    apiTokens?: ApiTokenUpdateManyWithoutOrganizationNestedInput
    auditLogs?: AuditLogUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateWithoutTargetsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: MembershipUncheckedUpdateManyWithoutOrganizationNestedInput
    invitations?: InvitationUncheckedUpdateManyWithoutOrganizationNestedInput
    reports?: ReportUncheckedUpdateManyWithoutOrganizationNestedInput
    apiTokens?: ApiTokenUncheckedUpdateManyWithoutOrganizationNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type ScanUpsertWithWhereUniqueWithoutTargetInput = {
    where: ScanWhereUniqueInput
    update: XOR<ScanUpdateWithoutTargetInput, ScanUncheckedUpdateWithoutTargetInput>
    create: XOR<ScanCreateWithoutTargetInput, ScanUncheckedCreateWithoutTargetInput>
  }

  export type ScanUpdateWithWhereUniqueWithoutTargetInput = {
    where: ScanWhereUniqueInput
    data: XOR<ScanUpdateWithoutTargetInput, ScanUncheckedUpdateWithoutTargetInput>
  }

  export type ScanUpdateManyWithWhereWithoutTargetInput = {
    where: ScanScalarWhereInput
    data: XOR<ScanUpdateManyMutationInput, ScanUncheckedUpdateManyWithoutTargetInput>
  }

  export type ScanScalarWhereInput = {
    AND?: ScanScalarWhereInput | ScanScalarWhereInput[]
    OR?: ScanScalarWhereInput[]
    NOT?: ScanScalarWhereInput | ScanScalarWhereInput[]
    id?: StringFilter<"Scan"> | string
    status?: EnumScanStatusFilter<"Scan"> | $Enums.ScanStatus
    startedAt?: DateTimeNullableFilter<"Scan"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"Scan"> | Date | string | null
    createdAt?: DateTimeFilter<"Scan"> | Date | string
    targetId?: StringFilter<"Scan"> | string
    configurationId?: StringNullableFilter<"Scan"> | string | null
  }

  export type TargetCreateWithoutScansInput = {
    id?: string
    url: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    organization: OrganizationCreateNestedOneWithoutTargetsInput
  }

  export type TargetUncheckedCreateWithoutScansInput = {
    id?: string
    url: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    organizationId: string
  }

  export type TargetCreateOrConnectWithoutScansInput = {
    where: TargetWhereUniqueInput
    create: XOR<TargetCreateWithoutScansInput, TargetUncheckedCreateWithoutScansInput>
  }

  export type VulnerabilityCreateWithoutScanInput = {
    id?: string
    type: string
    severity?: $Enums.Severity
    description: string
    proof: string
    isResolved?: boolean
    foundAt?: Date | string
  }

  export type VulnerabilityUncheckedCreateWithoutScanInput = {
    id?: string
    type: string
    severity?: $Enums.Severity
    description: string
    proof: string
    isResolved?: boolean
    foundAt?: Date | string
  }

  export type VulnerabilityCreateOrConnectWithoutScanInput = {
    where: VulnerabilityWhereUniqueInput
    create: XOR<VulnerabilityCreateWithoutScanInput, VulnerabilityUncheckedCreateWithoutScanInput>
  }

  export type VulnerabilityCreateManyScanInputEnvelope = {
    data: VulnerabilityCreateManyScanInput | VulnerabilityCreateManyScanInput[]
    skipDuplicates?: boolean
  }

  export type ReportCreateWithoutScanInput = {
    id?: string
    format: string
    storagePath: string
    createdAt?: Date | string
    organization: OrganizationCreateNestedOneWithoutReportsInput
  }

  export type ReportUncheckedCreateWithoutScanInput = {
    id?: string
    format: string
    storagePath: string
    createdAt?: Date | string
    organizationId: string
  }

  export type ReportCreateOrConnectWithoutScanInput = {
    where: ReportWhereUniqueInput
    create: XOR<ReportCreateWithoutScanInput, ReportUncheckedCreateWithoutScanInput>
  }

  export type ScanConfigurationCreateWithoutScansInput = {
    id?: string
    name: string
    isDiscoveryFocused?: boolean
    isAiPowered?: boolean
  }

  export type ScanConfigurationUncheckedCreateWithoutScansInput = {
    id?: string
    name: string
    isDiscoveryFocused?: boolean
    isAiPowered?: boolean
  }

  export type ScanConfigurationCreateOrConnectWithoutScansInput = {
    where: ScanConfigurationWhereUniqueInput
    create: XOR<ScanConfigurationCreateWithoutScansInput, ScanConfigurationUncheckedCreateWithoutScansInput>
  }

  export type TargetUpsertWithoutScansInput = {
    update: XOR<TargetUpdateWithoutScansInput, TargetUncheckedUpdateWithoutScansInput>
    create: XOR<TargetCreateWithoutScansInput, TargetUncheckedCreateWithoutScansInput>
    where?: TargetWhereInput
  }

  export type TargetUpdateToOneWithWhereWithoutScansInput = {
    where?: TargetWhereInput
    data: XOR<TargetUpdateWithoutScansInput, TargetUncheckedUpdateWithoutScansInput>
  }

  export type TargetUpdateWithoutScansInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutTargetsNestedInput
  }

  export type TargetUncheckedUpdateWithoutScansInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizationId?: StringFieldUpdateOperationsInput | string
  }

  export type VulnerabilityUpsertWithWhereUniqueWithoutScanInput = {
    where: VulnerabilityWhereUniqueInput
    update: XOR<VulnerabilityUpdateWithoutScanInput, VulnerabilityUncheckedUpdateWithoutScanInput>
    create: XOR<VulnerabilityCreateWithoutScanInput, VulnerabilityUncheckedCreateWithoutScanInput>
  }

  export type VulnerabilityUpdateWithWhereUniqueWithoutScanInput = {
    where: VulnerabilityWhereUniqueInput
    data: XOR<VulnerabilityUpdateWithoutScanInput, VulnerabilityUncheckedUpdateWithoutScanInput>
  }

  export type VulnerabilityUpdateManyWithWhereWithoutScanInput = {
    where: VulnerabilityScalarWhereInput
    data: XOR<VulnerabilityUpdateManyMutationInput, VulnerabilityUncheckedUpdateManyWithoutScanInput>
  }

  export type VulnerabilityScalarWhereInput = {
    AND?: VulnerabilityScalarWhereInput | VulnerabilityScalarWhereInput[]
    OR?: VulnerabilityScalarWhereInput[]
    NOT?: VulnerabilityScalarWhereInput | VulnerabilityScalarWhereInput[]
    id?: StringFilter<"Vulnerability"> | string
    type?: StringFilter<"Vulnerability"> | string
    severity?: EnumSeverityFilter<"Vulnerability"> | $Enums.Severity
    description?: StringFilter<"Vulnerability"> | string
    proof?: StringFilter<"Vulnerability"> | string
    isResolved?: BoolFilter<"Vulnerability"> | boolean
    foundAt?: DateTimeFilter<"Vulnerability"> | Date | string
    scanId?: StringFilter<"Vulnerability"> | string
  }

  export type ReportUpsertWithoutScanInput = {
    update: XOR<ReportUpdateWithoutScanInput, ReportUncheckedUpdateWithoutScanInput>
    create: XOR<ReportCreateWithoutScanInput, ReportUncheckedCreateWithoutScanInput>
    where?: ReportWhereInput
  }

  export type ReportUpdateToOneWithWhereWithoutScanInput = {
    where?: ReportWhereInput
    data: XOR<ReportUpdateWithoutScanInput, ReportUncheckedUpdateWithoutScanInput>
  }

  export type ReportUpdateWithoutScanInput = {
    id?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    storagePath?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutReportsNestedInput
  }

  export type ReportUncheckedUpdateWithoutScanInput = {
    id?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    storagePath?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizationId?: StringFieldUpdateOperationsInput | string
  }

  export type ScanConfigurationUpsertWithoutScansInput = {
    update: XOR<ScanConfigurationUpdateWithoutScansInput, ScanConfigurationUncheckedUpdateWithoutScansInput>
    create: XOR<ScanConfigurationCreateWithoutScansInput, ScanConfigurationUncheckedCreateWithoutScansInput>
    where?: ScanConfigurationWhereInput
  }

  export type ScanConfigurationUpdateToOneWithWhereWithoutScansInput = {
    where?: ScanConfigurationWhereInput
    data: XOR<ScanConfigurationUpdateWithoutScansInput, ScanConfigurationUncheckedUpdateWithoutScansInput>
  }

  export type ScanConfigurationUpdateWithoutScansInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isDiscoveryFocused?: BoolFieldUpdateOperationsInput | boolean
    isAiPowered?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ScanConfigurationUncheckedUpdateWithoutScansInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isDiscoveryFocused?: BoolFieldUpdateOperationsInput | boolean
    isAiPowered?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ScanCreateWithoutVulnerabilitiesInput = {
    id?: string
    status?: $Enums.ScanStatus
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    target: TargetCreateNestedOneWithoutScansInput
    report?: ReportCreateNestedOneWithoutScanInput
    configuration?: ScanConfigurationCreateNestedOneWithoutScansInput
  }

  export type ScanUncheckedCreateWithoutVulnerabilitiesInput = {
    id?: string
    status?: $Enums.ScanStatus
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    targetId: string
    configurationId?: string | null
    report?: ReportUncheckedCreateNestedOneWithoutScanInput
  }

  export type ScanCreateOrConnectWithoutVulnerabilitiesInput = {
    where: ScanWhereUniqueInput
    create: XOR<ScanCreateWithoutVulnerabilitiesInput, ScanUncheckedCreateWithoutVulnerabilitiesInput>
  }

  export type ScanUpsertWithoutVulnerabilitiesInput = {
    update: XOR<ScanUpdateWithoutVulnerabilitiesInput, ScanUncheckedUpdateWithoutVulnerabilitiesInput>
    create: XOR<ScanCreateWithoutVulnerabilitiesInput, ScanUncheckedCreateWithoutVulnerabilitiesInput>
    where?: ScanWhereInput
  }

  export type ScanUpdateToOneWithWhereWithoutVulnerabilitiesInput = {
    where?: ScanWhereInput
    data: XOR<ScanUpdateWithoutVulnerabilitiesInput, ScanUncheckedUpdateWithoutVulnerabilitiesInput>
  }

  export type ScanUpdateWithoutVulnerabilitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumScanStatusFieldUpdateOperationsInput | $Enums.ScanStatus
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    target?: TargetUpdateOneRequiredWithoutScansNestedInput
    report?: ReportUpdateOneWithoutScanNestedInput
    configuration?: ScanConfigurationUpdateOneWithoutScansNestedInput
  }

  export type ScanUncheckedUpdateWithoutVulnerabilitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumScanStatusFieldUpdateOperationsInput | $Enums.ScanStatus
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    targetId?: StringFieldUpdateOperationsInput | string
    configurationId?: NullableStringFieldUpdateOperationsInput | string | null
    report?: ReportUncheckedUpdateOneWithoutScanNestedInput
  }

  export type ScanCreateWithoutConfigurationInput = {
    id?: string
    status?: $Enums.ScanStatus
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    target: TargetCreateNestedOneWithoutScansInput
    vulnerabilities?: VulnerabilityCreateNestedManyWithoutScanInput
    report?: ReportCreateNestedOneWithoutScanInput
  }

  export type ScanUncheckedCreateWithoutConfigurationInput = {
    id?: string
    status?: $Enums.ScanStatus
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    targetId: string
    vulnerabilities?: VulnerabilityUncheckedCreateNestedManyWithoutScanInput
    report?: ReportUncheckedCreateNestedOneWithoutScanInput
  }

  export type ScanCreateOrConnectWithoutConfigurationInput = {
    where: ScanWhereUniqueInput
    create: XOR<ScanCreateWithoutConfigurationInput, ScanUncheckedCreateWithoutConfigurationInput>
  }

  export type ScanCreateManyConfigurationInputEnvelope = {
    data: ScanCreateManyConfigurationInput | ScanCreateManyConfigurationInput[]
    skipDuplicates?: boolean
  }

  export type ScanUpsertWithWhereUniqueWithoutConfigurationInput = {
    where: ScanWhereUniqueInput
    update: XOR<ScanUpdateWithoutConfigurationInput, ScanUncheckedUpdateWithoutConfigurationInput>
    create: XOR<ScanCreateWithoutConfigurationInput, ScanUncheckedCreateWithoutConfigurationInput>
  }

  export type ScanUpdateWithWhereUniqueWithoutConfigurationInput = {
    where: ScanWhereUniqueInput
    data: XOR<ScanUpdateWithoutConfigurationInput, ScanUncheckedUpdateWithoutConfigurationInput>
  }

  export type ScanUpdateManyWithWhereWithoutConfigurationInput = {
    where: ScanScalarWhereInput
    data: XOR<ScanUpdateManyMutationInput, ScanUncheckedUpdateManyWithoutConfigurationInput>
  }

  export type ScanCreateWithoutReportInput = {
    id?: string
    status?: $Enums.ScanStatus
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    target: TargetCreateNestedOneWithoutScansInput
    vulnerabilities?: VulnerabilityCreateNestedManyWithoutScanInput
    configuration?: ScanConfigurationCreateNestedOneWithoutScansInput
  }

  export type ScanUncheckedCreateWithoutReportInput = {
    id?: string
    status?: $Enums.ScanStatus
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    targetId: string
    configurationId?: string | null
    vulnerabilities?: VulnerabilityUncheckedCreateNestedManyWithoutScanInput
  }

  export type ScanCreateOrConnectWithoutReportInput = {
    where: ScanWhereUniqueInput
    create: XOR<ScanCreateWithoutReportInput, ScanUncheckedCreateWithoutReportInput>
  }

  export type OrganizationCreateWithoutReportsInput = {
    id?: string
    name: string
    slug: string
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: MembershipCreateNestedManyWithoutOrganizationInput
    invitations?: InvitationCreateNestedManyWithoutOrganizationInput
    targets?: TargetCreateNestedManyWithoutOrganizationInput
    apiTokens?: ApiTokenCreateNestedManyWithoutOrganizationInput
    auditLogs?: AuditLogCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateWithoutReportsInput = {
    id?: string
    name: string
    slug: string
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: MembershipUncheckedCreateNestedManyWithoutOrganizationInput
    invitations?: InvitationUncheckedCreateNestedManyWithoutOrganizationInput
    targets?: TargetUncheckedCreateNestedManyWithoutOrganizationInput
    apiTokens?: ApiTokenUncheckedCreateNestedManyWithoutOrganizationInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationCreateOrConnectWithoutReportsInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<OrganizationCreateWithoutReportsInput, OrganizationUncheckedCreateWithoutReportsInput>
  }

  export type ScanUpsertWithoutReportInput = {
    update: XOR<ScanUpdateWithoutReportInput, ScanUncheckedUpdateWithoutReportInput>
    create: XOR<ScanCreateWithoutReportInput, ScanUncheckedCreateWithoutReportInput>
    where?: ScanWhereInput
  }

  export type ScanUpdateToOneWithWhereWithoutReportInput = {
    where?: ScanWhereInput
    data: XOR<ScanUpdateWithoutReportInput, ScanUncheckedUpdateWithoutReportInput>
  }

  export type ScanUpdateWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumScanStatusFieldUpdateOperationsInput | $Enums.ScanStatus
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    target?: TargetUpdateOneRequiredWithoutScansNestedInput
    vulnerabilities?: VulnerabilityUpdateManyWithoutScanNestedInput
    configuration?: ScanConfigurationUpdateOneWithoutScansNestedInput
  }

  export type ScanUncheckedUpdateWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumScanStatusFieldUpdateOperationsInput | $Enums.ScanStatus
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    targetId?: StringFieldUpdateOperationsInput | string
    configurationId?: NullableStringFieldUpdateOperationsInput | string | null
    vulnerabilities?: VulnerabilityUncheckedUpdateManyWithoutScanNestedInput
  }

  export type OrganizationUpsertWithoutReportsInput = {
    update: XOR<OrganizationUpdateWithoutReportsInput, OrganizationUncheckedUpdateWithoutReportsInput>
    create: XOR<OrganizationCreateWithoutReportsInput, OrganizationUncheckedCreateWithoutReportsInput>
    where?: OrganizationWhereInput
  }

  export type OrganizationUpdateToOneWithWhereWithoutReportsInput = {
    where?: OrganizationWhereInput
    data: XOR<OrganizationUpdateWithoutReportsInput, OrganizationUncheckedUpdateWithoutReportsInput>
  }

  export type OrganizationUpdateWithoutReportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: MembershipUpdateManyWithoutOrganizationNestedInput
    invitations?: InvitationUpdateManyWithoutOrganizationNestedInput
    targets?: TargetUpdateManyWithoutOrganizationNestedInput
    apiTokens?: ApiTokenUpdateManyWithoutOrganizationNestedInput
    auditLogs?: AuditLogUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateWithoutReportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: MembershipUncheckedUpdateManyWithoutOrganizationNestedInput
    invitations?: InvitationUncheckedUpdateManyWithoutOrganizationNestedInput
    targets?: TargetUncheckedUpdateManyWithoutOrganizationNestedInput
    apiTokens?: ApiTokenUncheckedUpdateManyWithoutOrganizationNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationCreateWithoutApiTokensInput = {
    id?: string
    name: string
    slug: string
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: MembershipCreateNestedManyWithoutOrganizationInput
    invitations?: InvitationCreateNestedManyWithoutOrganizationInput
    targets?: TargetCreateNestedManyWithoutOrganizationInput
    reports?: ReportCreateNestedManyWithoutOrganizationInput
    auditLogs?: AuditLogCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateWithoutApiTokensInput = {
    id?: string
    name: string
    slug: string
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: MembershipUncheckedCreateNestedManyWithoutOrganizationInput
    invitations?: InvitationUncheckedCreateNestedManyWithoutOrganizationInput
    targets?: TargetUncheckedCreateNestedManyWithoutOrganizationInput
    reports?: ReportUncheckedCreateNestedManyWithoutOrganizationInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationCreateOrConnectWithoutApiTokensInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<OrganizationCreateWithoutApiTokensInput, OrganizationUncheckedCreateWithoutApiTokensInput>
  }

  export type OrganizationUpsertWithoutApiTokensInput = {
    update: XOR<OrganizationUpdateWithoutApiTokensInput, OrganizationUncheckedUpdateWithoutApiTokensInput>
    create: XOR<OrganizationCreateWithoutApiTokensInput, OrganizationUncheckedCreateWithoutApiTokensInput>
    where?: OrganizationWhereInput
  }

  export type OrganizationUpdateToOneWithWhereWithoutApiTokensInput = {
    where?: OrganizationWhereInput
    data: XOR<OrganizationUpdateWithoutApiTokensInput, OrganizationUncheckedUpdateWithoutApiTokensInput>
  }

  export type OrganizationUpdateWithoutApiTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: MembershipUpdateManyWithoutOrganizationNestedInput
    invitations?: InvitationUpdateManyWithoutOrganizationNestedInput
    targets?: TargetUpdateManyWithoutOrganizationNestedInput
    reports?: ReportUpdateManyWithoutOrganizationNestedInput
    auditLogs?: AuditLogUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateWithoutApiTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: MembershipUncheckedUpdateManyWithoutOrganizationNestedInput
    invitations?: InvitationUncheckedUpdateManyWithoutOrganizationNestedInput
    targets?: TargetUncheckedUpdateManyWithoutOrganizationNestedInput
    reports?: ReportUncheckedUpdateManyWithoutOrganizationNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type UserCreateWithoutAuditLogsInput = {
    id?: string
    email: string
    name?: string | null
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    memberships?: MembershipCreateNestedManyWithoutUserInput
    invitations?: InvitationCreateNestedManyWithoutInvitedByInput
  }

  export type UserUncheckedCreateWithoutAuditLogsInput = {
    id?: string
    email: string
    name?: string | null
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    memberships?: MembershipUncheckedCreateNestedManyWithoutUserInput
    invitations?: InvitationUncheckedCreateNestedManyWithoutInvitedByInput
  }

  export type UserCreateOrConnectWithoutAuditLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
  }

  export type OrganizationCreateWithoutAuditLogsInput = {
    id?: string
    name: string
    slug: string
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: MembershipCreateNestedManyWithoutOrganizationInput
    invitations?: InvitationCreateNestedManyWithoutOrganizationInput
    targets?: TargetCreateNestedManyWithoutOrganizationInput
    reports?: ReportCreateNestedManyWithoutOrganizationInput
    apiTokens?: ApiTokenCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateWithoutAuditLogsInput = {
    id?: string
    name: string
    slug: string
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: MembershipUncheckedCreateNestedManyWithoutOrganizationInput
    invitations?: InvitationUncheckedCreateNestedManyWithoutOrganizationInput
    targets?: TargetUncheckedCreateNestedManyWithoutOrganizationInput
    reports?: ReportUncheckedCreateNestedManyWithoutOrganizationInput
    apiTokens?: ApiTokenUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationCreateOrConnectWithoutAuditLogsInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<OrganizationCreateWithoutAuditLogsInput, OrganizationUncheckedCreateWithoutAuditLogsInput>
  }

  export type UserUpsertWithoutAuditLogsInput = {
    update: XOR<UserUpdateWithoutAuditLogsInput, UserUncheckedUpdateWithoutAuditLogsInput>
    create: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAuditLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAuditLogsInput, UserUncheckedUpdateWithoutAuditLogsInput>
  }

  export type UserUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: MembershipUpdateManyWithoutUserNestedInput
    invitations?: InvitationUpdateManyWithoutInvitedByNestedInput
  }

  export type UserUncheckedUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: MembershipUncheckedUpdateManyWithoutUserNestedInput
    invitations?: InvitationUncheckedUpdateManyWithoutInvitedByNestedInput
  }

  export type OrganizationUpsertWithoutAuditLogsInput = {
    update: XOR<OrganizationUpdateWithoutAuditLogsInput, OrganizationUncheckedUpdateWithoutAuditLogsInput>
    create: XOR<OrganizationCreateWithoutAuditLogsInput, OrganizationUncheckedCreateWithoutAuditLogsInput>
    where?: OrganizationWhereInput
  }

  export type OrganizationUpdateToOneWithWhereWithoutAuditLogsInput = {
    where?: OrganizationWhereInput
    data: XOR<OrganizationUpdateWithoutAuditLogsInput, OrganizationUncheckedUpdateWithoutAuditLogsInput>
  }

  export type OrganizationUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: MembershipUpdateManyWithoutOrganizationNestedInput
    invitations?: InvitationUpdateManyWithoutOrganizationNestedInput
    targets?: TargetUpdateManyWithoutOrganizationNestedInput
    reports?: ReportUpdateManyWithoutOrganizationNestedInput
    apiTokens?: ApiTokenUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: MembershipUncheckedUpdateManyWithoutOrganizationNestedInput
    invitations?: InvitationUncheckedUpdateManyWithoutOrganizationNestedInput
    targets?: TargetUncheckedUpdateManyWithoutOrganizationNestedInput
    reports?: ReportUncheckedUpdateManyWithoutOrganizationNestedInput
    apiTokens?: ApiTokenUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type MembershipCreateManyUserInput = {
    id?: string
    role?: $Enums.Role
    createdAt?: Date | string
    organizationId: string
  }

  export type InvitationCreateManyInvitedByInput = {
    id?: string
    email: string
    role?: $Enums.Role
    status?: $Enums.InvitationStatus
    expiresAt: Date | string
    createdAt?: Date | string
    organizationId: string
  }

  export type AuditLogCreateManyUserInput = {
    id?: string
    action: string
    details: JsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    createdAt?: Date | string
    organizationId: string
  }

  export type MembershipUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutMembersNestedInput
  }

  export type MembershipUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizationId?: StringFieldUpdateOperationsInput | string
  }

  export type MembershipUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizationId?: StringFieldUpdateOperationsInput | string
  }

  export type InvitationUpdateWithoutInvitedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    status?: EnumInvitationStatusFieldUpdateOperationsInput | $Enums.InvitationStatus
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutInvitationsNestedInput
  }

  export type InvitationUncheckedUpdateWithoutInvitedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    status?: EnumInvitationStatusFieldUpdateOperationsInput | $Enums.InvitationStatus
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizationId?: StringFieldUpdateOperationsInput | string
  }

  export type InvitationUncheckedUpdateManyWithoutInvitedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    status?: EnumInvitationStatusFieldUpdateOperationsInput | $Enums.InvitationStatus
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizationId?: StringFieldUpdateOperationsInput | string
  }

  export type AuditLogUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    details?: JsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutAuditLogsNestedInput
  }

  export type AuditLogUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    details?: JsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizationId?: StringFieldUpdateOperationsInput | string
  }

  export type AuditLogUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    details?: JsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizationId?: StringFieldUpdateOperationsInput | string
  }

  export type MembershipCreateManyOrganizationInput = {
    id?: string
    role?: $Enums.Role
    createdAt?: Date | string
    userId: string
  }

  export type InvitationCreateManyOrganizationInput = {
    id?: string
    email: string
    role?: $Enums.Role
    status?: $Enums.InvitationStatus
    expiresAt: Date | string
    createdAt?: Date | string
    invitedById: string
  }

  export type TargetCreateManyOrganizationInput = {
    id?: string
    url: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReportCreateManyOrganizationInput = {
    id?: string
    format: string
    storagePath: string
    createdAt?: Date | string
    scanId: string
  }

  export type ApiTokenCreateManyOrganizationInput = {
    id?: string
    name: string
    token: string
    permissions?: ApiTokenCreatepermissionsInput | string[]
    lastUsedAt?: Date | string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
  }

  export type AuditLogCreateManyOrganizationInput = {
    id?: string
    action: string
    details: JsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    createdAt?: Date | string
    userId: string
  }

  export type MembershipUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMembershipsNestedInput
  }

  export type MembershipUncheckedUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type MembershipUncheckedUpdateManyWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type InvitationUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    status?: EnumInvitationStatusFieldUpdateOperationsInput | $Enums.InvitationStatus
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invitedBy?: UserUpdateOneRequiredWithoutInvitationsNestedInput
  }

  export type InvitationUncheckedUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    status?: EnumInvitationStatusFieldUpdateOperationsInput | $Enums.InvitationStatus
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invitedById?: StringFieldUpdateOperationsInput | string
  }

  export type InvitationUncheckedUpdateManyWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    status?: EnumInvitationStatusFieldUpdateOperationsInput | $Enums.InvitationStatus
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invitedById?: StringFieldUpdateOperationsInput | string
  }

  export type TargetUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scans?: ScanUpdateManyWithoutTargetNestedInput
  }

  export type TargetUncheckedUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scans?: ScanUncheckedUpdateManyWithoutTargetNestedInput
  }

  export type TargetUncheckedUpdateManyWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    storagePath?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scan?: ScanUpdateOneRequiredWithoutReportNestedInput
  }

  export type ReportUncheckedUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    storagePath?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scanId?: StringFieldUpdateOperationsInput | string
  }

  export type ReportUncheckedUpdateManyWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    storagePath?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scanId?: StringFieldUpdateOperationsInput | string
  }

  export type ApiTokenUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    permissions?: ApiTokenUpdatepermissionsInput | string[]
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiTokenUncheckedUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    permissions?: ApiTokenUpdatepermissionsInput | string[]
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiTokenUncheckedUpdateManyWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    permissions?: ApiTokenUpdatepermissionsInput | string[]
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    details?: JsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAuditLogsNestedInput
  }

  export type AuditLogUncheckedUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    details?: JsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type AuditLogUncheckedUpdateManyWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    details?: JsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type ScanCreateManyTargetInput = {
    id?: string
    status?: $Enums.ScanStatus
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    configurationId?: string | null
  }

  export type ScanUpdateWithoutTargetInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumScanStatusFieldUpdateOperationsInput | $Enums.ScanStatus
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vulnerabilities?: VulnerabilityUpdateManyWithoutScanNestedInput
    report?: ReportUpdateOneWithoutScanNestedInput
    configuration?: ScanConfigurationUpdateOneWithoutScansNestedInput
  }

  export type ScanUncheckedUpdateWithoutTargetInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumScanStatusFieldUpdateOperationsInput | $Enums.ScanStatus
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    configurationId?: NullableStringFieldUpdateOperationsInput | string | null
    vulnerabilities?: VulnerabilityUncheckedUpdateManyWithoutScanNestedInput
    report?: ReportUncheckedUpdateOneWithoutScanNestedInput
  }

  export type ScanUncheckedUpdateManyWithoutTargetInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumScanStatusFieldUpdateOperationsInput | $Enums.ScanStatus
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    configurationId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type VulnerabilityCreateManyScanInput = {
    id?: string
    type: string
    severity?: $Enums.Severity
    description: string
    proof: string
    isResolved?: boolean
    foundAt?: Date | string
  }

  export type VulnerabilityUpdateWithoutScanInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    severity?: EnumSeverityFieldUpdateOperationsInput | $Enums.Severity
    description?: StringFieldUpdateOperationsInput | string
    proof?: StringFieldUpdateOperationsInput | string
    isResolved?: BoolFieldUpdateOperationsInput | boolean
    foundAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VulnerabilityUncheckedUpdateWithoutScanInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    severity?: EnumSeverityFieldUpdateOperationsInput | $Enums.Severity
    description?: StringFieldUpdateOperationsInput | string
    proof?: StringFieldUpdateOperationsInput | string
    isResolved?: BoolFieldUpdateOperationsInput | boolean
    foundAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VulnerabilityUncheckedUpdateManyWithoutScanInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    severity?: EnumSeverityFieldUpdateOperationsInput | $Enums.Severity
    description?: StringFieldUpdateOperationsInput | string
    proof?: StringFieldUpdateOperationsInput | string
    isResolved?: BoolFieldUpdateOperationsInput | boolean
    foundAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScanCreateManyConfigurationInput = {
    id?: string
    status?: $Enums.ScanStatus
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    targetId: string
  }

  export type ScanUpdateWithoutConfigurationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumScanStatusFieldUpdateOperationsInput | $Enums.ScanStatus
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    target?: TargetUpdateOneRequiredWithoutScansNestedInput
    vulnerabilities?: VulnerabilityUpdateManyWithoutScanNestedInput
    report?: ReportUpdateOneWithoutScanNestedInput
  }

  export type ScanUncheckedUpdateWithoutConfigurationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumScanStatusFieldUpdateOperationsInput | $Enums.ScanStatus
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    targetId?: StringFieldUpdateOperationsInput | string
    vulnerabilities?: VulnerabilityUncheckedUpdateManyWithoutScanNestedInput
    report?: ReportUncheckedUpdateOneWithoutScanNestedInput
  }

  export type ScanUncheckedUpdateManyWithoutConfigurationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumScanStatusFieldUpdateOperationsInput | $Enums.ScanStatus
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    targetId?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}