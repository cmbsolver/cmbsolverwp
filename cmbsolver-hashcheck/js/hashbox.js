
// https://stackoverflow.com/questions/38987784/how-to-convert-a-hexadecimal-string-to-uint8array-and-back-in-javascript
const toHexString = bytes =>
  bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');

const hashes = {
  "blake-512": {
    init: () => blake.init(512),
    update: blake.update.bind(blake),
    final: blake.final.bind(blake),
    cleanup: blake.cleanup.bind(blake),

    digest: data => toHexString(blake.digest(data, 512))
  },
  "md6-512": {
    init: () => md6.init(512),
    update: md6.update.bind(md6),
    final: md6.final.bind(md6),
    cleanup: md6.cleanup.bind(md6),

    digest: data => toHexString(md6.digest(data, 512))
  },
  "fnv512-0": {
    init: () => fnv512.init(512,fnv512.variants.FNV_VARIANT_0),
    update: fnv512.update.bind(fnv512),
    final: fnv512.final.bind(fnv512),
    cleanup: fnv512.cleanup.bind(fnv512),

    digest: data => toHexString(fnv512.digest(data, 512, fnv512.variants.FNV_VARIANT_0))
  },
  "fnv512-1": {
    init: () => fnv512.init(512,fnv512.variants.FNV_VARIANT_1),
    update: fnv512.update.bind(fnv512),
    final: fnv512.final.bind(fnv512),
    cleanup: fnv512.cleanup.bind(fnv512),

    digest: data => toHexString(fnv512.digest(data, 512, fnv512.variants.FNV_VARIANT_1))
  },
  "fnv512-1a": {
    init: () => fnv512.init(512,fnv512.variants.FNV_VARIANT_1A),
    update: fnv512.update.bind(fnv512),
    final: fnv512.final.bind(fnv512),
    cleanup: fnv512.cleanup.bind(fnv512),

    digest: data => toHexString(fnv512.digest(data, 512, fnv512.variants.FNV_VARIANT_1A))
  },
  "streebog512": {
    init: () => streebog.init(512),
    update: streebog.update.bind(streebog),
    final: streebog.final.bind(streebog),
    cleanup: streebog.cleanup.bind(streebog),

    digest: data => toHexString(streebog.digest(data, 512))
  },
  "blake2b": {
    init: () => blake2bInit(64), // 512 bits
    update: blake2bUpdate,
    final: blake2bFinal,
    cleanup: () => {},

    digest: data => toHexString(blake2b(data))
  },
  "keccak3-512": {
    init: () => sha3.init(512, sha3.variants.SHA3_VARIANT_KECCAK3),
    update: sha3.update.bind(sha3),
    final: sha3.final.bind(sha3),
    cleanup: sha3.cleanup.bind(sha3),

    digest: data => toHexString(sha3.digest(data, 512, sha3.variants.SHA3_VARIANT_KECCAK3))
  },
  "sha3-512": {
    init: () => sha3.init(512, sha3.variants.SHA3_VARIANT_STANDARD),
    update: sha3.update.bind(sha3),
    final: sha3.final.bind(sha3),
    cleanup: sha3.cleanup.bind(sha3),

    digest: data => toHexString(sha3.digest(data, 512, sha3.variants.SHA3_VARIANT_STANDARD))
  },
  "sha512": {
    init: sha512.create,
    update: (ctx, data) => ctx.update(data),
    final: ctx => ctx.digest(),
    cleanup: () => {},

    digest: sha512
  },
  "grostl": {
    init: () => grostl.init(512),
    update: grostl.update,
    final: grostl.final,
    cleanup: grostl.cleanup,

    digest: data => toHexString(grostl.digest(data, 512))
  },
  "jh": {
    init: () => jh.init(512),
    update: jh.update,
    final: jh.final,
    cleanup: jh.cleanup,

    digest: data => toHexString(jh.digest(data, 512))
  },
  "lsh": {
    init: () => lsh.init(512),
    update: lsh.update,
    final: lsh.final,
    cleanup: lsh.cleanup,

    digest: data => toHexString(lsh.digest(data, 512))
  },
  "skein": {
    init: () => skein.init(512),
    update: skein.update,
    final: skein.final,
    cleanup: skein.cleanup,

    digest: data => toHexString(skein.digest(data, 512))
  },
  "cubehash": {
    init: () => cubehash.init(16, 16, 32, 32, 512), // CubeHash16+16/32+32–512
    update: cubehash.update,
    final: cubehash.final,
    cleanup: cubehash.cleanup,

    digest: data => toHexString(cubehash.digest(data, 16, 16, 32, 32, 512))
  },
  "whirlpool-0": {
    init: () => whirlpool.init(whirlpool.WHIRLPOOL_0),
    update: whirlpool.update,
    final: whirlpool.final,
    cleanup: whirlpool.cleanup,

    digest: data => toHexString(cubehash.digest(data, whirlpool.WHIRLPOOL_0))
  },
  "whirlpool-T": {
    init: () => whirlpool.init(whirlpool.WHIRLPOOL_T),
    update: whirlpool.update,
    final: whirlpool.final,
    cleanup: whirlpool.cleanup,

    digest: data => toHexString(cubehash.digest(data, whirlpool.WHIRLPOOL_T))
  },
  "whirlpool": {
    init: () => whirlpool.init(whirlpool.WHIRLPOOL),
    update: whirlpool.update,
    final: whirlpool.final,
    cleanup: whirlpool.cleanup,

    digest: data => toHexString(cubehash.digest(data, whirlpool.WHIRLPOOL))
  }
}

