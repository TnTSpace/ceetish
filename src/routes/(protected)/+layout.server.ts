import { createClient } from "$lib/prismicio";
import { error } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

// export const prerender = 'auto';

export const load: LayoutServerLoad = async ({ fetch, cookies }) => {

  
  const client = createClient({ fetch, cookies })

  try {
    const settings = await client.getSingle("settings")

    return {
      settings
    }
  } catch (err: any) {
    return error(404, {
      message: err.message
    })
  }
};