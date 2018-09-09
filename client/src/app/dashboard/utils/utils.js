export function sortLoggedUsers (loggedUsers) {
    return loggedUsers.sort((a, b) => {
        return a.user > b.user;
    });
}

export const noop = () => undefined;