export const testSchema = {
  type: "object",
  properties: {
    id: { type: "integer" },
    name: { type: "string" },
  },
  required: ["id", "name"],
};
