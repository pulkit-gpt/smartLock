// Initialize Supabase client
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

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

export const create_data = async (req, res) => {
  const { error } = await supabase.from(req.body.table).insert(req.body);
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
