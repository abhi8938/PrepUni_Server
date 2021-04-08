const { Program, validate, validateUpdate } =require("../Validators/Program");

const post_program = async (req, res) => {
  console.log("req.body.program", req.body);
  const { error } = validate(req.body);
  if (error) throw new Error(error.details[0].message);
  let program = new Program(req.body);

  program = await program.save();
  res.status(200).send(program);
};

const get_programs = async (req, res) => {
  let programs;
  if (req.headers.university_id !== undefined) {
    programs = await Program.find({
      university_id: req.headers.university_id,
    });
  } else {
    programs = await Program.find({});
  }
  res.status(200).send(programs);
};

const get_program = async (req, res) => {
  const program = await Program.findById(req.params.id);
  if (!program) throw new Error("No program based in this ID");
  res.status(200).send(program);
};

const update_program = async (req, res) => {
  const { error } = validateUpdate(req.body);
  if (error) throw new Error(error.details[0].message);

  const updatedprogram = await Program.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!updatedprogram) throw new Error("There is no program with the given id");

  res.status(200).send(updatedprogram);
};

module.exports={
  update_program,
  get_program,
  get_programs,
  post_program
}