/* eslint-disable react/no-children-prop */
"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";

const formSchema = z.object({
  document: z
    .instanceof(File, { message: "A file is required." })
    .refine(
      (f) => f.type === "application/pdf",
      "Only PDF files are accepted.",
    ),
  message: z
    .string()
    .min(20, "Message must be at least 20 characters.")
    .max(250, "Message must be at most 250 characters."),
});

export const NewChatForm = () => {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      document: null as File | null,
      message: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const uuid = uuidv4();
      router.push(`/chat/${uuid}`);
    },
  });

  return (
    <div className="w-full">
      <form
        className="flex flex-col gap-4"
        id="bug-report-form"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <form.Field
          name="document"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name} id={field.name}>
                  Document
                </FieldLabel>
                <Input
                  id={field.name}
                  onBlur={field.handleBlur}
                  onChange={(e) =>
                    field.handleChange(e.target.files?.[0] ?? null)
                  }
                  aria-invalid={isInvalid}
                  type="file"
                  accept="application/pdf"
                />
                {field.state.value && (
                  <FieldDescription>
                    Selected: {field.state.value.name}
                  </FieldDescription>
                )}
              </Field>
            );
          }}
        ></form.Field>

        <form.Field
          name="message"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <Textarea
                  id={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  aria-invalid={isInvalid}
                  placeholder="Describe what you want to do with this document"
                  rows={5}
                  className="resize-none"
                  wrap="hard"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={!canSubmit}
            >
              {isSubmitting ? "..." : "Send message"}
            </Button>
          )}
        />
      </form>
    </div>
  );
};
