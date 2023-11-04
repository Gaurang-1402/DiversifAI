import { OAuth2Client } from 'google-auth-library';

export const googleOAuth2ClientInstance = new OAuth2Client({
    clientId: process.env.GIS_CLIENT_ID,
    clientSecret: process.env.GIS_CLIENT_SECRET,
    redirectUri: `${process.env.AUTH_CLIENT_REDIRECT_BASE_URL}/auth/callback`,
});
