export default function authHeader() {
    let token = localStorage.getItem('accessTokenDesignSkillCode')

    if(token) {
        const authStr = 'Bearer '.concat(token)
        return { Authorization: authStr }
    } else {
        return {}
    }
}