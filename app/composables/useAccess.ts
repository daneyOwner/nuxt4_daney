export function useAccess() {
    const route = useRoute()

    function getUserPermissions(): number[] {
        const [permissionDateStorage] = useLocalStorage('userPermissions');
        if (!permissionDateStorage) return [];
        const permissions = permissionDateStorage.value;
        return permissions ? permissionDateStorage.value : [];
    }

    function hasAccess(requiredPermissions: number[]): boolean {
        requiredPermissions.push(0); // Dev
        let guildID = route.query.GuildID || route.params.id;
        const userPermissions = getUserPermissions();

        for (let i = 0; i < userPermissions.length; i++) {
            //@ts-ignore
            if  (userPermissions[i].GuildID === guildID) {
                //@ts-ignore
                if (requiredPermissions.includes(userPermissions[i].RoleLevel)) return true;
            }
        }
        
        return false;
    }

    return {
        hasAccess
    }
}