import { drizzle } from "drizzle-orm/node-postgres";
import { environment } from "../config/environment.js";

export const database = drizzle(environment.DATABASE_URL);


