//export const apiUrl = 'http://localhost:8000/api/';
//export const fileUrl = 'http://localhost:8000/';

export const apiUrl = "https://kankalabe-backend-production.up.railway.app/api/";
export const fileUrl = "https://kankalabe-backend-production.up.railway.app/";


export const token = () => {
    const UserInfo = localStorage.getItem('userInfo');
    const data = JSON.parse(UserInfo);
    return data.token;
}
