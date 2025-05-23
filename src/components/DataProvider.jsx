import { createContext, useState, useEffect } from "react";
import { toast } from "sonner";


export const DataContext = createContext();

import { getAccessToken } from "../getAccessToken.js";

export const DataProvider = ({ children }) => {
    const [workoutsData, setWorkoutsData] = useState(null);
    const [accountData, setAccountData] = useState(null);
    const [workoutsLoading, setWorkoutsLoading] = useState(true);
    const [accountLoading, setAccountLoading] = useState(true);

    useEffect(() => {    
        getWorkoutsList();
        getAccountData();
    }, []);

    function refreshData() {
        setWorkoutsLoading(true);
        setAccountLoading(true);
        getWorkoutsList();
        getAccountData();
    }

    const getWorkoutsList = async () => {
        const currentPath = window.location.pathname;
        if (currentPath === "/signin" || currentPath === "/signup") return;
        const accessToken = localStorage.getItem('access_token');

        try {
            const response = await fetch('https://swimply.pl/api/v2/workout', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                await getAccessToken();
                return getWorkoutsList();
            }

            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const result = await response.json();
            if(result){
                setWorkoutsData(result.map((filaElem) => ({
                    id: filaElem.workout.id,
                    name: filaElem.workout.name,
                    workoutDate: filaElem.workout.workoutDate,
                    timeLong: filaElem.workout.timeLong,
                    distance: filaElem.workout.distance,
                    poolLength: filaElem.workout.poolLength,
                    mainType: filaElem.workout.mainType,
                    elementsIn: filaElem.workout.elementsIn,
                    caloriesBurnt: filaElem.workout.caloriesBurnt,
                })));
            }else{
                setWorkoutsData([]);
            }

        } catch (error) {
            toast.error("Nie udało się pobrać danych z serwera.");
            console.error("Error fetching data:", error);
        } finally {
            setWorkoutsLoading(false);
        }
    };

    const getAccountData = async () => {
        const currentPath = window.location.pathname;
        if (currentPath === "/signin" || currentPath === "/signup") return;
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) return;
        try {
            const response = await fetch('https://swimply.pl/api/v2/account/info', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 401 || response.status === 428) {
                await getAccessToken();
                return getAccountData();
            }

            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const result = await response.json();
            setAccountData({
                weight: result.weight,
                isMale: result.isMale,
                caloriesGoal: result.caloriesGoal,
                username: result.username,
            });

        } catch (error) {
            toast.error("Nie udało się pobrać danych z serwera.");
            console.error("Error fetching data:", error);
        } finally {
            setAccountLoading(false);
        }
    }

    return (
        <DataContext.Provider value={{ workoutsData, workoutsLoading, accountData, accountLoading, refreshData }}>
            {children}
        </DataContext.Provider>
    );
};
