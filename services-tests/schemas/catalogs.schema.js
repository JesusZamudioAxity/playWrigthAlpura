export const catalogsSchema = {
  type: "object",
  properties: {
    code: { type: "number" },
    userError: { type: "string" },
    exceptionMessage: { type: "string" },
    success: { type: "boolean" },
    response: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "number" },
          channel_id: { type: "number" },
          description: { type: ["string", "null"] },
          channel: { type: "string" },
          desc_message: { type: "string" },
          exposed: { type: "string" },
          defined: { type: "string" },
          dpy_message: { type: ["string", "null"] },
          type: { type: "string" },
          code: { type: ["string", "null"] },
          brands: { type: ["string", "null"] },
          bullets: { type: ["string", "null"] }
        },
        required: [
          "id",
          "channel_id",
          "channel",
          "desc_message",
          "exposed",
          "defined",
          "type"
        ]
      }
    }
  },
  required: ["code", "success", "response"]
};