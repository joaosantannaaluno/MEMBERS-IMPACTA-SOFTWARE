import { z } from "zod";

export default procedure.input(z.object({
    id: z.string()
})).query(async (opts) => {
    const { id } = opts.input;
    return id;
})