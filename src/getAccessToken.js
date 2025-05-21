export async function getAccessToken(){
    const refreshToken = document.cookie.match(/(?:^|;\s*)refresh_token=([^;]*)/)?.[1];
    if (!refreshToken) return;

    const res = await fetch('https://swimply.pl/refresh-token', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${refreshToken}`
        },
    });

    if (res.status === 428 || res.status === 401) {
        localStorage.removeItem('access_token');
        document.cookie = `refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        toast.error("Sesja wygasła. Zaloguj się ponownie.");
        window.location.href = '/signin';
        return;
    }

    const data = await res.json();
    if (data.error) {
        toast.error(data.error);
    } else {
        localStorage.setItem('access_token', data.access_token);
    }
};
