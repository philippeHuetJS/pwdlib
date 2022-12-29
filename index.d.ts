declare module 'pwdlib' {
  export function sign(length: number): string
  export function verify(code: string): boolean
}
