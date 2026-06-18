// Minimal type declarations for minimatch to resolve TypeScript errors
declare module 'minimatch' {
  interface IOptions {
    debug?: boolean;
    nobrace?: boolean;
    noglobstar?: boolean;
    dot?: boolean;
    noext?: boolean;
    nocase?: boolean;
    nonull?: boolean;
    matchBase?: boolean;
    nocomment?: boolean;
    nonegate?: boolean;
    flipNegate?: boolean;
  }

  function minimatch(
    target: string,
    pattern: string,
    options?: IOptions
  ): boolean;

  namespace minimatch {
    function match(
      list: string[],
      pattern: string,
      options?: IOptions
    ): string[];
    function makeRe(pattern: string, options?: IOptions): RegExp;
    class Minimatch {
      constructor(pattern: string, options?: IOptions);
      pattern: string;
      options: IOptions;
      regexp: RegExp;
      match(fname: string): boolean;
    }
  }

  export = minimatch;
}
