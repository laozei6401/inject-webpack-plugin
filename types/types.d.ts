export interface optionConfig {
    name: string;
    position: "head" | "body";
}
declare type a = string | optionConfig;
export interface Options {
    head: Array<a>;
    body: Array<a>;
}
export {};
