/* tslint:disable */
/* eslint-disable */
export function init_panic_hook(): void;
/**
 * @returns {WSSparseMerkleTree}
 */
export function create_smt(): WSSparseMerkleTree;
export class WSSparseMerkleTree {
  free(): void;
  constructor();
  /**
   * @param {Uint8Array} key
   * @param {Uint8Array} value
   */
  insert(key: Uint8Array, value: Uint8Array): void;
  /**
   * @param {Uint8Array} key
   * @returns {any}
   */
  get(key: Uint8Array): any;
  /**
   * @returns {any}
   */
  get_root(): any;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly init_panic_hook: () => void;
  readonly __wbg_wssparsemerkletree_free: (a: number, b: number) => void;
  readonly wssparsemerkletree_new: () => number;
  readonly wssparsemerkletree_insert: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
  readonly wssparsemerkletree_get: (a: number, b: number, c: number, d: number) => void;
  readonly wssparsemerkletree_get_root: (a: number, b: number) => void;
  readonly create_smt: () => number;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