const LP_hash = "36367763ab73783c7af284446c59466b4cd653239a311cb7116d4618dee09a8425893dc7500b464fdaf1672d7bef5e891c6e2274568926a49fb4f45132c2a8b4";

var hashing_mode = "most";
const modes = {
  "min": ["blake-512", "jh", "skein", "grostl", "keccak3-512", "whirlpool", "sha3-512", "sha512", "blake2b"],
  "most": ["blake-512", "jh", "skein", "grostl", "keccak3-512", "whirlpool", "sha3-512", "sha512", "blake2b",
           "cubehash", "streebog512", "fnv512-1a", "md6-512", "lsh"],
  "all": ["blake-512", "jh", "skein", "grostl", "keccak3-512", "whirlpool-0", "whirlpool-T", "whirlpool",
          "sha3-512", "sha512", "blake2b", "cubehash", "streebog512", "fnv512-0", "fnv512-1", "fnv512-1a", "md6-512", "lsh"]
};

class HashingBox {
  // All-in-one method - return whether or not data hashes to the LP hash
  static hash(data) {
    for (let algorithm of modes[hashing_mode]) {
      let alg = hashes[algorithm];

      if (alg.digest(data) == LP_hash)
        return true;
    }

    return false;
  }

  static setMode(mode) {
    hashing_mode = mode;
  }

  constructor() {
    this.contexts = {};

    // Initializes the context for every hashing algorithm
    for (let algorithm of modes[hashing_mode])
      this.contexts[algorithm] = hashes[algorithm].init();
  }

  update(data) {
    for (let algorithm in this.contexts) {
      let alg = hashes[algorithm];
      let ctx = this.contexts[algorithm];

      alg.update(ctx, new Uint8Array(data));
    }
  }

  verify() {
    for (let algorithm in this.contexts) {
      let alg = hashes[algorithm];
      let ctx = this.contexts[algorithm];

      let digest = alg.final(ctx);

      if (toHexString(digest) == LP_hash)
        return true;
    }

    return false;
  }

  cleanup() {
    for (let algorithm in this.contexts) {
      let alg = hashes[algorithm];
      let ctx = this.contexts[algorithm];

      alg.cleanup(ctx);
    }
  }

  // Get all hashes for the given data
  static getAllHashes(data) {
    let results = {};

    for (let algorithm of modes[hashing_mode]) {
      let alg = hashes[algorithm];
      results[algorithm] = alg.digest(data);
    }

    return results;
  }

  // Get available hashing modes
  static getModes() {
    return Object.keys(modes);
  }

  // Get algorithms for a specific mode
  static getAlgorithmsForMode(mode) {
    return modes[mode] || [];
  }
}

// Explicitly make HashingBox available globally
if (typeof window !== 'undefined') {
  window.HashingBox = HashingBox;
}
