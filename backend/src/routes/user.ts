import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { signInInput, signUpInput } from "@prath/medium-common";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    console.log(body)
    const { success } = signUpInput.safeParse(body);
    if (!success) {
      c.status(401);
      return c.json({
        message: "Inputs are not correct",
      });
    }
    const email = body.username;
    const user = await prisma.user.create({
      data: {
        email: email,
        password: body.password,
        name: body.name,
      },
    });

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    console.log(token);
    c.status(200);
    return c.json({
      token: token,
    });
  } catch (error) {
    c.status(403);
    console.log(error)
    return c.json({
      error: "Invalid",
    });
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const email = body.username;
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    const { success } = signInInput.safeParse(body);
    if (!success) {
      c.status(401);
      return c.json({
        message: "Inputs are not correct",
      });
    }

    if (!user) {
      c.status(403);
      return c.json({
        error: "Not Authorized",
      });
    }

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);

    c.status(200);
    return c.json({
      token,
    });
  } catch (error) {
    console.log(error);
    return c.json({
      error,
    });
  }

  return c.text("Signin Request");
});
