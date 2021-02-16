import prompts from "prompts";

export default async function () {
  return await prompts({
    type: "password",
    name: "token",
    message: "Enter your Snyk API token: ",
    validate: (value: string) => value.length > 0,
  });
}
