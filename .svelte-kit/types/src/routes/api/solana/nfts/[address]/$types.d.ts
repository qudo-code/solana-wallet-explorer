import type * as Kit from '@sveltejs/kit';

interface RouteParams extends Partial<Record<string, string>> { address: string }

export type RequestHandler = Kit.RequestHandler<RouteParams>;
export type RequestEvent = Kit.RequestEvent<RouteParams>;