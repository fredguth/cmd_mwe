import { json } from "@sveltejs/kit";
import { prisma as db } from "$lib/server/prisma";
import type { Material } from "$lib/server/prisma";

export async function GET({ url }) {
  try {
    const limitParam = url.searchParams.get("limit");
    const skipParam = url.searchParams.get("skip");
    const limit = limitParam ? parseInt(limitParam) : undefined; // Default limit
    const skip = skipParam ? parseInt(skipParam) : undefined; // Default skip

    const classes: Material[] = await db.material.findMany({
      select: {
        DS_CLASSE: true,
      },
      distinct: ["DS_CLASSE"],
      orderBy: {
        DS_CLASSE: "asc",
      },
      take: limit,
      skip: skip,
    });

    // Map the result to an array of strings
    const classesStrings: string[] = classes.map(
      (item: Material) => item.DS_CLASSE
    );

    return json(classesStrings); // Wrap the array in a Response object
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
