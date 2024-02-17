import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { SaveThemeValidator } from "@/lib/validators/theme";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const data = SaveThemeValidator.parse(body);

    await db.user.update({
      where: { id: session.user.id },
      data: {
        preferedThemeName: data.name,
      },
    });

    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response("Could not set the theme", { status: 500 });
  }
}
