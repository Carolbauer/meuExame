import { supabase } from "./supabaseClient";

export async function handleSignOut() {
    try {
        const { error } = await supabase.auth.signOut();

        if (error) {
            throw new Error(error.message);
        }

    } catch (error) {
        console.error(error);
    }
}