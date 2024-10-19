import init, { init_panic_hook, WSSparseMerkleTree } from "../pkg/sparse_merkle_tree_wasm.js";

let smt;

async function run() {
  await init();
  init_panic_hook();
  smt = new WSSparseMerkleTree();

  document.getElementById("insert").addEventListener("click", handleInsert);
  document.getElementById("get").addEventListener("click", handleGet);
  document.getElementById("getRoot").addEventListener("click", handleGetRoot);
  document.getElementById("generateProof").addEventListener("click", handleGenerateProof);
  document.getElementById("verifyProof").addEventListener("click", handleVerifyProof);
}

function handleInsert() {
  const key = hexToUint8Array(document.getElementById("key").value);
  const value = hexToUint8Array(document.getElementById("value").value);
  try {
    smt.insert(key, value);
    setOutput("Value inserted successfully");
  } catch (error) {
    setOutput(`Error: ${error}`);
  }
}

function handleGet() {
  const key = hexToUint8Array(document.getElementById("key").value);
  try {
    const result = smt.get(key);
    setOutput(`Value: ${uint8ArrayToHex(new Uint8Array(result))}`);
  } catch (error) {
    setOutput(`Error: ${error}`);
  }
}

function handleGetRoot() {
  try {
    const root = smt.get_root();
    setOutput(`Root: ${uint8ArrayToHex(new Uint8Array(root))}`);
  } catch (error) {
    setOutput(`Error: ${error}`);
  }
}

function handleGenerateProof() {
  const key = hexToUint8Array(document.getElementById("key").value);
  try {
    const proof = smt.generate_proof(key);
    setOutput(`Proof: ${JSON.stringify(proof)}`);
  } catch (error) {
    setOutput(`Error: ${error}`);
  }
}

function handleVerifyProof() {
  const key = hexToUint8Array(document.getElementById("key").value);
  const value = hexToUint8Array(document.getElementById("value").value);
  const proofStr = prompt("Enter the proof (JSON array of hex strings):");
  const proof = JSON.parse(proofStr);
  try {
    const isValid = smt.verify_proof(key, value, proof);
    setOutput(`Proof is ${isValid ? "valid" : "invalid"}`);
  } catch (error) {
    setOutput(`Error: ${error}`);
  }
}

function setOutput(message) {
  document.getElementById("output").textContent = message;
}

function hexToUint8Array(hex) {
  return new Uint8Array(hex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
}

function uint8ArrayToHex(uint8Array) {
  return Array.from(uint8Array)
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

run();
