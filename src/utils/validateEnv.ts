import { cleanEnv, port, str } from "envalid";

function validateEnv(): void {
  cleanEnv(process.env, {
    DB_HOST: str(),
    DB_NAME: str(),
    DB_USER: str(),
    DB_PASSWORD: str(),
    PORT: port(),
  });
}

export default validateEnv;
