// Initialize Supabase client
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();
import { testSchema } from "../schema/schema.js";
import Ajv from "ajv";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const get_data = async (req, res) => {
  const { data, error } = await supabase
    .from(req.body.table)
    .select("")
    .eq("id", req.body.id);
  if (error) {
    console.log("in error");
    console.log(error);
    return res.status(400).json(error);
  }
  console.log("in data");
  console.log(data);
  return res.status(200).json(data);
};

export const create_data = async (req, table, res) => {
  console.log("in create_data");
  const { error } = await supabase.from(table).insert(req);
  if (error) {
    console.log("in error");
    console.log(error);
    return res.status(400).json(error);
  }
  return res.status(200).json("Data created successfully");
};

export const update_data = async (req, res) => {
  const { error } = await supabase
    .from(req.body.table)
    .update(req.body)
    .eq("id", req.body.id);
  if (error) {
    console.log("in error");
    console.log(error);
    return res.status(400).json(error);
  }
  return res.status(200).json("Data updated successfully");
};

export const remove_data = async (req, res) => {
  const { error } = await supabase
    .from(req.body.table)
    .delete()
    .eq("id", req.body.id);
  if (error) {
    console.log("in error");
    console.log(error);
    return res.status(400).json(error);
  }
  return res.status(200).json("Data removed successfully");
};
export const validate_data = (req) => {
  const ajv = new Ajv();
  const validate = ajv.compile(testSchema);

  const requestBody = req;
  console.log("requestBody");
  const validData = Object.keys(requestBody)
    .filter((key) => testSchema.properties[key]) // Keep only keys defined in schema
    .reduce((obj, key) => {
      obj[key] = requestBody[key];
      return obj;
    }, {});

  // Validate the request body against the schema
  const isValid = validate(validData);

  if (!isValid) {
    return {
      isValid: false,
      errors: validate.errors,
    };
  }

  // Filter the request body to only include the valid fields from the schema

  // Return the valid data
  return {
    isValid: true,
    data: validData,
  };
};
