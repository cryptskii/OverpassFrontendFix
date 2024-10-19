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
