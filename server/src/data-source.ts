import { DataSource } from "typeorm";
import { Review } from "./models/Review";
import { User } from "./models/User";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "172.26.64.1",
    port: 5432,
    username: "root",
    password: "root",
    database: "qreviews_db",
    logging: true,
    entities: [Review, User],
    subscribers: [],
    migrations: [],
    synchronize: true
})