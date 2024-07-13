import { createClient } from "$lib/prismicio";
import { error } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

// export const prerender = 'auto';

export const load: LayoutServerLoad = async ({ fetch, cookies }) => {

  
  const client = createClient({ fetch, cookies })

  try {
    const settings = await client.getSingle("settings")
    const educationalDocuments = await client.getAllByType("educational")

    return {
      settings,
      educationalDocuments
    }
  } catch (err: any) {
    return error(404, {
      message: err.message
    })
  }
};