import { MongooseModuleAsyncOptions, MongooseModuleOptions } from "@nestjs/mongoose";

export const mongooseConfig: MongooseModuleAsyncOptions = {
    useFactory: async(): Promise<MongooseModuleOptions> => {
        return {
            uri: process.env.DB_URI,
        }
    }
}