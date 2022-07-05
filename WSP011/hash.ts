import * as bcrypt from 'bcryptjs';

const SALT_ROUNDS = 12;

export async function hashPassword(plainPassword: string) {
    const hash = await bcrypt.hash(plainPassword, SALT_ROUNDS);
    return hash;
};

export async function checkPassword(plainPassword: string, hashPassword: string) {
    const match = await bcrypt.compare(plainPassword, hashPassword);
    return match;
}

async function main() {
    console.log(await hashPassword("Aleasdadadasdax"));
}

main();