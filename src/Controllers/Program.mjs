import { Program, validate, validateUpdate } from "../Validators/Program.mjs";

export const post_program = async (req, res) => {
  const { error } = validate(req.body);
  if (error) throw new Error(error.details[0].message);

  let program = new Program(req.body);

  program = await program.save();
  res.send(program);
};

export const get_programs = async (req, res) => {
  let programs;
  if (req.headers.university_id !== undefined) {
    programs = await Program.find({
      university_id: req.headers.university_id,
    });
  }
  programs = await Program.find().sort("name");
  res.send(programs);
};

export const get_program = async (req, res) => {
  const program = await Program.findById(req.params.id);
  if (!program) throw new Error("No program based in this ID");
  res.send(program);
};

export const update_program = async (req, res) => {
  const { error } = validateUpdate(req.body);
  if (error) throw new Error(error.details[0].message);

  const updatedprogram = await Program.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!updatedprogram) throw new Error("There is no program with the given id");

  res.send(updatedprogram);
};
