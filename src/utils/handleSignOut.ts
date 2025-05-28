export async function handleSignOut() {
    try {
        localStorage.clear();
    } catch (error) {
        console.error(error);
    }
}