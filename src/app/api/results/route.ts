import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { SaveResultValidator } from "@/lib/validators/result";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const data = SaveResultValidator.parse(body);

    await db.result.create({
      data: {
        ...data,
        authorId: session.user.id,
      },
    });

    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response("Could not save the result", { status: 500 });
  }
}
