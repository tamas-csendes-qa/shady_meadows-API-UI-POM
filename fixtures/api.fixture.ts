import { test as base, request, APIRequestContext} from '@playwright/test';

type ApiFixtures = {
    apiContext: APIRequestContext;
}

export const test = base.extend<ApiFixtures>({
    apiContext: async ({}, use) => {
    const apiContext = await request.newContext({
        baseURL: process.env.API_URL,
    })
        await use(apiContext);
    },
});

export { expect } from '@playwright/test';