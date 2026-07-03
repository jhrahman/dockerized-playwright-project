export function generateRandomName(): string {
    return Math.random().toString(36).substring(2, 8);
}

export function generateRandomEmail(): string {
    return `${Math.random().toString(36).substring(2, 8)}@example.com`;
}

export function generateRandomPassword(): string {
    return Math.random().toString(36).substring(2, 8);
}