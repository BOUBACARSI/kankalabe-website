export const apiUrl = process.env.REACT_APP_API_URL;
export const fileUrl = process.env.REACT_APP_FILE_URL;

export const token = () => {
    const UserInfo = localStorage.getItem('userInfo');
    const data = JSON.parse(UserInfo);
    return data?.token;
};


