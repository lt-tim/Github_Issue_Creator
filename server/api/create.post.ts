import {Octokit} from '@octokit/rest';
import * as fs from 'node:fs'
import * as path from 'node:path'
import jwt from 'jsonwebtoken';

const runtimeConfig = useRuntimeConfig()
const owner = runtimeConfig.repository.owner;
const repo = runtimeConfig.repository.name;
let body = '';
let title = '';

export default defineEventHandler(async (event) => {
    const appId = runtimeConfig.appId;
    const privateKeyPath = path.join(process.cwd(), runtimeConfig.privateKeyPath);
    const requestBody = await readBody(event);

    body = requestBody.body;
    title = requestBody.title;

    const jwtoken = generateJWT(appId, privateKeyPath);
    const token = await fetchToken(jwtoken);
    let result = await createIssue(token);

    return {
        url: `https://github.com/${owner}/${repo}/issues/${result.issue.data.number}`
    }
})

function generateJWT(appId: string, privateKeyPath: string) {
    const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
    // Generate the JWT
    const now = Math.floor(Date.now() / 1000);
    const payload = {
        iat: now, // Issued at time
        exp: now + 60, // JWT expiration time (1 minute)
        iss: appId, // GitHub App ID
    };

    return jwt.sign(payload, privateKey, { algorithm: 'RS256' });
}

async function fetchToken(jwtoken: string) {
    const octokit = new Octokit({
        auth: jwtoken,
    });

    const installationAccessToken = await octokit.apps.createInstallationAccessToken({
        installation_id: Number(runtimeConfig.installationId),
    });

    return installationAccessToken.data.token;
}

async function createIssue(accessToken: string) {
    const octokit = new Octokit({
        auth: `token ${accessToken}`,
    });

    const issue = await octokit.issues.create({
        owner,
        repo,
        title: title,
        body: body,
    });

    return {
        issue: issue
    }
}