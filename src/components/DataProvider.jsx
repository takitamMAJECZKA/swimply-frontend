import { createContext, useState, useEffect } from "react";
import { toast } from "sonner";


export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getAccessToken = async () => {
            const refreshToken = document.cookie.match(/(?:^|;\s*)refresh_token=([^;]*)/)?.[1];
            if (!refreshToken) return;
    
            const res = await fetch('http://62.171.167.17:8080/refresh-token', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${refreshToken}`
                },
            });
    
            if (res.status === 428) {
                localStorage.removeItem('access_token');
                document.cookie = `refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
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
    
        const getWorkoutsList = async () => {
            const accessToken = localStorage.getItem('access_token');
            if (!accessToken) return; // 🔥 Don't fetch data if user is not logged in
    
            try {
                const response = await fetch('http://62.171.167.17:8080/api/v2/workouts', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.status === 428) {
                    await getAccessToken();
                    return getWorkoutsList();
                }
    
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
                const result = await response.json();
                setData(result.map((filaElem) => ({
                    id: filaElem.workout.id,
                    name: filaElem.workout.name,
                    workoutDate: filaElem.workout.workoutDate,
                    timeLong: filaElem.workout.timeLong,
                    distance: filaElem.workout.distance,
                    poolLength: filaElem.workout.poolLength,
                    mainType: filaElem.workout.mainType,
                    elementsIn: filaElem.workout.elementsIn,
                })));
    
            } catch (error) {
                toast.error("Nie udało się pobrać danych z serwera.");
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
    
        getWorkoutsList();
    }, []);
    

    return (
        <DataContext.Provider value={{ data, loading }}>
            {children}
        </DataContext.Provider>
    );
};
