export const apiUrl = 'http://localhost:8000/api/';
export const fileUrl = 'http://localhost:8000/';

export const token = () => {
    const UserInfo = localStorage.getItem('userInfo');
    const data = JSON.parse(UserInfo);
    return data.token;
}