import inquirer from "inquirer";

export default async function () {
  const questions = [
    {
      name: "token",
      type: "password",
      message: "Enter your Snyk API token",
      validate: function (value: string) {
        if (value.length) return true;
        return "Please enter your Snyk API token";
      },
    },
  ];
  return inquirer.prompt(questions);
}
