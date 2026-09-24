/*
 * react-custom-roulette only ships a webpack UMD bundle (dist/bundle.js) as its entry point.
 * Its CommonJS branch calls require("react"). Because react is an external in Mendix widget
 * builds, @rollup/plugin-commonjs leaves that require() in the output, which breaks the
 * React client (ESM, no global require) and depends on a synchronous AMD require otherwise.
 *
 * This plugin rewrites require("react") to the react module that the bundle already imports:
 * - ESM: adds `import * as __mxReact from "react"` and uses it.
 * - AMD: aliases the define() callback parameter that receives "react".
 */
export default args => {
    const configs = Array.isArray(args.configDefaultConfig) ? args.configDefaultConfig : [args.configDefaultConfig];

    return configs.map(config => ({
        ...config,
        plugins: [
            ...(config.plugins || []),
            {
                name: "mendix-rewrite-react-require",
                renderChunk(code) {
                    const requireReact = /require\(["']react["']\)/g;
                    if (!requireReact.test(code)) {
                        return null;
                    }

                    const define = code.match(/define\((\[[^\]]*\]),\s*function\s*\(([^)]*)\)\s*\{/);
                    if (define) {
                        const deps = JSON.parse(define[1].replace(/'/g, '"'));
                        const params = define[2].split(",").map(s => s.trim());
                        const reactParam = params[deps.indexOf("react")];
                        if (!reactParam) {
                            this.error("AMD output: could not find the react dependency parameter.");
                        }
                        let insertAt = define.index + define[0].length;
                        const strict = code.slice(insertAt).match(/^\s*["']use strict["'];?/);
                        if (strict) {
                            insertAt += strict[0].length;
                        }
                        const rewritten =
                            code.slice(0, insertAt) +
                            `var __mxReact=${reactParam};` +
                            code.slice(insertAt).replace(requireReact, "__mxReact");
                        return { code: rewritten, map: null };
                    }

                    // ESM output
                    return {
                        code: `import * as __mxReact from "react";\n` + code.replace(requireReact, "__mxReact"),
                        map: null
                    };
                }
            }
        ]
    }));
};
