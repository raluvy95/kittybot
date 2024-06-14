export function randomChar(length: number) {
    const chars = [];
    for (let i = 0; i < length; i++) {
        const unicode_latin = Math.floor(Math.random() * 0x2AF) + 20;
        const char = String.fromCodePoint(unicode_latin)
        chars.push(char);
    }
    return Buffer.from(chars.join(""), "utf-8").toString();
}