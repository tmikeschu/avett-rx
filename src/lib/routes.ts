export enum Route {
  Root = "/",
  Pharmacy = "/pharmacy",
  ApiLogin = "/api/login",
  ApiLogout = "/api/logout",
  ApiUser = "/api/user",
  ApiGraphql = "/api/graphql",
}

export const VISITOR_VIEWS = {
  [Route.Root]: Route.Root,
  [Route.Pharmacy]: Route.Pharmacy,
} as const;

export const isVisitorView = (view: string): boolean => view in VISITOR_VIEWS;
