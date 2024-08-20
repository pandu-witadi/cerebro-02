export const KEY_USER_TYPE = 'userType';

export const setUserProfile = (value: string) => {
    if (typeof window !== "undefined") {
        // Check if window is defined
        localStorage.setItem(KEY_USER_TYPE, JSON.stringify(value))
    }
}
export const getUserProfile = () => {
    let result : string | null = 'false';
    if (typeof window !== "undefined") {
        result = localStorage.getItem(KEY_USER_TYPE);
        if(result === null) {
            result = 'false';
        }
    }
    return(result==='"true"');
}

export const setUserLogout = () => {
    setUserProfile('false');
    return false;
}