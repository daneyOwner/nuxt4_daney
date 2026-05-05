import { JWT } from "next-auth/jwt";
import { getToken } from "#auth";

interface BearerToken extends JWT {
    access_token: string | null;
}

export default defineEventHandler(async (event) => {
    const tokenResponse = (await getToken({ event })) as BearerToken;
    return tokenResponse.access_token;
});