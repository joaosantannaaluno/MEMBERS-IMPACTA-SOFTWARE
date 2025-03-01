import { z } from "zod";
import { procedure } from "../../../trpc";

export default procedure.input(z.object({
    id: z.string().nanoid(),
})).mutation(async (opts) => {
    const { id } = opts.input;
    return { id };
})