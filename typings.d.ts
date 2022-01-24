export = PrefetchWebpackPlugin;
import { Compiler, Compilation } from "webpack";
declare class PrefetchWebpackPlugin {
    constructor(options:PrefetchWebpackPlugin.Options);
    name:'prefetchWebpackPlugin';
    apply(compiler: Compiler): void;
    addLinks(compilation:Compilation)
}

declare namespace PrefetchWebpackPlugin {
    interface Options {
        rel: 'prefetch' | 'preload',
        include: string[],
    }
}