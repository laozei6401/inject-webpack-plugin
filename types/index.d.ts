import { Compiler } from "webpack";
import { Options } from "types";
import { HtmlTagObject } from "html-webpack-plugin";
declare class InjectWebpackPlugin {
    private options;
    constructor({ head, body }: Options);
    praseConfig(data: any[], position: any): any[];
    getHeadAndBodyChunks(chunks?: HtmlTagObject[]): {
        headChunks: any[];
        bodyChunks: any[];
    };
    apply(compiler: Compiler): void;
}
export default InjectWebpackPlugin;
