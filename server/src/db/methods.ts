import { Document, Model, Schema } from "mongoose";

export async function getByIdOrFail(this: Model<Schema>, id: string): Promise<Document<Schema>> {
    const doc = await this.findById(id);

    if(!doc) {
        throw "Could not find id, action aborted";
    }

    return doc;
}