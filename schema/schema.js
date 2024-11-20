export const testSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
  },
  required: ["id", "name"],
};

export const authSchema = {
  type: "object",
  properties: {
    uuid: { type: "string" },
    issued_to: { type: "string" },
    issued_at: { type: "string" },
    access: { type: "boolean" },
    type: { type: "string" },
  },
  required: ["uuid", "issued_to", "issued_at", "access", "type"],
};

export const logSchema = {
  type: "object",
  properties: {
    uuid: { type: "string" },
    accessed_by: { type: "string" },
  },
  required: ["uuid", "accessed_by"],
};
