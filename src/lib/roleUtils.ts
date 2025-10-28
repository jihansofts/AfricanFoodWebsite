// lib/roleUtils.ts
export class RoleUtils {
  static readonly ROLES = {
    CUSTOMER: "customer",
    VENDOR: "vendor",
  } as const;

  static hasPermission(
    userRole: string,
    requiredRole: string | string[]
  ): boolean {
    const requiredRoles = Array.isArray(requiredRole)
      ? requiredRole
      : [requiredRole];
    return requiredRoles.includes(userRole);
  }

  static getHigherRoles(role: string): string[] {
    const roleHierarchy = {
      [this.ROLES.CUSTOMER]: [this.ROLES.CUSTOMER],
      [this.ROLES.VENDOR]: [this.ROLES.CUSTOMER, this.ROLES.VENDOR],
      default: [this.ROLES.CUSTOMER],
    };

    return (
      roleHierarchy[role as keyof typeof roleHierarchy] || [this.ROLES.CUSTOMER]
    );
  }
}
