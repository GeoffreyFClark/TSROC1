export function SimCurrentFL(): string {
    let currentFL: string = ((Math.floor(Math.random() * (50-36) + 36) ) * 5).toString();
    return currentFL;
};