// get token to the session storage
export const authenticate = (response, nextStep) => {
    // window !== undefined means this web browser is running
    if (window !== 'undefined') {
        // then save data in session storage
        sessionStorage.setItem("token", JSON.stringify(response.data.token));
        sessionStorage.setItem("username", JSON.stringify(response.data.username));
    }
    nextStep();
}

// fetching token
export const getToken = () => {
    if (window !== "undefined") {
        if (sessionStorage.getItem("token")) {
            // if session stoage has a token -> fetch it
            return JSON.parse(sessionStorage.getItem("token"));
        }
        else return false;
        
    }
}

// feting username
export const getUsername = () => {
    if(window !== "undefined") {
        if(sessionStorage.getItem("username")){
            // if session stoage has 'username' -> fetch it
            return JSON.parse(sessionStorage.getItem("username"));
        }
        else return false;
    }
}

// log out
export const logOut = nextStep => {
    if(window !== "undefined") {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("username");
    }
    nextStep();
}