import { TRPCError } from "@trpc/server";
import { hash } from "argon2";
import { toast } from "sonner";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const useCustomAuth = createTRPCRouter({
  form: publicProcedure
    .input(
      z.object({
        name: z.string(),
        lastName: z.string(),
        phone: z.string().max(12),
        email: z.string().email(),
        messages: z.string(),
        password: z
          .string()
          .regex(new RegExp(".*[A-Z].*"))
          .regex(new RegExp(".*[a-z].*"))
          .regex(new RegExp(".*\\d.*"))
          .regex(new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"))
          .min(10, "Must be at least 10 characters in length"),
        //TyC: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const exists = await ctx.prisma.user.findFirst({
        where: {
          email: input.email,
        },
      });

      if (exists) {
        toast("User already exists");
        throw new TRPCError({
          code: "CONFLICT",
          message: "User already exists.",
        });
      }

      const hashedPassword = await hash(input.password);

      const result = await ctx.prisma.user.create({
        data: {
          name: input.name,
          lastName: input.lastName,
          phone: input.phone,
          email: input.email,
          password: hashedPassword,
          messages: input.messages,
          //TyC: input.TyC,
        },
      });
      toast("Account created successfully");

      return {
        status: 201,
        message: "Account created successfully",
        result: result.email,
      };
    }),
});
