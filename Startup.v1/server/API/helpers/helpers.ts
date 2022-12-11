export function getCurrentDate() {
    try {
        const today = new Date();
        return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    } catch (error) {
        console.error(error);
    }
}