export function getCurrentDate (): string | undefined {
    try {
        const today = new Date();
        return (`${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`);        
    } catch (error) {
        console.error(error);
    }
}