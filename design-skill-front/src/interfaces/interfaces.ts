export enum ERole {
    Root = "Root",
    User = "User",
    Limited = "Limited"
}
export interface IRole {
    role: ERole;
}